// NDRF Enterprise Ultra-Low Latency Disaster Alert System Dashboard App JS

// Basin Sensor Fleet Definitions
const BASIN_SENSORS = {
    "KOSI_RIVER_NODE_04": {
        id: "KOSI_RIVER_NODE_04",
        name: "Kosi River Node 04",
        location: "Kosi Bridge, Supaul",
        coords: [25.5941, 85.1376],
        water_level: 12.45,
        threshold: 15.0,
        flow_rate: 490.0,
        rainfall: 34.2,
        battery: 98.5,
        signal: -64,
        status: "NORMAL"
    },
    "GANDAK_VALMIKI_02": {
        id: "GANDAK_VALMIKI_02",
        name: "Gandak River Node 02",
        location: "Valmiki Nagar Dam",
        coords: [27.4260, 83.9210],
        water_level: 13.80,
        threshold: 14.5,
        flow_rate: 610.0,
        rainfall: 48.0,
        battery: 95.0,
        signal: -70,
        status: "WARNING"
    },
    "SON_BARRAGE_08": {
        id: "SON_BARRAGE_08",
        name: "Son River Node 08",
        location: "Indrapuri Barrage",
        coords: [24.9140, 84.1860],
        water_level: 9.60,
        threshold: 16.0,
        flow_rate: 310.0,
        rainfall: 12.0,
        battery: 99.1,
        signal: -58,
        status: "NORMAL"
    },
    "BAGMATI_NODE_01": {
        id: "BAGMATI_NODE_01",
        name: "Bagmati River Node 01",
        location: "Sitamarhi Bridge",
        coords: [26.5970, 85.4800],
        water_level: 11.20,
        threshold: 14.0,
        flow_rate: 420.0,
        rainfall: 28.5,
        battery: 97.2,
        signal: -68,
        status: "NORMAL"
    }
};

let activeSensorId = "KOSI_RIVER_NODE_04";
let isBreached = false;
let autoSimulate = true;
let soundEnabled = true;
let voiceEnabled = true;
let ws = null;
let telemetryHistory = [11.8, 11.9, 12.0, 12.2, 12.45];

// Evacuation Relief Camps
const RELIEF_CAMPS = [
    { name: "Supaul High School Relief Camp", capacity: 600, occupied: 420, lat: 25.5990, lng: 85.1450, medical: "Sufficient" },
    { name: "Valmiki Community Shelter", capacity: 450, occupied: 380, lat: 27.4200, lng: 83.9280, medical: "High Demand" },
    { name: "Sitamarhi Disaster Relief Center", capacity: 800, occupied: 290, lat: 26.6020, lng: 85.4850, medical: "Sufficient" }
];

// DOM Element References
const alertBanner = document.getElementById('alert-banner');
const statusBadge = document.getElementById('status-badge');
const systemStatusText = document.getElementById('system-status-text');
const latencyVal = document.getElementById('latency-val');
const wsStatus = document.getElementById('ws-status');

const hudNodeName = document.getElementById('hud-node-name');
const hudNodeLocation = document.getElementById('hud-node-location');
const hudWaterVal = document.getElementById('hud-water-val');

const statWater = document.getElementById('stat-water');
const statFlow = document.getElementById('stat-flow');
const statRain = document.getElementById('stat-rain');
const statBattery = document.getElementById('stat-battery');
const telemetryTimestamp = document.getElementById('telemetry-timestamp');
const logStream = document.getElementById('log-stream');

const btnSirenToggle = document.getElementById('btn-siren-toggle');
const btnVoiceToggle = document.getElementById('btn-voice-toggle');
const btnBroadcastModal = document.getElementById('btn-broadcast-modal');

const btnSimulateSurge = document.getElementById('btn-simulate-surge');
const btnBlePing = document.getElementById('btn-ble-ping');
const btnDispatchBoat = document.getElementById('btn-dispatch-boat');
const btnResetSystem = document.getElementById('btn-reset-system');

// Modal Elements
const broadcastModal = document.getElementById('broadcast-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCancelModal = document.getElementById('btn-cancel-modal');
const btnSendBroadcast = document.getElementById('btn-send-broadcast');

// Map Setup
const map = L.map('map', { zoomControl: true, attributionControl: false }).setView(BASIN_SENSORS[activeSensorId].coords, 10);

// Tile Layers
const darkTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 });
const satelliteTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18 });
const rainTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { opacity: 0.6 });

