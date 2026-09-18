import time
import json
import asyncio
from typing import List, Dict, Any
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

from backend.schema import SensorTelemetry, CitizenSOS, RescueDispatch, AlertPayload

app = FastAPI(
    title="NDRF Ultra-Low Latency Disaster Alert & Rescue System",
    version="2.0.0",
    description="Sub-second flood warning and emergency dispatch ingestion broker."
)

# CORS middleware for cross-origin WebSockets and API access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Active WebSocket connections manager
class NDRFConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        print(f"[WebSocket] NDRF Control Room client connected. Total clients: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            print(f"[WebSocket] Client disconnected. Total remaining: {len(self.active_connections)}")

    async def broadcast(self, payload: dict):
        if not self.active_connections:
            return
        message_str = json.dumps(payload)
        for connection in list(self.active_connections):
            try:
                await connection.send_text(message_str)
            except Exception as e:
                print(f"[WebSocket] Error broadcasting to client: {e}")
                self.disconnect(connection)

manager = NDRFConnectionManager()

# State storage for live telemetry, alerts, and dispatches
state_store: Dict[str, Any] = {
    "sensors": {},
    "active_alerts": [],
    "sos_signals": [],
    "dispatches": []
}

@app.get("/api/health")
async def health_check():
    return {
        "status": "OPERATIONAL",
        "system": "NDRF Early Warning Engine",
        "active_ws_clients": len(manager.active_connections),
        "timestamp": time.time()
    }

@app.websocket("/ws/ndrf-control")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    
    # Send initial state synchronization payload to newly connected client
    init_payload = {
        "type": "INITIAL_STATE_SYNC",
        "sensors": list(state_store["sensors"].values()),
        "alerts": state_store["active_alerts"],
        "sos_signals": state_store["sos_signals"],
        "dispatches": state_store["dispatches"],
        "timestamp": time.time()
    }
    await websocket.send_text(json.dumps(init_payload))

    try:
        while True:
            data_text = await websocket.receive_text()
            try:
                command = json.loads(data_text)
                if command.get("action") == "PING":
                    await websocket.send_text(json.dumps({"type": "PONG", "timestamp": time.time()}))
                elif command.get("action") == "SIMULATE_RIVER_SURGE":
                    # Trigger simulated river level rise across all active nodes
                    asyncio.create_task(run_simulated_surge(command.get("sensor_id", "KOSI_RIVER_NODE_04")))
            except json.JSONDecodeError:
                pass
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.post("/api/telemetry")
async def receive_telemetry(telemetry: SensorTelemetry):
    start_time = time.time()
    
    # Update local state store
    sensor_dict = telemetry.model_dump()
    state_store["sensors"][telemetry.sensor_id] = sensor_dict

    # Check for critical threshold breach
    is_breached = telemetry.water_level_meters >= telemetry.critical_threshold
    status_code = "DANGER_BREACHED" if is_breached else "NORMAL"
    
    latency_ms = (time.time() - start_time) * 1000.0 + 45.0 # Simulated sub-second network overhead

    telemetry_update = {
        "type": "TELEMETRY_UPDATE",
        "sensor": sensor_dict,
        "is_breached": is_breached,
        "latency_ms": round(latency_ms, 2),
        "timestamp": time.time()
    }
    
    # Broadcast telemetry stream to dashboard
    await manager.broadcast(telemetry_update)

    if is_breached:
        alert_payload = {
            "type": "CRITICAL_FLOOD_ALERT",
            "sensor_id": telemetry.sensor_id,
            "lat": telemetry.latitude,
            "lng": telemetry.longitude,
            "water_level": round(telemetry.water_level_meters, 2),
            "critical_threshold": telemetry.critical_threshold,
            "status": status_code,
            "message": f"EMERGENCY: River level reached {telemetry.water_level_meters:.2f}m (Limit: {telemetry.critical_threshold}m) at {telemetry.sensor_id}!",
            "timestamp": time.time(),
            "latency_ms": round(latency_ms, 2)
        }
        
        # Save to active alerts list
        state_store["active_alerts"].append(alert_payload)
        
        # Broadcast sub-second alert to NDRF Command Dashboard
        await manager.broadcast(alert_payload)
        return {"status": "ALERT_TRIGGERED", "latency_ms": latency_ms, "payload": alert_payload}

    return {"status": "NORMAL", "latency_ms": latency_ms}

@app.post("/api/sos")
async def receive_citizen_sos(sos: CitizenSOS):
    sos_dict = sos.model_dump()
    sos_dict["timestamp"] = sos_dict["timestamp"] or time.time()
    
    state_store["sos_signals"].append(sos_dict)
    
    broadcast_payload = {
        "type": "CITIZEN_SOS_ALERT",
        "sos": sos_dict,
        "timestamp": time.time()
    }
    await manager.broadcast(broadcast_payload)
    return {"status": "SOS_RECEIVED", "sos_id": sos.sos_id}

@app.post("/api/dispatch")
async def dispatch_rescue_unit(dispatch: RescueDispatch):
    dispatch_dict = dispatch.model_dump()
    state_store["dispatches"].append(dispatch_dict)
    
    broadcast_payload = {
        "type": "RESCUE_DISPATCHED",
        "dispatch": dispatch_dict,
        "timestamp": time.time()
    }
    await manager.broadcast(broadcast_payload)
    return {"status": "UNIT_DISPATCHED", "dispatch_id": dispatch.dispatch_id}

async def run_simulated_surge(sensor_id: str):
    """Simulates rapid river surge over time for demo purposes."""
    current_level = 11.5
    threshold = 15.0
    for i in range(10):
        current_level += 0.55
        telemetry = SensorTelemetry(
            sensor_id=sensor_id,
            latitude=25.5941,
            longitude=85.1376,
            water_level_meters=round(current_level, 2),
            critical_threshold=threshold,
            flow_rate_m3s=520.0 + i * 40.0,
            rainfall_rate_mmhr=45.0 + i * 5.0,
            battery_level_pct=99.0,
            signal_strength_dbm=-62,
            timestamp=time.time()
        )
        await receive_telemetry(telemetry)
        await asyncio.sleep(1.5)

# Mount static directory for ndrf_dashboard
dashboard_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "ndrf_dashboard")
if os.path.exists(dashboard_dir):
    app.mount("/dashboard", StaticFiles(directory=dashboard_dir, html=True), name="dashboard")

@app.get("/")
async def root():
    index_path = os.path.join(dashboard_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "NDRF Flood Command Center Backend is running. Access /docs for API documentation."}
