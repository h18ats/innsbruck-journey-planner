import React, { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Line, Billboard } from "@react-three/drei";
import * as THREE from "three";

// ── Simplex noise (compact implementation) ────────────────────────
const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;
const grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
const perm = (() => {
  const p = [];
  for (let i = 0; i < 256; i++) p[i] = Math.floor(Math.random() * 256);
  const pm = new Array(512);
  for (let i = 0; i < 512; i++) pm[i] = p[i & 255];
  return pm;
})();

function simplex2(x, y) {
  const s = (x + y) * F2;
  const i = Math.floor(x + s), j = Math.floor(y + s);
  const t = (i + j) * G2;
  const x0 = x - (i - t), y0 = y - (j - t);
  const i1 = x0 > y0 ? 1 : 0, j1 = x0 > y0 ? 0 : 1;
  const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
  const x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
  const ii = i & 255, jj = j & 255;
  let n0 = 0, n1 = 0, n2 = 0;
  let t0 = 0.5 - x0*x0 - y0*y0;
  if (t0 > 0) { t0 *= t0; const gi = perm[ii + perm[jj]] % 12; n0 = t0*t0*(grad3[gi][0]*x0+grad3[gi][1]*y0); }
  let t1 = 0.5 - x1*x1 - y1*y1;
  if (t1 > 0) { t1 *= t1; const gi = perm[ii+i1+perm[jj+j1]] % 12; n1 = t1*t1*(grad3[gi][0]*x1+grad3[gi][1]*y1); }
  let t2 = 0.5 - x2*x2 - y2*y2;
  if (t2 > 0) { t2 *= t2; const gi = perm[ii+1+perm[jj+1]] % 12; n2 = t2*t2*(grad3[gi][0]*x2+grad3[gi][1]*y2); }
  return 70 * (n0 + n1 + n2);
}

