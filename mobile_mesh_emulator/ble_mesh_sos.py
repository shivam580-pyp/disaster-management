import struct
import time
import random
import json
import requests

API_URL = "http://localhost:8000/api/sos"

class BLEMeshNode:
    """Emulates a low-power Bluetooth Low Energy (BLE) Mesh citizen device."""
    
    def __init__(self, node_id: str, lat: float, lng: float):
        self.node_id = node_id
        self.latitude = lat
        self.longitude = lng

    def pack_sos_payload(self, family_count: int, medical_urgency: bool) -> bytes:
        """
        Compresses SOS emergency payload into 16-byte binary payload for ultra low bandwidth BLE mesh frames:
        - 4 bytes: Node ID Hash / Integer
        - 4 bytes: Float32 Latitude
        - 4 bytes: Float32 Longitude
        - 1 byte : Family count (0-255)
        - 1 byte : Flags (Bit 0: Medical Urgency, Bits 1-7: Hop Count)
        - 2 bytes: Timestamp (Minutes past epoch offset)
        """
        node_num = int(self.node_id.replace("NODE_", "").replace("CITIZEN_", "")) if self.node_id.replace("NODE_", "").replace("CITIZEN_", "").isdigit() else random.randint(1000, 9999)
        flags = (1 if medical_urgency else 0) | (1 << 1) # hop count = 1
        time_offset = int((time.time() % 65536) / 60)
        
        packed_bytes = struct.pack("!IffBBH", node_num, self.latitude, self.longitude, family_count, flags, time_offset)
        return packed_bytes

    @staticmethod
    def unpack_sos_payload(packed_bytes: bytes) -> dict:
        node_num, lat, lng, family_count, flags, time_offset = struct.unpack("!IffBBH", packed_bytes)
        medical_urgency = bool(flags & 0x01)
        hop_count = (flags >> 1) & 0x7F
        
        return {
            "sos_id": f"SOS-BLE-{node_num}",
            "latitude": round(lat, 5),
            "longitude": round(lng, 5),
            "family_count": family_count,
            "medical_urgency": medical_urgency,
            "relay_hops": hop_count,
            "mesh_protocol": "BLE_P2P_MESH_COMPRESSED"
        }

def simulate_ble_mesh_network():
    print("=========================================================")
    print("  NDRF OFFLINE CITIZEN BLE MESH RELAY EMULATOR         ")
    print("  Emulating peer-to-peer disaster SOS routing          ")
    print("=========================================================")

    # Scenario: Cell towers are down. Citizen 1 is stranded in flooded zone.
    # Citizen 1 -> Citizen 2 -> Rescue Mesh Gateway -> Cloud API
    citizen_stranded = BLEMeshNode("CITIZEN_4082", 25.5910, 85.1405)
    relay_node_1 = BLEMeshNode("RELAY_NODE_77", 25.5925, 85.1390)
    gateway_node = BLEMeshNode("NDRF_GATEWAY_01", 25.5940, 85.1380)

    family_count = 5
    medical_urgency = True

    print(f"\n[Step 1] Citizen 4082 creates SOS Alert:")
    print(f"  ├─ Location: ({citizen_stranded.latitude}, {citizen_stranded.longitude})")
    print(f"  ├─ Family Size: {family_count} members")
    print(f"  └─ Medical Need: {'YES - CRITICAL' if medical_urgency else 'No'}")

    # Pack payload
    binary_frame = citizen_stranded.pack_sos_payload(family_count, medical_urgency)
    print(f"\n[Step 2] Binary Compression:")
    print(f"  ├─ Raw Payload Size: {len(binary_frame)} bytes (Fits in single BLE Advertising PDU!)")
    print(f"  └─ Hex Stream: {binary_frame.hex().upper()}")

    # Multi-hop mesh relay simulation
    print(f"\n[Step 3] Multi-Hop Mesh Propagation:")
    print(f"  ├─ Hop 1: Citizen 4082 --(BLE 2.4GHz)--> Relay Node 77 (RSSI: -72 dBm)")
    time.sleep(0.8)
    print(f"  ├─ Hop 2: Relay Node 77 --(BLE 2.4GHz)--> NDRF Gateway 01 (RSSI: -64 dBm)")
    time.sleep(0.8)
    print(f"  └─ Hop 3: Gateway connected to satellite internet, unpacking payload...")

    unpacked_data = BLEMeshNode.unpack_sos_payload(binary_frame)
    print(f"\n[Step 4] Unpacked Gateway SOS Data:")
    print(json.dumps(unpacked_data, indent=2))

    # Post to backend
    print(f"\n[Step 5] Relaying SOS to NDRF Command Dashboard:")
    try:
        res = requests.post(API_URL, json=unpacked_data, timeout=3.0)
        print(f"  └─► Backend Ingest Response: {res.status_code} {res.json()}")
    except Exception as e:
        print(f"  └─► [Notice] Backend ingest simulated (Server offline or starting: {e})")

    print("\n=========================================================")
    print("  BLE Mesh SOS Simulation Finished Successfully!       ")
    print("=========================================================")

if __name__ == "__main__":
    simulate_ble_mesh_network()