darkTileLayer.addTo(map);

// Map Marker Layers
let sensorMarkersMap = {};
let dangerCircleMap = null;
let sosMarkersList = [];
let rescueMarkersList = [];

function initMapMarkers() {
    Object.values(BASIN_SENSORS).forEach(sensor => {
        const icon = L.divIcon({
            className: 'sensor-map-marker',
            html: `<div style="width:26px; height:26px; background:${sensor.status === 'WARNING' ? 'var(--accent-amber)' : 'var(--accent-cyan)'}; border-radius:50%; border:3px solid #fff; box-shadow:0 0 16px ${sensor.status === 'WARNING' ? 'var(--accent-amber)' : 'var(--accent-cyan)'}; cursor:pointer;"></div>`,
            iconSize: [26, 26],
            iconAnchor: [13, 13]
        });

        const marker = L.marker(sensor.coords, { icon: icon }).addTo(map);
        marker.bindPopup(`
            <div style="font-family: var(--font-body); padding: 4px;">
                <h3 style="color:var(--accent-cyan); font-weight:bold; font-size:1rem; margin-bottom:4px;">${sensor.name}</h3>
                <p style="font-size:0.8rem; color:#cbd5e1;">Location: ${sensor.location}</p>
                <p style="font-size:0.8rem; color:#cbd5e1; margin-top:2px;">Level: <b>${sensor.water_level}m</b> (Limit: ${sensor.threshold}m)</p>
            </div>
        `);

        marker.on('click', () => switchActiveSensor(sensor.id));
        sensorMarkersMap[sensor.id] = marker;
    });

    // Plot Relief Camps
    RELIEF_CAMPS.forEach(camp => {
        const campIcon = L.divIcon({
            className: 'camp-marker',
            html: `<div style="width:28px; height:28px; background:var(--accent-blue); border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:14px; box-shadow:0 0 12px var(--accent-blue);">⛺</div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14]
        });

        L.marker([camp.lat, camp.lng], { icon: campIcon }).addTo(map)
            .bindPopup(`<b>${camp.name}</b><br>Occupancy: ${camp.occupied}/${camp.capacity} evacuees<br>Medical: ${camp.medical}`);
    });
}

// Audio Siren & Voice Speech Generator
let audioCtx = null;

function playEmergencySiren() {
    if (!soundEnabled) return;
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(920, audioCtx.currentTime + 0.6);
        osc.frequency.linearRampToValueAtTime(440, audioCtx.currentTime + 1.2);

        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);
    } catch (e) {}
}

function speakVoiceWarning(msgText) {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(msgText);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    } catch (e) {}
}

// Tab Switcher Handler
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');

        if (targetId === 'view-map') map.invalidateSize();
        if (targetId === 'view-mesh') drawMeshTopology();
        if (targetId === 'view-sensors') renderSensorTable();
        if (targetId === 'view-rescue') renderRescueManager();
    });
});

// Map Layer Switchers
document.getElementById('layer-dark').addEventListener('click', (e) => {
    switchMapLayer(darkTileLayer, e.target);
});
document.getElementById('layer-satellite').addEventListener('click', (e) => {
    switchMapLayer(satelliteTileLayer, e.target);
});
document.getElementById('layer-rain').addEventListener('click', (e) => {
    switchMapLayer(rainTileLayer, e.target);
});

function switchMapLayer(layer, btn) {
    document.querySelectorAll('.layer-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    map.eachLayer(l => map.removeLayer(l));
    layer.addTo(map);
    initMapMarkers();
}

// Sensor Switcher
document.querySelectorAll('.sensor-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        const sensorId = chip.getAttribute('data-sensor');
        switchActiveSensor(sensorId);
    });
});

function switchActiveSensor(sensorId) {
    if (!BASIN_SENSORS[sensorId]) return;
    activeSensorId = sensorId;

    document.querySelectorAll('.sensor-chip').forEach(c => c.classList.remove('active'));
    const activeChip = document.querySelector(`.sensor-chip[data-sensor="${sensorId}"]`);
    if (activeChip) activeChip.classList.add('active');

    const s = BASIN_SENSORS[sensorId];
    hudNodeName.innerText = s.id;
    hudNodeLocation.innerText = `Location: ${s.location}`;
    hudWaterVal.innerText = `${s.water_level.toFixed(2)} m`;
    
    statWater.innerText = `${s.water_level.toFixed(2)} m`;
    statFlow.innerText = `${s.flow_rate.toFixed(1)} m³/s`;
    statRain.innerText = `${s.rainfall.toFixed(1)} mm/h`;
    statBattery.innerText = `${s.battery.toFixed(1)} %`;

    map.panTo(s.coords);
    logMessage(`Switched monitoring focus to basin node: ${s.name}`, 'info');
}

// WebSockets Manager
function initWebSocket() {
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host || 'localhost:8000';
    const wsUrl = `${wsProtocol}//${host}/ws/ndrf-control`;

    logMessage(`Connecting WebSocket pipeline to ${wsUrl}...`, 'info');

    try {
        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            logMessage('WebSocket connected! Live NDRF telemetry pipeline active.', 'success');
            wsStatus.innerHTML = '● WS Live';
            wsStatus.style.color = 'var(--accent-green)';
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                handleServerMessage(data);
            } catch (err) {}
        };

        ws.onerror = () => {
            logMessage('WebSocket offline: Auto-simulation backup mode engaged.', 'warning');
            wsStatus.innerHTML = '● WS Offline (Auto-Sim)';
            wsStatus.style.color = 'var(--accent-amber)';
        };

        ws.onclose = () => {
            wsStatus.innerHTML = '● WS Disconnected';
            wsStatus.style.color = 'var(--accent-red)';
            setTimeout(initWebSocket, 5000);
        };
    } catch (e) {}
}

function handleServerMessage(data) {
    if (data.type === 'TELEMETRY_UPDATE') {
        const s = data.sensor;
        if (BASIN_SENSORS[s.sensor_id]) {
            BASIN_SENSORS[s.sensor_id].water_level = s.water_level_meters;
            BASIN_SENSORS[s.sensor_id].flow_rate = s.flow_rate_m3s || 490.0;
            BASIN_SENSORS[s.sensor_id].rainfall = s.rainfall_rate_mmhr || 34.2;
        }
        updateTelemetryDisplay(s.sensor_id, s.water_level_meters, data.latency_ms);
    } else if (data.type === 'CRITICAL_FLOOD_ALERT') {
        triggerCriticalBreach(data.sensor_id, data.water_level, data.lat, data.lng, data.latency_ms);
    } else if (data.type === 'CITIZEN_SOS_ALERT') {
        plotCitizenSOS(data.sos);
    } else if (data.type === 'RESCUE_DISPATCHED') {
        plotRescueDispatch(data.dispatch);
    }
}

function updateTelemetryDisplay(sensorId, waterLvl, latency) {
    const s = BASIN_SENSORS[sensorId];
    if (sensorId === activeSensorId) {
        hudWaterVal.innerText = `${waterLvl.toFixed(2)} m`;
        statWater.innerText = `${waterLvl.toFixed(2)} m`;
        statFlow.innerText = `${s.flow_rate.toFixed(1)} m³/s`;
        statRain.innerText = `${s.rainfall.toFixed(1)} mm/h`;
        statBattery.innerText = `${s.battery.toFixed(1)} %`;
        
        telemetryHistory.push(waterLvl);
        if (telemetryHistory.length > 25) telemetryHistory.shift();
        drawChart();
    }

    // Update Chip display
    const chipLvl = document.getElementById(`chip-lvl-${sensorId.split('_')[0].toLowerCase()}`);
    if (chipLvl) chipLvl.innerText = `${waterLvl.toFixed(2)} m`;

    if (latency) latencyVal.innerText = `${(latency / 1000).toFixed(2)}s`;
    telemetryTimestamp.innerText = new Date().toLocaleTimeString();

    if (waterLvl >= s.threshold && !isBreached) {
        triggerCriticalBreach(sensorId, waterLvl, s.coords[0], s.coords[1], 95);
    }
}

function triggerCriticalBreach(sensorId, level, lat, lng, latencyMs = 95) {
    isBreached = true;
    
    alertBanner.style.display = 'block';
    alertBanner.innerHTML = `🚨 CRITICAL FLOOD ALARM: Basin Sensor ${sensorId} breached limit (${level.toFixed(2)}m >= ${BASIN_SENSORS[sensorId].threshold}m)! Sub-Second Latency: ${(latencyMs/1000).toFixed(3)}s`;

    statusBadge.className = 'nav-badge danger';
    systemStatusText.innerText = 'DANGER: BREACHED';
    statWater.style.color = 'var(--accent-red)';

    const chip = document.querySelector(`.sensor-chip[data-sensor="${sensorId}"]`);
    if (chip) chip.classList.add('danger');

    if (!dangerCircleMap) {
        dangerCircleMap = L.circle([lat, lng], {
            color: '#ff3366',
            fillColor: '#ff3366',
            fillOpacity: 0.35,
            radius: 4200
        }).addTo(map);
    }

    map.panTo([lat, lng]);

    playEmergencySiren();
    speakVoiceWarning(`Critical flood warning issued for ${BASIN_SENSORS[sensorId].name}. Evacuate immediately.`);

    logMessage(`CRITICAL ALERT: River level reached ${level.toFixed(2)}m at ${sensorId}. Cell broadcast simulated!`, 'danger');
}

function clearCriticalBreach() {
    isBreached = false;
    alertBanner.style.display = 'none';
    statusBadge.className = 'nav-badge';
    systemStatusText.innerText = 'SYSTEM OPERATIONAL';
    statWater.style.color = 'var(--accent-cyan)';

    document.querySelectorAll('.sensor-chip').forEach(c => c.classList.remove('danger'));

    if (dangerCircleMap) {
        map.removeLayer(dangerCircleMap);
        dangerCircleMap = null;
    }

    logMessage('All river basin levels normalized below critical thresholds.', 'success');
}

function plotCitizenSOS(sos) {
    const sosIcon = L.divIcon({
        className: 'sos-marker',
        html: `<div style="width:28px; height:28px; background:var(--accent-amber); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px; box-shadow:0 0 12px var(--accent-amber);">🆘</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
    });

    const marker = L.marker([sos.latitude, sos.longitude], { icon: sosIcon }).addTo(map);
    marker.bindPopup(`
        <div style="padding:4px;">
            <strong style="color:var(--accent-amber);">CITIZEN SOS (${sos.sos_id})</strong><br>
            Family: <b>${sos.family_count} persons</b><br>
            Medical: <b style="color:${sos.medical_urgency ? 'var(--accent-red)' : '#fff'}">${sos.medical_urgency ? 'URGENT' : 'Standard'}</b><br>
            Relay: <b>${sos.mesh_protocol || 'BLE Mesh (2 Hops)'}</b>
        </div>
    `).openPopup();

    sosMarkersList.push(marker);
    logMessage(`Citizen SOS received via BLE Mesh (${sos.family_count} persons at [${sos.latitude}, ${sos.longitude}])`, 'danger');
}

function plotRescueDispatch(dispatch) {
    const rescueIcon = L.divIcon({
        className: 'rescue-marker',
        html: `<div style="width:32px; height:32px; background:var(--accent-green); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:16px; box-shadow:0 0 14px var(--accent-green); color:#000; font-weight:bold;">🚤</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });

    const marker = L.marker([dispatch.target_lat, dispatch.target_lng], { icon: rescueIcon }).addTo(map);
    marker.bindPopup(`
        <div style="padding:4px;">
            <strong style="color:var(--accent-green);">${dispatch.unit_name} (${dispatch.unit_type})</strong><br>
            Status: <b>EN ROUTE TO BREACH ZONE</b>
        </div>
    `).openPopup();

    rescueMarkersList.push(marker);
    logMessage(`NDRF Rescue Speedboat ${dispatch.unit_name} dispatched to flood sector.`, 'success');
}

// Log Stream Helper
function logMessage(text, type = 'info') {
    const timeStr = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.className = `log-item ${type}`;
    entry.innerHTML = `[${timeStr}] ${text}`;
    logStream.prepend(entry);
    
    while (logStream.children.length > 35) {
        logStream.removeChild(logStream.lastChild);
    }
}

// Render Water Level Trend Canvas Chart
function drawChart() {
    const canvas = document.getElementById('chart-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let y = 15; y < h; y += 22) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
    }

    // Critical Threshold Line (15m)
    const thresholdY = h - ((15.0 - 8.0) / (18.0 - 8.0)) * h;
    ctx.strokeStyle = 'rgba(255, 51, 102, 0.6)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, thresholdY);
    ctx.lineTo(w, thresholdY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Trend Line
    if (telemetryHistory.length < 2) return;
    ctx.beginPath();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = isBreached ? '#ff3366' : '#00f2fe';

    const step = w / (telemetryHistory.length - 1);
    telemetryHistory.forEach((val, i) => {
        const x = i * step;
        const y = h - ((val - 8.0) / (18.0 - 8.0)) * h;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });

    ctx.stroke();
}

// Render Sensor Fleet Data Table (View 2)
function renderSensorTable() {
    const tbody = document.getElementById('sensor-table-body');
    if (!tbody) return;

    tbody.innerHTML = Object.values(BASIN_SENSORS).map(s => `
        <tr>
            <td><strong>${s.id}</strong></td>
            <td>${s.name}</td>
            <td>(${s.coords[0].toFixed(4)}, ${s.coords[1].toFixed(4)})</td>
            <td style="color:${s.water_level >= s.threshold ? 'var(--accent-red)' : 'var(--accent-cyan)'}; font-weight:bold;">${s.water_level.toFixed(2)} m</td>
            <td>${s.threshold.toFixed(2)} m</td>
            <td>${s.flow_rate.toFixed(1)} m³/s</td>
            <td>${s.rainfall.toFixed(1)} mm/h</td>
            <td>${s.battery.toFixed(1)} %</td>
            <td>
                <span class="status-tag ${s.water_level >= s.threshold ? 'danger' : s.status === 'WARNING' ? 'warning' : 'normal'}">
                    ${s.water_level >= s.threshold ? 'BREACHED' : s.status}
                </span>
            </td>
        </tr>
    `).join('');
}

// Render Rescue Squads & Evacuation Camps (View 4)
function renderRescueManager() {
    const container = document.getElementById('shelters-container');
    if (!container) return;

    container.innerHTML = RELIEF_CAMPS.map(c => {
        const pct = Math.round((c.occupied / c.capacity) * 100);
        return `
            <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:10px; padding:14px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <strong style="font-size:0.9rem;">${c.name}</strong>
                    <span style="font-size:0.75rem; color:${pct > 80 ? 'var(--accent-amber)' : 'var(--accent-green)'};">${c.occupied}/${c.capacity} (${pct}%)</span>
                </div>
                <div style="height:8px; background:rgba(255,255,255,0.1); border-radius:4px; overflow:hidden;">
                    <div style="width:${pct}%; height:100%; background:${pct > 80 ? 'var(--accent-amber)' : 'var(--accent-green)'};"></div>
                </div>
                <div style="font-size:0.72rem; color:var(--text-muted); margin-top:6px;">Medical Stock: ${c.medical}</div>
            </div>
        `;
    }).join('');
}

// Draw BLE Mesh Canvas Diagram (View 3)
function drawMeshTopology() {
    const canvas = document.getElementById('mesh-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Nodes
    const nodes = [
        { id: "Citizen A", x: 100, y: 240, type: "citizen" },
        { id: "Relay Node 1", x: 260, y: 140, type: "relay" },
        { id: "Relay Node 2", x: 260, y: 340, type: "relay" },
        { id: "Drone Gateway", x: 440, y: 240, type: "drone" },
        { id: "NDRF Command", x: 600, y: 240, type: "gateway" }
    ];

    // Connections
    const links = [
        [0, 1], [0, 2], [1, 3], [2, 3], [3, 4]
    ];

    ctx.lineWidth = 2;
    links.forEach(([i, j]) => {
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
    });

    // Draw Nodes
    nodes.forEach(n => {
        ctx.fillStyle = n.type === 'citizen' ? '#ffb703' : n.type === 'gateway' ? '#00f2fe' : '#a855f7';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(n.id, n.x, n.y + 32);
    });
}

// Export CSV Function
document.getElementById('btn-export-csv')?.addEventListener('click', () => {
    let csv = "Sensor ID,Name,Latitude,Longitude,Water Level (m),Threshold (m),Flow Rate (m3/s),Status\n";
    Object.values(BASIN_SENSORS).forEach(s => {
        csv += `${s.id},${s.name},${s.coords[0]},${s.coords[1]},${s.water_level},${s.threshold},${s.flow_rate},${s.status}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NDRF_Disaster_Telemetry_${Date.now()}.csv`;
    a.click();
    logMessage('Exported disaster telemetry matrix to CSV report.', 'success');
});

// Interactive Action Event Listeners
btnSimulateSurge.addEventListener('click', () => {
    logMessage('Simulating rapid monsoon river surge past 15.5m...', 'danger');
    let surgeStep = 0;
    const interval = setInterval(() => {
        BASIN_SENSORS[activeSensorId].water_level += 0.75;
        updateTelemetryDisplay(activeSensorId, BASIN_SENSORS[activeSensorId].water_level, 85);
        surgeStep++;
        if (BASIN_SENSORS[activeSensorId].water_level >= 16.5) {
            clearInterval(interval);
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ action: 'SIMULATE_RIVER_SURGE', sensor_id: activeSensorId }));
            }
        }
    }, 700);
});

btnBlePing.addEventListener('click', () => {
    const s = BASIN_SENSORS[activeSensorId];
    const sosData = {
        sos_id: `SOS-${Math.floor(1000 + Math.random() * 9000)}`,
        latitude: s.coords[0] - 0.008 + (Math.random() - 0.5) * 0.015,
        longitude: s.coords[1] + 0.006 + (Math.random() - 0.5) * 0.015,
        family_count: Math.floor(3 + Math.random() * 5),
        medical_urgency: Math.random() > 0.4,
        mesh_protocol: 'BLE_P2P_MESH (2 Hops)'
    };
    plotCitizenSOS(sosData);
});

btnDispatchBoat.addEventListener('click', () => {
    const s = BASIN_SENSORS[activeSensorId];
    const dispatchData = {
        unit_name: `NDRF-BOAT-0${Math.floor(1 + Math.random() * 8)}`,
        unit_type: 'RESCUE_SPEEDBOAT',
        target_lat: s.coords[0] + 0.004,
        target_lng: s.coords[1] - 0.005
    };
    plotRescueDispatch(dispatchData);
});

btnResetSystem.addEventListener('click', () => {
    Object.values(BASIN_SENSORS).forEach(s => s.water_level = s.threshold - 2.5);
    telemetryHistory = [11.8, 11.9, 12.0];
    clearCriticalBreach();
    
    sosMarkersList.forEach(m => map.removeLayer(m));
    rescueMarkersList.forEach(m => map.removeLayer(m));
    sosMarkersList = [];
    rescueMarkersList = [];
    
    updateTelemetryDisplay(activeSensorId, BASIN_SENSORS[activeSensorId].water_level, 90);
    logMessage('Telemetry reset to safe operational baseline.', 'info');
});

// Modal Dialog Handlers
btnBroadcastModal.addEventListener('click', () => broadcastModal.style.display = 'flex');
btnCloseModal.addEventListener('click', () => broadcastModal.style.display = 'none');
btnCancelModal.addEventListener('click', () => broadcastModal.style.display = 'none');

btnSendBroadcast.addEventListener('click', () => {
    const msg = document.getElementById('modal-msg').value;
    broadcastModal.style.display = 'none';
    playEmergencySiren();
    speakVoiceWarning("Cell Broadcast Emergency Warning Sent to all citizen devices.");
    logMessage(`MASS CELL BROADCAST SENT (< 1s): "${msg}"`, 'danger');
});

btnSirenToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    btnSirenToggle.innerText = soundEnabled ? '🔊 Siren: ON' : '🔇 Siren: OFF';
});

btnVoiceToggle.addEventListener('click', () => {
    voiceEnabled = !voiceEnabled;
    btnVoiceToggle.innerText = voiceEnabled ? '🗣️ Voice Alert: ON' : '🔇 Voice Alert: OFF';
});

// Initialization
window.addEventListener('DOMContentLoaded', () => {
    initWebSocket();
    initMapMarkers();
    drawChart();
    renderSensorTable();
    renderRescueManager();
});
