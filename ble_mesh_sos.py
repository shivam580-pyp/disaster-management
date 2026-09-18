import struct
import time
import random
import json
import requests

API_URL = "http://localhost:8000/api/sos"

class BLEMeshNode:
    def __init__(self, node_id: str, lat: float, lng: float):
        self.node_id = node_id
        self.latitude = lat
        self.longitude = lng

    def pack_sos_payload(self, family_count: int, medical_urgency: bool) -> bytes:
        node_num = int(self.node_id.replace("CITIZEN_", "")) if "CITIZEN_" in self.node_id else random.randint(1000, 9999)
        flags = (1 if medical_urgency else 0) | (1 << 1)
        time_offset = int((time.time() % 65536) / 60)
        return struct.pack("!IffBBH", node_num, self.latitude, self.longitude, family_count, flags, time_offset)

    @staticmethod
    def unpack_sos_payload(packed_bytes: bytes) -> dict:
        node_num, lat, lng, family_count, flags, time_offset = struct.unpack("!IffBBH", packed_bytes)
        return {
            "sos_id": f"SOS-BLE-{node_num}",
            "latitude": round(lat, 5),
            "longitude": round(lng, 5),
            "family_count": family_count,
            "medical_urgency": bool(flags & 0x01),
            "relay_hops": (flags >> 1) & 0x7F,
            "mesh_protocol": "BLE_P2P_MESH_COMPRESSED"
        }

def simulate_ble_mesh_network():
    print("=========================================================")
    print("  NDRF OFFLINE CITIZEN BLE MESH RELAY EMULATOR         ")
    print("=========================================================")
    node = BLEMeshNode("CITIZEN_4082", 25.5910, 85.1405)
    binary_frame = node.pack_sos_payload(5, True)
    print(f"Compressed Payload Size: {len(binary_frame)} bytes")
    unpacked_data = BLEMeshNode.unpack_sos_payload(binary_frame)
    print(json.dumps(unpacked_data, indent=2))
    try:
        res = requests.post(API_URL, json=unpacked_data, timeout=3.0)
        print(f"Backend Ingest Response: {res.status_code} {res.json()}")
    except Exception as e:
        print(f"Ingest Notice: {e}")

if __name__ == "__main__":
    simulate_ble_mesh_network()
