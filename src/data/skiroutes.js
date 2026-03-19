export const SKI_ROUTES = [
  {
    id: "morning-blast",
    name: "Morning Blast",
    difficulty: "Red/Black",
    duration: "08:30\u201310:30",
    vertical: "~1,500m total",
    description: "First lifts from Nassereinbahn. Hit Kapall while the snow is firm and grippy, then carve the wide Fang slope before it softens. Best riding of the day.",
    steps: [
      { type: "lift", text: "Nassereinbahn gondola \u2192 Gampen (1,850m)" },
      { type: "lift", text: "Kapall 6-seater chair \u2192 Kapall summit (2,330m)" },
      { type: "run", text: "Red 37 \u2014 fast cruise back to Gampen, wide and carveable", grade: "red" },
      { type: "lift", text: "Kapall chair again \u2192 2,330m" },
      { type: "run", text: "Fang slope \u2014 wide open, perfect for morning carving", grade: "red" },
      { type: "run", text: "Link runs from Gampen down to Galzig area", grade: "red" },
    ],
    tip: "The Fang develops corn snow first in spring \u2014 ideal for 09:30\u201310:30 carving."
  },
  {
    id: "schindler-explorer",
    name: "Schindler Explorer",
    difficulty: "Red/Off-piste",
    duration: "10:30\u201312:30",
    vertical: "~2,000m total",
    description: "From Galzig, head up to the Schindlergrat ridge at 2,660m. Huge panoramic views. Mix of marked reds and open off-piste bowls. This is the heart of St Anton\u2019s expert terrain.",
    steps: [
      { type: "lift", text: "From Galzig, take Schindlergrat chairlift \u2192 2,660m" },
      { type: "run", text: "Schindlerkar bowls (Routes 86/87) \u2014 open off-piste with steep variants", grade: "black" },
      { type: "lift", text: "Back up Schindlergrat" },
      { type: "run", text: "Red 14 towards St Christoph \u2014 stunning gorge descent", grade: "red" },
      { type: "run", text: "Valfagehr (Piste 100) \u2014 signature red, smooth gradient, epic backdrop", grade: "red" },
    ],
    tip: "North-facing Schindlergrat bowls hold snow quality longest in spring. Ski these before the sun hits them."
  },
  {
    id: "stuben-gorge",
    name: "Stuben Gorge Run",
    difficulty: "Red",
    duration: "Any time",
    vertical: "1,200m single descent",
    description: "The legendary Red 14 from Schindlergrat all the way down to Stuben. 1,200m vertical through a dramatic gorge. One of the best runs in the Alps.",
    steps: [
      { type: "lift", text: "Schindlergrat chairlift \u2192 2,660m" },
      { type: "run", text: "Red 14 \u2014 1,200m vertical descent through steep gorge to Stuben (1,400m)", grade: "red" },
      { type: "lift", text: "Albonabahn back up from Stuben" },
      { type: "run", text: "Link back to Alpe Rauz / St Anton side", grade: "red" },
    ],
    tip: "Best done mid-morning when the snow has softened slightly but isn\u2019t slushy. The gorge section is narrow and thrilling."
  },
  {
    id: "mattun-offpiste",
    name: "Mattun Off-Piste",
    difficulty: "Black/Off-piste",
    duration: "Any time (conditions permitting)",
    vertical: "~1,000m",
    description: "One of St Anton\u2019s finest off-piste descents. Multiple entry points from Kapall top or Schindlergrat traverse. Open bowl with steep variants, often mogulled. Expert only.",
    steps: [
      { type: "lift", text: "Kapall chair or Schindlergrat chair" },
      { type: "run", text: "Traverse skier\u2019s left to Mattun entry", grade: "black" },
      { type: "run", text: "Route 90 / Black 40 \u2014 ~1,000m vertical, open bowl with multiple lines", grade: "black" },
      { type: "run", text: "Finish at Sch\u00F6ngraben lift base", grade: "red" },
      { type: "lift", text: "Sch\u00F6ngraben lift back up" },
    ],
    tip: "Check avalanche conditions. Best after fresh snow or when spring corn has formed. Multiple aspects \u2014 choose your line based on sun exposure."
  },
  {
    id: "lech-crossing",
    name: "Lech/Z\u00FCrs Crossing",
    difficulty: "Red",
    duration: "13:30\u201316:00",
    vertical: "Variable",
    description: "Cross the mountain via the Flexenbahn gondola to explore the Lech/Z\u00FCrs side. Different character \u2014 wider, more groomed, stunning scenery. Good afternoon option when St Anton runs get slushy.",
    steps: [
      { type: "run", text: "From Galzig/Schindlergrat area, ski down to Alpe Rauz", grade: "red" },
      { type: "lift", text: "Flexenbahn gondola (6 min) \u2192 Z\u00FCrs (1,720m)" },
      { type: "lift", text: "Trittkopfbahn \u2192 Trittkopf (2,423m)" },
      { type: "run", text: "Red runs down to Z\u00FCrs or traverse to Lech", grade: "red" },
      { type: "lift", text: "Madlochbahn or R\u00FCfikopfbahn for more terrain" },
      { type: "run", text: "Cruise the wide reds of the Lech bowl", grade: "red" },
    ],
    tip: "\u26A0\uFE0F Last lifts back to St Anton typically 16:00\u201316:30. Don\u2019t miss the Flexenbahn return! Check times on the day."
  },
  {
    id: "happy-valley-home",
    name: "Happy Valley Home Run",
    difficulty: "Blue/Red",
    duration: "End of day",
    vertical: "~800m",
    description: "The 9km Steissbachtal descent from Galzig back to St Anton village. Deceptively challenging \u2014 bumps build up all day, especially after 15:30. Strategy: descend before 15:00 or use the Nassereinbahn reds to avoid the carnage.",
    steps: [
      { type: "run", text: "Runs 50\u201355 from Galzig area down Steissbachtal", grade: "blue" },
      { type: "run", text: "Pass Mooserwirt and Krazy Kanguruh (apr\u00E8s-ski stops)", grade: "blue" },
      { type: "run", text: "Final descent into St Anton village", grade: "blue" },
    ],
    tip: "After 15:30 this becomes a mogul field. Alternative: ski Nassereinbahn red runs back to the east side of the village \u2014 much quieter."
  },
];

