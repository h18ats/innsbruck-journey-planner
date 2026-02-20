import { useState } from "react";

const STAGES = [
  {
    id: 0,
    time: "19:00 GMT",
    localTime: "19:00",
    title: "Drive to Jim's House",
    location: "GU47 9AG → Upper Gatton Park, Reigate",
    icon: "🚗",
    type: "drive",
    tagColor: "#ffd93d",
    tag: "45 MIN DRIVE",
    weather: { temp: "9°C", condition: "Overcast", icon: "🌥️", wind: "12 km/h SW", humidity: "70%" },
    description: "Drive from Sandhurst/Crowthorne to Jim's house at Upper Gatton Park near Reigate. About 30 miles via the M3 and M25/M23. Staying the night before means you're only 15 minutes from Gatwick in the morning — smart move for a 7:45 AM flight.",
    walkthrough: [
      "🛣️ Route: GU47 → A30 → M3 → M25 → M23 → Upper Gatton Park",
      "⏱️ Distance: ~30 miles, Time: ~45 min (evening traffic should be light)",
      "📸 M25 average speed cameras between J8–J10 — 70 mph enforced",
      "🎒 Pack ski gear, passport, boarding passes tonight",
      "❄️ Don't forget: base layers, ski socks, goggles, sunscreen",
      "⏰ Set alarm for 5:00 AM — Uber pickup at 5:30 AM"
    ],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    imageAlt: "Evening motorway driving"
  },
  {
    id: 1,
    time: "05:30 GMT",
    localTime: "05:30",
    title: "Uber to Gatwick Airport",
    location: "Upper Gatton Park → London Gatwick South Terminal",
    icon: "🚕",
    type: "transfer",
    tagColor: "#a78bfa",
    tag: "15 MIN",
    weather: { temp: "6°C", condition: "Clear", icon: "🌙", wind: "8 km/h W", humidity: "80%" },
    description: "Quick 15-minute Uber ride from Jim's to Gatwick South Terminal. BA operates from the South Terminal at Gatwick. You want to be at the airport by 6:00 AM for check-in and bag drop — gives you nearly 2 hours before the 7:45 departure.",
    walkthrough: [
      "⏰ Wake up: 5:00 AM — quick shower, grab bags",
      "🚕 Uber pickup: 5:30 AM — pre-book the night before",
      "📍 Distance: ~6 miles, ~15 min drive",
      "🏢 Drop-off: Gatwick South Terminal departures (Level 1)",
      "✈️ BA uses South Terminal — Zone A check-in",
      "💡 Tip: Your car stays safe at Jim's — you'll Uber back to collect it on Tuesday night"
    ],
    image: "https://images.unsplash.com/photo-1449965408869-ebd13bc0e4c1?w=800&q=80",
    imageAlt: "Early morning drive"
  },
  {
    id: 2,
    time: "06:00 GMT",
    localTime: "06:00",
    title: "Arrive at Gatwick South Terminal",
    location: "London Gatwick Airport — South Terminal",
    icon: "🏢",
    type: "airport",
    tagColor: "#6c9bff",
    tag: "AIRPORT",
    weather: { temp: "7°C", condition: "Clear", icon: "🌅", wind: "10 km/h W", humidity: "78%" },
    description: "British Airways operates from the South Terminal at Gatwick. Head to Zone A for BA check-in. Andrew has Economy Plus (includes seat selection + checked bag). James & Lee have Economy Basic — no checked bags or seat selection included, those are extra.",
    walkthrough: [
      "🚪 Enter South Terminal departures on Level 1",
      "📋 BA check-in is in Zone A — short walk from the entrance",
      "🎒 Andrew: Economy Plus — checked bag included, use Auto Bag Drop",
      "⚠️ James & Lee: Economy Basic — NO checked bag or seat selection included",
      "💰 Add checked bags at check-in if needed (~£40-50 per bag)",
      "📱 Download BA app for mobile boarding passes"
    ],
    image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&q=80",
    imageAlt: "Airport terminal departure hall"
  },
  {
    id: 3,
    time: "06:30 GMT",
    localTime: "06:30",
    title: "Security & Departures Lounge",
    location: "Gatwick South — Security → Airside",
    icon: "🔒",
    type: "airport",
    tagColor: "#6c9bff",
    tag: "SECURITY",
    weather: { temp: "7°C", condition: "Clear", icon: "🌅", wind: "10 km/h W", humidity: "78%" },
    description: "Pass through security and into the departures lounge. Good time for a pre-flight breakfast — Gatwick South has plenty of options including some great new additions. Gate is usually allocated ~45 min before departure.",
    walkthrough: [
      "🧳 Liquids in clear bag (under 100ml each), electronics out",
      "🍳 Breakfast options airside: Wetherspoons, Nando's, Pret, Five Guys",
      "🍺 Big Smoke Taphouse — craft beers if you're feeling brave at 6:30 AM",
      "🆕 New in 2026: Dishoom, Five Guys, Greggs (near Gates 45-50)",
      "💡 Tip: Pret is 25-30% cheaper landside vs airside — grab coffee before security",
      "📺 Check departure boards — BA gate allocated ~45 min before boarding",
      "🚶 BA gates are typically Gates 1-19 in South Terminal"
    ],
    image: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=800&q=80",
    imageAlt: "Airport departures lounge"
  },
  {
    id: 4,
    time: "07:15 GMT",
    localTime: "07:15",
    title: "Gate Call — Board BA2620",
    location: "Gatwick South — Gate (TBC)",
    icon: "🚶",
    type: "boarding",
    tagColor: "#ff6b6b",
    tag: "BOARDING",
    weather: { temp: "7°C", condition: "Clear", icon: "🌅", wind: "10 km/h W", humidity: "78%" },
    description: "Board British Airways BA2620, operated by BA Euroflyer. Direct flight to Innsbruck — just 2 hours. Andrew is in Economy Plus (priority boarding, extra legroom). James and Lee are in Economy Basic.",
    walkthrough: [
      "✈️ Flight: BA2620 (operated by BA Euroflyer)",
      "⏰ Scheduled departure: 7:45 AM GMT",
      "🛬 Arrives Innsbruck: 10:45 AM CET (local time, +1hr)",
      "🎫 Andrew: Economy Plus — priority boarding, better seat",
      "🎫 James & Lee: Economy Basic — board with main cabin",
      "⏱️ Flight duration: 2 hours, nonstop",
      "💡 Tip: Sit on the RIGHT side for mountain views on approach to Innsbruck"
    ],
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80",
    imageAlt: "British Airways aircraft"
  },
  {
    id: 5,
    time: "07:45 GMT",
    localTime: "08:45 CET",
    title: "✈️ In Flight — Over the Alps",
    location: "Cruising at 37,000ft",
    icon: "✈️",
    type: "flight",
    tagColor: "#a78bfa",
    tag: "IN FLIGHT",
    weather: { temp: "-56°C", condition: "Clear above clouds", icon: "☀️", wind: "Jet stream", humidity: "N/A" },
    description: "2-hour flight southeast over France and into the heart of the Austrian Alps. The approach into Innsbruck is legendary — one of Europe's most dramatic landings, threading through steep Alpine valleys. If visibility is good, you'll see snow-capped peaks right outside the window.",
    walkthrough: [
      "🕐 Flight duration: 2 hours",
      "🗺️ Route: Southeast over Channel → across France → Swiss/Austrian Alps",
      "🏔️ Innsbruck approach is SPECTACULAR — steep descent through the Inn Valley",
      "📱 BA Euroflyer has no WiFi on short-haul",
      "☕ Light refreshments available for purchase on board",
      "⏰ Set your watch forward 1 hour — Austria is CET (UTC+1)",
      "🌅 Today is the Spring Equinox (20 March) — sunrise 06:17 CET in Innsbruck"
    ],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&q=80",
    imageAlt: "View from airplane window over Alps"
  },
  {
    id: 6,
    time: "10:45 CET",
    localTime: "10:45",
    title: "Land at Innsbruck Airport",
    location: "Innsbruck Kranebitten Airport (INN)",
    icon: "🛬",
    type: "airport",
    tagColor: "#6c9bff",
    tag: "ARRIVAL INN",
    weather: { temp: "8°C", condition: "Partly Cloudy", icon: "⛅", wind: "10 km/h", humidity: "65%" },
    description: "Welcome to Innsbruck! Small, efficient airport — single terminal, so you can't get lost. Surrounded by mountains on all sides. Baggage reclaim is quick (usually 5-15 min). Car hire desks are in the multi-storey car park, a short covered walkway from arrivals.",
    walkthrough: [
      "🛬 Small regional airport — single terminal, very easy to navigate",
      "🛂 UK passport: use manual queue (no e-gates at INN)",
      "🧳 Baggage reclaim: usually 5-15 min (small airport, fast turnaround)",
      "🚗 Car hire: exit arrivals → follow covered walkway to car park building",
      "📍 All rental desks on ground floor of multi-storey car park (right-hand side)",
      "🏢 Available: Sixt, Hertz, Europcar, Avis, Budget, Enterprise",
      "💡 Tip: ATM and tourist info desk available in arrivals hall"
    ],
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    imageAlt: "Mountain airport with Alps in background"
  },
  {
    id: 7,
    time: "11:15 CET",
    localTime: "11:15",
    title: "Pick Up Rental Car",
    location: "Innsbruck Airport — Car Hire Centre",
    icon: "🚗",
    type: "car",
    tagColor: "#4ecdc4",
    tag: "CAR HIRE",
    weather: { temp: "8°C", condition: "Partly Cloudy", icon: "⛅", wind: "10 km/h", humidity: "65%" },
    description: "Collect your rental car from the multi-storey car park. You need at least a compact estate or intermediate for 3 people plus ski gear and bags. Winter tyres are mandatory and should be fitted. Check about snow chains.",
    walkthrough: [
      "🚗 Recommended size: Intermediate/Estate — you need room for 3 + ski boots + bags",
      "❄️ Winter tyres: MANDATORY Nov–Apr — should already be fitted on rental",
      "⛓️ Snow chains: ask if included or available as add-on",
      "🏷️ Motorway Vignette: should be included with Austrian rental — CONFIRM at desk",
      "💰 Arlberg Tunnel toll: separate charge ~€10-18 per trip (not covered by vignette)",
      "⛽ Check fuel policy — usually full-to-full",
      "📱 Download Waze for real-time traffic and speed cameras"
    ],
    image: "https://images.unsplash.com/photo-1449965408869-ebd13bc0e4c1?w=800&q=80",
    imageAlt: "Car on mountain road"
  },
  {
    id: 8,
    time: "11:30 CET",
    localTime: "11:30",
    title: "Drive: Innsbruck → St Anton am Arlberg",
    location: "A12 Inntal Autobahn → S16 Arlberg Schnellstraße",
    icon: "⛰️",
    type: "drive",
    tagColor: "#ffd93d",
    tag: "1H 15M DRIVE",
    weather: { temp: "8°C → 2°C", condition: "Partly Cloudy → Overcast", icon: "⛅→🌥️", wind: "15 km/h", humidity: "70%" },
    description: "Head west on the A12 Inntal motorway along the Inn Valley, passing Landeck, then take the S16 Arlberg expressway south to St Anton. The road climbs through spectacular Alpine scenery — you'll pass through the Arlberg tunnel. Temperature drops as you gain altitude.",
    walkthrough: [
      "🛣️ Route: Innsbruck → A12 West → Landeck → S16 South → St Anton",
      "⏱️ Distance: ~100 km, Time: ~1hr 15min",
      "⚡ Speed limit: 130 km/h motorway, 100 km/h S-road, 50 km/h towns",
      "🚇 Arlberg Tunnel: 14 km long — toll ~€10-18 one-way",
      "📸 Speed cameras throughout — well-signposted",
      "🌡️ Temperature drops from 8°C to 2°C as you climb",
      "🏔️ Stunning scenery — Inn Valley with snow-capped peaks on both sides",
      "💡 Aim to arrive St Anton ~12:45 — park, grab lunch, hit the slopes by 1:30 PM"
    ],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    imageAlt: "Alpine motorway through mountains"
  },
  {
    id: 9,
    time: "12:45 CET",
    localTime: "12:45",
    title: "Arrive St Anton — First Afternoon Skiing!",
    location: "St Anton am Arlberg — Ski Area",
    icon: "⛷️",
    type: "skiing",
    tagColor: "#4ecdc4",
    tag: "SKIING",
    weather: { temp: "-3°C", condition: "Partly Cloudy", icon: "⛅", wind: "12 km/h", humidity: "65%" },
    description: "You've made it to St Anton! Park up, grab a quick lunch, rent any gear you need, and get on the mountain. Lifts run until about 16:30. You should get 2-3 hours of skiing in this afternoon. The snow should be excellent — March is one of the best months for coverage.",
    walkthrough: [
      "🅿️ Park near the Galzigbahn gondola — central car park available",
      "🍕 Quick lunch: grab something fast in the village before hitting the slopes",
      "🎿 Lift pass: buy at the ticket office or online at skiarlberg.at",
      "❄️ Snow depth: ~274cm at summit (2,811m), ~71cm at base (1,305m)",
      "🌡️ On-piste: -3°C at altitude, dress in layers",
      "⏰ Lifts close ~16:30 — aim to be on the mountain by 1:30 PM",
      "🏔️ St Anton ski area: 300+ km of runs across the Arlberg region",
      "🍺 Après-ski starts ~15:30 — MooserWirt and Krazy Kanguruh on the slopes"
    ],
    image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80",
    imageAlt: "Skier on Alpine slope"
  },
  {
    id: 10,
    time: "17:00 CET",
    localTime: "17:00",
    title: "Après-Ski in St Anton!",
    location: "MooserWirt / Krazy Kanguruh / Village bars",
    icon: "🍺",
    type: "apres",
    tagColor: "#ff6b6b",
    tag: "APRÈS-SKI",
    weather: { temp: "0°C", condition: "Clear", icon: "🌅", wind: "5 km/h", humidity: "60%" },
    description: "St Anton is THE après-ski capital of the Alps. After your first afternoon on the slopes, celebrate with the legendary après scene. MooserWirt (on the slopes above the village) is the most famous — table-top dancing, 5,000 litres of beer a day. Krazy Kanguruh is St Anton's oldest après bar, owned by Olympic champion Mario Matt.",
    walkthrough: [
      "🍺 MooserWirt: legendary après bar ON the slopes — ski to it",
      "🦘 Krazy Kanguruh: St Anton's oldest après bar (since 1965)",
      "🎵 Both open from early afternoon — the party peaks 15:30-18:00",
      "🍻 Beer ~€5-7, Jägermeister ~€3-4",
      "⚠️ Don't overdo it — you need to drive to Landeck tonight!",
      "🚗 Drive to Hotel Schrofenstein in Landeck: only 20 min",
      "💡 Alternatively: skip après, drive to Landeck first, then dinner there"
    ],
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    imageAlt: "Après-ski bar scene"
  },
  {
    id: 11,
    time: "18:30 CET",
    localTime: "18:30",
    title: "Drive to Hotel Schrofenstein, Landeck",
    location: "St Anton → S16 → Landeck",
    icon: "🌙",
    type: "drive",
    tagColor: "#a78bfa",
    tag: "20 MIN",
    weather: { temp: "-1°C → 1°C", condition: "Clear", icon: "🌙", wind: "5 km/h", humidity: "65%" },
    description: "Short 20-minute drive east from St Anton to Landeck for your first night at Hotel Schrofenstein. It's getting dark (sunset 18:26) so watch for ice on the road. The hotel is right in the centre of Landeck — easy to find.",
    walkthrough: [
      "🛣️ Route: St Anton → S16 East → Landeck exit",
      "⏱️ Distance: ~25 km, Time: ~20 min",
      "🌙 Sunset was 18:26 today — driving in the dark",
      "🧊 Watch for black ice — temperature around freezing",
      "🚇 Arlberg Tunnel toll applies (~€10-18)",
      "🅿️ Hotel has parking available",
      "💡 Designated driver tonight, lads!"
    ],
    image: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800&q=80",
    imageAlt: "Mountain road at dusk"
  },
  {
    id: 12,
    time: "19:00 CET",
    localTime: "19:00",
    title: "Hotel Schrofenstein ★★★★",
    location: "Landeck Town Centre",
    icon: "🏨",
    type: "arrival",
    tagColor: "#4ecdc4",
    tag: "✅ CHECK-IN",
    weather: { temp: "1°C", condition: "Clear", icon: "🌙", wind: "5 km/h", humidity: "65%" },
    description: "Check in to Hotel Schrofenstein — a 4-star hotel right in the centre of Landeck. €246 for a triple room. The hotel has a spa, pool, restaurant and bar. Perfect for your first night — dump your bags, freshen up, and head to the restaurant or explore Landeck for dinner.",
    walkthrough: [
      "🅿️ Park in hotel parking",
      "🚪 Head to reception — check in, triple room booked",
      "💰 Cost: €246 for the night (triple room, 3 adults)",
      "♨️ Spa and pool available — great after a day of travel and skiing",
      "🍽️ Hotel restaurant for dinner, or explore Landeck town",
      "⭐ 4-star hotel, 8.0 review rating",
      "⏰ Tomorrow: check out, drive 20 min to St Anton, check into Hotel Kirchplatz"
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    imageAlt: "Hotel lobby"
  }
];

const RESTAURANTS = [
  {
    name: "MooserWirt",
    location: "On the slopes above St Anton village",
    distance: "Ski to it! (above the village)",
    rating: "4.5 ★ (legendary)",
    price: "€€",
    cuisine: "Après-Ski Bar — Beer, Shots, Party",
    hours: "Early afternoon – evening",
    description: "Self-proclaimed 'baddest après-ski bar on the Arlberg.' Table-top dancing, Euro-pop, 65 bar staff serving around 5,000 litres of beer per day in peak season. You ski to it — it's on the slopes above the village. This is THE après-ski experience.",
    tip: "Go early (3:30 PM) for the best atmosphere. It gets absolutely rammed by 4 PM. Wear your ski boots — you're on the slope!",
    recommended: "🥇 Best for: The ultimate après-ski experience",
    color: "#ff6b6b"
  },
  {
    name: "Krazy Kanguruh",
    location: "On the slope down to St Anton",
    distance: "Ski to it! (on the slope)",
    rating: "4.4 ★ (275 reviews)",
    price: "€€",
    cuisine: "Après-Ski Bar & Restaurant — Burgers, Bar Food",
    hours: "Kitchen 11:00–18:00, drinks until 20:00",
    description: "St Anton's oldest après-ski bar, opened in 1965 and owned by Olympic champion Mario Matt. All food cooked fresh with one of the biggest menus on the mountain. Theme events including Aussie Day BBQs. Located on the slope down to St Anton.",
    tip: "The food here is surprisingly good for a slope-side bar. Try the burgers while watching the sun set over the mountains.",
    recommended: "🥇 Best for: Après with proper food",
    color: "#ffd93d"
  },
  {
    name: "Fuhrmannstube by Buffy",
    location: "Dorfstrasse 74, St Anton (village centre)",
    distance: "1 min walk from Hotel Kirchplatz!",
    rating: "4.3 ★ — Ranked #7 of 91 restaurants",
    price: "€",
    cuisine: "Traditional Austrian — Schnitzel, Venison, Strudel",
    hours: "10:00 – 22:00",
    description: "Brilliant traditional Austrian bistro right in the village centre — literally next door to Hotel Kirchplatz. Wiener schnitzel, venison, kaiserschmarrn, apple strudel. Generous portions, friendly staff, incredible value at ~€50 per person for 3 courses with drinks.",
    tip: "No booking policy at busy times but usually seated within 10-15 min. The schnitzel is enormous — come hungry!",
    recommended: "🥇 Best for: Best value traditional dinner, right next to your hotel",
    color: "#4ecdc4"
  },
  {
    name: "Alte Stube im Schwarzen Adler",
    location: "Hotel Schwarzer Adler, St Anton",
    distance: "3 min walk from Hotel Kirchplatz",
    rating: "4.6 ★ — Gault & Millau recognised",
    price: "€€€",
    cuisine: "Fine Dining — Modern Tyrolean",
    hours: "Dinner from 19:00",
    description: "A 400-year-old Tyrolean parlour ('Stube') — one of the most special dining experiences in St Anton. Head chef Stephan Dialer creates sophisticated dishes using local ingredients. Intimate 30-seat dining room. International wine list. Gault & Millau recognised.",
    tip: "Book well in advance — only 30 seats. Worth it for a special night out. Dress smart-casual.",
    recommended: "🥇 Best for: Special occasion / treat-yourselves dinner",
    color: "#a78bfa"
  },
  {
    name: "Hospiz Alm",
    location: "St. Christoph am Arlberg (one stop along)",
    distance: "10 min drive from St Anton",
    rating: "4.7 ★ — World famous",
    price: "€€€",
    cuisine: "Fine Dining / Mountain Hut — Grill, Tyrolean, Wine",
    hours: "From 10:00 daily, evening dining from 19:00",
    description: "World-famous mountain restaurant with the legendary Wine Dome — the world's largest large-bottle wine cellar with 7,000+ magnum Bordeaux bottles. Timber-clad hut with open fireplace. Rustic by day (gröstl, goulash, ribs), fine dining in the evening.",
    tip: "The wine cellar tour is a must — ask about it when you arrive. Worth the short drive to St. Christoph.",
    recommended: "🥇 Best for: Bucket-list dining experience",
    color: "#6c9bff"
  }
];

const TRIP_SUMMARY = {
  days: [
    { date: "Thu 19 Mar", label: "Travel to Jim's", detail: "Drive GU47 9AG → Upper Gatton Park" },
    { date: "Fri 20 Mar", label: "Travel Day + First Ski", detail: "LGW → Innsbruck → St Anton → Landeck" },
    { date: "Sat 21 Mar", label: "Ski Day 2", detail: "Check into Hotel Kirchplatz, ski all day" },
    { date: "Sun 22 Mar", label: "Ski Day 3", detail: "Ski all day in St Anton" },
    { date: "Mon 23 Mar", label: "Ski Day 4", detail: "Ski all day — last full day" },
    { date: "Tue 24 Mar", label: "Ski + Travel Home", detail: "Ski morning → drive to INN → EZY8696 → LGW" },
  ],
  costs: [
    { item: "BA outbound (3 pax)", cost: "£207.64" },
    { item: "easyJet return (3 pax)", cost: "€277 (~£235)" },
    { item: "Hotel Schrofenstein (1 night, triple)", cost: "€246 (~£208)" },
    { item: "Car hire 4 days (estimate)", cost: "~€250 (~£212)" },
    { item: "Arlberg tunnel tolls (est.)", cost: "~€60–100" },
  ]
};

export default function JourneyPlanner() {
  const [activeStage, setActiveStage] = useState(0);
  const [view, setView] = useState("journey"); // journey | restaurants | summary
  const [animKey, setAnimKey] = useState(0);

  const stage = STAGES[activeStage];
  const progress = (activeStage / (STAGES.length - 1)) * 100;

  const goTo = (idx) => {
    setActiveStage(idx);
    setAnimKey(k => k + 1);
    setView("journey");
  };

  const typeColors = {
    drive: "#ffd93d",
    transfer: "#a78bfa",
    airport: "#6c9bff",
    boarding: "#ff6b6b",
    flight: "#a78bfa",
    car: "#4ecdc4",
    skiing: "#4ecdc4",
    apres: "#ff6b6b",
    arrival: "#4ecdc4"
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", background: "#0a0d12", color: "#e4e8f0", minHeight: "100vh" }}>
      {/* Progress */}
      <div style={{ position: "fixed", top: 0, left: 0, width: `${progress}%`, height: 3, background: "linear-gradient(90deg, #4ecdc4, #6c9bff, #a78bfa, #ff6b6b)", zIndex: 100, transition: "width 0.5s ease" }} />

      {/* Header */}
      <header style={{ padding: "1.5rem 2rem", borderBottom: "1px solid #1e2433", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", position: "sticky", top: 0, background: "rgba(10,13,18,0.95)", backdropFilter: "blur(10px)", zIndex: 90 }}>
        <div>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "#4ecdc4", textTransform: "uppercase", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, background: "#4ecdc4", borderRadius: "50%", animation: "pulse 2s infinite" }} />
            Ski Trip Planner — 19–24 Mar 2026
          </div>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 700, margin: 0 }}>
            Gatwick <span style={{ color: "#4ecdc4" }}>→</span> Innsbruck <span style={{ color: "#4ecdc4" }}>→</span> St Anton
          </h1>
          <div style={{ fontSize: "0.75rem", color: "#6b7588", marginTop: 2 }}>
            Andrew Batty · James Herbert · Lee Curtis
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setView("journey")} style={{ padding: "8px 16px", borderRadius: 8, border: view === "journey" ? "1px solid #4ecdc4" : "1px solid #252b38", background: view === "journey" ? "rgba(78,205,196,0.1)" : "#14181f", color: view === "journey" ? "#4ecdc4" : "#8892a4", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>🗺 Journey</button>
          <button onClick={() => setView("restaurants")} style={{ padding: "8px 16px", borderRadius: 8, border: view === "restaurants" ? "1px solid #ff6b6b" : "1px solid #252b38", background: view === "restaurants" ? "rgba(255,107,107,0.1)" : "#14181f", color: view === "restaurants" ? "#ff6b6b" : "#8892a4", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>🍽 Eat & Drink</button>
          <button onClick={() => setView("summary")} style={{ padding: "8px 16px", borderRadius: 8, border: view === "summary" ? "1px solid #a78bfa" : "1px solid #252b38", background: view === "summary" ? "rgba(167,139,250,0.1)" : "#14181f", color: view === "summary" ? "#a78bfa" : "#8892a4", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>📋 Trip Summary</button>
        </div>
      </header>

      {view === "journey" ? (
        <div style={{ display: "flex", minHeight: "calc(100vh - 80px)" }}>
          {/* Sidebar */}
          <aside style={{ width: 280, minWidth: 280, borderRight: "1px solid #1e2433", overflowY: "auto", background: "#0e1118", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "1rem", borderBottom: "1px solid #1e2433" }}>
              <div style={{ fontSize: "0.7rem", color: "#8892a4", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Journey Steps ({STAGES.length})</div>
              <div style={{ display: "flex", gap: 4 }}>
                {STAGES.map((s, i) => (
                  <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= activeStage ? typeColors[s.type] || "#4ecdc4" : "#252b38", transition: "background 0.3s" }} />
                ))}
              </div>
            </div>
            {STAGES.map((s, i) => (
              <button key={i} onClick={() => goTo(i)} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
                background: i === activeStage ? "rgba(78,205,196,0.08)" : "transparent",
                border: "none", borderLeft: i === activeStage ? `3px solid ${typeColors[s.type]}` : "3px solid transparent",
                color: i === activeStage ? "#e4e8f0" : "#6b7588", cursor: "pointer", textAlign: "left",
                transition: "all 0.2s", width: "100%", fontFamily: "inherit"
              }}>
                <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{s.icon}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "0.65rem", color: typeColors[s.type], fontWeight: 600, fontFamily: "monospace" }}>{s.time}</div>
                  <div style={{ fontSize: "0.82rem", fontWeight: i === activeStage ? 600 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</div>
                </div>
              </button>
            ))}
          </aside>

          {/* Main Content */}
          <main style={{ flex: 1, overflowY: "auto", padding: 0 }} key={animKey}>
            {/* Hero Image */}
            <div style={{ position: "relative", width: "100%", height: 300, overflow: "hidden", background: "#14181f" }}>
              <img src={stage.image} alt={stage.imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6, transition: "opacity 0.5s" }} onError={(e) => { e.target.style.display = "none"; }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0d12, transparent 50%)" }} />
              <div style={{ position: "absolute", bottom: 24, left: 32, right: 32 }}>
                <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 6, background: `${stage.tagColor}22`, border: `1px solid ${stage.tagColor}44`, color: stage.tagColor, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 8 }}>{stage.tag}</div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 700, margin: "0 0 4px", lineHeight: 1.2 }}>{stage.title}</h2>
                <div style={{ fontSize: "0.9rem", color: "#8892a4" }}>{stage.location}</div>
              </div>
              <div style={{ position: "absolute", top: 16, right: 24 }}>
                <div style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: "1.4rem" }}>{stage.weather.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "1rem", fontFamily: "monospace" }}>{stage.weather.temp}</div>
                    <div style={{ fontSize: "0.7rem", color: "#8892a4" }}>{stage.weather.condition}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 24 }}>
                {[
                  { label: "Time", value: stage.time },
                  { label: "Temperature", value: stage.weather.temp, color: "#4ecdc4" },
                  { label: "Wind", value: stage.weather.wind },
                  { label: "Humidity", value: stage.weather.humidity }
                ].map((card, i) => (
                  <div key={i} style={{ background: "#14181f", borderRadius: 12, padding: "14px 18px", border: "1px solid #1e2433" }}>
                    <div style={{ fontSize: "0.65rem", color: "#8892a4", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{card.label}</div>
                    <div style={{ fontWeight: 700, fontFamily: "monospace", fontSize: "1.1rem", color: card.color || "#e4e8f0" }}>{card.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: "#14181f", borderRadius: 14, padding: "20px 24px", border: "1px solid #1e2433", marginBottom: 24 }}>
                <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "#c0c8d8", margin: 0 }}>{stage.description}</p>
              </div>

              <div style={{ background: "#14181f", borderRadius: 14, padding: "20px 24px", border: "1px solid #1e2433", marginBottom: 24 }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: stage.tagColor }}>▸</span> Step-by-Step Walkthrough
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {stage.walkthrough.map((step, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 14px", background: "#0e1118", borderRadius: 10, borderLeft: `3px solid ${stage.tagColor}33` }}>
                      <span style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "#c0c8d8" }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 24 }}>
                <button onClick={() => activeStage > 0 && goTo(activeStage - 1)} disabled={activeStage === 0} style={{ flex: 1, padding: "14px 20px", borderRadius: 12, border: "1px solid #252b38", background: "#14181f", color: activeStage > 0 ? "#e4e8f0" : "#3a4050", cursor: activeStage > 0 ? "pointer" : "default", fontSize: "0.9rem", fontWeight: 600, fontFamily: "inherit" }}>
                  ← Previous Step
                </button>
                <button onClick={() => activeStage < STAGES.length - 1 && goTo(activeStage + 1)} disabled={activeStage === STAGES.length - 1} style={{ flex: 1, padding: "14px 20px", borderRadius: 12, border: `1px solid ${activeStage < STAGES.length - 1 ? "#4ecdc4" : "#252b38"}`, background: activeStage < STAGES.length - 1 ? "rgba(78,205,196,0.1)" : "#14181f", color: activeStage < STAGES.length - 1 ? "#4ecdc4" : "#3a4050", cursor: activeStage < STAGES.length - 1 ? "pointer" : "default", fontSize: "0.9rem", fontWeight: 600, fontFamily: "inherit" }}>
                  Next Step →
                </button>
              </div>

              {activeStage === STAGES.length - 1 && (
                <button onClick={() => setView("restaurants")} style={{ width: "100%", marginTop: 16, padding: "16px 24px", borderRadius: 14, border: "1px solid #ff6b6b", background: "rgba(255,107,107,0.1)", color: "#ff6b6b", cursor: "pointer", fontSize: "1rem", fontWeight: 700, fontFamily: "inherit" }}>
                  🍽 Where should we eat and drink in St Anton? →
                </button>
              )}
            </div>
          </main>
        </div>
      ) : view === "restaurants" ? (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}>🍽 Eat & Drink in St Anton</h2>
            <p style={{ color: "#8892a4", fontSize: "1rem" }}>Top après-ski bars and restaurants — from legendary slope-side parties to fine Tyrolean dining</p>
          </div>

          <div style={{ background: "linear-gradient(135deg, rgba(78,205,196,0.08), rgba(108,155,255,0.08))", border: "1px solid rgba(78,205,196,0.2)", borderRadius: 14, padding: "1.25rem 1.5rem", marginBottom: "2rem", display: "flex", alignItems: "flex-start", gap: 12 }}>
            <span style={{ fontSize: "1.5rem" }}>💡</span>
            <div>
              <strong style={{ color: "#4ecdc4" }}>My Top Picks</strong>
              <p style={{ margin: "4px 0 0", color: "#8892a4", fontSize: "0.9rem" }}>
                <strong style={{ color: "#e4e8f0" }}>Après-ski:</strong> Hit the <strong style={{ color: "#ff6b6b" }}>MooserWirt</strong> at least once — it's a rite of passage. Ski to it on the slopes above the village.
                <br /><strong style={{ color: "#e4e8f0" }}>Dinner:</strong> <strong style={{ color: "#4ecdc4" }}>Fuhrmannstube by Buffy</strong> is literally next door to your hotel on Dorfstrasse — incredible schnitzel, great value.
                <br /><strong style={{ color: "#e4e8f0" }}>Treat night:</strong> <strong style={{ color: "#a78bfa" }}>Alte Stube</strong> in the Schwarzer Adler is a 400-year-old gem — book ahead.
              </p>
            </div>
          </div>

          {RESTAURANTS.map((r, i) => (
            <div key={i} style={{ background: "#14181f", border: "1px solid #1e2433", borderRadius: 16, padding: "1.75rem", marginBottom: 16, borderTop: `3px solid ${r.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: "0.7rem", color: r.color, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 4 }}>{r.recommended}</div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 4px" }}>{r.name}</h3>
                  <div style={{ fontSize: "0.85rem", color: "#8892a4" }}>{r.cuisine}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "#ffd93d" }}>{r.rating}</div>
                  <div style={{ fontSize: "0.8rem", color: "#8892a4" }}>{r.price}</div>
                </div>
              </div>
              <p style={{ color: "#a0a8b8", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: 16 }}>{r.description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 14 }}>
                {[
                  { label: "Distance", value: r.distance },
                  { label: "Hours", value: r.hours, color: "#4ecdc4" },
                  { label: "Location", value: r.location }
                ].map((card, j) => (
                  <div key={j} style={{ background: "#0e1118", borderRadius: 10, padding: "10px 14px" }}>
                    <div style={{ fontSize: "0.65rem", color: "#8892a4", textTransform: "uppercase", marginBottom: 2 }}>{card.label}</div>
                    <div style={{ fontWeight: 600, fontSize: "0.88rem", color: card.color || "#e4e8f0" }}>{card.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: `${r.color}11`, border: `1px solid ${r.color}22`, borderRadius: 10, padding: "10px 14px", fontSize: "0.85rem", color: "#c0c8d8" }}>
                💡 <strong>Tip:</strong> {r.tip}
              </div>
            </div>
          ))}

          <button onClick={() => { setView("journey"); goTo(STAGES.length - 1); }} style={{ width: "100%", marginTop: 8, padding: "14px 24px", borderRadius: 12, border: "1px solid #6c9bff", background: "rgba(108,155,255,0.1)", color: "#6c9bff", cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, fontFamily: "inherit" }}>
            ← Back to Journey Timeline
          </button>
        </div>
      ) : (
        /* TRIP SUMMARY VIEW */
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}>📋 Trip Summary</h2>
            <p style={{ color: "#8892a4", fontSize: "1rem" }}>Gatwick → Innsbruck → St Anton am Arlberg — 19–24 March 2026</p>
          </div>

          {/* Travellers */}
          <div style={{ background: "#14181f", borderRadius: 14, padding: "20px 24px", border: "1px solid #1e2433", marginBottom: 20 }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 16, color: "#4ecdc4" }}>👥 Travellers</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {["Andrew Batty (Economy Plus)", "James Herbert (Economy Basic)", "Lee Curtis (Economy Basic)"].map((name, i) => (
                <div key={i} style={{ background: "#0e1118", borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{name.split(" (")[0]}</div>
                  <div style={{ fontSize: "0.75rem", color: "#8892a4", marginTop: 2 }}>{name.match(/\((.+)\)/)?.[1]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div style={{ background: "#14181f", borderRadius: 14, padding: "20px 24px", border: "1px solid #1e2433", marginBottom: 20 }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 16, color: "#6c9bff" }}>📅 Itinerary</h3>
            {TRIP_SUMMARY.days.map((day, i) => (
              <div key={i} style={{ display: "flex", gap: 16, padding: "12px 0", borderBottom: i < TRIP_SUMMARY.days.length - 1 ? "1px solid #1e2433" : "none" }}>
                <div style={{ width: 100, flexShrink: 0, fontFamily: "monospace", fontSize: "0.85rem", color: "#4ecdc4", fontWeight: 600 }}>{day.date}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{day.label}</div>
                  <div style={{ fontSize: "0.8rem", color: "#8892a4" }}>{day.detail}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Flights */}
          <div style={{ background: "#14181f", borderRadius: 14, padding: "20px 24px", border: "1px solid #1e2433", marginBottom: 20 }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 16, color: "#a78bfa" }}>✈️ Flights</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "#0e1118", borderRadius: 12, padding: "16px", borderLeft: "3px solid #4ecdc4" }}>
                <div style={{ fontSize: "0.7rem", color: "#4ecdc4", fontWeight: 700, marginBottom: 8 }}>OUTBOUND — Fri 20 Mar</div>
                <div style={{ fontWeight: 700, fontSize: "1rem" }}>BA2620</div>
                <div style={{ fontSize: "0.85rem", color: "#8892a4", marginTop: 4 }}>LGW 7:45 AM → INN 10:45 AM</div>
                <div style={{ fontSize: "0.8rem", color: "#6b7588", marginTop: 2 }}>British Airways (BA Euroflyer)</div>
                <div style={{ fontSize: "0.85rem", color: "#ffd93d", fontWeight: 600, marginTop: 8 }}>£207.64 (3 pax)</div>
              </div>
              <div style={{ background: "#0e1118", borderRadius: 12, padding: "16px", borderLeft: "3px solid #ff6b6b" }}>
                <div style={{ fontSize: "0.7rem", color: "#ff6b6b", fontWeight: 700, marginBottom: 8 }}>RETURN — Tue 24 Mar</div>
                <div style={{ fontWeight: 700, fontSize: "1rem" }}>EZY8696</div>
                <div style={{ fontSize: "0.85rem", color: "#8892a4", marginTop: 4 }}>INN 6:55 PM → LGW 7:55 PM</div>
                <div style={{ fontSize: "0.8rem", color: "#6b7588", marginTop: 2 }}>easyJet · Ref: KBXZJFX</div>
                <div style={{ fontSize: "0.85rem", color: "#ffd93d", fontWeight: 600, marginTop: 8 }}>€277.44 (3 pax, inc. 23kg bags)</div>
              </div>
            </div>
          </div>

          {/* Hotels */}
          <div style={{ background: "#14181f", borderRadius: 14, padding: "20px 24px", border: "1px solid #1e2433", marginBottom: 20 }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 16, color: "#ffd93d" }}>🏨 Accommodation</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "#0e1118", borderRadius: 12, padding: "16px", borderLeft: "3px solid #ffd93d" }}>
                <div style={{ fontSize: "0.7rem", color: "#ffd93d", fontWeight: 700, marginBottom: 8 }}>NIGHT 1 — Fri 20 Mar</div>
                <div style={{ fontWeight: 700 }}>Hotel Schrofenstein ★★★★</div>
                <div style={{ fontSize: "0.85rem", color: "#8892a4", marginTop: 4 }}>Landeck · Triple room</div>
                <div style={{ fontSize: "0.85rem", color: "#ffd93d", fontWeight: 600, marginTop: 8 }}>€246</div>
              </div>
              <div style={{ background: "#0e1118", borderRadius: 12, padding: "16px", borderLeft: "3px solid #4ecdc4" }}>
                <div style={{ fontSize: "0.7rem", color: "#4ecdc4", fontWeight: 700, marginBottom: 8 }}>NIGHTS 2–4 — Sat 21 – Tue 24 Mar</div>
                <div style={{ fontWeight: 700 }}>Hotel Kirchplatz</div>
                <div style={{ fontSize: "0.85rem", color: "#8892a4", marginTop: 4 }}>St Anton am Arlberg · Dorfstrasse 73</div>
                <div style={{ fontSize: "0.8rem", color: "#6b7588", marginTop: 2 }}>Sauna, ski depot, breakfast, parking</div>
              </div>
            </div>
          </div>

          {/* Costs */}
          <div style={{ background: "#14181f", borderRadius: 14, padding: "20px 24px", border: "1px solid #1e2433", marginBottom: 20 }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 16, color: "#ff6b6b" }}>💰 Cost Breakdown (excl. resort costs)</h3>
            {TRIP_SUMMARY.costs.map((c, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < TRIP_SUMMARY.costs.length - 1 ? "1px solid #1e2433" : "none" }}>
                <span style={{ color: "#c0c8d8" }}>{c.item}</span>
                <span style={{ fontWeight: 700, fontFamily: "monospace", color: "#ffd93d" }}>{c.cost}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16, marginTop: 8, borderTop: "2px solid #252b38" }}>
              <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>Estimated Total</span>
              <span style={{ fontWeight: 700, fontFamily: "monospace", fontSize: "1.1rem", color: "#4ecdc4" }}>~£800–950</span>
            </div>
          </div>

          {/* Important Notes */}
          <div style={{ background: "linear-gradient(135deg, rgba(255,107,107,0.08), rgba(255,217,61,0.08))", border: "1px solid rgba(255,107,107,0.2)", borderRadius: 14, padding: "20px 24px", marginBottom: 20 }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 12, color: "#ff6b6b" }}>⚠️ Don't Forget</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                "Passport/ID for all three travellers",
                "James & Lee: Economy Basic — no checked bags, no seat selection (add at check-in if needed)",
                "easyJet check-in opens 30 days before (Feb 22) — do it early for better seats",
                "Add passport details to easyJet booking (ref: KBXZJFX)",
                "easyJet return: 3x 23kg hold bags included, but cabin is SMALL under-seat bag only",
                "Rental car: confirm winter tyres, vignette, and ask about snow chains",
                "Arlberg Tunnel toll: ~€10-18 per trip (not covered by motorway vignette)",
                "Return flight Tue 24 Mar: drive Innsbruck by ~5 PM for 6:55 PM flight"
              ].map((note, i) => (
                <div key={i} style={{ fontSize: "0.88rem", color: "#c0c8d8", padding: "6px 0", borderBottom: "1px solid rgba(255,107,107,0.1)" }}>
                  {i + 1}. {note}
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => { setView("journey"); goTo(0); }} style={{ width: "100%", marginTop: 8, padding: "14px 24px", borderRadius: 12, border: "1px solid #6c9bff", background: "rgba(108,155,255,0.1)", color: "#6c9bff", cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, fontFamily: "inherit" }}>
            ← Back to Journey Timeline
          </button>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button:hover { opacity: 0.9; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0d12; }
        ::-webkit-scrollbar-thumb { background: #252b38; border-radius: 3px; }
        @media (max-width: 768px) {
          aside { display: none !important; }
        }
      `}</style>
    </div>
  );
}
