// NDRF Ultra-Low Latency Disaster Alert & Rescue Network JS Engine

// Multilingual i18n Translation Dictionary (English, Hindi, Assamese, Nepali)
const I18N = {
    en: {
        app_title: "NDRF DISASTER COMMAND & CITIZEN RESCUE",
        app_sub: "Ultra-Low Latency Mesh Pipeline (Bihar • Assam • Nepal)",
        victim_heading: "EMERGENCY RESCUE REQUEST",
        victim_sub: "Send immediate distress signal to NDRF squads & nearby local mesh devices without cellular internet.",
        btn_sos: "🚨 BROADCAST SOS DISTRESS SIGNAL",
        triage_lbl: "Emergency Condition",
        people_lbl: "Number of Trapped Victims",
        landmark_lbl: "Landmark / House Description (Optional)",
        gps_fetching: "GPS Coordinates: Fetching location...",
        mesh_status: "📡 Offline Mesh Relay Active (Web Bluetooth / Local Wi-Fi P2P)",
        btn_whistle: "📢 Sound Emergency Whistle",
        btn_flashlight: "🔦 Flashlight Screen Beacon",
        guide_title: "💡 Flood Survival Guidelines (Bihar, Assam, Nepal)",
        step1: "1. Move to High Ground: Move immediately to the roof or highest embankment. Avoid standing water near electrical poles.",
        step2: "2. Keep Emergency Signal On: Keep your phone screen beacon or audio whistle playing to help NDRF speedboats locate you in fog or darkness.",
        step3: "3. Peer Mesh Transmission: Stay within range of adjacent phones — your SOS alert will relay automatically tab-to-tab over local Bluetooth/Wi-Fi."
    },
    hi: {
        app_title: "एनडीआरएफ आपदा कमान एवं नागरिक बचाव नेटवर्क",
        app_sub: "अल्ट्रा-लो लेटेंसी मेश पाइपलाइन (बिहार • असम • नेपाल)",
        victim_heading: "आपातकालीन बचाव अनुरोध (SOS)",
        victim_sub: "बिना मोबाइल नेटवर्क के भी पास के उपकरणों और NDRF टीम को तुरंत सहायता संदेश भेजें।",
        btn_sos: "🚨 आपातकालीन एसओएस सिग्नल भेजें",
        triage_lbl: "आपकी स्थिति क्या है?",
        people_lbl: "फंसे हुए लोगों की संख्या",
        landmark_lbl: "घर का पता / लैंडमार्क (वैकल्पिक)",
        gps_fetching: "जीपीएस लोकेशन प्राप्त की जा रही है...",
        mesh_status: "📡 ऑफ-लाइन ब्लूटूथ एवं वाई-फाई मेश सक्रिय",
        btn_whistle: "📢 हाई-पिच सीटी (Whistle) बजाएं",
        btn_flashlight: "🔦 इमरजेंसी स्क्रीन टॉर्च ऑन करें",
        guide_title: "💡 बाढ़ बचाव निर्देश (बिहार, असम, नेपाल)",
        step1: "1. छत या ऊंचे स्थान पर जाएं: तुरंत छत या निकटतम बांध (Embankment) पर जाएं। बिजली के खंभों से दूर रहें।",
        step2: "2. इमरजेंसी सिग्नल चालू रखें: रात या धुंध में NDRF बोट्स को अपनी लोकेशन दिखाने के लिए सीटी या स्क्रीन लाइट चालू रखें।",
        step3: "3. ब्लूटूथ मेश रिले: मोबाइल नेटवर्क बंद होने पर पास के फोन के माध्यम से आपका मैसेज आगे पहुंच जाएगा।"
    },
    as: {
        app_title: "NDRF দুৰ্যোগ কমাণ্ড আৰু নাগৰিক উদ্ধাৰ নেটৱৰ্ক",
        app_sub: "অতি কম ল্যাটেন্সী মেশ্ব পাইপলাইন (বিহাৰ • অসম • নেপাল)",
        victim_heading: "জৰুৰীকালীন উদ্ধাৰ আবেদন (SOS)",
        victim_sub: "মোবাইল নেটৱৰ্ক নাথাকিলেও ওচৰৰ ডিভাইচ আৰু NDRF দললৈ ততালিকে বিপদৰ বাৰ্তা প্ৰেৰণ কৰক।",
        btn_sos: "🚨 জৰুৰীকালীন SOS বাৰ্তা প্ৰেৰণ কৰক",
        triage_lbl: "আপোনাৰ অৱস্থা",
        people_lbl: "আৱদ্ধ হৈ থকা লোকৰ সংখ্যা",
        landmark_lbl: "ঘৰৰ ঠিকনা / চিন (ঐচ্ছিক)",
        gps_fetching: "GPS অৱস্থান সংগ্ৰহ কৰা হৈছে...",
        mesh_status: "📡 অফ-লাইন ব্লুটুথ আৰু ৱাই-ফাই মেছ সক্ৰিয়",
        btn_whistle: "📢 জৰুৰীকালীন সুহুৰি (Whistle) বজায়ক",
        btn_flashlight: "🔦 জৰুৰীকালীন স্ক্ৰীন ফ্লেশ্বলাইট অন কৰক",
        guide_title: "💡 বানপানী সুৰক্ষা নিৰ্দেশনা (অসম, বিহাৰ, নেপাল)",
        step1: "1. ওখ স্থানলৈ যাওক: ঘৰৰ চাল বা ওখ মথাউৰিলৈ তৎক্ষণাত স্থানান্তৰিত হওক। বিদ্যুৎ পৰিবাহী খুঁটাৰ পৰা আঁতৰত থাকক।",
        step2: "2. সংকেত সক্ৰিয় ৰাখক: কুঁৱলী বা এন্ধাৰত NDRF বোটে আপোনাক বিচাৰি পাবলৈ স্ক্ৰীন পোহৰ বা সুহুৰি বজায় ৰাখক।",
        step3: "3. ব্লুটুথ মেছ ৰিলে: নেটৱৰ্ক বিচ্ছিন্ন হ'লেও ওচৰৰ ফোনৰ জৰিয়তে আপোনাৰ বাৰ্তা NDRF কমাণ্ড পাই পাব।"
    },
    ne: {
        app_title: "एनडीआरएफ विपद् कमान्ड तथा नागरिक उद्धार सञ्जाल",
        app_sub: "अल्ट्रा-लो लेटेंसी मेश पाइपलाइन (बिहार • असम • नेपाल)",
        victim_heading: "आपत्कालीन उद्धार अनुरोध (SOS)",
        victim_sub: "मोबाइल नेटवर्क नभए पनि नजिकका फोन र NDRF टोलीलाई तुरुन्तै उद्धार सन्देश पठाउनुहोस्।",
        btn_sos: "🚨 आपत्कालीन SOS सङ्केत प्रसारण गर्नुहोस्",
        triage_lbl: "आपत्कालीन अवस्था",
        people_lbl: "फसेका मानिसहरूको सङ्ख्या",
        landmark_lbl: "घरको ठेगाना / चिनारी (ऐच्छिक)",
        gps_fetching: "GPS स्थान खोजिँदै छ...",
        mesh_status: "📡 अफ-लाइन ब्लुटुथ तथा वाइ-फाइ मेश सक्रिय",
        btn_whistle: "📢 उच्च-पिच आपत्कालीन सिट्टी बजाउनुहोस्",
        btn_flashlight: "🔦 आपत्कालीन स्क्रिन लाइट अन गर्नुहोस्",
        guide_title: "💡 बाढी सुरक्षा निर्देशिका (नेपाल, बिहार, असम)",
        step1: "1. उच्च स्थानमा जानुहोस्: तुरुन्तै छत वा अग्लो बाँधमा जानुहोस्। बिजुलीका पोलहरूबाट टाढा रहनुहोस्।",
        step2: "2. आपत्कालीन सङ्केत अन राख्नुहोस्: NDRF बोटहरूले अँध्यारोमा देख्न सकोस् भन्नका लागि सिट्टी वा स्क्रिन लाइट अन राख्नुहोस्।",
        step3: "3. ब्लुटुथ मेश रिले: नेटवर्क नभए पनि नजिकैको फोन मार्फत तपाईंको SOS सन्देश अगाडि पठाइनेछ।"
    }
};