function fbm(x, y, octaves = 6) {
  let val = 0, amp = 1, freq = 1, max = 0;
  for (let i = 0; i < octaves; i++) {
    val += simplex2(x * freq, y * freq) * amp;
    max += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return val / max;
}

// ── Map coordinates: normalised positions on the terrain grid ─────
// Terrain is 20x20 centered at origin (-10 to 10 on x/z)
// We map real altitudes to Y heights on our terrain
const LOCATIONS = {
  nasserein:    { x: 5, z: 6, alt: 1300, label: "Nassereinbahn\n1,300m", color: "#4ecdc4" },
  gampen:       { x: 4, z: 3, alt: 1850, label: "Gampen\n1,850m", color: "#4ecdc4" },
  kapall:       { x: 6, z: 1, alt: 2330, label: "Kapall\n2,330m", color: "#ffd93d" },
  galzig:       { x: 0, z: 2, alt: 2085, label: "Galzig\n2,085m", color: "#ffd93d" },
  schindlergrat:{ x: -2, z: -1, alt: 2660, label: "Schindlergrat\n2,660m", color: "#a78bfa" },
  valluga:      { x: 0, z: -3, alt: 2811, label: "Valluga\n2,811m", color: "#ff6b6b" },
  stChristoph:  { x: -5, z: 4, alt: 1800, label: "St Christoph\n1,800m", color: "#a78bfa" },
};

function altToY(alt) {
  return ((alt - 1200) / 1600) * 5 + 0.2; // map 1200-2800m to 0.2-5.2
}

// ── Terrain geometry ──────────────────────────────────────────────
function Terrain() {
  const meshRef = useRef();
  const geometry = useMemo(() => {
    const size = 20;
    const segments = 128;
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getY(i); // PlaneGeometry: Y is our Z before rotation

      // Base terrain noise
      let height = fbm(x * 0.15, z * 0.15, 6) * 3;

      // Add mountain peaks at key locations
      for (const loc of Object.values(LOCATIONS)) {
        const dx = x - loc.x;
        const dz = z - loc.z;
        const dist = Math.sqrt(dx*dx + dz*dz);
        const targetH = altToY(loc.alt);
        const influence = Math.exp(-dist * dist / 8);
        height += (targetH - 1.5) * influence * 0.6;
      }

      // Valluga massive peak influence
      const vdx = x - LOCATIONS.valluga.x;
      const vdz = z - LOCATIONS.valluga.z;
      const vdist = Math.sqrt(vdx*vdx + vdz*vdz);
      height += 2.5 * Math.exp(-vdist * vdist / 12);

      // Schindlergrat ridge
      const sdx = x - LOCATIONS.schindlergrat.x;
      const sdz = z - LOCATIONS.schindlergrat.z;
      const sdist = Math.sqrt(sdx*sdx + sdz*sdz);
      height += 1.8 * Math.exp(-sdist * sdist / 10);

      // Lower valley at Nasserein
      const ndx = x - LOCATIONS.nasserein.x;
      const ndz = z - LOCATIONS.nasserein.z;
      const ndist = Math.sqrt(ndx*ndx + ndz*ndz);
      height -= 1.2 * Math.exp(-ndist * ndist / 6);

      // Ensure minimum height
      height = Math.max(height, -0.5);
      pos.setZ(i, height);

      // Color based on height: green valleys -> grey rock -> white snow
      const normalH = (height + 0.5) / 5.5;
      if (normalH < 0.25) {
        // Valley - dark green
        colors[i*3] = 0.15; colors[i*3+1] = 0.25 + normalH; colors[i*3+2] = 0.12;
      } else if (normalH < 0.5) {
        // Mid - rocky grey
        const t = (normalH - 0.25) / 0.25;
        colors[i*3] = 0.15 + t * 0.35; colors[i*3+1] = 0.25 + t * 0.25; colors[i*3+2] = 0.12 + t * 0.38;
      } else {
        // Snow - white with slight blue tint
        const t = Math.min((normalH - 0.5) / 0.5, 1);
        colors[i*3] = 0.5 + t * 0.45; colors[i*3+1] = 0.5 + t * 0.45; colors[i*3+2] = 0.55 + t * 0.42;
      }
    }

    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  return React.createElement("mesh", {
    ref: meshRef,
    geometry: geometry,
    rotation: [-Math.PI / 2, 0, 0],
    receiveShadow: true,
  },
    React.createElement("meshStandardMaterial", {
      vertexColors: true,
      roughness: 0.85,
      metalness: 0.05,
      flatShading: true,
    })
  );
}

// ── Get height at a terrain position ──────────────────────────────
function getTerrainHeight(x, z) {
  let height = fbm(x * 0.15, z * 0.15, 6) * 3;
  for (const loc of Object.values(LOCATIONS)) {
    const dx = x - loc.x;
    const dz = z - loc.z;
    const dist = Math.sqrt(dx*dx + dz*dz);
    const targetH = altToY(loc.alt);
    const influence = Math.exp(-dist * dist / 8);
    height += (targetH - 1.5) * influence * 0.6;
  }
  const vdx = x - LOCATIONS.valluga.x;
  const vdz = z - LOCATIONS.valluga.z;
  height += 2.5 * Math.exp(-(vdx*vdx + vdz*vdz) / 12);
  const sdx = x - LOCATIONS.schindlergrat.x;
  const sdz = z - LOCATIONS.schindlergrat.z;
  height += 1.8 * Math.exp(-(sdx*sdx + sdz*sdz) / 10);
  const ndx = x - LOCATIONS.nasserein.x;
  const ndz = z - LOCATIONS.nasserein.z;
  height -= 1.2 * Math.exp(-(ndx*ndx + ndz*ndz) / 6);
  return Math.max(height, -0.5);
}

// ── Route definitions (paths between locations) ───────────────────
const ROUTE_DEFS = {
  "morning-blast": {
    color: "#ffd93d",
    waypoints: ["nasserein", "gampen", "kapall", "gampen", "kapall", "galzig"],
  },
  "schindler-explorer": {
    color: "#a78bfa",
    waypoints: ["galzig", "schindlergrat", "galzig", "schindlergrat", "stChristoph"],
  },
  "stuben-gorge": {
    color: "#ff6b6b",
    waypoints: ["schindlergrat", "stChristoph", "galzig"],
  },
  "mattun-offpiste": {
    color: "#4ecdc4",
    waypoints: ["kapall", "schindlergrat", "gampen"],
  },
  "lech-crossing": {
    color: "#ffd93d",
    waypoints: ["galzig", "schindlergrat", "stChristoph"],
  },
  "happy-valley-home": {
    color: "#4ecdc4",
    waypoints: ["galzig", "gampen", "nasserein"],
  },
};

function interpolatePath(from, to, steps = 12) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = from.x + (to.x - from.x) * t;
    const z = from.z + (to.z - from.z) * t;
    const y = getTerrainHeight(x, z) + 0.15; // slight offset above terrain
    pts.push(new THREE.Vector3(x, y, z));
  }
  return pts;
}

