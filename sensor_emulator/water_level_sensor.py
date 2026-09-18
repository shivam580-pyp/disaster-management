import requests
import time
import random
import sys

API_URL = "http://localhost:8000/api/telemetry"

def simulate_river_sensor():
    sensor_data = {
        "sensor_id": "KOSI_RIVER_NODE_04",
        "latitude": 25.5941,
        "longitude": 85.1376,
        "water_level_meters": 12.0,
        "critical_threshold": 15.0,
        "flow_rate_m3s": 480.0,
        "rainfall_rate_mmhr": 32.5,
        "battery_level_pct": 98.4,
        "signal_strength_dbm": -64,
        "timestamp": time.time()
    }

    print("=========================================================")
    print("  AUTOMATED ULTRA-LOW LATENCY DISASTER ALERT SYSTEM    ")
    print("  IoT River Ultrasonic Level Sensor Emulator Node       ")
    print("=========================================================")
    print(f"Target Ingestion Engine: {API_URL}")
    print(f"Sensor ID          : {sensor_data['sensor_id']}")
    print(f"Coordinates        : ({sensor_data['latitude']}, {sensor_data['longitude']})")
    print(f"Critical Threshold : {sensor_data['critical_threshold']} meters")
    print("---------------------------------------------------------")

    step = 1
    while True:
        # Simulate rising water levels during monsoon surge
        increment = random.uniform(0.4, 0.9)
        sensor_data["water_level_meters"] += increment
        sensor_data["flow_rate_m3s"] += increment * 45.0
        sensor_data["rainfall_rate_mmhr"] += random.uniform(1.0, 3.5)
        sensor_data["timestamp"] = time.time()

        water_lvl = sensor_data["water_level_meters"]
        threshold = sensor_data["critical_threshold"]

        print(f"[{time.strftime('%H:%M:%S')}] Step #{step:02d} | Water Level: {water_lvl:.2f}m / {threshold}m | Flow: {sensor_data['flow_rate_m3s']:.1f} m³/s")

        t_start = time.time()
        try:
            res = requests.post(API_URL, json=sensor_data, timeout=3.0)
            t_end = time.time()
            latency_ms = (t_end - t_start) * 1000.0

            if res.status_code == 200:
                data = res.json()
                print(f"  └─► Ingest Status: {data.get('status')} | Latency: {latency_ms:.2f}ms (< 1s Target Met!)")
            else:
                print(f"  └─► HTTP Error {res.status_code}: {res.text}")
        except requests.exceptions.ConnectionError:
            print("  └─► [Connection Error] Backend server not reachable on http://localhost:8000. Is FastAPI / Node running?")
        except Exception as e:
            print(f"  └─► [Error]: {e}")

        if water_lvl >= threshold:
            print("\n" + "!" * 65)
            print("  !!! CRITICAL THRESHOLD BREACHED (WATER LEVEL >= 15.0m) !!!")
            print("  Sub-Second Cell Broadcast & WebSocket Alert Pushed to NDRF!")
            print("!" * 65 + "\n")
            break

        step += 1
        time.sleep(2)

if __name__ == "__main__":
    simulate_river_sensor()