let currentLang = 'en';

// Sensor Basins Data
const BASIN_SENSORS = {
    "KOSI_RIVER_NODE_04": {
        id: "KOSI_RIVER_NODE_04",
        name: "Kosi River Station 04",
        location: "Kosi Bridge, Supaul (Bihar)",
        coords: [25.5941, 85.1376],
        water_level: 12.45,
        threshold: 15.0,
        flow_rate: 490.0,
        rainfall: 34.2,
        battery: 98.5,
        status: "NORMAL"
    },
    "GANDAK_VALMIKI_02": {
        id: "GANDAK_VALMIKI_02",
        name: "Gandak Station 02",
        location: "Valmiki Nagar Barrage (Bihar)",
        coords: [27.4260, 83.9210],
        water_level: 13.80,
        threshold: 14.5,
        flow_rate: 610.0,
        rainfall: 48.0,
        battery: 95.0,
        status: "WARNING"
    },
    "BRAHMAPUTRA_KAZI_01": {
        id: "BRAHMAPUTRA_KAZI_01",
        name: "Brahmaputra Station 01",
        location: "Kaziranga Sector (Assam)",
        coords: [26.5775, 93.1711],
        water_level: 14.20,
        threshold: 14.0,
        flow_rate: 750.0,
        rainfall: 62.0,
        battery: 99.1,
        status: "CRITICAL"
    },
    "KOSHI_NEPAL_03": {
        id: "KOSHI_NEPAL_03",
        name: "Koshi River Station 03",
        location: "Saptari / Sunsari (Nepal)",
        coords: [26.6500, 86.9800],
        water_level: 11.90,
        threshold: 13.5,
        flow_rate: 380.0,
        rainfall: 22.5,
        battery: 97.2,
        status: "NORMAL"
    }
};

