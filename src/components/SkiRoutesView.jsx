import React, { lazy, Suspense } from "react";
import { SKI_ROUTES, MOUNTAIN_STOPS, SPRING_TIPS } from "../data/skiroutes.js";

const Mountain3D = lazy(() => import("./Mountain3D.jsx"));

export function SkiRoutesView({ setView }) {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
      <Suspense
        fallback={
          <div
            style={{
              width: "100%",
              height: 450,
              borderRadius: 16,
              background: "#14181f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#8892a4",
              marginBottom: "1.5rem",
              border: "1px solid #1e2433",
            }}
          >
            Loading 3D terrain...
          </div>
        }
      >
        <Mountain3D selectedRoute={null} />
      </Suspense>

      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}>
          🏂 Ski Routes from Nassereinbahn
        </h2>
        <p style={{ color: "#8892a4", fontSize: "1rem" }}>
          Expert snowboard routes — mostly reds with off-piste options — starting from Gampen
          (1,850m)
        </p>
      </div>

      {/* Piste Map */}
      <div
        style={{
          background: "#14181f",
          borderRadius: 16,
          border: "1px solid #1e2433",
          overflow: "hidden",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            borderBottom: "1px solid #1e2433",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            🗺️ Ski Arlberg Piste Map
          </h3>
          <div style={{ display: "flex", gap: 6 }}>
            <a
              href="https://winter.intermaps.com/skiarlberg?lang=en"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "6px 12px",
                borderRadius: 8,
                border: "1px solid #4ecdc4",
                background: "rgba(78,205,196,0.1)",
                color: "#4ecdc4",
                textDecoration: "none",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              🔗 Interactive Map
            </a>
            <a
              href="https://www.skiarlberg.at/en/live-info/map-navigation"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "6px 12px",
                borderRadius: 8,
                border: "1px solid #a78bfa",
                background: "rgba(167,139,250,0.1)",
                color: "#a78bfa",
                textDecoration: "none",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              🎿 Official Site
            </a>
          </div>
        </div>
        <div
          style={{
            position: "relative",
            width: "100%",
            overflow: "auto",
            cursor: "grab",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <img
            src="https://vcdn.bergfex.at/images/resized/0e/a236879e501d050e_862a1d68f86a40e2@2x.jpg"
            alt="Ski Arlberg Piste Map 2024-25"
            style={{ width: "150%", minWidth: 1200, display: "block" }}
            onError={(e) => {
              e.target.src =
                "https://piste-maps.co.uk/Piste-Maps/Austria/Ski-Arlberg-Piste-Ski-Map-2024-25.jpg";
            }}
          />
        </div>
        <div
          style={{
            padding: "10px 16px",
            borderTop: "1px solid #1e2433",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "#6b7588" }}>
            Scroll/drag to pan · Pinch to zoom on mobile
          </span>
          <span style={{ fontSize: "0.75rem", color: "#6b7588" }}>
            300+ km · 200+ runs · 88 lifts
          </span>
        </div>
      </div>

      {/* Navigation buttons */}
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => {
            document.getElementById("routes-section")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid #ffd93d",
            background: "rgba(255,217,61,0.1)",
            color: "#ffd93d",
            cursor: "pointer",
            fontSize: "0.8rem",
            fontWeight: 600,
          }}
        >
          🗺 Routes
        </button>
        <button
          onClick={() => {
            document.getElementById("premium-section")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid #a78bfa",
            background: "rgba(167,139,250,0.1)",
            color: "#a78bfa",
            cursor: "pointer",
            fontSize: "0.8rem",
            fontWeight: 600,
          }}
        >
          ⭐ Premium Stops
        </button>
        <button
          onClick={() => {
            document.getElementById("value-section")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid #4ecdc4",
            background: "rgba(78,205,196,0.1)",
            color: "#4ecdc4",
            cursor: "pointer",
            fontSize: "0.8rem",
            fontWeight: 600,
          }}
        >
          💰 Value Stops
        </button>
        <button
          onClick={() => {
            document.getElementById("tips-section")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid #ff6b6b",
            background: "rgba(255,107,107,0.1)",
            color: "#ff6b6b",
            cursor: "pointer",
            fontSize: "0.8rem",
            fontWeight: 600,
          }}
        >
          ❄️ Spring Tips
        </button>
      </div>

      {/* Routes */}
      <div id="routes-section">
        {SKI_ROUTES.map((route, i) => (
          <div
            key={i}
            style={{
              background: "#14181f",
              border: "1px solid #1e2433",
              borderRadius: 16,
              padding: "1.75rem",
              marginBottom: 16,
              borderTop: "3px solid #ffd93d",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 16,
                flexWrap: "wrap",
                marginBottom: 12,
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 4px" }}>
                  {route.name}
                </h3>
                <div style={{ fontSize: "0.85rem", color: "#8892a4" }}>
                  {route.difficulty + " · " + route.vertical}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#ffd93d" }}>
                  {route.duration}
                </div>
              </div>
            </div>
            <p
              style={{
                color: "#a0a8b8",
                fontSize: "0.92rem",
                lineHeight: 1.7,
                marginBottom: 16,
              }}
            >
              {route.description}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
              {route.steps.map((step, j) => (
                <div
                  key={j}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 12px",
                    background: "#0e1118",
                    borderRadius: 8,
                    borderLeft:
                      step.type === "lift"
                        ? "3px solid #6c9bff"
                        : step.grade === "black"
                        ? "3px solid #1a1a2e"
                        : step.grade === "red"
                        ? "3px solid #ff6b6b"
                        : "3px solid #4ecdc4",
                  }}
                >
                  <span style={{ fontSize: "0.85rem" }}>
                    {step.type === "lift"
                      ? "🚡"
                      : step.grade === "black"
                      ? "◆"
                      : step.grade === "red"
                      ? "🔴"
                      : "🔵"}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "#c0c8d8" }}>{step.text}</span>
                </div>
              ))}
            </div>
            <div
              style={{
                background: "rgba(255,217,61,0.08)",
                border: "1px solid rgba(255,217,61,0.2)",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: "0.85rem",
                color: "#ffd93d",
              }}
            >
              {"💡 "}
              {route.tip}
            </div>
          </div>
        ))}
      </div>

      {/* Premium Mountain Stops */}
      <div id="premium-section" style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 16 }}>
          ⭐ Premium Mountain Stops
        </h2>
        <p style={{ color: "#8892a4", fontSize: "0.9rem", marginBottom: 20 }}>
          Gourmet dining and iconic Arlberg experiences
        </p>
        {MOUNTAIN_STOPS.premium.map((stop, i) => (
          <div
            key={i}
            style={{
              background: "#14181f",
              border: "1px solid #1e2433",
              borderRadius: 16,
              padding: "1.5rem",
              marginBottom: 14,
              borderLeft: `3px solid ${stop.color}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 8,
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 2px" }}>
                  {stop.name}
                </h3>
                <div style={{ fontSize: "0.8rem", color: "#8892a4" }}>
                  {stop.altitude + " · " + stop.location}
                </div>
              </div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#ffd93d" }}>
                {stop.price}
              </div>
            </div>
            <div
              style={{
                display: "inline-block",
                padding: "3px 10px",
                borderRadius: 20,
                fontSize: "0.7rem",
                fontWeight: 700,
                background:
                  stop.timing === "coffee"
                    ? "rgba(78,205,196,0.1)"
                    : "rgba(167,139,250,0.1)",
                border:
                  stop.timing === "coffee"
                    ? "1px solid rgba(78,205,196,0.3)"
                    : "1px solid rgba(167,139,250,0.3)",
                color: stop.timing === "coffee" ? "#4ecdc4" : "#a78bfa",
                marginBottom: 10,
              }}
            >
              {stop.bestFor}
            </div>
            <p
              style={{
                color: "#a0a8b8",
                fontSize: "0.88rem",
                lineHeight: 1.6,
                marginBottom: 10,
              }}
            >
              {stop.description}
            </p>
            <div style={{ fontSize: "0.82rem", color: "#6b7588" }}>{"💡 " + stop.tip}</div>
          </div>
        ))}
      </div>

      {/* Value Mountain Stops */}
      <div id="value-section" style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 16 }}>
          💰 Value Mountain Stops
        </h2>
        <p style={{ color: "#8892a4", fontSize: "0.9rem", marginBottom: 20 }}>
          Authentic Tyrolean huts — great food, better prices
        </p>
        {MOUNTAIN_STOPS.value.map((stop, i) => (
          <div
            key={i}
            style={{
              background: "#14181f",
              border: "1px solid #1e2433",
              borderRadius: 16,
              padding: "1.5rem",
              marginBottom: 14,
              borderLeft: `3px solid ${stop.color}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 8,
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 2px" }}>
                  {stop.name}
                </h3>
                <div style={{ fontSize: "0.8rem", color: "#8892a4" }}>
                  {stop.altitude + " · " + stop.location}
                </div>
              </div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#4ecdc4" }}>
                {stop.price}
              </div>
            </div>
            <div
              style={{
                display: "inline-block",
                padding: "3px 10px",
                borderRadius: 20,
                fontSize: "0.7rem",
                fontWeight: 700,
                background:
                  stop.timing === "coffee"
                    ? "rgba(78,205,196,0.1)"
                    : "rgba(167,139,250,0.1)",
                border:
                  stop.timing === "coffee"
                    ? "1px solid rgba(78,205,196,0.3)"
                    : "1px solid rgba(167,139,250,0.3)",
                color: stop.timing === "coffee" ? "#4ecdc4" : "#a78bfa",
                marginBottom: 10,
              }}
            >
              {stop.bestFor}
            </div>
            <p
              style={{
                color: "#a0a8b8",
                fontSize: "0.88rem",
                lineHeight: 1.6,
                marginBottom: 10,
              }}
            >
              {stop.description}
            </p>
            <div style={{ fontSize: "0.82rem", color: "#6b7588" }}>{"💡 " + stop.tip}</div>
          </div>
        ))}
      </div>

      {/* Spring Tips */}
      <div
        id="tips-section"
        style={{
          marginTop: 32,
          background:
            "linear-gradient(135deg, rgba(78,205,196,0.08), rgba(108,155,255,0.08))",
          border: "1px solid rgba(78,205,196,0.2)",
          borderRadius: 14,
          padding: "1.5rem",
        }}
      >
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 16 }}>
          ❄️ Late March / Spring Snow Tips
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {SPRING_TIPS.map((tip, i) => (
            <div
              key={i}
              style={{
                fontSize: "0.88rem",
                color: "#c0c8d8",
                padding: "6px 0",
                borderBottom:
                  i < SPRING_TIPS.length - 1
                    ? "1px solid rgba(78,205,196,0.1)"
                    : "none",
              }}
            >
              {tip}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setView("restaurants")}
        style={{
          width: "100%",
          marginTop: 24,
          padding: "14px 24px",
          borderRadius: 12,
          border: "1px solid #ff6b6b",
          background: "rgba(255,107,107,0.1)",
          color: "#ff6b6b",
          cursor: "pointer",
          fontSize: "0.9rem",
          fontWeight: 600,
          fontFamily: "inherit",
        }}
      >
        🍽 See Village Restaurants →
      </button>
    </div>
  );
}
