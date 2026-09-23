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
let G = {};                    // Google Maps classes (filled after the API loads)
let sensorMarkers = [];
let sosMarkers = [];
let infoWindow = null;
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
        setTimeout(refreshMap, 200);
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

// ---------------------------------------------------------------------------
// Google Maps
// ---------------------------------------------------------------------------
const GOOGLE_MAPS_API_KEY = 'AIzaSyCL8xD_zD1lzU-J0U7PZKI4VSa93hlcZgA';
const GOOGLE_MAPS_MAP_ID = 'DEMO_MAP_ID';
const DARK_LAYER_ID = 'layer-dark';
const SAT_LAYER_ID = 'layer-satellite';

function showMapMessage(html) {
    const el = document.getElementById('map');
    if (el) el.innerHTML = `<div style="height:100%;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;color:var(--text-secondary);font-size:0.9rem;line-height:1.6;">${html}</div>`;
}

// Google calls this global if the key is invalid / restricted / billing is off
window.gm_authFailure = () => {
    showMapMessage('<div><b style="color:#ff3b30;">Google Maps authentication failed.</b><br>Check your API key, its HTTP-referrer restrictions, and that the <i>Maps JavaScript API</i> is enabled with billing on.</div>');
};

function loadGoogleMapsScript(apiKey) {
    return new Promise((resolve, reject) => {
        if (window.google && google.maps) return resolve();
        window.__gmapsLoaded = resolve;
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&loading=async&callback=__gmapsLoaded`;
        script.async = true;
        script.onerror = () => reject(new Error('Could not load the Google Maps script (network or ad-blocker?).'));
        document.head.appendChild(script);
    });
}

async function initGISMap() {
    try {
        const cfg = await fetch('/api/config')
            .then(r => r.ok ? r.json() : null)
            .catch(() => null) || {
                googleMapsApiKey: GOOGLE_MAPS_API_KEY,
                googleMapId: GOOGLE_MAPS_MAP_ID
            };

        if (!cfg.googleMapsApiKey) {
            showMapMessage('<div><b>Google Maps API key not set.</b><br>Add <code>GOOGLE_MAPS_API_KEY=your_key</code> to the <code>.env</code> file and restart the server.</div>');
            return;
        }

        await loadGoogleMapsScript(cfg.googleMapsApiKey);
        const { Map, InfoWindow, Polyline } = await google.maps.importLibrary('maps');
        const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
        const { LatLngBounds, ColorScheme } = await google.maps.importLibrary('core');
        G = { Map, InfoWindow, Polyline, AdvancedMarkerElement, LatLngBounds };

        const kosiCoords = BASIN_SENSORS["KOSI_RIVER_NODE_04"].coords;
        map = new Map(document.getElementById('map'), {
            center: { lat: kosiCoords[0], lng: kosiCoords[1] },
            zoom: 10,
            mapId: cfg.googleMapId || 'DEMO_MAP_ID',   // required for Advanced Markers
            colorScheme: ColorScheme.DARK,              // dark theme (vector maps)
            disableDefaultUI: true,
            zoomControl: true,
            fullscreenControl: false
        });
        infoWindow = new InfoWindow();

        // Plot Sensor Stations
        Object.values(BASIN_SENSORS).forEach(addSensorMarker);

        initLayerSwitcher();
        plotVictimSOSMarkers();
    } catch (err) {
        console.error('[Google Maps]', err);
        showMapMessage(`<div><b style="color:#ff3b30;">Map failed to load.</b><br>${err.message}</div>`);
    }
}

function addSensorMarker(sensor) {
    if (!map || !G.AdvancedMarkerElement) return;
    const pin = document.createElement('div');
    pin.style.cssText = 'background: var(--accent-cyan); width: 14px; height: 14px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 0 12px var(--accent-cyan);';

    const marker = new G.AdvancedMarkerElement({
        map,
        position: { lat: sensor.coords[0], lng: sensor.coords[1] },
        content: pin,
        title: sensor.name
    });
    marker.addListener('click', () => {
        // Read the sensor at click time so the popup always shows the latest level
        infoWindow.setContent(`<div style="color:#000;"><b>${sensor.name}</b><br>${sensor.location}<br>Water Level: ${sensor.water_level} m</div>`);
        infoWindow.open({ map, anchor: marker });
    });
    sensorMarkers.push(marker);
}

// Trigger a redraw after the map container was hidden/shown (tab or role switch)
function refreshMap() {
    if (map && window.google) google.maps.event.trigger(map, 'resize');
}

// ---------------------------------------------------------------------------
// Layer switcher
//   Dark GIS / Satellite  -> mutually exclusive base maps
//   Rain Radar / Flood    -> independent overlays you can toggle on top
// ---------------------------------------------------------------------------
function initLayerSwitcher() {
    const setBase = (mapType, activeId) => {
        map.setMapTypeId(mapType);
        [DARK_LAYER_ID, SAT_LAYER_ID].forEach(b => document.getElementById(b)?.classList.toggle('active', b === activeId));
    };
    document.getElementById(DARK_LAYER_ID)?.addEventListener('click', () => setBase('roadmap', DARK_LAYER_ID));
    document.getElementById(SAT_LAYER_ID)?.addEventListener('click', () => setBase('hybrid', SAT_LAYER_ID));
    document.getElementById('layer-rain')?.addEventListener('click', (e) => toggleRainRadar(e.currentTarget));
    document.getElementById('layer-heat')?.addEventListener('click', (e) => toggleFloodZones(e.currentTarget));
}

// Legend box (top-right of the map) describing whichever overlays are on
function updateMapLegend() {
    const container = document.querySelector('.map-container');
    if (!container) return;
    let el = document.getElementById('map-legend');
    if (!el) {
        el = document.createElement('div');
        el.id = 'map-legend';
        el.className = 'map-legend';
        container.appendChild(el);
    }

    let html = '';
    if (rain.on) {
        html += `<div class="legend-block">
            <div class="legend-title">🌧️ Rain Radar</div>
            <div class="legend-gradient"></div>
            <div class="legend-scale"><span>Light</span><span>Heavy</span></div>
            <div class="legend-note">${rain.status || 'Loading…'}<br>Data: RainViewer</div>
        </div>`;
    }
    if (flood.on) {
        html += `<div class="legend-block">
            <div class="legend-title">🔴 Flood Risk Zones</div>
            <div class="legend-row"><i style="background:${FLOOD_COLORS.breach}"></i> Danger level breached</div>
            <div class="legend-row"><i style="background:${FLOOD_COLORS.warn}"></i> Within 10% of danger level</div>
            <div class="legend-row"><i style="background:${FLOOD_COLORS.ok}"></i> Normal</div>
            <div class="legend-note">Estimated from sensor level ÷ danger threshold. Illustrative only, not a hydrological model.</div>
        </div>`;
    }
    el.innerHTML = html;
    el.style.display = html ? 'block' : 'none';
}

// ----- Rain Radar (RainViewer tiles on a Google custom map type) -----
// RainViewer's free tier serves tiles only up to zoom 7, so at higher zooms we
// fetch the zoom-7 parent tile and scale/crop it (the radar is coarse anyway).
const RAIN_MAX_NATIVE_ZOOM = 7;
const RAIN_MAX_ZOOM = 12;
const RAIN_REFRESH_MS = 5 * 60 * 1000;
const rain = { on: false, mapType: null, timer: null, status: '' };

async function fetchLatestRainFrame() {
    const data = await fetch('https://api.rainviewer.com/public/weather-maps.json').then(r => {
        if (!r.ok) throw new Error(`RainViewer HTTP ${r.status}`);
        return r.json();
    });
    const past = (data.radar && data.radar.past) || [];
    if (!past.length) throw new Error('No radar frames available');
    const latest = past[past.length - 1];
    return { host: data.host, path: latest.path, time: latest.time };
}

function buildRainMapType(frame) {
    return {
        tileSize: new google.maps.Size(256, 256),
        minZoom: 0,
        maxZoom: RAIN_MAX_ZOOM,
        name: 'Rain Radar',
        getTile(coord, zoom, doc) {
            const div = doc.createElement('div');
            div.style.cssText = 'width:256px;height:256px;overflow:hidden;position:relative;pointer-events:none;';
            const n = 1 << zoom;
            if (coord.y < 0 || coord.y >= n) return div;          // outside the world vertically
            const x = ((coord.x % n) + n) % n;                    // wrap horizontally

            const shift = Math.max(0, zoom - RAIN_MAX_NATIVE_ZOOM);
            const scale = 1 << shift;
            const z = zoom - shift;

            const img = doc.createElement('img');
            img.src = `${frame.host}${frame.path}/256/${z}/${x >> shift}/${coord.y >> shift}/2/1_1.png`;
            img.style.cssText = `position:absolute;opacity:0.7;width:${256 * scale}px;height:${256 * scale}px;left:${-(x & (scale - 1)) * 256}px;top:${-(coord.y & (scale - 1)) * 256}px;`;
            img.onerror = () => { img.style.display = 'none'; };
            div.appendChild(img);
            return div;
        },
        releaseTile() {}
    };
}

async function applyRainFrame() {
    try {
        const frame = await fetchLatestRainFrame();
        const overlays = map.overlayMapTypes;
        if (rain.mapType) {
            const idx = overlays.getArray().indexOf(rain.mapType);
            if (idx > -1) overlays.removeAt(idx);
        }
        rain.mapType = buildRainMapType(frame);
        overlays.push(rain.mapType);
        rain.status = 'Radar time: ' + new Date(frame.time * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        logAudit(`[RAIN RADAR] Layer updated (${rain.status}).`);
    } catch (err) {
        console.error('[Rain Radar]', err);
        rain.status = '⚠ Radar feed unavailable';
    }
    updateMapLegend();
}

function stopRainRadar() {
    clearInterval(rain.timer);
    rain.timer = null;
    if (rain.mapType && map) {
        const idx = map.overlayMapTypes.getArray().indexOf(rain.mapType);
        if (idx > -1) map.overlayMapTypes.removeAt(idx);
    }
    rain.mapType = null;
}

async function toggleRainRadar(btn) {
    if (!map) return;
    rain.on = !rain.on;
    btn.classList.toggle('active', rain.on);
    if (rain.on) {
        rain.status = 'Loading…';
        updateMapLegend();
        await applyRainFrame();
        rain.timer = setInterval(applyRainFrame, RAIN_REFRESH_MS);
    } else {
        stopRainRadar();
        updateMapLegend();
    }
}

// ----- Flood Inundation (risk circles derived from sensor water levels) -----
const FLOOD_COLORS = { breach: '#ff3b30', warn: '#ff9500', ok: '#34c759' };
const flood = { on: false, circles: {} };

function floodStyleFor(sensor) {
    const ratio = sensor.water_level / sensor.threshold;
    const color = ratio >= 1 ? FLOOD_COLORS.breach : ratio >= 0.9 ? FLOOD_COLORS.warn : FLOOD_COLORS.ok;
    const radius = 2000 + Math.max(0, ratio - 0.7) * 30000;   // metres: grows as the level nears/exceeds danger
    return { color, radius };
}

function refreshFloodZones() {
    if (!map || !flood.on) return;
    Object.values(BASIN_SENSORS).forEach(sensor => {
        const { color, radius } = floodStyleFor(sensor);
        const center = { lat: sensor.coords[0], lng: sensor.coords[1] };
        let circle = flood.circles[sensor.id];
        if (!circle) {
            circle = new google.maps.Circle({ map, clickable: false, strokeWeight: 2, fillOpacity: 0.25, strokeOpacity: 0.85 });
            flood.circles[sensor.id] = circle;
        }
        circle.setOptions({ center, radius, strokeColor: color, fillColor: color });
        circle.setMap(map);
    });
}

function toggleFloodZones(btn) {
    if (!map) return;
    flood.on = !flood.on;
    btn.classList.toggle('active', flood.on);
    if (flood.on) {
        refreshFloodZones();
    } else {
        Object.values(flood.circles).forEach(c => c.setMap(null));
    }
    updateMapLegend();
}

function plotVictimSOSMarkers() {
    if (!map) return;

    // Clear dynamic SOS markers
    sosMarkers.forEach(m => { m.map = null; });
    sosMarkers = [];

    sosIncidents.forEach(sos => {
        const color = sos.status === 'CRITICAL_RED' ? '#ff3b30' : '#ffcc00';
        const pin = document.createElement('div');
        pin.style.cssText = `background: ${color}; width: 18px; height: 18px; border-radius: 50%; border: 3px solid #ffffff; animation: pulse 1s infinite; box-shadow: 0 0 18px ${color};`;

        const marker = new G.AdvancedMarkerElement({
            map,
            position: { lat: sos.lat, lng: sos.lng },
            content: pin,
            title: sos.id
        });
        marker.addListener('click', () => {
            infoWindow.setContent(`
                <div style="color: #000;">
                    <b style="color: #ff3b30;">🚨 ${sos.id} (${sos.triage})</b><br>
                    <b>People Trapped:</b> ${sos.people}<br>
                    <b>Landmark:</b> ${sos.landmark}<br>
                    <b>Hops:</b> ${sos.hops} via Bluetooth Mesh<br>
                    <button onclick="dispatchRescueToSOS('${sos.id}')" style="background:#00f2fe; border:none; padding:4px 8px; border-radius:4px; margin-top:6px; font-weight:bold; cursor:pointer;">🚤 Dispatch Squad</button>
                </div>
            `);
            infoWindow.open({ map, anchor: marker });
        });
        sosMarkers.push(marker);
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

// ---------------------------------------------------------------------------
// Backend payload -> dashboard shape
// The Node/FastAPI backends and the Python emulators use different field names
// than the dashboard (e.g. water_level_meters vs water_level). These helpers
// translate them so live data updates the table, HUD, chips and map.
// ---------------------------------------------------------------------------
const numOr = (v, fallback) => (v !== null && v !== undefined && v !== '' && Number.isFinite(Number(v))) ? Number(v) : fallback;

function sensorStatusFor(level, threshold) {
    const ratio = level / threshold;
    return ratio >= 1 ? 'CRITICAL' : ratio >= 0.9 ? 'WARNING' : 'NORMAL';
}

// Merge a raw telemetry payload into BASIN_SENSORS and return the sensor (or null if unusable)
function applyTelemetry(raw) {
    if (!raw) return null;
    const id = raw.id || raw.sensor_id;
    const level = numOr(raw.water_level ?? raw.water_level_meters, NaN);
    if (!id || !Number.isFinite(level)) return null;

    let sensor = BASIN_SENSORS[id];
    if (!sensor) {
        const lat = numOr(raw.latitude, NaN);
        const lng = numOr(raw.longitude, NaN);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
            console.warn(`[Telemetry] Ignoring unknown sensor "${id}" (no coordinates).`);
            return null;
        }
        sensor = BASIN_SENSORS[id] = {
            id,
            name: id.replace(/_/g, ' '),
            location: 'Unregistered sensor',
            coords: [lat, lng],
            water_level: level,
            threshold: numOr(raw.threshold ?? raw.critical_threshold, 15.0),
            flow_rate: 0, rainfall: 0, battery: 100, status: 'NORMAL'
        };
        addSensorMarker(sensor);
        logAudit(`[SENSOR] New sensor registered: ${id}`);
    }

    sensor.water_level = Number(level.toFixed(2));
    sensor.threshold = numOr(raw.threshold ?? raw.critical_threshold, sensor.threshold);
    sensor.flow_rate = Number(numOr(raw.flow_rate ?? raw.flow_rate_m3s, sensor.flow_rate).toFixed(1));
    sensor.rainfall = Number(numOr(raw.rainfall ?? raw.rainfall_rate_mmhr, sensor.rainfall).toFixed(1));
    sensor.battery = Number(numOr(raw.battery ?? raw.battery_level_pct, sensor.battery).toFixed(1));
    sensor.status = sensorStatusFor(sensor.water_level, sensor.threshold);
    return sensor;
}

// Accepts either the dashboard's own SOS shape or the backend/BLE-emulator shape
function normalizeSOS(raw) {
    if (!raw) return null;
    if (raw.id !== undefined && raw.lat !== undefined && raw.lng !== undefined) return raw;   // already dashboard shape

    const lat = numOr(raw.lat ?? raw.latitude, NaN);
    const lng = numOr(raw.lng ?? raw.longitude, NaN);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

    const medical = !!raw.medical_urgency;
    const ts = numOr(raw.timestamp, null);
    return {
        id: raw.id || raw.sos_id || `SOS-${Date.now()}`,
        triage: raw.triage || (medical ? 'INJURED_MEDICAL' : 'ROOF_TRAPPED'),
        triage_score: medical ? 95 : 70,
        lat, lng,
        landmark: raw.landmark || `Relayed via ${raw.mesh_protocol || 'mesh network'}`,
        people: numOr(raw.people ?? raw.family_count, 1),
        hops: numOr(raw.hops ?? raw.relay_hops, 0),
        status: raw.status || (medical ? 'CRITICAL_RED' : 'URGENT_YELLOW'),
        timestamp: (ts ? new Date(ts * 1000) : new Date()).toLocaleTimeString()
    };
}

// Adds an incoming SOS unless we already have it (the sender's own dashboard gets its SOS echoed back)
function addIncomingSOS(rawSos) {
    const sos = normalizeSOS(rawSos);
    if (!sos || sosIncidents.some(s => s.id === sos.id)) return null;
    sosIncidents.unshift(sos);
    return sos;
}

const liveBreachedSensors = new Set();

function handleIncomingWSMessage(msg) {
    if (msg.type === 'INITIAL_STATE_SYNC') {
        // FastAPI sends current state on connect (Node sends only a timestamp)
        (msg.sensors || []).forEach(raw => { const s = applyTelemetry(raw); if (s) updateSensorTelemetryUI(s); });
        const added = (msg.sos_signals || []).map(addIncomingSOS).filter(Boolean);
        if (added.length) { renderTriageTable(); plotVictimSOSMarkers(); }
    } else if (msg.type === 'TELEMETRY_UPDATE') {
        const sensor = applyTelemetry(msg.sensor);
        if (!sensor) return;
        updateSensorTelemetryUI(sensor);

        const breached = msg.is_breached === true || sensor.water_level >= sensor.threshold;
        if (breached && !liveBreachedSensors.has(sensor.id)) {
            // Fire the alarm once per breach, not on every reading while above the threshold
            liveBreachedSensors.add(sensor.id);
            alertBanner.style.display = 'block';
            triggerAlarmSiren();
            logAudit(`🌊 EMERGENCY: ${sensor.name} reached ${sensor.water_level} m (danger limit ${sensor.threshold} m)!`, true);
        } else if (!breached && liveBreachedSensors.delete(sensor.id)) {
            logAudit(`[RECOVERY] ${sensor.name} fell back below ${sensor.threshold} m.`);
            if (liveBreachedSensors.size === 0) alertBanner.style.display = 'none';
        }
    } else if (msg.type === 'CITIZEN_SOS_ALERT') {
        const newSos = addIncomingSOS(msg.sos);
        if (!newSos) return;
        renderTriageTable();
        plotVictimSOSMarkers();
        logAudit(`[SOS RECEIVED] New distress call ${newSos.id} from ${newSos.landmark || 'Victim GPS'}`, true);
        triggerAlarmSiren();
    } else if (msg.type === 'RESCUE_DISPATCHED') {
        const d = msg.dispatch || {};
        logAudit(`[DISPATCH] NDRF Speedboat dispatched to ${d.sos_id || d.assigned_sos_id || 'incident'}`);
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

    // Draw route line on the map from nearest boat
    const boatCoords = [25.5990, 85.1450]; // Supaul Boat Squad
    if (map) {
        if (routePolyline) routePolyline.setMap(null);
        if (infoWindow) infoWindow.close();

        const path = [
            { lat: boatCoords[0], lng: boatCoords[1] },
            { lat: sos.lat, lng: sos.lng }
        ];
        routePolyline = new G.Polyline({
            path,
            strokeOpacity: 0,                       // dashed line via repeating icons
            icons: [{
                icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, strokeColor: '#00f2fe', strokeWeight: 4, scale: 3 },
                offset: '0',
                repeat: '16px'
            }],
            map
        });

        const bounds = new G.LatLngBounds();
        path.forEach(p => bounds.extend(p));
        map.fitBounds(bounds, 50);
    }

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
            if (targetId === 'view-map' && map) setTimeout(refreshMap, 200);
        });
    });

    btnVictimSos.addEventListener('click', sendVictimSOS);
    btnVictimGps.addEventListener('click', getUserGPSLocation);
    btnWhistle.addEventListener('click', toggleWhistle);
    btnFlashlight.addEventListener('click', toggleFlashlight);
    btnPairBle.addEventListener('click', initBluetoothMesh);
    document.querySelectorAll('.sensor-chip').forEach(chip => chip.addEventListener('click', () => selectSensor(chip.dataset.sensor)));

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