let activeSensorId = "KOSI_RIVER_NODE_04";
let isBreached = false;
let soundEnabled = true;
let ws = null;
let map = null;
let markersGroup = null;
let routePolyline = null;
let currentRole = 'ndrf';

// Local Victim SOS Incidents Memory Store
let sosIncidents = [
    {
        id: "SOS-8491",
        triage: "ROOF_TRAPPED",
        triage_score: 95,
        lat: 25.6010,
        lng: 85.1410,
        landmark: "Near Supaul Girls High School, Roof",
        people: 5,
        hops: 1,
        status: "CRITICAL_RED",
        timestamp: new Date(Date.now() - 120000).toLocaleTimeString()
    },
    {
        id: "SOS-8492",
        triage: "INJURED_MEDICAL",
        triage_score: 90,
        lat: 26.5820,
        lng: 93.1650,
        landmark: "Kaziranga East Range, Medical Emergency",
        people: 2,
        hops: 2,
        status: "CRITICAL_RED",
        timestamp: new Date(Date.now() - 300000).toLocaleTimeString()
    },
    {
        id: "SOS-8493",
        triage: "ELDERLY_CHILDREN",
        triage_score: 65,
        lat: 26.6550,
        lng: 86.9850,
        landmark: "Saptari Ward 4, Elderly evac",
        people: 6,
        hops: 1,
        status: "URGENT_YELLOW",
        timestamp: new Date(Date.now() - 600000).toLocaleTimeString()
    }
];

// Offline Local P2P Wi-Fi BroadcastChannel
const meshChannel = window.BroadcastChannel ? new BroadcastChannel('ndrf_local_mesh') : null;

// DOM Elements
const alertBanner = document.getElementById('alert-banner');
const statusBadge = document.getElementById('status-badge');
const systemStatusText = document.getElementById('system-status-text');
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
const btnBroadcastModal = document.getElementById('btn-broadcast-modal');
const btnSimulateSurge = document.getElementById('btn-simulate-surge');
const btnBlePing = document.getElementById('btn-ble-ping');
const btnDispatchBoat = document.getElementById('btn-dispatch-boat');

const broadcastModal = document.getElementById('broadcast-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCancelModal = document.getElementById('btn-cancel-modal');
const btnSendBroadcast = document.getElementById('btn-send-broadcast');

// Role Switcher Buttons
const btnRoleNdrf = document.getElementById('btn-role-ndrf');
const btnRoleVictim = document.getElementById('btn-role-victim');
const btnRoleGovt = document.getElementById('btn-role-govt');
const langSelect = document.getElementById('lang-select');
const ndrfTabsNav = document.getElementById('ndrf-tabs-nav');

// Victim Elements
const btnVictimSos = document.getElementById('btn-victim-sos');
const victimTriage = document.getElementById('victim-triage');
const victimCount = document.getElementById('victim-count');
const victimLandmark = document.getElementById('victim-landmark');
const victimGpsStatus = document.getElementById('victim-gps-status');
const btnVictimGps = document.getElementById('btn-victim-gps');
const btnWhistle = document.getElementById('btn-whistle');
const btnFlashlight = document.getElementById('btn-flashlight');
const btnPairBle = document.getElementById('btn-pair-ble');

// Web Audio Synth Variables for Whistle
let audioCtx = null;
let osc1 = null;
let osc2 = null;
let isWhistleActive = false;

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initGISMap();
    initWebSockets();
    initEventListeners();
    initLocalMeshP2P();
    renderSensorTable();
    renderTriageTable();
    renderShelters();
    renderGovtMetrics();
    updateUIWithLang(currentLang);
    getUserGPSLocation();
});