// ── Animated ski route line ───────────────────────────────────────
function SkiRoute({ routeId, highlighted, onClick }) {
  const def = ROUTE_DEFS[routeId];
  if (!def) return null;

  const points = useMemo(() => {
    const allPts = [];
    for (let i = 0; i < def.waypoints.length - 1; i++) {
      const from = LOCATIONS[def.waypoints[i]];
      const to = LOCATIONS[def.waypoints[i + 1]];
      const segment = interpolatePath(from, to, 10);
      if (i > 0) segment.shift(); // avoid duplicate points
      allPts.push(...segment);
    }
    return allPts;
  }, [routeId]);

  const lineRef = useRef();
  const [dashOffset, setDashOffset] = useState(0);

  useFrame((_, delta) => {
    if (highlighted) {
      setDashOffset(prev => prev - delta * 2);
    }
  });

  const opacity = highlighted ? 1 : 0.25;
  const lineWidth = highlighted ? 3 : 1.5;

  return React.createElement(Line, {
    ref: lineRef,
    points: points,
    color: def.color,
    lineWidth: lineWidth,
    opacity: opacity,
    transparent: true,
    dashed: highlighted,
    dashSize: 0.5,
    dashOffset: dashOffset,
    gapSize: 0.3,
    onClick: onClick,
  });
}

// ── Mountain station markers ──────────────────────────────────────
function StationMarker({ loc }) {
  const position = useMemo(() => {
    const y = getTerrainHeight(loc.x, loc.z) + 0.6;
    return [loc.x, y, loc.z];
  }, [loc]);

  const poleBase = useMemo(() => {
    const y = getTerrainHeight(loc.x, loc.z);
    return [loc.x, y, loc.z];
  }, [loc]);

  return React.createElement("group", null,
    // Pole
    React.createElement("mesh", { position: [loc.x, (position[1] + poleBase[1]) / 2, loc.z] },
      React.createElement("cylinderGeometry", { args: [0.02, 0.02, position[1] - poleBase[1], 6] }),
      React.createElement("meshStandardMaterial", { color: loc.color, opacity: 0.6, transparent: true })
    ),
    // Marker sphere
    React.createElement("mesh", { position: position },
      React.createElement("sphereGeometry", { args: [0.12, 12, 12] }),
      React.createElement("meshStandardMaterial", { color: loc.color, emissive: loc.color, emissiveIntensity: 0.5 })
    ),
    // Label
    React.createElement(Billboard, { position: [position[0], position[1] + 0.45, position[2]] },
      React.createElement(Text, {
        fontSize: 0.28,
        color: loc.color,
        anchorX: "center",
        anchorY: "bottom",
        outlineWidth: 0.02,
        outlineColor: "#0a0d12",
        font: undefined,
      }, loc.label)
    )
  );
}

// ── Lift cables ───────────────────────────────────────────────────
const LIFTS = [
  { from: "nasserein", to: "gampen", label: "Nassereinbahn" },
  { from: "gampen", to: "kapall", label: "Kapall Chair" },
  { from: "galzig", to: "schindlergrat", label: "Schindlergrat" },
  { from: "gampen", to: "galzig", label: "Galzigbahn" },
];

function LiftCable({ from, to }) {
  const points = useMemo(() => {
    const f = LOCATIONS[from];
    const t = LOCATIONS[to];
    const pts = [];
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      const frac = i / steps;
      const x = f.x + (t.x - f.x) * frac;
      const z = f.z + (t.z - f.z) * frac;
      const baseY = getTerrainHeight(x, z);
      // Cable sag (catenary approximation)
      const sag = -Math.sin(frac * Math.PI) * 0.3;
      // Lift cable goes higher above terrain
      const cableHeight = 1.2 + sag;
      pts.push(new THREE.Vector3(x, baseY + cableHeight, z));
    }
    return pts;
  }, [from, to]);

  return React.createElement(Line, {
    points: points,
    color: "#555a66",
    lineWidth: 1,
    opacity: 0.4,
    transparent: true,
  });
}

