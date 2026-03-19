export const RESTAURANTS = [
  {
    name: "MooserWirt",
    location: "On the slopes above St Anton village",
    distance: "Ski to it! (above the village)",
    rating: "4.5 \u2605 (legendary)",
    price: "\u20AC\u20AC",
    cuisine: "Apr\u00E8s-Ski Bar \u2014 Beer, Shots, Party",
    hours: "Early afternoon \u2013 evening",
    description: "Self-proclaimed 'baddest apr\u00E8s-ski bar on the Arlberg.' Table-top dancing, Euro-pop, 65 bar staff serving around 5,000 litres of beer per day in peak season. You ski to it \u2014 it's on the slopes above the village. This is THE apr\u00E8s-ski experience.",
    tip: "Go early (3:30 PM) for the best atmosphere. It gets absolutely rammed by 4 PM. Wear your ski boots \u2014 you're on the slope!",
    recommended: "\uD83E\uDD47 Best for: The ultimate apr\u00E8s-ski experience",
    color: "#ff6b6b"
  },
  {
    name: "Krazy Kanguruh",
    location: "On the slope down to St Anton",
    distance: "Ski to it! (on the slope)",
    rating: "4.4 \u2605 (275 reviews)",
    price: "\u20AC\u20AC",
    cuisine: "Apr\u00E8s-Ski Bar & Restaurant \u2014 Burgers, Bar Food",
    hours: "Kitchen 11:00\u201318:00, drinks until 20:00",
    description: "St Anton's oldest apr\u00E8s-ski bar, opened in 1965 and owned by Olympic champion Mario Matt. All food cooked fresh with one of the biggest menus on the mountain. Theme events including Aussie Day BBQs. Located on the slope down to St Anton.",
    tip: "The food here is surprisingly good for a slope-side bar. Try the burgers while watching the sun set over the mountains.",
    recommended: "\uD83E\uDD47 Best for: Apr\u00E8s with proper food",
    color: "#ffd93d"
  },
  {
    name: "Fuhrmannstube by Buffy",
    location: "Dorfstrasse 74, St Anton (village centre)",
    distance: "1 min walk from Hotel Kirchplatz!",
    rating: "4.3 \u2605 \u2014 Ranked #7 of 91 restaurants",
    price: "\u20AC",
    cuisine: "Traditional Austrian \u2014 Schnitzel, Venison, Strudel",
    hours: "10:00 \u2013 22:00",
    description: "Brilliant traditional Austrian bistro right in the village centre \u2014 literally next door to Hotel Kirchplatz. Wiener schnitzel, venison, kaiserschmarrn, apple strudel. Generous portions, friendly staff, incredible value at ~\u20AC50 per person for 3 courses with drinks.",
    tip: "No booking policy at busy times but usually seated within 10-15 min. The schnitzel is enormous \u2014 come hungry!",
    recommended: "\uD83E\uDD47 Best for: Best value traditional dinner, right next to your hotel",
    color: "#4ecdc4"
  },
  {
    name: "Alte Stube im Schwarzen Adler",
    location: "Hotel Schwarzer Adler, St Anton",
    distance: "3 min walk from Hotel Kirchplatz",
    rating: "4.6 \u2605 \u2014 Gault & Millau recognised",
    price: "\u20AC\u20AC\u20AC",
    cuisine: "Fine Dining \u2014 Modern Tyrolean",
    hours: "Dinner from 19:00",
    description: "A 400-year-old Tyrolean parlour ('Stube') \u2014 one of the most special dining experiences in St Anton. Head chef Stephan Dialer creates sophisticated dishes using local ingredients. Intimate 30-seat dining room. International wine list. Gault & Millau recognised.",
    tip: "Book well in advance \u2014 only 30 seats. Worth it for a special night out. Dress smart-casual.",
    recommended: "\uD83E\uDD47 Best for: Special occasion / treat-yourselves dinner",
    color: "#a78bfa"
  },
  {
    name: "Hospiz Alm",
    location: "St. Christoph am Arlberg (one stop along)",
    distance: "10 min drive from St Anton",
    rating: "4.7 \u2605 \u2014 World famous",
    price: "\u20AC\u20AC\u20AC",
    cuisine: "Fine Dining / Mountain Hut \u2014 Grill, Tyrolean, Wine",
    hours: "From 10:00 daily, evening dining from 19:00",
    description: "World-famous mountain restaurant with the legendary Wine Dome \u2014 the world's largest large-bottle wine cellar with 7,000+ magnum Bordeaux bottles. Timber-clad hut with open fireplace. Rustic by day (gr\u00F6stl, goulash, ribs), fine dining in the evening.",
    tip: "The wine cellar tour is a must \u2014 ask about it when you arrive. Worth the short drive to St. Christoph.",
    recommended: "\uD83E\uDD47 Best for: Bucket-list dining experience",
    color: "#6c9bff"
  }
];

export const TRIP_SUMMARY = {
  days: [
    { date: "Thu 19 Mar", label: "Travel to Jim's", detail: "Drive GU47 9AG \u2192 Upper Gatton Park" },
    { date: "Fri 20 Mar", label: "Travel Day + First Ski", detail: "LGW \u2192 Innsbruck \u2192 St Anton \u2192 Landeck" },
    { date: "Sat 21 Mar", label: "Ski Day 2", detail: "Check into Hotel Kirchplatz, ski all day" },
    { date: "Sun 22 Mar", label: "Ski Day 3", detail: "Ski all day in St Anton" },
    { date: "Mon 23 Mar", label: "Ski Day 4", detail: "Ski all day \u2014 last full day" },
    { date: "Tue 24 Mar", label: "Ski + Travel Home", detail: "Ski morning \u2192 drive to INN \u2192 EZY8696 \u2192 LGW" },
  ],
  costs: [
    { item: "BA outbound (3 pax)", cost: "\u00A3207.64" },
    { item: "easyJet return (3 pax)", cost: "\u20AC277 (~\u00A3235)" },
    { item: "Hotel Bruggner Stub'n (1 night, triple)", cost: "Booking ref: 5825157964" },
    { item: "Enterprise \u2014 Kia Stonic 4 days (DYS-201495906)", cost: "\u20AC287.80 (~\u00A3240)" },
    { item: "Snowboard hire \u2014 2x Master 5* + boots (BPPLCA)", cost: "\u00A3135.36" },
    { item: "Ski Arlberg half-day Fri (2 pax \u2014 Jim has season pass)", cost: "\u20AC125" },
    { item: "Ski Arlberg 4-day Sat\u2013Tue (2 pax)", cost: "\u20AC636" },
    { item: "Chip card deposit (2 pax, refundable)", cost: "\u20AC10" },
    { item: "Arlberg tunnel tolls (est.)", cost: "~\u20AC60\u2013100" },
  ]
};