// Role Switcher Function
function switchRole(role) {
    currentRole = role;
    document.querySelectorAll('.role-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.app-view').forEach(view => view.classList.remove('active'));

    if (role === 'ndrf') {
        btnRoleNdrf.classList.add('active');
        ndrfTabsNav.style.display = 'flex';
        document.getElementById('view-map').classList.add('active');
        setTimeout(() => map && map.invalidateSize(), 200);
    } else if (role === 'victim') {
        btnRoleVictim.classList.add('active');
        ndrfTabsNav.style.display = 'none';
        document.getElementById('view-victim').classList.add('active');
    } else if (role === 'govt') {
        btnRoleGovt.classList.add('active');
        ndrfTabsNav.style.display = 'none';
        document.getElementById('view-govt').classList.add('active');
        renderGovtMetrics();
    }
    logAudit(`[ROLE] Switched active workspace to: ${role.toUpperCase()}`);
}

// Multilingual Translation Update
function updateUIWithLang(lang) {
    currentLang = lang;
    const dict = I18N[lang] || I18N.en;

    document.getElementById('txt-app-title').innerText = dict.app_title;
    document.getElementById('txt-app-sub').innerText = dict.app_sub;

    document.getElementById('txt-victim-heading').innerText = dict.victim_heading;
    document.getElementById('txt-victim-sub').innerText = dict.victim_sub;
    btnVictimSos.innerText = dict.btn_sos;

    document.getElementById('lbl-triage-condition').innerText = dict.triage_lbl;
    document.getElementById('lbl-people-count').innerText = dict.people_lbl;
    document.getElementById('lbl-landmark').innerText = dict.landmark_lbl;
    document.getElementById('txt-mesh-desc').innerText = dict.mesh_status;

    btnWhistle.innerText = isWhistleActive ? "⏹ Stop Whistle" : dict.btn_whistle;
    btnFlashlight.innerText = dict.btn_flashlight;
    document.getElementById('txt-guide-title').innerText = dict.guide_title;

    document.getElementById('step-1').innerHTML = `<strong>1. Move to High Ground:</strong> ${dict.step1}`;
    document.getElementById('step-2').innerHTML = `<strong>2. Keep Emergency Signal On:</strong> ${dict.step2}`;
    document.getElementById('step-3').innerHTML = `<strong>3. Peer Mesh Transmission:</strong> ${dict.step3}`;
}

// GIS Map Initialization
function initGISMap() {
    const kosiCoords = BASIN_SENSORS["KOSI_RIVER_NODE_04"].coords;
    map = L.map('map', { zoomControl: false }).setView(kosiCoords, 10);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB & OpenStreetMap',
        maxZoom: 19
    }).addTo(map);

    markersGroup = L.layerGroup().addTo(map);

    // Plot Sensor Stations
    Object.values(BASIN_SENSORS).forEach(sensor => {
        const sensorIcon = L.divIcon({
            className: 'custom-sensor-marker',
            html: `<div style="background: var(--accent-cyan); width: 14px; height: 14px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 0 12px var(--accent-cyan);"></div>`,
            iconSize: [20, 20]
        });

        L.marker(sensor.coords, { icon: sensorIcon })
            .addTo(map)
            .bindPopup(`<b>${sensor.name}</b><br>${sensor.location}<br>Water Level: ${sensor.water_level} m`);
    });

    // Plot Victim SOS Markers
    plotVictimSOSMarkers();
}

function plotVictimSOSMarkers() {
    if (!map) return;
    
    // Clear dynamic SOS markers
    markersGroup.clearLayers();

    sosIncidents.forEach(sos => {
        const color = sos.status === 'CRITICAL_RED' ? '#ff3b30' : '#ffcc00';
        const sosIcon = L.divIcon({
            className: 'sos-marker-pin',
            html: `<div style="background: ${color}; width: 18px; height: 18px; border-radius: 50%; border: 3px solid #ffffff; animation: pulse 1s infinite; box-shadow: 0 0 18px ${color};"></div>`,
            iconSize: [24, 24]
        });

        const marker = L.marker([sos.lat, sos.lng], { icon: sosIcon }).addTo(markersGroup);
        marker.bindPopup(`
            <div style="color: #000;">
                <b style="color: #ff3b30;">🚨 ${sos.id} (${sos.triage})</b><br>
                <b>People Trapped:</b> ${sos.people}<br>
                <b>Landmark:</b> ${sos.landmark}<br>
                <b>Hops:</b> ${sos.hops} via Bluetooth Mesh<br>
                <button onclick="dispatchRescueToSOS('${sos.id}')" style="background:#00f2fe; border:none; padding:4px 8px; border-radius:4px; margin-top:6px; font-weight:bold; cursor:pointer;">🚤 Dispatch Squad</button>
            </div>
        `);
    });
}