export const MOUNTAIN_STOPS = {
  premium: [
    {
      name: "Verwallstube",
      altitude: "2,085m",
      location: "Galzigbahn top station",
      bestFor: "Morning coffee or gourmet lunch",
      price: "\u20AC\u20AC\u20AC",
      description: "3 Gault & Millau toques. Floor-to-ceiling panoramic windows. Coffee and pastries in the morning, refined dishes (tuna, risotto, schnitzel) for lunch. Candlelight dinner Thursdays.",
      tip: "Arrive by 10:30 for coffee to beat the lunch rush. Book ahead for lunch.",
      color: "#ffd93d",
      timing: "coffee"
    },
    {
      name: "Hospiz Alm",
      altitude: "1,800m",
      location: "St Christoph (on-piste)",
      bestFor: "Iconic lunch",
      price: "\u20AC\u20AC\u20AC",
      description: "THE Arlberg restaurant. Wine Dome with 7,000+ magnum bottles. Wood-panelled interior with open fireplace. South-facing sun terrace. Spare ribs, schnitzel, Kaiserschmarrn.",
      tip: "Arrive by 12:15 to beat the rush. Terrace is first-come-first-served. Ask about the wine cellar tour.",
      color: "#a78bfa",
      timing: "lunch"
    },
    {
      name: "Mohnenfluh",
      altitude: "1,700m",
      location: "Oberlech (Lech side)",
      bestFor: "Premium lunch on Lech side",
      price: "\u20AC\u20AC\u20AC",
      description: "4-star hotel restaurant on the slopes. Famous Mohnen Burger. Top-tier service, stunning views over Lech. Worth the Flexenbahn crossing.",
      tip: "Only worth it if you\u2019re crossing to Lech for the afternoon anyway.",
      color: "#ff6b6b",
      timing: "lunch"
    },
  ],
  value: [
    {
      name: "Gampen Restaurant",
      altitude: "1,850m",
      location: "Nassereinbahn top station",
      bestFor: "Quick morning coffee",
      price: "\u20AC",
      description: "Right where you arrive. Standard mountain fare, decent coffee, sunny terrace. No frills but convenient and affordable. You\u2019re literally stepping off the gondola.",
      tip: "Perfect for a quick espresso before the first run. Don\u2019t linger \u2014 the snow is calling.",
      color: "#4ecdc4",
      timing: "coffee"
    },
    {
      name: "Sennhu\u0308tte",
      altitude: "1,500m",
      location: "Above St Anton (home run)",
      bestFor: "Best Ka\u0308sesp\u00E4tzle on the mountain",
      price: "\u20AC\u20AC",
      description: "Family-run for 2 generations. Famous for Ka\u0308sesp\u00E4tzle (cheese noodles). Large sun terrace, live music, homemade schnapps. Authentic Tyrolean atmosphere.",
      tip: "Best as a late lunch (14:00+) before apr\u00E8s. The schnapps is homemade and lethal.",
      color: "#4ecdc4",
      timing: "lunch"
    },
    {
      name: "Rud-Alpe",
      altitude: "1,700m",
      location: "Lech (Schlegelkopf slope)",
      bestFor: "Hearty lunch on Lech side",
      price: "\u20AC\u20AC",
      description: "Rustic old barn converted to restaurant. Hearty Tyrolean fare \u2014 soups, R\u00F6sti, stews. Beautiful vista over Lech valley. Big sunny terrace. Generally less crowded than St Anton side.",
      tip: "Perfect if you cross to Lech in the morning. Portions are huge.",
      color: "#ffd93d",
      timing: "lunch"
    },
    {
      name: "Ulmer Hu\u0308tte",
      altitude: "2,288m",
      location: "Above St Christoph",
      bestFor: "Coffee with the best views",
      price: "\u20AC",
      description: "Alpine club hut since 1903. Simple but incredible panoramic views from the outside terrace. Basic food, authentic mountain atmosphere. The view alone is worth the stop.",
      tip: "Go for the view and a drink, not a full meal. Mixed reviews on food/service but the setting is unbeatable.",
      color: "#4ecdc4",
      timing: "coffee"
    },
  ]
};

export const SPRING_TIPS = [
  "Ski HIGH in the morning (above 2,000m) \u2014 snow is firm and fast",
  "Fang slope develops corn snow first \u2014 ideal 09:30\u201310:30",
  "North-facing bowls (Schindlergrat, Kapall) hold snow quality longest",
  "Lower runs get slushy by afternoon \u2014 do them before lunch",
  "Rendl (south-facing) develops great corn snow around midday",
  "Terraces fill from 11:30 \u2014 arrive early for sun spots",
  "Steissbachtal (Happy Valley) becomes a mogul field after 15:30",
  "Nassereinbahn reds are quieter than Galzig home runs at end of day",
  "Flexenbahn last lifts back ~16:00\u201316:30 \u2014 check on the day",
  "Sunscreen essential \u2014 late March sun at altitude burns fast",
  "Snowboard wax: spring wax (warm temp) makes a huge difference",
];
