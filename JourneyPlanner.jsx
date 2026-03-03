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
    wazeUrl: "https://waze.com/ul?ll=51.2567,-0.1853&navigate=yes",
    wazeLabel: "Navigate to Upper Gatton Park",
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
    wazeUrl: "https://waze.com/ul?ll=51.1537,-0.1821&navigate=yes",
    wazeLabel: "Navigate to Gatwick South Terminal",
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
    description: "Welcome to Innsbruck! Small, efficient airport — single terminal, so you can't get lost. Surrounded by mountains on all sides. Baggage reclaim is quick (usually 5-15 min). Your Enterprise desk is in the Arrivals Hall — other hire companies are in the car park building via a covered walkway.",
    walkthrough: [
      "🛬 Small regional airport — single terminal, very easy to navigate",
      "🛂 UK passport: use manual queue (no e-gates at INN)",
      "🧳 Baggage reclaim: usually 5-15 min (small airport, fast turnaround)",
      "🚗 Enterprise desk is in the Arrivals Hall — no need to leave the terminal",
      "📋 Ref: DYS-201495906 — have voucher ready",
      "🏢 Other desks also available: Sixt, Hertz, Europcar, Avis, Budget",
      "💡 Tip: ATM and tourist info desk available in arrivals hall"
    ],
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    imageAlt: "Mountain airport with Alps in background"
  },
  {
    id: 7,
    time: "11:15 CET",
    localTime: "11:15",
    title: "Pick Up Rental Car — Kia Stonic",
    location: "Innsbruck Airport — Car Hire Centre",
    icon: "🚗",
    type: "car",
    tagColor: "#4ecdc4",
    tag: "CAR HIRE",
    weather: { temp: "8°C", condition: "Partly Cloudy", icon: "⛅", wind: "10 km/h", humidity: "65%" },
    description: "Collect your Kia Stonic (or similar) from the Enterprise desk in the Arrivals Hall. Ref DYS-201495906 via DoYouSpain. Pickup 11:00, return 24 Mar 18:00. Total €287.80 (€34.54 prepaid + €253.26 on arrival). Main driver (Andrew) must present credit card, driving licence, and passport.",
    walkthrough: [
      "📋 Ref: DYS-201495906 (Enterprise via DoYouSpain)",
      "🚗 Car: Kia Stonic 5-door A/C (or similar) — unlimited mileage",
      "📍 Enterprise desk is in the ARRIVALS HALL (not car park building)",
      "💰 Total: €287.80 — €34.54 already paid, €253.26 to pay on arrival",
      "💳 Credit card required (Visa/Mastercard/Amex) in Andrew Batty's name. No prepaid/virtual cards.",
      "🪪 Driving licence: original only — no digital or photocopies",
      "🛂 Passport or ID required at desk",
      "🛡️ CDW included (excess €1,200). SCDW €24/day removes excess. Deposit €450 (€200 with SCDW)",
      "👥 Additional driver: €9/day (max €90) — add Jim or Lee if sharing driving",
      "❄️ Winter tyres INCLUDED (Nov–Apr) — confirm at desk",
      "⛓️ Snow chains: €42/rental if needed — ask at desk",
      "🎿 Ski rack available: €42/rental",
      "🏷️ Motorway Vignette: should be included — CONFIRM at desk",
      "💰 Arlberg Tunnel toll: separate ~€10-18 per trip (not covered by vignette)",
      "⛽ Fuel: full-to-full. €18 refueling charge if not returned full!",
      "📞 Enterprise problems: +43 7203712501500",
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
    wazeUrl: "https://waze.com/ul?ll=47.1297,10.2685&navigate=yes",
    wazeLabel: "Navigate to St Anton am Arlberg",
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
      "🎿 Lift pass: HALF-DAY pass (from noon) — €62.50 each for Andy & Lee. Jim has a season pass.",
      "🎟️ Buy at Galzigbahn base station (cash desk or 24/7 ticket machine, card accepted)",
      "💳 €5 chip card deposit each (refundable on return)",
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
      "🚗 Drive to Hotel Bruggner Stub'n in Landeck: only 20 min",
      "💡 Alternatively: skip après, drive to Landeck first, then dinner there"
    ],
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    imageAlt: "Après-ski bar scene"
  },
  {
    id: 11,
    time: "18:30 CET",
    localTime: "18:30",
    title: "Drive to Hotel Bruggner Stub'n, Landeck",
    location: "St Anton → S16 → Landeck",
    icon: "🌙",
    type: "drive",
    tagColor: "#a78bfa",
    tag: "20 MIN",
    weather: { temp: "-1°C → 1°C", condition: "Clear", icon: "🌙", wind: "5 km/h", humidity: "65%" },
    description: "Short 20-minute drive east from St Anton to Landeck for your first night at Hotel Bruggner Stub'n. It's getting dark (sunset 18:26) so watch for ice on the road. The hotel is on Flirstrasse, just outside the town centre — easy to find.",
    walkthrough: [
      "🛣️ Route: St Anton → S16 East → Landeck exit",
      "⏱️ Distance: ~25 km, Time: ~20 min",
      "🌙 Sunset was 18:26 today — driving in the dark",
      "🧊 Watch for black ice — temperature around freezing",
      "🚇 Arlberg Tunnel toll applies (~€10-18)",
      "🅿️ Hotel has parking available",
      "💡 Designated driver tonight, lads!"
    ],
    wazeUrl: "https://waze.com/ul?ll=47.1397,10.5653&navigate=yes",
    wazeLabel: "Navigate to Hotel Bruggner Stub'n, Landeck",
    image: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800&q=80",
    imageAlt: "Mountain road at dusk"
  },
  {
    id: 12,
    time: "18:00 CET",
    localTime: "18:00",
    title: "Hotel Bruggner Stub'n ★★★",
    location: "Flirstrasse 30, Landeck",
    icon: "🏨",
    type: "arrival",
    tagColor: "#4ecdc4",
    tag: "✅ CHECK-IN",
    weather: { temp: "1°C", condition: "Clear", icon: "🌙", wind: "5 km/h", humidity: "65%" },
    description: "Check in to Hotel Bruggner Stub'n — a highly-rated 3-star Tyrolean guesthouse on Flirstrasse. Booking.com ref: 5825157964. Check-in window 18:00–19:00. Free on-site parking. The restaurant here is legendary — half-board available, the schnitzel is raved about. No spa but you won't need one for a single night.",
    walkthrough: [
      "🅿️ Free on-site parking — pull straight in",
      "🚪 Head to reception — check-in 18:00–19:00, triple room booked",
      "📋 Booking ref: 5825157964",
      "🍽️ Hotel restaurant for dinner — the schnitzel is famous!",
      "⭐ 3-star hotel, 8.5 on Booking.com / 4.8 on Google",
      "⏰ Tomorrow: check out, drive 20 min to St Anton, check into Hotel Kirchplatz"
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    imageAlt: "Hotel lobby"
  },
  {
    id: 13,
    time: "06:30 CET",
    localTime: "06:30",
    title: "Early Start → Drive to St Anton",
    location: "Hotel Bruggner Stub'n → St Anton am Arlberg",
    icon: "🚗",
    type: "drive",
    tagColor: "#ffd93d",
    tag: "FIRST LIFT!",
    weather: { temp: "-2°C → -4°C", condition: "Clear", icon: "🌅", wind: "5 km/h", humidity: "55%" },
    description: "First lift is at 08:30 — so it's an early start! Wake up at 06:30, grab a quick breakfast at the hotel (usually opens 06:30–07:00), check out by 07:30, and drive the 20 minutes to St Anton. Drop your bags at Hotel Kirchplatz reception (rooms won't be ready yet but they'll store luggage), then walk straight to the Galzigbahn. You'll be queuing for the first gondola by 08:15.",
    wazeUrl: "https://waze.com/ul?ll=47.1297,10.2685&navigate=yes",
    wazeLabel: "Navigate to Hotel Kirchplatz, St Anton",
    walkthrough: [
      "⏰ 06:30 — Wake up at Hotel Bruggner Stub'n",
      "🍳 06:45 — Quick breakfast at the hotel (usually opens 06:30–07:00)",
      "🧳 07:15 — Pack up, load the car",
      "🏨 07:30 — Check out of Hotel Bruggner Stub'n",
      "🚗 07:30 — Drive to St Anton (~20 min via S16, Arlberg Tunnel toll ~€10-18)",
      "🏨 07:50 — Arrive Hotel Kirchplatz — drop bags at reception (early bag drop, room later)",
      "🚶 08:00 — Walk to Galzigbahn gondola station (~5 min from hotel)",
      "⛷️ 08:15 — Queue for first lift",
      "🎿 08:30 — FIRST LIFT! Fresh corduroy, empty pistes, let's go!"
    ],
    image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80",
    imageAlt: "Alpine village in winter"
  },
  {
    id: 14,
    time: "09:00 CET",
    localTime: "09:00",
    title: "Ski Days — Sat, Sun, Mon",
    location: "St Anton / Ski Arlberg — 300+ km of runs",
    icon: "⛷️",
    type: "skiing",
    tagColor: "#4ecdc4",
    tag: "3 DAYS SKIING",
    weather: { temp: "-5°C → 2°C", condition: "Variable — sun, cloud, snow", icon: "🏔️", wind: "10-20 km/h", humidity: "60%" },
    description: "Three full days of skiing across the massive Ski Arlberg region — 300+ km of pistes, 200+ km of off-piste, and 88 lifts connecting St Anton, St Christoph, Stuben, Lech, Zürs, and Warth-Schröcken. Late March means longer days (12+ hours of daylight), spring snow conditions, and the famous St Anton après-ski scene every afternoon.",
    walkthrough: [
      "🎟️ 4-DAY PASS (Sat–Tue): €318 each for Andy & Lee. Buy at Galzigbahn on Sat morning. Jim has a season pass.",
      "🎿 Lifts open 08:30 – 16:30 daily",
      "🏔️ Ski Arlberg: 300+ km pistes, 200+ km off-piste, 88 lifts",
      "❄️ Snow depth: ~274cm summit, ~71cm base — excellent for late March",
      "🌡️ Freeze-thaw cycle: firm/icy mornings → softening by midday → best skiing mid-morning",
      "🌅 Sunset ~18:30 — long, light evenings for village exploring",
      "🍺 Après-ski: MooserWirt & Krazy Kanguruh from ~15:30 daily",
      "🍽️ Dinner tip: Fuhrmannstube (next door) for schnitzel, Alte Stube for fine dining",
      "💡 Last day is Tuesday — ski the morning then head to the airport"
    ],
    image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80",
    imageAlt: "Skiing in the Alps"
  },
  {
    id: 15,
    time: "09:00 CET",
    localTime: "09:00",
    title: "Last Morning Ski — Tuesday 24 March",
    location: "St Anton am Arlberg — Final Runs",
    icon: "⛷️",
    type: "skiing",
    tagColor: "#4ecdc4",
    tag: "LAST SKI",
    weather: { temp: "-3°C", condition: "Partly Cloudy", icon: "⛅", wind: "10 km/h", humidity: "60%" },
    description: "Last day! Get out early to make the most of it. You need to be off the mountain and back at the hotel by 1:30 PM latest to allow time to change, pack, check out, and drive to Innsbruck Airport for your 6:55 PM easyJet flight. That gives you a solid 4+ hours of skiing.",
    walkthrough: [
      "⏰ Early start — lifts open 08:30, aim to be first on the mountain",
      "🎿 Get your best runs in during the morning — conditions are firmest and fastest",
      "🕐 OFF THE MOUNTAIN BY 1:30 PM — no exceptions!",
      "🏨 Back to Hotel Kirchplatz: change, pack, check out",
      "🎿 Drop ski hire gear back (if rented locally)",
      "🚗 Leave St Anton by 2:00 PM at the latest",
      "✈️ Flight EZY8696 departs 6:55 PM — you need time to drive, drop car, and check in",
      "💡 Don't be the one who misses the flight because of 'one more run'!"
    ],
    image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80",
    imageAlt: "Morning skiing in the Alps"
  },
  {
    id: 16,
    time: "14:00 CET",
    localTime: "14:00",
    title: "Drive: St Anton → Innsbruck Airport",
    location: "S16 → A12 Inntal Autobahn → INN Airport",
    icon: "🚗",
    type: "drive",
    tagColor: "#ffd93d",
    tag: "1H 15M DRIVE",
    weather: { temp: "2°C → 8°C", condition: "Partly Cloudy", icon: "⛅", wind: "12 km/h", humidity: "65%" },
    description: "Reverse the drive from day one — head east through the Arlberg tunnel, along the Inn Valley on the A12, and back to Innsbruck Airport. Temperature rises as you descend from the mountains. Allow extra time in case of traffic or delays.",
    wazeUrl: "https://waze.com/ul?ll=47.2600,11.3440&navigate=yes",
    wazeLabel: "Navigate to Innsbruck Airport",
    walkthrough: [
      "🛣️ Route: St Anton → S16 East → A12 East → Innsbruck Airport",
      "⏱️ Distance: ~100 km, Time: ~1hr 15min",
      "🚇 Arlberg Tunnel toll (~€10-18) — last time!",
      "⚡ Speed limits: 130 km/h motorway, 100 km/h S-road",
      "📸 Speed cameras on A12 — don't rush, you have plenty of time",
      "🌡️ Temperature rises from 2°C to 8°C as you descend into the Inn Valley",
      "⛽ Return car with a full tank (check fuel policy)",
      "🅿️ Follow signs to Enterprise in the Arrivals Hall"
    ],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    imageAlt: "Alpine motorway through mountains"
  },
  {
    id: 17,
    time: "15:15 CET",
    localTime: "15:15",
    title: "Drop Off Car & Check In",
    location: "Innsbruck Airport (INN)",
    icon: "🛬",
    type: "airport",
    tagColor: "#6c9bff",
    tag: "AIRPORT",
    weather: { temp: "8°C", condition: "Partly Cloudy", icon: "⛅", wind: "10 km/h", humidity: "65%" },
    description: "Return the Kia Stonic to the Enterprise desk in the Arrivals Hall (same place you picked it up). Car return deadline is 18:00 — you'll be well ahead of that. Enterprise closes 18:30 Tue. Then check in for easyJet EZY8696.",
    walkthrough: [
      "🚗 Return car to Enterprise in the Arrivals Hall",
      "📋 Ref: DYS-201495906 — return by 18:00 (Enterprise closes 18:30)",
      "⛽ FULL TANK — or €18 refueling charge + cost of missing fuel",
      "📋 Return keys, check for any damage charges",
      "🚶 Walk covered walkway back to terminal (~3 min)",
      "📱 easyJet check-in: should already be done online (ref: KBXZJFX)",
      "🧳 Bag drop: 3x 23kg hold bags included in your booking",
      "🛂 Security: quick at this small airport",
      "☕ Airside: grab a coffee and Apfelstrudel — last taste of Austria!"
    ],
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    imageAlt: "Airport terminal"
  },
  {
    id: 18,
    time: "18:25 CET",
    localTime: "18:25",
    title: "Gate Call — Board EZY8696",
    location: "Innsbruck Airport — Gate",
    icon: "🚶",
    type: "boarding",
    tagColor: "#ff6b6b",
    tag: "BOARDING",
    weather: { temp: "6°C", condition: "Clear", icon: "🌅", wind: "8 km/h", humidity: "60%" },
    description: "Board easyJet EZY8696 back to London Gatwick. This is a 1-hour flight — one of the shortest Alpine returns. Seats are auto-allocated unless you paid to choose. Small cabin bag only (under seat) — your 23kg hold bags are in the hold.",
    walkthrough: [
      "✈️ Flight: EZY8696 (easyJet)",
      "⏰ Departure: 6:55 PM CET",
      "🛬 Arrives Gatwick: 7:55 PM GMT (local UK time)",
      "⏱️ Flight duration: ~2 hours (1hr + 1hr time zone change)",
      "🎫 Booking ref: KBXZJFX",
      "🧳 Cabin: small under-seat bag ONLY — no overhead bin bags",
      "🧳 Hold: 3x 23kg bags included",
      "💡 Sit LEFT side for sunset views over the Alps on departure"
    ],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
    imageAlt: "EasyJet aircraft"
  },
  {
    id: 19,
    time: "18:55 CET",
    localTime: "18:55",
    title: "✈️ In Flight — Heading Home",
    location: "Cruising at 37,000ft",
    icon: "✈️",
    type: "flight",
    tagColor: "#a78bfa",
    tag: "IN FLIGHT",
    weather: { temp: "-56°C", condition: "Clear above clouds", icon: "🌅", wind: "Jet stream", humidity: "N/A" },
    description: "Quick flight home northwest over the Alps, across France, and back to the UK. You'll get a stunning sunset view over the mountains as you depart Innsbruck. Set your watch back 1 hour — UK is GMT. Landing at Gatwick North Terminal.",
    walkthrough: [
      "🕐 Flight duration: ~2 hours",
      "🗺️ Route: Northwest over Alps → across France → Channel → Gatwick",
      "🌅 Spectacular sunset over the Alps on departure — left side of aircraft",
      "⏰ Set watch BACK 1 hour — UK is GMT (1 hour behind Austria)",
      "🛬 Landing at Gatwick NORTH Terminal (easyJet)",
      "📱 Pre-book your Uber to Jim's for ~8:15 PM arrival",
      "💡 Quick flight — you'll be home before you know it"
    ],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&q=80",
    imageAlt: "Sunset view from airplane"
  },
  {
    id: 20,
    time: "19:55 GMT",
    localTime: "19:55",
    title: "Land at Gatwick North Terminal",
    location: "London Gatwick Airport — North Terminal",
    icon: "🛬",
    type: "airport",
    tagColor: "#6c9bff",
    tag: "ARRIVAL LGW",
    weather: { temp: "8°C", condition: "Clear", icon: "🌙", wind: "10 km/h W", humidity: "72%" },
    description: "Welcome home! easyJet arrives at Gatwick North Terminal. Collect your 3 hold bags from the carousel. Head to arrivals and grab an Uber to Jim's house at Upper Gatton Park to pick up your car.",
    walkthrough: [
      "🛬 easyJet arrives at North Terminal",
      "🧳 Baggage reclaim: collect 3x 23kg hold bags",
      "🚶 Follow signs to Arrivals exit",
      "🚕 Uber pickup: North Terminal arrivals forecourt",
      "📍 Destination: Upper Gatton Park, Reigate (~15 min)",
      "🚗 Pick up your car at Jim's house",
      "💡 You left your car at Jim's on Thursday night — it's been there 5 days"
    ],
    image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&q=80",
    imageAlt: "Airport arrivals"
  },
  {
    id: 21,
    time: "20:30 GMT",
    localTime: "20:30",
    title: "Uber to Jim's → Pick Up Car",
    location: "Gatwick North Terminal → Upper Gatton Park",
    icon: "🚕",
    type: "transfer",
    tagColor: "#a78bfa",
    tag: "15 MIN",
    weather: { temp: "8°C", condition: "Clear", icon: "🌙", wind: "10 km/h W", humidity: "72%" },
    description: "Quick Uber ride from Gatwick North Terminal to Jim's house at Upper Gatton Park. Pick up your car where you left it on Thursday night. Say thanks to Jim and head home!",
    wazeUrl: "https://waze.com/ul?ll=51.2567,-0.1853&navigate=yes",
    wazeLabel: "Navigate to Upper Gatton Park",
    walkthrough: [
      "🚕 Uber from Gatwick North Terminal arrivals",
      "📍 Destination: Upper Gatton Park, Reigate (~15 min, ~6 miles)",
      "🚗 Pick up your car — where you left it Thursday night",
      "👋 Say cheers to Jim!",
      "🛣️ Next: drive home to Sandhurst — ~45 min",
      "💡 You'll be home by about 9:30 PM"
    ],
    image: "https://images.unsplash.com/photo-1449965408869-ebd13bc0e4c1?w=800&q=80",
    imageAlt: "Evening drive"
  },
  {
    id: 22,
    time: "21:00 GMT",
    localTime: "21:00",
    title: "Drive Home to Sandhurst",
    location: "Upper Gatton Park → GU47 9AG",
    icon: "🏠",
    type: "drive",
    tagColor: "#4ecdc4",
    tag: "45 MIN DRIVE",
    weather: { temp: "7°C", condition: "Clear", icon: "🌙", wind: "8 km/h W", humidity: "75%" },
    description: "Final leg! Reverse your Thursday evening drive — M23 south to M25, then M3 west to Sandhurst/Crowthorne. Evening traffic should be light on a Tuesday night. You'll be home by about 9:45 PM. What a trip!",
    wazeUrl: "https://waze.com/ul?q=GU47+9AG&navigate=yes",
    wazeLabel: "Navigate Home — GU47 9AG",
    walkthrough: [
      "🛣️ Route: Upper Gatton Park → M23 → M25 → M3 → A30 → GU47 9AG",
      "⏱️ Distance: ~30 miles, Time: ~45 min (Tuesday evening, light traffic)",
      "📸 M25 average speed cameras J8–J10 — 70 mph enforced",
      "🏠 Home by ~9:45 PM",
      "🍺 You've earned a cuppa (or something stronger)",
      "📸 Sort your ski photos and start planning the next trip!",
      "🏔️ What a trip — Gatwick → Innsbruck → St Anton → Home. Legend."
    ],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    imageAlt: "Night motorway driving"
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
    { item: "Hotel Bruggner Stub'n (1 night, triple)", cost: "Booking ref: 5825157964" },
    { item: "Enterprise — Kia Stonic 4 days (DYS-201495906)", cost: "€287.80 (~£240)" },
    { item: "Ski Arlberg half-day Fri (2 pax — Jim has season pass)", cost: "€125" },
    { item: "Ski Arlberg 4-day Sat–Tue (2 pax)", cost: "€636" },
    { item: "Chip card deposit (2 pax, refundable)", cost: "€10" },
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

              {stage.wazeUrl && (
                <a href={stage.wazeUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 24px", borderRadius: 14, border: "1px solid #33ccff", background: "linear-gradient(135deg, rgba(51,204,255,0.15), rgba(51,204,255,0.05))", color: "#33ccff", textDecoration: "none", fontSize: "1rem", fontWeight: 700, marginBottom: 24, transition: "all 0.2s" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.54 6.63c-1.62-4.15-6.38-5.93-9.47-5.59C7.29 1.44 3.52 4.01 2.42 7.8 1.2 12.02 3.28 16.78 6.33 19.31c1.07.89 2.01 1.84 2.67 2.98.37.64.71 1.35 1.23 1.71.82.57 1.85-.22 1.85-.22s2.42-1.67 3.72-3.1c2.69-2.96 5.65-7.89 4.74-14.05zm-8.5 8.87c-2.74 0-4.96-2.22-4.96-4.96s2.22-4.96 4.96-4.96 4.96 2.22 4.96 4.96-2.22 4.96-4.96 4.96z"/></svg>
                  {stage.wazeLabel}
                </a>
              )}

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
                <div style={{ fontWeight: 700 }}>Hotel Bruggner Stub'n ★★★</div>
                <div style={{ fontSize: "0.85rem", color: "#8892a4", marginTop: 4 }}>Flirstrasse 30, Landeck · Triple room</div>
                <div style={{ fontSize: "0.85rem", color: "#ffd93d", fontWeight: 600, marginTop: 8 }}>Ref: 5825157964</div>
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