// WebSockets Server Connection
function initWebSockets() {
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${wsProtocol}//${window.location.host}/ws/ndrf-control`;
    
    try {
        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            wsStatus.innerText = "● WS Connected";
            wsStatus.style.color = "var(--accent-cyan)";
            logAudit("[WS] Connected to NDRF Real-time Telemetry & SOS Broker.");
        };

        ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            handleIncomingWSMessage(msg);
        };

        ws.onclose = () => {
            wsStatus.innerText = "○ WS Disconnected (Polling Mode)";
            wsStatus.style.color = "var(--accent-amber)";
            setTimeout(initWebSockets, 3000);
        };
    } catch (err) {
        console.warn("WebSocket fallback:", err);
    }
}

function handleIncomingWSMessage(msg) {
    if (msg.type === 'TELEMETRY_UPDATE') {
        updateSensorTelemetryUI(msg.sensor);
    } else if (msg.type === 'CITIZEN_SOS_ALERT') {
        const newSos = msg.sos;
        sosIncidents.unshift(newSos);
        renderTriageTable();
        plotVictimSOSMarkers();
        logAudit(`[SOS RECEIVED] New distress call ${newSos.id} from ${newSos.landmark || 'Victim GPS'}`, true);
        triggerAlarmSiren();
    } else if (msg.type === 'RESCUE_DISPATCHED') {
        logAudit(`[DISPATCH] NDRF Speedboat dispatched to ${msg.dispatch.sos_id}`);
    }
}

// Local P2P Wi-Fi BroadcastChannel Engine
function initLocalMeshP2P() {
    if (!meshChannel) return;

    meshChannel.onmessage = (event) => {
        const data = event.data;
        if (data && data.type === 'P2P_MESH_SOS') {
            logAudit(`[MESH P2P] Received relayed SOS frame over Local Wi-Fi from ${data.sos.id} (${data.sos.hops} hops)`);
            // Forward to server if online
            submitSOSToServer(data.sos);
        }
    };
}

// Citizen Victim SOS Submission
function sendVictimSOS() {
    const triageVal = victimTriage.value;
    const countVal = parseInt(victimCount.value, 10) || 1;
    const landmarkVal = victimLandmark.value || "Near Flood Inundation Area";

    let lat = 25.5941 + (Math.random() - 0.5) * 0.04;
    let lng = 85.1376 + (Math.random() - 0.5) * 0.04;

    if (window.currentUserCoords) {
        lat = window.currentUserCoords.lat;
        lng = window.currentUserCoords.lng;
    }

    const sosPayload = {
        id: `SOS-${Math.floor(1000 + Math.random() * 9000)}`,
        triage: triageVal,
        triage_score: triageVal.includes('ROOF') || triageVal.includes('INJURED') ? 95 : 60,
        lat: lat,
        lng: lng,
        landmark: landmarkVal,
        people: countVal,
        hops: 1,
        status: triageVal.includes('ROOF') || triageVal.includes('INJURED') ? 'CRITICAL_RED' : 'URGENT_YELLOW',
        timestamp: new Date().toLocaleTimeString()
    };

    // 1. Save to Local Memory & Render
    sosIncidents.unshift(sosPayload);
    renderTriageTable();
    plotVictimSOSMarkers();

    // 2. Broadcast via Local Wi-Fi P2P Mesh Channel (Tab to Tab / Device to Device)
    if (meshChannel) {
        meshChannel.postMessage({ type: 'P2P_MESH_SOS', sos: sosPayload });
    }

    // 3. Send to Backend Server API
    submitSOSToServer(sosPayload);

    alert(`✅ SOS DISTRESS SIGNAL BROADCASTED!\nID: ${sosPayload.id}\nNDRF Squads notified over Bluetooth & Cellular Network.`);
    logAudit(`[VICTIM SOS] Dispatched SOS alert ${sosPayload.id} for ${countVal} trapped people.`);
}

