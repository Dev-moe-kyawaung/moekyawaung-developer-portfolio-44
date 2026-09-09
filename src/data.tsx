export const profile = {
  name: "Moe Kyaw Aung",
  nameMM: "မိုးကျော်အောင်",
  handle: "@moekyawaung",
  title: "Senior Android Architect & Technical Founder",
  location: "Tachileik, Myanmar <-> Bangkok, Thailand",
  email: "moekyawaung@programmer.net",
  phone: "+95 9 889 000 889",
  secondPhone: "+959 666 000 050",
  github: "https://github.com/Dev-moe-kyawaung",
  gravatar: "https://gravatar.com/moekyawaung2026",
  avatar: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778527878/IMG_20260430_053105_uef0yr.png",
  quote: "Good software is not assembled. It is woven: one dependable thread crossing another until the pattern can carry weight.",
  building: "MoekyawTranslator - AI translation for Burmese and English",
};

export type Project = {
  id: number; code: string; title: string; kind: string; status: string; accent: string; icon: string; users: string;
  summary: string; context: string; weave: string; result: string; stack: string[]; url: string; x: number; y: number;
};

const common = { context: "A focused product needed to stay useful under real-world constraints.", result: "Shipped as a practical, measurable product with a clear path to the next version." };

export const projects: Project[] = [
  { ...common, id: 1, code: "W-01", title: "Social Dashboard", kind: "Realtime analytics", status: "LIVE", accent: "#4be3c2", icon: "SD", users: "1.2M", summary: "A multi-tenant social telemetry surface with live feeds and reactive reporting.", context: "Teams were watching five disconnected channels and making decisions from stale screenshots.", weave: "Kotlin + Compose presentation threads cross a StateFlow reducer, while Firebase and WebSocket data threads resolve into Room as the local truth.", result: "1.2M users reached with 99.95% uptime and fast incremental feature delivery.", stack: ["Kotlin", "Compose", "MVI", "Flow", "Firebase"], url: "https://github.com/moekyawaung-tech/social-dashboard", x: 16, y: 24 },
  { ...common, id: 2, code: "W-02", title: "PWA App", kind: "Offline web", status: "LIVE", accent: "#61c7f2", icon: "PW", users: "480K", summary: "An installable progressive web app that keeps working when the network does not.", context: "Field users needed a useful surface before the signal arrived, not a spinner while it failed.", weave: "A service-worker shell, Cache API, IndexedDB and push threads are woven into a stale-while-revalidate loop.", result: "480K installs with zero-latency offline entry and background sync on reconnect.", stack: ["Vue", "TypeScript", "Workbox", "IndexedDB"], url: "https://github.com/moekyawaung-tech/pwa-app", x: 42, y: 12 },
  { ...common, id: 3, code: "W-03", title: "POS Ultimate Pro Max", kind: "Merchant operating system", status: "FLAGSHIP", accent: "#ef9366", icon: "PO", users: "1,200 stores", summary: "Offline-first retail infrastructure for merchants across Myanmar and Thailand.", context: "A store could lose the internet and still needed to sell, print receipts, and sync every terminal later.", weave: "Room holds the ground state. WorkManager carries the sync thread. Hilt scopes feature modules. Firebase becomes an eventually-consistent cloud strand.", result: "1,200 stores live, 99.98% crash-free, and build time reduced by 68%.", stack: ["Kotlin", "Compose", "Hilt", "Room", "WorkManager", "Firebase"], url: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max", x: 73, y: 21 },
  { ...common, id: 4, code: "W-04", title: "Video Player", kind: "Adaptive media", status: "LIVE", accent: "#b39aff", icon: "VP", users: "820K", summary: "A smooth adaptive player with subtitles, picture-in-picture, and offline caching.", context: "Playback needed to feel calm across changing bandwidth, device classes, and screen sizes.", weave: "ExoPlayer, HLS, Media3, gesture zones and a cache manager interlock around one playback state machine.", result: "820K users served with stable playback and zero dropped-frame release targets.", stack: ["ExoPlayer", "Media3", "HLS", "Compose"], url: "https://github.com/moekyawaung-tech/video-player", x: 87, y: 47 },
  { ...common, id: 5, code: "W-05", title: "Game Collection", kind: "Canvas arcade", status: "LIVE", accent: "#e6c75c", icon: "GC", users: "2.1M", summary: "A modular mini-game hub with shared scores and a light physics layer.", context: "Small experiments became more valuable when players could find them in one reliable home.", weave: "A fixed-timestep game loop, Canvas renderer, Room leaderboard, and audio nodes share a small reactive spine.", result: "2.1M players and a stable 60 FPS target across the collection.", stack: ["Kotlin", "Compose", "Canvas", "Room"], url: "https://github.com/moekyawaung-tech/game-collection", x: 24, y: 65 },
  { ...common, id: 6, code: "W-06", title: "Weather", kind: "Utility / realtime", status: "LIVE", accent: "#61c7f2", icon: "WX", users: "690K", summary: "Hyperlocal weather with radar, alerts, and quiet information density.", context: "Forecasts matter most when the interface gets out of the way and the data remains timely.", weave: "Retrofit, location signals, cached forecasts and WorkManager combine into a resilient observation thread.", result: "690K users with live alerts and a resilient cached forecast experience.", stack: ["Compose", "Retrofit", "Room", "OpenWeather"], url: "https://github.com/moekyawaung-tech/Weather-app", x: 53, y: 59 },
  { ...common, id: 7, code: "W-07", title: "MoekyawTranslator", kind: "On-device AI", status: "BUILDING", accent: "#ef9366", icon: "MT", users: "12K waitlist", summary: "Burmese-English translation that can move from a cloud model to an on-device fallback.", context: "Language tools should be useful at the edge, especially when coverage and privacy are not guaranteed.", weave: "Claude API and quantized TFLite models become two complementary strands behind one Compose conversation surface.", result: "12K waitlist signups and a practical path to low-cost regional language AI.", stack: ["Claude API", "TFLite", "Kotlin", "Compose"], url: "https://github.com/Dev-moe-kyawaung/", x: 78, y: 72 },
  { ...common, id: 8, code: "W-08", title: "Lens Lite", kind: "Computer vision", status: "BETA", accent: "#b39aff", icon: "LL", users: "38K MAU", summary: "Camera-first capture that turns paper into organized, searchable notes.", context: "The camera was the fastest input device, but only if the processing could stay private and immediate.", weave: "CameraX, ML Kit, OCR and a local classifier are joined by a minimal state machine.", result: "38K monthly active users testing an on-device note workflow.", stack: ["CameraX", "ML Kit", "TFLite", "Room"], url: "https://github.com/moekyawaung-tech/Lens-lite", x: 10, y: 84 },
  { ...common, id: 9, code: "W-09", title: "Job Portal App", kind: "Marketplace", status: "LIVE", accent: "#4be3c2", icon: "JP", users: "320K", summary: "A job discovery and matching experience for a distributed regional workforce.", context: "Local talent needed a clear bridge to remote teams without a heavy desktop-first workflow.", weave: "Search, filters, realtime notifications and profiles are modular feature strands over Firebase services.", result: "320K users exploring roles, companies, and remote opportunities.", stack: ["Kotlin", "Firebase", "Compose", "Paging"], url: "https://github.com/moekyawaung-tech/Job-Portal-App", x: 42, y: 88 },
  { ...common, id: 10, code: "W-10", title: "Daily Planner", kind: "Productivity", status: "LIVE", accent: "#e6c75c", icon: "DP", users: "410K", summary: "A habit and planning surface built around small repeatable actions.", context: "The product needed to make progress visible without turning daily planning into another chore.", weave: "Room timelines, alarm scheduling and Compose snapshots form a calm loop from intention to reflection.", result: "410K installs with repeat-use loops and a lightweight offline core.", stack: ["Kotlin", "Room", "Compose", "AlarmManager"], url: "https://github.com/moekyawaung-tech/Daily-planner-app", x: 67, y: 91 },
  { ...common, id: 11, code: "W-11", title: "Hospital Lists MM", kind: "Civic utility", status: "LIVE", accent: "#ef9366", icon: "HM", users: "220K", summary: "A dependable emergency directory for Myanmar hospitals and care routes.", context: "In a crisis, a directory needs to remain readable and useful before network recovery.", weave: "Signed local data, location search, call actions and a small Room index are stitched for offline access.", result: "220K installs providing a simple civic utility under difficult conditions.", stack: ["Kotlin", "Room", "Maps", "Offline"], url: "https://github.com/Moekyawaung-cyber/Hospital-Lists", x: 92, y: 85 },
  { ...common, id: 12, code: "W-12", title: "Thailand Travel", kind: "Travel guide", status: "LIVE", accent: "#61c7f2", icon: "TH", users: "180K", summary: "A practical trip planner, map layer, and phrasebook for Thailand visitors.", context: "Travel information works better when language, place, and route are held in one pocket-sized flow.", weave: "Maps, phrase data, saved itineraries and local content share a simple cached feature graph.", result: "180K installs helping visitors move through Thailand with more confidence.", stack: ["Kotlin", "Maps", "i18n", "Room"], url: "https://github.com/moekyawaung-tech/thailand-travel", x: 83, y: 65 },
  { ...common, id: 13, code: "W-13", title: "Admin Dashboard", kind: "Operations", status: "LIVE", accent: "#b39aff", icon: "AD", users: "220K", summary: "Role-based operational control with charts, filters, and audit-friendly data views.", context: "Operations teams needed one place to see the system, not a collection of disconnected exports.", weave: "RBAC, chart streams, REST adapters and reusable UI modules keep the control surface extensible.", result: "A practical admin surface that scales from small teams to multi-tenant operations.", stack: ["React", "Node", "Recharts", "RBAC"], url: "https://github.com/Dev-moe-kyawaung/", x: 14, y: 43 },
  { ...common, id: 14, code: "W-14", title: "Money Tracker", kind: "Personal finance", status: "LIVE", accent: "#4be3c2", icon: "MK", users: "410K", summary: "A private finance log with budgets, goals, and visual reporting.", context: "People needed a fast, low-friction way to understand spending across currencies.", weave: "Room, encrypted preferences, currency transforms and chart models sit behind a focused entry loop.", result: "410K installs with a clear MMK and THB budgeting experience.", stack: ["Kotlin", "Room", "Encryption", "Charts"], url: "https://github.com/Dev-moe-kyawaung/", x: 33, y: 42 },
  { ...common, id: 15, code: "W-15", title: "Crypto Monitor", kind: "Web3 telemetry", status: "BETA", accent: "#e6c75c", icon: "CR", users: "260K", summary: "A watch surface for portfolio changes, alerts, and distributed market data.", context: "Fast-moving asset data needed a calmer layer for observation rather than another trading casino.", weave: "Fallback RPC providers, chart streams and secure wallet boundaries resolve through one view model.", result: "260K observers with secure separation between wallet state and market telemetry.", stack: ["Kotlin", "Web3", "WebSocket", "Keystore"], url: "https://github.com/Dev-moe-kyawaung/", x: 60, y: 39 },
  { ...common, id: 16, code: "W-16", title: "LEGEND!", kind: "Flagship collection", status: "LIVE", accent: "#ef9366", icon: "LG", users: "5.2M", summary: "The collection layer: a super-app pattern where utilities, media, and social threads meet.", context: "The long-term opportunity is not one more app. It is a coherent ecosystem of useful small surfaces.", weave: "Shared design primitives, modular navigation, analytics and account services provide the common fabric.", result: "5.2M users across a collection of focused experiences.", stack: ["Kotlin", "Compose", "Firebase", "CI/CD", "Design System"], url: "https://github.com/Dev-moe-kyawaung/", x: 51, y: 22 },
];

export const skillThreads = [
  { name: "Kotlin / Compose", value: 97, color: "#4be3c2", note: "primary thread" },
  { name: "Clean Architecture", value: 96, color: "#61c7f2", note: "structural thread" },
  { name: "Multi-module Systems", value: 95, color: "#b39aff", note: "scale thread" },
  { name: "Firebase / REST", value: 92, color: "#e6c75c", note: "service thread" },
  { name: "CI/CD & Testing", value: 93, color: "#ef9366", note: "delivery thread" },
  { name: "Security & Privacy", value: 88, color: "#4be3c2", note: "trust thread" },
  { name: "AI / TFLite", value: 86, color: "#b39aff", note: "edge thread" },
  { name: "Product Thinking", value: 91, color: "#61c7f2", note: "founder thread" },
];

export const architectureLayers = [
  { code: "L01", name: "PRESENTATION", desc: "Compose surfaces, state holders, navigation, accessibility", color: "#4be3c2" },
  { code: "L02", name: "DOMAIN", desc: "Pure Kotlin use cases, entities, repository contracts", color: "#61c7f2" },
  { code: "L03", name: "DATA", desc: "Room, Retrofit, Firebase adapters, mappers, sync", color: "#b39aff" },
  { code: "L04", name: "CORE", desc: "Design system, logging, security, networking primitives", color: "#e6c75c" },
];

export const timeline = [
  { y: "2019", t: "FIRST THREAD", d: "Java and XML. First app shipped to the Play Store." },
  { y: "2020", t: "KOTLIN NATIVE", d: "Kotlin-first migration across three production apps." },
  { y: "2021", t: "COMPOSE LAYER", d: "Jetpack Compose and MVVM become the default surface." },
  { y: "2022", t: "STRUCTURAL WEAVE", d: "Clean Architecture, Hilt, Flow, and multi-module boundaries." },
  { y: "2023", t: "DELIVERY THREAD", d: "GitHub Actions, Fastlane, screenshot testing, 90%+ coverage." },
  { y: "2024", t: "FOUNDER MODE", d: "POS Ultimate launches across 1,200 merchant stores." },
  { y: "2025", t: "EDGE INTELLIGENCE", d: "TFLite, Claude API, Lens Lite, and regional language work." },
  { y: "2026", t: "THREAD//STATE", d: "A public weave for the work, the products, and the next pattern." },
];

export const socials = [
  { name: "GitHub", handle: "Dev-moe-kyawaung", url: "https://github.com/Dev-moe-kyawaung" },
  { name: "LinkedIn", handle: "Moe Kyaw Aung", url: "https://www.linkedin.com/in/moe-kyaw-aung-2653093a1" },
  { name: "YouTube", handle: "Dev Channel", url: "https://www.youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG" },
  { name: "Bluesky", handle: "moekyawaung96", url: "https://bsky.app/profile/moekyawaung96.bsky.social" },
  { name: "Gravatar", handle: "moekyawaung2026", url: "https://gravatar.com/moekyawaung2026" },
  { name: "Vimeo", handle: "user252414232", url: "https://vimeo.com/user252414232" },
  { name: "Tumblr", handle: "moekyawaung", url: "https://www.tumblr.com/moekyawaung" },
  { name: "Flickr", handle: "204037451@N06", url: "https://www.flickr.com/people/204037451@N06" },
];

export const emails = [
  "moekyawaung@programmer.net", "moekyawaung@technologist.com", "moekyawaung@engineer.com", "moekyawaung@techie.com",
  "moekyawaung@collector.org", "moekyawaung@graphic-designer.com", "moekyawaung@cybergal.com", "moekyawaung@webname.com",
  "moekyawaung@hackermail.com", "moekyawaung@graduate.org", "moekyawaung@asia.com", "moekyawaung@contractor.net",
  "moekyawaung@linuxmail.org", "moekyawaung@usa.com", "moekyawaung@europe.com", "moekyawaung@mail.com",
  "moekyawaung@iname.com", "moekyawaung@socialogist.com", "moekyawaung@secretary.net", "moekyawaung@publicist.com",
];

export const githubPages = [
  "moekyawaung-tech.github.io", "moekyawaung.github.io", "moekyawaung-senior.github.io", "moekyawaung-cyber.github.io",
  "moekyawaung-bangkok.github.io", "moekyawaung-google.github.io", "moekyawaung-microsoft.github.io", "moekyawaung-linux.github.io",
  "moekyawaung-hack.github.io", "moekyawaung-web.github.io", "moekyawaung-designer.github.io", "moekyawaung2026.github.io",
  "moekyaw-developer.github.io", "moekyawaung-edu.github.io", "moekyawaung-creator.github.io", "moekyawaung-webdeveloper.github.io",
];

export const lovableApps = [
  "happy-cv-creator.lovable.app", "moekyawaung.lovable.app", "the-cv-palette.lovable.app", "moekyawaung-dev.lovable.app",
  "dev-moekyawaung.lovable.app", "moekyawaungmybio.lovable.app", "joy-codify-life.lovable.app", "app-skill-gallery.lovable.app",
  "cv-beacon.lovable.app", "profile-persuasion-hub.lovable.app", "spark-coach-create.lovable.app", "color-code-chronicles.lovable.app",
  "friendly-haven-io.lovable.app", "pixel-perfect-snap-39.lovable.app", "devmoekyaw.lovable.app", "moekyawaung-myanmar.lovable.app",
];

export const designTokens = [
  { name: "WARP", value: "#071312", use: "deep canvas" }, { name: "EMERALD", value: "#4BE3C2", use: "primary thread" },
  { name: "SKY", value: "#61C7F2", use: "data strand" }, { name: "ORCHID", value: "#B39AFF", use: "system layer" },
  { name: "CORAL", value: "#EF9366", use: "human signal" }, { name: "WAX", value: "#E6C75C", use: "highlight" },
];

export const weaveAI = {
  greeting: "I am the Weave Engine. I read the intersections between Moe's skills, systems, and products. Pull a thread and I will show you the pattern.",
  answers: {
    architecture: { text: "The strongest pattern is separation with intentional crossings: Compose at the surface, pure Kotlin in the domain, and adapters at the data edge. The weave stays flexible because no UI strand owns the core logic.", nodes: ["PRESENTATION", "DOMAIN", "DATA", "CORE"] },
    scale: { text: "Scale is not a single strand. It is the intersection of modular Gradle boundaries, lazy UI state, offline persistence, observability, and a release ritual that catches regressions before users do.", nodes: ["MODULE BOUNDARIES", "LAZY STATE", "OFFLINE TRUTH", "OBSERVABILITY", "SAFE RELEASE"] },
    founder: { text: "The founder pattern is pragmatic: find a regional problem, keep the first loop small, ship an offline-capable MVP, then let actual usage decide which thread deserves to grow.", nodes: ["REGIONAL PROBLEM", "SMALL MVP", "OFFLINE LOOP", "MEASURE", "GROW"] },
    security: { text: "The trust weave combines Keystore-backed secrets, encrypted local storage, TLS certificate pinning, biometric gates, R8 hardening, and a threat model reviewed before polish.", nodes: ["THREAT MODEL", "KEYSTORE", "ENCRYPTED STORE", "PINNED TRANSPORT", "VERIFY"] },
    testing: { text: "Testing follows the shape of risk: fast unit threads first, integration around persistence and network edges, then Compose UI and screenshot checks inside CI.", nodes: ["UNIT", "INTEGRATION", "UI", "SCREENSHOT", "RELEASE"] },
    contact: { text: "The clearest path is moekyawaung@programmer.net. Moe is open to senior mobile architecture, founding engineer, and focused MVP work.", nodes: ["EMAIL", "ARCHITECTURE", "MVP", "FOUNDING"] },
  },
};