// ── Snow particles ────────────────────────────────────────────────
function SnowParticles() {
  const count = 400;
  const meshRef = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i*3] = (Math.random() - 0.5) * 24;
      arr[i*3+1] = Math.random() * 10;
      arr[i*3+2] = (Math.random() - 0.5) * 24;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      pos.array[i*3+1] -= delta * 1.2; // fall speed
      pos.array[i*3] += Math.sin(Date.now() * 0.001 + i) * delta * 0.15; // drift
      if (pos.array[i*3+1] < -1) {
        pos.array[i*3+1] = 8 + Math.random() * 2;
        pos.array[i*3] = (Math.random() - 0.5) * 24;
        pos.array[i*3+2] = (Math.random() - 0.5) * 24;
      }
    }
    pos.needsUpdate = true;
  });

  return React.createElement("points", { ref: meshRef },
    React.createElement("bufferGeometry", null,
      React.createElement("bufferAttribute", {
        attach: "attributes-position",
        count: count,
        array: positions,
        itemSize: 3,
      })
    ),
    React.createElement("pointsMaterial", {
      size: 0.06,
      color: "#e8ecf4",
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    })
  );
}

// ── Day/night lighting ────────────────────────────────────────────
function DayNightLighting() {
  const lightRef = useRef();
  const [hour] = useState(() => new Date().getHours() + new Date().getMinutes() / 60);

  // Map hour to sun angle and intensity
  const sunAngle = useMemo(() => {
    // 6am = sunrise, 12 = noon, 18 = sunset
    const angle = ((hour - 6) / 12) * Math.PI;
    return Math.max(0, Math.min(Math.PI, angle));
  }, [hour]);

  const intensity = useMemo(() => {
    if (hour < 6 || hour > 20) return 0.1;
    if (hour < 8) return 0.3 + (hour - 6) / 2 * 0.7;
    if (hour > 18) return 0.3 + (20 - hour) / 2 * 0.7;
    return 1;
  }, [hour]);

  const sunColor = useMemo(() => {
    if (hour < 7 || hour > 19) return "#ff8844";
    if (hour < 9 || hour > 17) return "#ffaa66";
    return "#ffffff";
  }, [hour]);

  const ambientIntensity = useMemo(() => {
    if (hour < 6 || hour > 20) return 0.15;
    return 0.3 + intensity * 0.2;
  }, [hour, intensity]);

  return React.createElement(React.Fragment, null,
    React.createElement("ambientLight", { intensity: ambientIntensity, color: "#8899bb" }),
    React.createElement("directionalLight", {
      ref: lightRef,
      position: [Math.cos(sunAngle) * 10, Math.sin(sunAngle) * 10, 5],
      intensity: intensity * 1.2,
      color: sunColor,
      castShadow: true,
    }),
    React.createElement("hemisphereLight", {
      args: ["#668899", "#334455", 0.3],
    })
  );
}

// ── Main scene content ────────────────────────────────────────────
function Scene({ selectedRoute, onRouteClick }) {
  return React.createElement(React.Fragment, null,
    React.createElement(DayNightLighting),
    React.createElement(Terrain),
    // Station markers
    ...Object.entries(LOCATIONS).map(([key, loc]) =>
      React.createElement(StationMarker, { key: key, loc: loc })
    ),
    // Lift cables
    ...LIFTS.map((lift, i) =>
      React.createElement(LiftCable, { key: `lift-${i}`, from: lift.from, to: lift.to })
    ),
    // Ski routes
    ...Object.keys(ROUTE_DEFS).map(id =>
      React.createElement(SkiRoute, {
        key: id,
        routeId: id,
        highlighted: !selectedRoute || selectedRoute === id,
        onClick: () => onRouteClick?.(id),
      })
    ),
    React.createElement(SnowParticles),
    React.createElement(OrbitControls, {
      enablePan: true,
      enableZoom: true,
      enableRotate: true,
      minDistance: 5,
      maxDistance: 30,
      maxPolarAngle: Math.PI / 2.1,
      autoRotate: !selectedRoute,
      autoRotateSpeed: 0.3,
      target: [0, 1.5, 0],
    }),
    React.createElement("fog", { attach: "fog", args: ["#0a0d12", 15, 35] })
  );
}