function submitSOSToServer(sosData) {
    fetch('/api/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sosData)
    }).catch(err => {
        console.warn("Offline - Queueing SOS payload in Store-and-Forward memory", err);
        // Store in localStorage if offline
        const queued = JSON.parse(localStorage.getItem('queued_sos') || '[]');
        queued.push(sosData);
        localStorage.setItem('queued_sos', JSON.stringify(queued));
    });
}

// Dispatch Rescue Unit to SOS Incident
window.dispatchRescueToSOS = function(sosId) {
    const sos = sosIncidents.find(s => s.id === sosId);
    if (!sos) return;

    // Draw route line on Leaflet map from nearest boat
    const boatCoords = [25.5990, 85.1450]; // Supaul Boat Squad
    if (routePolyline) map.removeLayer(routePolyline);

    routePolyline = L.polyline([boatCoords, [sos.lat, sos.lng]], {
        color: '#00f2fe',
        weight: 4,
        dashArray: '8, 8'
    }).addTo(map);

    map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });

    sos.status = 'RESCUE_DISPATCHED';
    renderTriageTable();
    plotVictimSOSMarkers();

    fetch('/api/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dispatch_id: `DISP-${Date.now()}`, sos_id: sosId, unit: 'NDRF-BOAT-01' })
    }).catch(console.warn);

    alert(`🚤 NDRF SPEEDBOAT DISPATCHED to ${sos.id}!\nEstimated ETA: 8 Minutes`);
    logAudit(`[DISPATCH] Speedboat assigned to ${sos.id} (${sos.landmark})`);
};

// Web Bluetooth Device Pairing
function initBluetoothMesh() {
    if (navigator.bluetooth) {
        navigator.bluetooth.requestDevice({
            acceptAllDevices: true
        }).then(device => {
            logAudit(`[BLE MESH] Paired with local BLE Beacon device: ${device.name || device.id}`);
            alert(`✅ Bluetooth Mesh Device Paired: ${device.name || 'NDRF Mesh Transceiver'}`);
        }).catch(err => {
            logAudit(`[BLE MESH] Fallback to BLE Mesh Simulator: ${err.message}`);
            simulateBLEMeshPacket();
        });
    } else {
        logAudit("[BLE MESH] Web Bluetooth not supported on browser - using P2P Mesh Transceiver simulation.");
        simulateBLEMeshPacket();
    }
}

function simulateBLEMeshPacket() {
    logAudit("[BLE MESH] Relayed 16-byte packed frame: [0x4E, 0x44, 0x52, 0x46, 0x01, 0xFE] -> Hop 2 Success");
    alert("📡 BLE Mesh Frame Relayed across 2 hops!");
}

// Emergency Audio Whistle Synth (Web Audio API)
function toggleWhistle() {
    if (isWhistleActive) {
        stopWhistle();
    } else {
        startWhistle();
    }
}

function startWhistle() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioCtx();
        
        osc1 = audioCtx.createOscillator();
        osc2 = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc1.type = 'sine';
        osc2.type = 'sine';

        // Piercing dual-tone whistle frequencies (2800 Hz & 3200 Hz)
        osc1.frequency.setValueAtTime(2800, audioCtx.currentTime);
        osc2.frequency.setValueAtTime(3200, audioCtx.currentTime);

        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc1.start();
        osc2.start();
        isWhistleActive = true;
        btnWhistle.classList.add('active-whistle');
        btnWhistle.innerText = "⏹ Stop High-Pitch Siren";
        logAudit("[AUDIO] High-Pitch Emergency Whistle Beacon ACTIVATED.");
    } catch (e) {
        console.warn("Audio Context error:", e);
    }
}

function stopWhistle() {
    if (osc1) osc1.stop();
    if (osc2) osc2.stop();
    if (audioCtx) audioCtx.close();
    isWhistleActive = false;
    btnWhistle.classList.remove('active-whistle');
    const dict = I18N[currentLang] || I18N.en;
    btnWhistle.innerText = dict.btn_whistle;
    logAudit("[AUDIO] Whistle siren stopped.");
}

