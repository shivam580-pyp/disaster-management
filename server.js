const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/ws/ndrf-control' });
const activeClients = new Set();

wss.on('connection', (ws) => {
    activeClients.add(ws);
    console.log(`[WebSocket] NDRF Control Room dashboard connected. Active clients: ${activeClients.size}`);
    ws.send(JSON.stringify({ type: 'INITIAL_STATE_SYNC', timestamp: Date.now() / 1000 }));
    ws.on('close', () => activeClients.delete(ws));
});

function broadcast(payload) {
    const msg = JSON.stringify(payload);
    for (const client of activeClients) {
        if (client.readyState === WebSocket.OPEN) client.send(msg);
    }
}

// Telemetry Ingestion API
app.post('/api/telemetry', (req, res) => {
    const startTime = Date.now();
    const telemetry = req.body;
    const isBreached = (telemetry.water_level_meters || 0) >= (telemetry.critical_threshold || 15.0);
    const latencyMs = Date.now() - startTime + 45.0;

    broadcast({ type: 'TELEMETRY_UPDATE', sensor: telemetry, is_breached: isBreached, latency_ms: latencyMs });

    if (isBreached) {
        const alertPayload = {
            type: 'CRITICAL_FLOOD_ALERT',
            sensor_id: telemetry.sensor_id || 'KOSI_RIVER_NODE_04',
            lat: telemetry.latitude || 25.5941,
            lng: telemetry.longitude || 85.1376,
            water_level: telemetry.water_level_meters,
            critical_threshold: telemetry.critical_threshold,
            status: 'DANGER_BREACHED',
            message: `EMERGENCY: River level reached ${telemetry.water_level_meters}m!`,
            timestamp: Date.now() / 1000,
            latency_ms: latencyMs
        };
        broadcast(alertPayload);
        return res.json({ status: 'ALERT_TRIGGERED', latency_ms: latencyMs, payload: alertPayload });
    }
    res.json({ status: 'NORMAL', latency_ms: latencyMs });
});

// Citizen Victim SOS Dispatch Endpoint
app.post('/api/sos', (req, res) => {
    const sos = req.body;
    console.log(`[SOS API] Received Victim Distress Call: ${sos.id || 'NEW'} (${sos.triage})`);
    broadcast({ type: 'CITIZEN_SOS_ALERT', sos: sos, timestamp: Date.now() / 1000 });
    res.json({ status: 'SOS_RECEIVED', sos_id: sos.id });
});

// Mesh Store-and-Forward Batch Relay Endpoint
app.post('/api/mesh-relay', (req, res) => {
    const { mesh_frames } = req.body;
    console.log(`[MESH RELAY] Received ${mesh_frames ? mesh_frames.length : 0} store-and-forward offline SOS frames.`);
    if (Array.isArray(mesh_frames)) {
        mesh_frames.forEach(frame => {
            broadcast({ type: 'CITIZEN_SOS_ALERT', sos: frame, timestamp: Date.now() / 1000 });
        });
    }
    res.json({ status: 'MESH_RELAY_SUCCESS', processed_count: mesh_frames ? mesh_frames.length : 0 });
});

// Rescue Unit Dispatch Endpoint
app.post('/api/dispatch', (req, res) => {
    const dispatch = req.body;
    console.log(`[RESCUE DISPATCH] Dispatched unit ${dispatch.unit} to SOS ${dispatch.sos_id}`);
    broadcast({ type: 'RESCUE_DISPATCHED', dispatch: dispatch, timestamp: Date.now() / 1000 });
    res.json({ status: 'UNIT_DISPATCHED', dispatch_id: dispatch.dispatch_id });
});

// Government SDMA/NDMA Situation Report Summary API
app.get('/api/govt-report', (req, res) => {
    res.json({
        report_timestamp: new Date().toISOString(),
        total_affected_population: 148500,
        total_rescued_victims: 3420,
        active_critical_red_sos: 14,
        active_relief_camps: 24,
        barrage_discharge_cusecs: 490000,
        river_basins: [
            { basin: "Kosi River", location: "Supaul, Bihar", water_level: 12.45, threshold: 15.0, status: "HIGH WATCH" },
            { basin: "Gandak River", location: "Valmiki Nagar, Bihar", water_level: 13.80, threshold: 14.5, status: "CRITICAL SURGE" },
            { basin: "Brahmaputra River", location: "Kaziranga, Assam", water_level: 14.20, threshold: 14.0, status: "OVERFLOW BREACH" },
            { basin: "Koshi & Sun Kosi", location: "Saptari, Nepal", water_level: 11.90, threshold: 13.5, status: "STABLE" }
        ]
    });
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

server.listen(PORT, () => {
    console.log(`===========================================================`);
    console.log(` NDRF Ultra-Low Latency Disaster Alert & Rescue System     `);
    console.log(` Web Server running at: http://localhost:${PORT}`);
    console.log(` WebSocket URL         : ws://localhost:${PORT}/ws/ndrf-control`);
    console.log(`===========================================================`);
});
