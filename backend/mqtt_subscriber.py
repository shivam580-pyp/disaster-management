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
    print(f"[MQTT Subscriber] Subscribed to topic: '{MQTT_TOPIC_TELEMETRY}'")

def on_message(client, userdata, msg):
    try:
        payload_str = msg.payload.decode('utf-8')
        print(f"[MQTT Subscriber] Message received on topic {msg.topic}: {payload_str}")
        telemetry_data = json.loads(payload_str)
        
        # Post to FastAPI ingestion endpoint
        response = requests.post(API_INGEST_URL, json=telemetry_data, timeout=2.0)
        print(f"[MQTT -> REST] Sub-second ingest status: {response.status_code} {response.json()}")
    except Exception as e:
        print(f"[MQTT Subscriber] Error processing MQTT payload: {e}")

def start_mqtt_listener():
    try:
        import paho.mqtt.client as mqtt
        client = mqtt.Client(client_id="NDRF_Backend_Subscriber")
        client.on_connect = on_connect
        client.on_message = on_message
        
        print(f"[MQTT Subscriber] Connecting to broker at {MQTT_BROKER_HOST}...")
        client.connect(MQTT_BROKER_HOST, MQTT_BROKER_PORT, 60)
        client.loop_forever()
    except ImportError:
        print("[MQTT Subscriber] 'paho-mqtt' library not installed. Install via `pip install paho-mqtt` to enable native MQTT broker listener.")
    except Exception as e:
        print(f"[MQTT Subscriber] Could not connect to MQTT broker: {e}. Defaulting to HTTP Ingestion fallback.")

if __name__ == "__main__":
    start_mqtt_listener()