// ── Route selector UI ─────────────────────────────────────────────
const ROUTE_LABELS = [
  { id: "morning-blast", label: "Morning Blast", color: "#ffd93d" },
  { id: "schindler-explorer", label: "Schindler Explorer", color: "#a78bfa" },
  { id: "stuben-gorge", label: "Stuben Gorge", color: "#ff6b6b" },
  { id: "mattun-offpiste", label: "Mattun Off-Piste", color: "#4ecdc4" },
  { id: "lech-crossing", label: "Lech Crossing", color: "#ffd93d" },
  { id: "happy-valley-home", label: "Happy Valley", color: "#4ecdc4" },
];

// ── Exported component ────────────────────────────────────────────
export default function Mountain3D({ selectedRoute: externalRoute }) {
  const [internalRoute, setInternalRoute] = useState(null);
  const activeRoute = externalRoute || internalRoute;

  const handleRouteClick = useCallback((id) => {
    setInternalRoute(prev => prev === id ? null : id);
  }, []);

  return React.createElement("div", {
    style: {
      width: "100%",
      height: "450px",
      borderRadius: 16,
      overflow: "hidden",
      border: "1px solid #1e2433",
      background: "#0a0d12",
      position: "relative",
      marginBottom: "1.5rem",
    }
  },
    React.createElement(Canvas, {
      camera: { position: [12, 8, 12], fov: 50 },
      dpr: [1, 1.5],
      gl: { antialias: true, alpha: false },
      style: { background: "#0a0d12" },
    },
      React.createElement(Scene, {
        selectedRoute: activeRoute,
        onRouteClick: handleRouteClick,
      })
    ),
    // Route selector overlay
    React.createElement("div", {
      style: {
        position: "absolute",
        bottom: 12,
        left: 12,
        right: 12,
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
        justifyContent: "center",
      }
    },
      React.createElement("button", {
        onClick: () => setInternalRoute(null),
        style: {
          padding: "4px 10px",
          borderRadius: 6,
          border: `1px solid ${!activeRoute ? "#fff" : "#333"}`,
          background: !activeRoute ? "rgba(255,255,255,0.15)" : "rgba(10,13,18,0.8)",
          color: !activeRoute ? "#fff" : "#8892a4",
          cursor: "pointer",
          fontSize: "0.7rem",
          fontWeight: 600,
          fontFamily: "inherit",
          backdropFilter: "blur(8px)",
        }
      }, "All Routes"),
      ...ROUTE_LABELS.map(r =>
        React.createElement("button", {
          key: r.id,
          onClick: () => handleRouteClick(r.id),
          style: {
            padding: "4px 10px",
            borderRadius: 6,
            border: `1px solid ${activeRoute === r.id ? r.color : "#333"}`,
            background: activeRoute === r.id ? `${r.color}22` : "rgba(10,13,18,0.8)",
            color: activeRoute === r.id ? r.color : "#8892a4",
            cursor: "pointer",
            fontSize: "0.7rem",
            fontWeight: 600,
            fontFamily: "inherit",
            backdropFilter: "blur(8px)",
          }
        }, r.label)
      )
    ),
    // Title overlay
    React.createElement("div", {
      style: {
        position: "absolute",
        top: 12,
        left: 16,
        color: "#e4e8f0",
        fontSize: "0.85rem",
        fontWeight: 700,
        textShadow: "0 2px 8px rgba(0,0,0,0.8)",
        pointerEvents: "none",
      }
    }, "Arlberg 3D Terrain"),
    React.createElement("div", {
      style: {
        position: "absolute",
        top: 30,
        left: 16,
        color: "#8892a4",
        fontSize: "0.65rem",
        textShadow: "0 2px 8px rgba(0,0,0,0.8)",
        pointerEvents: "none",
      }
    }, "Drag to rotate \u00B7 Scroll to zoom")
  );
}
