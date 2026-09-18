from pydantic import BaseModel, Field
from typing import Optional, List

class SensorTelemetry(BaseModel):
    sensor_id: str = Field(..., example="KOSI_RIVER_NODE_04")
    latitude: float = Field(..., example=25.5941)
    longitude: float = Field(..., example=85.1376)
    water_level_meters: float = Field(..., example=12.0)
    critical_threshold: float = Field(..., example=15.0)
    flow_rate_m3s: Optional[float] = Field(default=450.5)
    rainfall_rate_mmhr: Optional[float] = Field(default=35.2)
    battery_level_pct: Optional[float] = Field(default=98.5)
    signal_strength_dbm: Optional[int] = Field(default=-65)
    timestamp: float = Field(..., example=1700000000.0)

class CitizenSOS(BaseModel):
    sos_id: str = Field(..., example="SOS-8821")
    latitude: float = Field(..., example=25.5890)
    longitude: float = Field(..., example=85.1420)
    family_count: int = Field(..., example=4)
    medical_urgency: bool = Field(default=False)
    timestamp: Optional[float] = Field(default=None)
    relay_hops: Optional[int] = Field(default=0)
    battery_pct: Optional[int] = Field(default=85)
    mesh_protocol: Optional[str] = Field(default="BLE_P2P_MESH")

class RescueDispatch(BaseModel):
    dispatch_id: str
    unit_name: str
    unit_type: str  # BOAT, DRONE, HELICOPTER, GROUND_SQUAD
    target_lat: float
    target_lng: float
    assigned_sos_id: Optional[str] = None
    status: str = "DISPATCHED"  # DISPATCHED, EN_ROUTE, ON_SCENE, COMPLETED
    timestamp: float

class AlertPayload(BaseModel):
    type: str = "CRITICAL_FLOOD_ALERT"
    sensor_id: str
    lat: float
    lng: float
    water_level: float
    critical_threshold: float
    status: str = "DANGER_BREACHED"
    message: str
    timestamp: float
    latency_ms: float = 120.0