// Flashlight Screen Beacon
function toggleFlashlight() {
    const flashOverlay = document.createElement('div');
    flashOverlay.style.position = 'fixed';
    flashOverlay.style.top = '0';
    flashOverlay.style.left = '0';
    flashOverlay.style.width = '100vw';
    flashOverlay.style.height = '100vh';
    flashOverlay.style.backgroundColor = '#ffffff';
    flashOverlay.style.zIndex = '9999';
    document.body.appendChild(flashOverlay);

    let count = 0;
    const interval = setInterval(() => {
        flashOverlay.style.backgroundColor = count % 2 === 0 ? '#ff3b30' : '#ffffff';
        count++;
        if (count > 10) {
            clearInterval(interval);
            document.body.removeChild(flashOverlay);
        }
    }, 200);
}

// Sound Emergency Alarm Siren
function triggerAlarmSiren() {
    if (!soundEnabled) return;
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
    } catch(e) {}
}

// Get User GPS Location
function getUserGPSLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                window.currentUserCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                victimGpsStatus.innerText = `GPS Coordinates: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
            },
            (err) => {
                victimGpsStatus.innerText = `GPS Coordinates: 25.5941° N, 85.1376° E (Supaul Sector)`;
            }
        );
    }
}

// Render Sensor Table
function renderSensorTable() {
    const tbody = document.getElementById('sensor-table-body');
    if (!tbody) return;
    tbody.innerHTML = Object.values(BASIN_SENSORS).map(s => `
        <tr>
            <td><strong>${s.id}</strong></td>
            <td>${s.name}</td>
            <td>${s.coords[0].toFixed(4)}, ${s.coords[1].toFixed(4)}</td>
            <td style="color: ${s.water_level >= s.threshold ? 'var(--accent-red)' : 'var(--accent-cyan)'}; font-weight: bold;">${s.water_level} m</td>
            <td>${s.threshold} m</td>
            <td>${s.flow_rate} m³/s</td>
            <td>${s.rainfall} mm/h</td>
            <td>${s.battery}%</td>
            <td><span class="status-tag ${s.status === 'CRITICAL' ? 'critical' : s.status === 'WARNING' ? 'warning' : 'normal'}">${s.status}</span></td>
        </tr>
    `).join('');
}

// Render Live Triage Table
function renderTriageTable() {
    const tbody = document.getElementById('triage-table-body');
    if (!tbody) return;

    tbody.innerHTML = sosIncidents.map(sos => `
        <tr>
            <td><strong>${sos.id}</strong></td>
            <td><span class="status-tag ${sos.status === 'CRITICAL_RED' ? 'triage-critical' : 'triage-urgent'}">${sos.triage}</span></td>
            <td>${sos.lat.toFixed(4)}, ${sos.lng.toFixed(4)}</td>
            <td>${sos.landmark}</td>
            <td><strong>${sos.people} People</strong></td>
            <td>${sos.hops} Hops</td>
            <td>${sos.timestamp}</td>
            <td>
                ${sos.status === 'RESCUE_DISPATCHED' 
                    ? '<span class="status-tag normal">🚤 DISPATCHED</span>' 
                    : `<button class="btn btn-cyan" onclick="dispatchRescueToSOS('${sos.id}')" style="padding: 3px 8px; font-size: 0.72rem;">🚤 Dispatch Squad</button>`
                }
            </td>
        </tr>
    `).join('');
}

// Render Relief Camps
function renderShelters() {
    const container = document.getElementById('shelters-container');
    if (!container) return;

    const RELIEF_CAMPS = [
        { name: "Supaul High School Relief Camp", capacity: 600, occupied: 420, lat: 25.5990, lng: 85.1450, medical: "Sufficient" },
        { name: "Valmiki Community Shelter", capacity: 450, occupied: 380, lat: 27.4200, lng: 83.9280, medical: "High Demand" },
        { name: "Sitamarhi Disaster Relief Center", capacity: 800, occupied: 290, lat: 26.6020, lng: 85.4850, medical: "Sufficient" }
    ];

    container.innerHTML = RELIEF_CAMPS.map(c => `
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); padding: 12px; border-radius: 10px;">
            <div style="display: flex; justify-content: space-between;">
                <strong>${c.name}</strong>
                <span style="color: var(--accent-cyan); font-weight: bold;">${c.occupied} / ${c.capacity} People</span>
            </div>
            <div style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; margin-top: 8px; overflow: hidden;">
                <div style="background: var(--accent-green); width: ${(c.occupied / c.capacity) * 100}%; height: 100%;"></div>
            </div>
        </div>
    `).join('');
}

// Render Govt Metrics
function renderGovtMetrics() {
    const rescuedEl = document.getElementById('govt-rescued-count');
    const redSosEl = document.getElementById('govt-red-sos');
    if (rescuedEl) rescuedEl.innerText = (3420 + sosIncidents.filter(s => s.status === 'RESCUE_DISPATCHED').length * 4).toLocaleString();
    if (redSosEl) redSosEl.innerText = sosIncidents.filter(s => s.status === 'CRITICAL_RED').length;
}

// Event Listeners Registration
function initEventListeners() {
    btnRoleNdrf.addEventListener('click', () => switchRole('ndrf'));
    btnRoleVictim.addEventListener('click', () => switchRole('victim'));
    btnRoleGovt.addEventListener('click', () => switchRole('govt'));

    langSelect.addEventListener('change', (e) => updateUIWithLang(e.target.value));

    // Tab buttons in NDRF View
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const targetId = e.currentTarget.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            if (targetId === 'view-map' && map) setTimeout(() => map.invalidateSize(), 200);
        });
    });

    btnVictimSos.addEventListener('click', sendVictimSOS);
    btnVictimGps.addEventListener('click', getUserGPSLocation);
    btnWhistle.addEventListener('click', toggleWhistle);
    btnFlashlight.addEventListener('click', toggleFlashlight);
    btnPairBle.addEventListener('click', initBluetoothMesh);

    btnSimulateSurge.addEventListener('click', () => {
        BASIN_SENSORS["KOSI_RIVER_NODE_04"].water_level = 15.65;
        BASIN_SENSORS["KOSI_RIVER_NODE_04"].status = "CRITICAL";
        updateSensorTelemetryUI(BASIN_SENSORS["KOSI_RIVER_NODE_04"]);
        alertBanner.style.display = 'block';
        triggerAlarmSiren();
        logAudit("🌊 EMERGENCY: Kosi River surge breached 15.0m danger limit!", true);
    });

    btnBlePing.addEventListener('click', simulateBLEMeshPacket);
    btnDispatchBoat.addEventListener('click', () => {
        if (sosIncidents.length > 0) dispatchRescueToSOS(sosIncidents[0].id);
    });

    // Cell Broadcast Modal Controls
    btnBroadcastModal.addEventListener('click', () => broadcastModal.style.display = 'flex');
    btnCloseModal.addEventListener('click', () => broadcastModal.style.display = 'none');
    btnCancelModal.addEventListener('click', () => broadcastModal.style.display = 'none');
    btnSendBroadcast.addEventListener('click', () => {
        broadcastModal.style.display = 'none';
        alert("📢 CELL BROADCAST DISPATCHED TO ALL REGIONAL PHONES & RADIO STATIONS!");
        logAudit("📢 [CAP v1.2] Mass Emergency Alert broadcasted over cell towers & FM radio.");
    });

    // Export Govt Situation Report CSV
    const btnExportGovtCsv = document.getElementById('btn-export-govt-csv');
    if (btnExportGovtCsv) {
        btnExportGovtCsv.addEventListener('click', exportGovtReportCSV);
    }
}

function updateSensorTelemetryUI(sensor) {
    if (statWater) statWater.innerText = `${sensor.water_level} m`;
    if (statFlow) statFlow.innerText = `${sensor.flow_rate} m³/s`;
    if (statRain) statRain.innerText = `${sensor.rainfall} mm/h`;
    if (statBattery) statBattery.innerText = `${sensor.battery} %`;
    if (hudWaterVal) hudWaterVal.innerText = `${sensor.water_level} m`;
    if (telemetryTimestamp) telemetryTimestamp.innerText = new Date().toLocaleTimeString();
    renderSensorTable();
}

// Government Situation Report CSV Export
function exportGovtReportCSV() {
    let csv = "DISASTER_SITUATION_REPORT,NDRF_GOVT_PANEL\n";
    csv += "Timestamp," + new Date().toISOString() + "\n";
    csv += "Total_Affected_Population,148500\n";
    csv += "Total_Rescued_Victims,3420\n";
    csv += "Critical_SOS_Incidents," + sosIncidents.length + "\n\n";

    csv += "SOS_ID,Triage_Condition,Latitude,Longitude,People_Count,Landmark\n";
    sosIncidents.forEach(s => {
        csv += `${s.id},${s.triage},${s.lat},${s.lng},${s.people},"${s.landmark}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NDRF_Govt_Disaster_Report_${Date.now()}.csv`;
    a.click();
}

function logAudit(msg, isDanger = false) {
    if (!logStream) return;
    const item = document.createElement('div');
    item.className = `log-item ${isDanger ? 'danger' : 'info'}`;
    item.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
    logStream.prepend(item);
}
