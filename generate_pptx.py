import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_slide_layout = prs.slide_layouts[6]

    # Theme Colors
    COLOR_BG = RGBColor(10, 16, 30)        # #0A101E Dark Navy
    COLOR_CARD = RGBColor(22, 33, 56)      # #162138 Card BG
    COLOR_CYAN = RGBColor(0, 242, 254)     # #00F2FE Accent Cyan
    COLOR_RED = RGBColor(255, 59, 48)      # #FF3B30 Alert Red
    COLOR_WHITE = RGBColor(248, 250, 252)  # #F8FAFC Text Primary
    COLOR_GRAY = RGBColor(148, 163, 184)   # #94A3B8 Text Secondary
    COLOR_GREEN = RGBColor(52, 199, 89)    # #34C759 Accent Green
    COLOR_AMBER = RGBColor(255, 204, 0)    # #FFCC00 Accent Amber

    def set_slide_background(slide):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = COLOR_BG

    def add_header(slide, title_text, subtitle_text):
        txBox = slide.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(11.7), Inches(1.0))
        tf = txBox.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title_text
        p.font.size = Pt(28)
        p.font.bold = True
        p.font.color.rgb = COLOR_CYAN
        
        p2 = tf.add_paragraph()
        p2.text = subtitle_text
        p2.font.size = Pt(14)
        p2.font.color.rgb = COLOR_GRAY

    def add_card(slide, left, top, width, height, title, body_bullets, border_color=COLOR_CYAN):
        shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = COLOR_CARD
        shape.line.color.rgb = border_color
        shape.line.width = Pt(1.5)

        txBox = slide.shapes.add_textbox(left + Inches(0.2), top + Inches(0.15), width - Inches(0.4), height - Inches(0.3))
        tf = txBox.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(18)
        p.font.bold = True
        p.font.color.rgb = COLOR_WHITE
        p.space_after = Pt(10)

        for bullet in body_bullets:
            p_b = tf.add_paragraph()
            p_b.text = "• " + bullet
            p_b.font.size = Pt(13)
            p_b.font.color.rgb = COLOR_GRAY
            p_b.space_after = Pt(6)

    # -------------------------------------------------------------
    # SLIDE 1: Title Slide
    # -------------------------------------------------------------
    slide1 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(slide1)

    txBox = slide1.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(11.333), Inches(3.5))
    tf = txBox.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "🌊 NDRF & COMMUNITY DISASTER ALERT NETWORK"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = COLOR_CYAN
    p.alignment = PP_ALIGN.LEFT

    p2 = tf.add_paragraph()
    p2.text = "Sub-Second IoT Early Warning, Offline Web Bluetooth/Wi-Fi P2P Mesh & Govt Multi-Agency Portal"
    p2.font.size = Pt(20)
    p2.font.color.rgb = COLOR_WHITE
    p2.space_before = Pt(12)

    p3 = tf.add_paragraph()
    p3.text = "Specialized for Rapid Flood Rescue in Nepal, Assam, and Bihar (Kosi • Gandak • Brahmaputra • Koshi)"
    p3.font.size = Pt(15)
    p3.font.color.rgb = COLOR_GRAY
    p3.space_before = Pt(10)

    # -------------------------------------------------------------
    # SLIDE 2: Problem Statement
    # -------------------------------------------------------------
    slide2 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(slide2)
    add_header(slide2, "1. Problem Statement & Real-World Challenge", "Severe Flooding in Nepal, Assam & Bihar Causes Catastrophic Communication Blackouts")

    add_card(slide2, Inches(0.8), Inches(1.8), Inches(3.6), Inches(4.8), 
             "🚨 Rapid Flood Surges", 
             ["Kosi (Bihar), Brahmaputra (Assam) & Koshi (Nepal) breach embankments within 1-3 hours.", 
              "Submerges entire villages before central warnings reach locals.", 
              "Leaves thousands trapped on rooftops."])

    add_card(slide2, Inches(4.8), Inches(1.8), Inches(3.6), Inches(4.8), 
             "⚡ Total Grid Collapse", 
             ["Cellular towers & power grids fail immediately in flood zones.", 
              "Standard mobile phones lose 4G/5G connectivity.", 
              "Victims cannot dial 112 or contact NDRF command."], border_color=COLOR_RED)

    add_card(slide2, Inches(8.8), Inches(1.8), Inches(3.6), Inches(4.8), 
             "⏱️ Rescue Turnaround Delay", 
             ["Manual search ops take 12 to 48 hours without precise GPS coordinates.", 
              "NDRF speedboats wander blindly in fog & submerged areas.", 
              "High preventable mortality rate due to triage delay."], border_color=COLOR_AMBER)

    # -------------------------------------------------------------
    # SLIDE 3: The Solution
    # -------------------------------------------------------------
    slide3 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(slide3)
    add_header(slide3, "2. The Innovation & System Overview", "A Unified Multi-Role Network Connecting Citizens, NDRF Rescue Teams & Government")

    add_card(slide3, Inches(0.8), Inches(1.8), Inches(3.6), Inches(4.8), 
             "📱 Victim Mobile SOS", 
             ["1-Tap Emergency SOS dispatch with auto-GPS coordinates.", 
              "Automated Triage Classifier (Red: Roof Trapped, Yellow: Medical).", 
              "High-Pitch Audio Whistle Siren & Screen Beacon for rescue visibility."], border_color=COLOR_RED)

    add_card(slide3, Inches(4.8), Inches(1.8), Inches(3.6), Inches(4.8), 
             "📡 Zero-Cellular P2P Mesh", 
             ["Web Bluetooth API & Local Wi-Fi P2P (BroadcastChannel/WebRTC).", 
              "Offline 16-byte packed frame store-and-forward relay.", 
              "Relays tab-to-tab through neighbor phones until reaching NDRF gateway."])

    add_card(slide3, Inches(8.8), Inches(1.8), Inches(3.6), Inches(4.8), 
             "🚤 Command & Govt Portal", 
             ["Interactive GIS Leaflet Map with flood inundation risk layers.", 
              "Dynamic shortest-path rescue route drawing for NDRF speedboats.", 
              "Real-time SDMA/NDMA situation report CSV/JSON generator."], border_color=COLOR_GREEN)

    # -------------------------------------------------------------
    # SLIDE 4: Real-World Example
    # -------------------------------------------------------------
    slide4 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(slide4)
    add_header(slide4, "3. Concrete Real-World Example: Supaul, Bihar Flood Rescue", "How the System Rescued Ramesh & 5 Trapped Family Members at 2:00 AM")

    add_card(slide4, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8), 
             "🌊 Scenario Timeline", 
             ["02:00 AM: Kosi River breaches 15.0m threshold in Supaul, Bihar.", 
              "02:05 AM: Cellular towers go down. Power grid collapses.", 
              "02:07 AM: Ramesh taps '🚨 BROADCAST SOS' on his mobile screen.", 
              "02:08 AM: Phone broadcasts a 16-byte BLE packet to a neighbor's phone 30m away.", 
              "02:10 AM: Packet hops 3 devices to an embankment phone with Satellite/Cell uplink.", 
              "02:11 AM: NDRF Command receives SOS-8491 with RED priority triage.", 
              "02:19 AM: NDRF Speedboat dispatched via dynamic route map. Family rescued!"], border_color=COLOR_CYAN)

    add_card(slide4, Inches(6.8), Inches(1.8), Inches(5.6), Inches(4.8), 
             "🔑 Key Technical Milestones", 
             ["Zero Internet Required: Relayed entirely over Web Bluetooth & Local Wi-Fi.", 
              "Sub-Second Triage: Automatic priority score (95/100) flagged Ramesh as Critical Red.", 
              "Audio Siren Whistle: Ramesh turned on 2.8kHz sound beacon, helping boat crew locate roof in thick fog.", 
              "Govt Data Sync: Bihar SDMA dashboard updated casualty count in real-time."], border_color=COLOR_GREEN)

    # -------------------------------------------------------------
    # SLIDE 5: Architecture & Tech Stack
    # -------------------------------------------------------------
    slide5 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(slide5)
    add_header(slide5, "4. Technical Architecture & Stack", "Robust, Lightweight & Offline-First Web Stack")

    add_card(slide5, Inches(0.8), Inches(1.8), Inches(3.6), Inches(4.8), 
             "💻 Frontend Stack", 
             ["HTML5 & Vanilla Javascript (Zero framework bloat).", 
              "CSS3 Dark Mode with Glassmorphism UI.", 
              "Leaflet.js GIS Mapping Engine.", 
              "Web Audio API Oscillator Whistle Synth."])

    add_card(slide5, Inches(4.8), Inches(1.8), Inches(3.6), Inches(4.8), 
             "⚡ Backend Pipeline", 
             ["Node.js & Express REST API Server.", 
              "Ultra-Low Latency WebSocket (ws) Broker.", 
              "Store-and-Forward Ingestion API.", 
              "Government Situation Report Exporter."])

    add_card(slide5, Inches(8.8), Inches(1.8), Inches(3.6), Inches(4.8), 
             "📡 Mesh & P2P Protocols", 
             ["Web Bluetooth API (navigator.bluetooth).", 
              "BroadcastChannel API for tab-to-tab local Wi-Fi relay.", 
              "IndexedDB & LocalStorage offline store.", 
              "16-Byte Compressed Binary Payloads."])

    # -------------------------------------------------------------
    # SLIDE 6: Victim SOS Mobile Portal
    # -------------------------------------------------------------
    slide6 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(slide6)
    add_header(slide6, "5. Feature Focus: Victim Emergency Mobile Portal", "Empowering Flood Victims within Seconds of Disaster Breaches")

    add_card(slide6, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8), 
             "🚨 Core Victim Capabilities", 
             ["1-Tap High Contrast SOS Button: Prominently displayed for immediate trigger under panic.", 
              "Auto GPS & Location Picker: Fetches high-accuracy latitude/longitude coordinates.", 
              "Triage Condition Selection: Roof Trapped, Rapid Water Rise, Injured/Medical, Elderly/Infants.", 
              "People Counter: Specifies exact number of trapped victims for boat capacity planning."], border_color=COLOR_RED)

    add_card(slide6, Inches(6.8), Inches(1.8), Inches(5.6), Inches(4.8), 
             "🔦 Emergency Survival Toolkit", 
             ["High-Pitch Audio Whistle: Web Audio API generates a 2.8kHz-3.2kHz oscillating siren to guide boats in pitch darkness.", 
              "Strobe Flashlight Beacon: Flashes screen between high-intensity white and emergency red.", 
              "Multilingual Guidelines: Step-by-step flood survival instructions in 4 regional languages."], border_color=COLOR_CYAN)

    # -------------------------------------------------------------
    # SLIDE 7: Web Bluetooth & Wi-Fi Mesh
    # -------------------------------------------------------------
    slide7 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(slide7)
    add_header(slide7, "6. Feature Focus: Web Bluetooth & Local Wi-Fi Mesh Relay", "Maintaining Communication when 4G/5G Cellular Towers Fail")

    add_card(slide7, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8), 
             "⚙️ 16-Byte Compressed Frame Spec", 
             ["Header (2 Bytes): Protocol Magic Identifier 0x4E 0x44 (ND).", 
              "Device ID (4 Bytes): Compressed MAC / Hash.", 
              "Triage & People (2 Bytes): Triage Level & Victim Count.", 
              "Geo Coordinates (6 Bytes): Fixed-point encoded Lat/Lng.", 
              "Hop Counter (2 Bytes): Tracks P2P relay depth."], border_color=COLOR_CYAN)

    add_card(slide7, Inches(6.8), Inches(1.8), Inches(5.6), Inches(4.8), 
             "🔄 Store-and-Forward Mesh Protocol", 
             ["Local BroadcastChannel: Instantly syncs distress signals across devices connected to local Wi-Fi router.", 
              "Web Bluetooth GATT Beacon: Scans for adjacent smartphones within 30-50m range.", 
              "Automatic Upload: Flushes queued offline signals to server the moment any mesh node hits cellular/internet coverage."], border_color=COLOR_GREEN)

    # -------------------------------------------------------------
    # SLIDE 8: NDRF Tactical Command Portal
    # -------------------------------------------------------------
    slide8 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(slide8)
    add_header(slide8, "7. Feature Focus: NDRF Tactical Rescue Command", "Sub-Second Incident Queue & GIS Rescue Route Navigation")

    add_card(slide8, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8), 
             "🗺️ Tactical GIS Map Engine", 
             ["Real-Time Victim Pins: Displays active SOS locations with pulsing Red/Yellow markers.", 
              "Flood Risk Overlays: Shows river barrage discharge zones (Kosi, Gandak, Brahmaputra).", 
              "Shortest-Path Navigation: Computes and draws dashed route line from nearest NDRF boat squad to victim pin.", 
              "Station Selector: Switch between Supaul, Valmiki Nagar, Kaziranga, and Saptari."], border_color=COLOR_CYAN)

    add_card(slide8, Inches(6.8), Inches(1.8), Inches(5.6), Inches(4.8), 
             "🚨 Incident Queue & Cell Broadcast", 
             ["Priority Triage Sorting: Automatically places critical roof-trapped calls at the top of the queue.", 
              "1-Click Squad Dispatch: Assigns boat/heli units with real-time status updates.", 
              "CAP v1.2 Cell Broadcast Composer: Formats standardized emergency broadcast messages for mass SMS and FM radio relay."], border_color=COLOR_AMBER)

    # -------------------------------------------------------------
    # SLIDE 9: Government Authority Panel
    # -------------------------------------------------------------
    slide9 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(slide9)
    add_header(slide9, "8. Feature Focus: Government & SDMA/NDMA Authority Panel", "Inter-Agency Transparency & Instant Situation Reporting")

    add_card(slide9, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8), 
             "🏛️ Executive Summary Dashboard", 
             ["Total Affected Count: Aggregates regional impact statistics.", 
              "Victims Rescued: Tracks lives saved by NDRF and Army rescue teams.", 
              "Critical Red SOS Metrics: Monitors active life-threatening distress calls.", 
              "Barrage Discharge Watch: Real-time cusec monitoring at Kosi, Gandak & Brahmaputra gates."], border_color=COLOR_GREEN)

    add_card(slide9, Inches(6.8), Inches(1.8), Inches(5.6), Inches(4.8), 
             "📥 1-Click Situation Report Export", 
             ["Official CSV Export: Generates structured telemetry reports for SDMA/NDMA archives.", 
              "JSON Data Digest: Exposes REST API endpoint for integration with Ministry portals.", 
              "Relief Camp Occupancy: Live tracking of evacuees across 24 active relief shelters."], border_color=COLOR_CYAN)

    # -------------------------------------------------------------
    # SLIDE 10: Multilingual Support
    # -------------------------------------------------------------
    slide10 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(slide10)
    add_header(slide10, "9. Multilingual Support & Regional Adaptability", "Tailored for Local Villagers and Rescue Squads in Bihar, Assam & Nepal")

    add_card(slide10, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8), 
             "🌐 4 Supported Regional Languages", 
             ["English: Standard interface for NDRF officers and tech operators.", 
              "हिन्दी (Hindi): Primary language for Bihar flood victims (Kosi & Gandak basins).", 
              "অসমীয়া (Assamese): Native language for Brahmaputra valley victims in Assam.", 
              "नेपाली (Nepali): Native language for Koshi & Sun Kosi victims in Nepal."], border_color=COLOR_AMBER)

    add_card(slide10, Inches(6.8), Inches(1.8), Inches(5.6), Inches(4.8), 
             "🏞️ River Basin Presets", 
             ["Bihar Sector: Kosi River (Supaul), Gandak River (Valmiki Nagar), Bagmati River (Sitamarhi).", 
              "Assam Sector: Brahmaputra River (Kaziranga & Guwahati), Barak River (Silchar).", 
              "Nepal Sector: Koshi River (Saptari & Sunsari), Sun Kosi River (Chatara)."], border_color=COLOR_CYAN)

    # -------------------------------------------------------------
    # SLIDE 11: Quantitative Impact
    # -------------------------------------------------------------
    slide11 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(slide11)
    add_header(slide11, "10. Impact & Rescue Efficiency Gains", "Drastically Reducing Rescue Turnaround Time from Hours to Minutes")

    add_card(slide11, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8), 
             "⏱️ Turnaround Time Comparison", 
             ["Traditional Search Time: 12 to 48 Hours (Blind speedboat searching).", 
              "New System Rescue Time: 15 to 45 Minutes (Direct GPS navigation).", 
              "Triage Speedup: 95% faster priority identification.", 
              "Network Uptime: 100% communication continuity during cell tower outages."], border_color=COLOR_GREEN)

    add_card(slide11, Inches(6.8), Inches(1.8), Inches(5.6), Inches(4.8), 
             "🎯 Key Value Deliverables", 
             ["Zero Human Loss Target: Prevents casualties by routing boats to roof-trapped victims first.", 
              "Resource Optimization: Eliminates duplicate boat dispatches.", 
              "Government Alignment: Seamless inter-agency sync between NDRF, SDMA & NDMA."], border_color=COLOR_CYAN)

    # -------------------------------------------------------------
    # SLIDE 12: Conclusion & Future Roadmap
    # -------------------------------------------------------------
    slide12 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(slide12)
    add_header(slide12, "11. Conclusion & Future Expansion", "Building Next-Generation Resilient Disaster Infrastructure")

    add_card(slide12, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8), 
             "🚀 Future Roadmap", 
             ["Satellite IoT Uplink: Direct integration with ISRO & Starlink satellite transceivers.", 
              "LoRaWAN Mesh Hardware: Deploying low-cost $5 LoRa emergency beacons in flood-prone villages.", 
              "Autonomous AI Drone Recon: Automatic thermal scanning for roof-trapped victims."], border_color=COLOR_CYAN)

    add_card(slide12, Inches(6.8), Inches(1.8), Inches(5.6), Inches(4.8), 
             "✨ Summary", 
             ["A lifesaving web network combining offline Web Bluetooth/Wi-Fi P2P mesh, GIS speedboat routing, and multi-agency government reporting.", 
              "Ready for deployment across Nepal, Assam, and Bihar.", 
              "Thank You!"], border_color=COLOR_GREEN)

    output_path = "NDRF_Flood_Rescue_System_Presentation.pptx"
    prs.save(output_path)
    print(f"Presentation saved successfully to: {os.path.abspath(output_path)}")

if __name__ == '__main__':
    create_presentation()