function renderActiveSensorPanel(sensor) {
    if (statWater) statWater.innerText = `${sensor.water_level} m`;
    if (statFlow) statFlow.innerText = `${sensor.flow_rate} m³/s`;
    if (statRain) statRain.innerText = `${sensor.rainfall} mm/h`;
    if (statBattery) statBattery.innerText = `${sensor.battery} %`;
    if (hudWaterVal) hudWaterVal.innerText = `${sensor.water_level} m`;
    if (hudNodeName) hudNodeName.innerText = sensor.id;
    if (hudNodeLocation) hudNodeLocation.innerText = `Location: ${sensor.location}`;
    const hudThreshold = document.getElementById('hud-threshold');
    if (hudThreshold) hudThreshold.innerText = `Danger Threshold: ${Number(sensor.threshold).toFixed(2)} m`;
}

function updateSensorTelemetryUI(sensor) {
    // Chip in the basin selector always reflects the latest level
    const chipLvl = document.querySelector(`.sensor-chip[data-sensor="${sensor.id}"] .chip-lvl`);
    if (chipLvl) chipLvl.innerText = `${sensor.water_level} m`;

    // The big stats panel / HUD only follow the sensor selected in the basin selector
    if (sensor.id === activeSensorId) renderActiveSensorPanel(sensor);

    if (telemetryTimestamp) telemetryTimestamp.innerText = new Date().toLocaleTimeString();
    renderSensorTable();
    refreshFloodZones();
}

// Basin selector: choose which station the stats panel and HUD show
function selectSensor(id) {
    const sensor = BASIN_SENSORS[id];
    if (!sensor) return;
    activeSensorId = id;
    document.querySelectorAll('.sensor-chip').forEach(c => c.classList.toggle('active', c.dataset.sensor === id));
    renderActiveSensorPanel(sensor);
    if (map) map.panTo({ lat: sensor.coords[0], lng: sensor.coords[1] });
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
