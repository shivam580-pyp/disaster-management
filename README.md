# Automated Ultra-Low Latency Disaster Alert & Rescue System

An end-to-end early warning and emergency response system designed to reduce alert latency to **under 5 seconds** (achieving sub-second ~0.12s WebSocket broadcast). Integrates real-time IoT river water level sensors, an NDRF Control Room Command Portal, Cell Broadcast simulation, and an offline Bluetooth Low Energy (BLE) Mesh P2P fallback network for citizens when cellular towers fail.

---

## 📁 Flat Project Folder Structure (`New folder/`)

All files are located directly inside `c:\Users\HP\Desktop\New folder\`:

- `index.html` - Enterprise NDRF Command Center Dashboard
- `styles.css` - Glassmorphism Emergency Cybernetic Theme
- `app.js` - Leaflet GIS map, WebSockets client, Web Audio siren, Canvas charts & Voice Speech generator
- `server.js` - Node.js Express & WebSocket Ingestion Server
- `main.py` - FastAPI Backend Ingestion Engine
- `schema.py` - Pydantic Data Models
- `mqtt_subscriber.py` - MQTT Topic Listener
- `water_level_sensor.py` - IoT River Sensor Emulator Node
- `ble_mesh_sos.py` - Offline BLE Mesh P2P Payload Compression & Relay Emulator
- `package.json` - Node.js Manifest
- `requirements.txt` - Python Manifest
- `README.md` - Setup & User Manual

---

## 🚀 How to Run

### Option A: Node.js (Recommended)
```powershell
npm start
```
Open **[http://localhost:8000](http://localhost:8000)** in your web browser.

### Option B: Python (FastAPI + Uvicorn)
```powershell
uvicorn main:app --reload --port 8000
```
Open **[http://localhost:8000](http://localhost:8000)** in your web browser.

---

## ⚡ Running Emulators

1. **IoT Water Level Sensor Emulator**:
   ```powershell
   python water_level_sensor.py
   ```
2. **BLE Mesh Offline SOS Relay Emulator**:
   ```powershell
   python ble_mesh_sos.py
   ```
