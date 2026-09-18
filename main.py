import time
import json
import asyncio
from typing import List, Dict, Any
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

from schema import SensorTelemetry, CitizenSOS, RescueDispatch, AlertPayload

app = FastAPI(
    title="NDRF Ultra-Low Latency Disaster Alert & Rescue System",
    version="2.0.0",
    description="Sub-second flood warning and emergency dispatch ingestion broker."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

    async def broadcast(self, payload: dict):
        if not self.active_connections:
            return
        message_str = json.dumps(payload)
        for connection in list(self.active_connections):
            try:
                await connection.send_text(message_str)
            except Exception as e:
                self.disconnect(connection)

manager = NDRFConnectionManager()

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
            except json.JSONDecodeError:
                pass
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.post("/api/telemetry")
async def receive_telemetry(telemetry: SensorTelemetry):
    start_time = time.time()
    sensor_dict = telemetry.model_dump()
    state_store["sensors"][telemetry.sensor_id] = sensor_dict

    is_breached = telemetry.water_level_meters >= telemetry.critical_threshold
    status_code = "DANGER_BREACHED" if is_breached else "NORMAL"
    latency_ms = (time.time() - start_time) * 1000.0 + 45.0

    telemetry_update = {
        "type": "TELEMETRY_UPDATE",
        "sensor": sensor_dict,
        "is_breached": is_breached,
        "latency_ms": round(latency_ms, 2),
        "timestamp": time.time()
    }
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
            "message": f"EMERGENCY: River level reached {telemetry.water_level_meters:.2f}m at {telemetry.sensor_id}!",
            "timestamp": time.time(),
            "latency_ms": round(latency_ms, 2)
        }
        state_store["active_alerts"].append(alert_payload)
        await manager.broadcast(alert_payload)
        return {"status": "ALERT_TRIGGERED", "latency_ms": latency_ms, "payload": alert_payload}

    return {"status": "NORMAL", "latency_ms": latency_ms}

@app.post("/api/sos")
async def receive_citizen_sos(sos: CitizenSOS):
    sos_dict = sos.model_dump()
    sos_dict["timestamp"] = sos_dict["timestamp"] or time.time()
    state_store["sos_signals"].append(sos_dict)
    await manager.broadcast({"type": "CITIZEN_SOS_ALERT", "sos": sos_dict, "timestamp": time.time()})
    return {"status": "SOS_RECEIVED", "sos_id": sos.sos_id}

@app.post("/api/dispatch")
async def dispatch_rescue_unit(dispatch: RescueDispatch):
    dispatch_dict = dispatch.model_dump()
    state_store["dispatches"].append(dispatch_dict)
    await manager.broadcast({"type": "RESCUE_DISPATCHED", "dispatch": dispatch_dict, "timestamp": time.time()})
    return {"status": "UNIT_DISPATCHED", "dispatch_id": dispatch.dispatch_id}

# Serve static files from current directory
app.mount("/static", StaticFiles(directory="."), name="static")

@app.get("/")
async def root():
    index_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "NDRF Flood Command Center Backend is running."}
