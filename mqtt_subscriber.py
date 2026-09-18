import json
import time
import requests
import os

MQTT_BROKER_HOST = os.getenv("MQTT_HOST", "localhost")
MQTT_BROKER_PORT = int(os.getenv("MQTT_PORT", 1883))
MQTT_TOPIC_TELEMETRY = "disaster/telemetry/#"
API_INGEST_URL = os.getenv("API_URL", "http://localhost:8000/api/telemetry")

def on_connect(client, userdata, flags, rc):
    print(f"[MQTT Subscriber] Connected to MQTT Broker at {MQTT_BROKER_HOST}:{MQTT_BROKER_PORT} (rc={rc})")
    client.subscribe(MQTT_TOPIC_TELEMETRY)

def on_message(client, userdata, msg):
    try:
        payload_str = msg.payload.decode('utf-8')
        telemetry_data = json.loads(payload_str)
        response = requests.post(API_INGEST_URL, json=telemetry_data, timeout=2.0)
        print(f"[MQTT Ingest] Response: {response.status_code}")
    except Exception as e:
        print(f"[MQTT Error]: {e}")

def start_mqtt_listener():
    try:
        import paho.mqtt.client as mqtt
        client = mqtt.Client(client_id="NDRF_Backend_Subscriber")
        client.on_connect = on_connect
        client.on_message = on_message
        client.connect(MQTT_BROKER_HOST, MQTT_BROKER_PORT, 60)
        client.loop_forever()
    except ImportError:
        print("[MQTT] 'paho-mqtt' library not installed. Install via `pip install paho-mqtt`.")
    except Exception as e:
        print(f"[MQTT] Connection failed: {e}. Fallback to REST.")

if __name__ == "__main__":
    start_mqtt_listener()
