import React, { useState } from "react";
import { STAGES } from "../data/stages.js";

const typeColors = {
  drive: "#ffd93d",
  transfer: "#a78bfa",
  airport: "#6c9bff",
  boarding: "#ff6b6b",
  flight: "#a78bfa",
  car: "#4ecdc4",
  skiing: "#4ecdc4",
  apres: "#ff6b6b",
  arrival: "#4ecdc4",
};

export function JourneyView({ setView }) {
  const [activeStage, setActiveStage] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [journeyFilter, setJourneyFilter] = useState("all");

  const stage = STAGES[activeStage];

  const goTo = (idx) => {
    setActiveStage(idx);
    setAnimKey((k) => k + 1);
  };

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 80px)" }}>
      <aside
        className="sidebar"
        style={{
          width: 280,
          minWidth: 280,
          borderRight: "1px solid #1e2433",
          overflowY: "auto",
          background: "#0e1118",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "1rem", borderBottom: "1px solid #1e2433" }}>
          <div
            style={{
              fontSize: "0.7rem",
              color: "#8892a4",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 8,
            }}
          >
            {`Journey Steps (${STAGES.length})`}
          </div>
          <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
            {STAGES.map((s, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 3,
                  borderRadius: 2,
                  background: i <= activeStage ? typeColors[s.type] || "#4ecdc4" : "#252b38",
                  transition: "background 0.3s",
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {[
              { id: "all", label: "All" },
              { id: "outbound", label: "✈ Out" },
              { id: "resort", label: "⛷ Resort" },
              { id: "return", label: "✈ Back" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setJourneyFilter(f.id)}
                style={{
                  flex: 1,
                  padding: "5px 4px",
                  borderRadius: 6,
                  border:
                    journeyFilter === f.id
                      ? "1px solid #4ecdc4"
                      : "1px solid #252b38",
                  background:
                    journeyFilter === f.id
                      ? "rgba(78,205,196,0.1)"
                      : "transparent",
                  color: journeyFilter === f.id ? "#4ecdc4" : "#6b7588",
                  cursor: "pointer",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  fontFamily: "inherit",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        {STAGES.map((s, i) => {
          const section = i <= 12 ? "outbound" : i <= 14 ? "resort" : "return";
          if (journeyFilter !== "all" && section !== journeyFilter) return null;
          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 16px",
                background:
                  i === activeStage ? "rgba(78,205,196,0.08)" : "transparent",
                border: "none",
                borderLeft:
                  i === activeStage
                    ? `3px solid ${typeColors[s.type]}`
                    : "3px solid transparent",
                color: i === activeStage ? "#e4e8f0" : "#6b7588",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
                width: "100%",
                fontFamily: "inherit",
              }}
            >
              <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{s.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: typeColors[s.type],
                    fontWeight: 600,
                    fontFamily: "monospace",
                  }}
                >
                  {s.time}
                </div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: i === activeStage ? 600 : 400,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {s.title}
                </div>
              </div>
            </button>
          );
        })}
      </aside>

      <main key={animKey} style={{ flex: 1, overflowY: "auto", padding: 0 }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 300,
            overflow: "hidden",
            background: "#14181f",
          }}
        >
          <img
            src={stage.image}
            alt={stage.imageAlt}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, #0a0d12, transparent 50%)",
            }}
          />
          <div style={{ position: "absolute", bottom: 24, left: 32, right: 32 }}>
            <div
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: 6,
                background: `${stage.tagColor}22`,
                border: `1px solid ${stage.tagColor}44`,
                color: stage.tagColor,
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                marginBottom: 8,
              }}
            >
              {stage.tag}
            </div>
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: 700,
                margin: "0 0 4px",
                lineHeight: 1.2,
              }}
            >
              {stage.title}
            </h2>
            <div style={{ fontSize: "0.9rem", color: "#8892a4" }}>{stage.location}</div>
          </div>
          <div style={{ position: "absolute", top: 16, right: 24 }}>
            <div
              style={{
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                borderRadius: 10,
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>{stage.weather.icon}</span>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    fontFamily: "monospace",
                  }}
                >
                  {stage.weather.temp}
                </div>
                <div style={{ fontSize: "0.7rem", color: "#8892a4" }}>
                  {stage.weather.condition}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: "2rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 12,
              marginBottom: 24,
            }}
          >
            {[
              { label: "Time", value: stage.time },
              { label: "Temperature", value: stage.weather.temp, color: "#4ecdc4" },
              { label: "Wind", value: stage.weather.wind },
              { label: "Humidity", value: stage.weather.humidity },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  background: "#14181f",
                  borderRadius: 12,
                  padding: "14px 18px",
                  border: "1px solid #1e2433",
                }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "#8892a4",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 4,
                  }}
                >
                  {card.label}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontFamily: "monospace",
                    fontSize: "1.1rem",
                    color: card.color || "#e4e8f0",
                  }}
                >
                  {card.value}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "#14181f",
              borderRadius: 14,
              padding: "20px 24px",
              border: "1px solid #1e2433",
              marginBottom: 24,
            }}
          >
            <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "#c0c8d8", margin: 0 }}>
              {stage.description}
            </p>
          </div>

          <div
            style={{
              background: "#14181f",
              borderRadius: 14,
              padding: "20px 24px",
              border: "1px solid #1e2433",
              marginBottom: 24,
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ color: stage.tagColor }}>▸</span> Step-by-Step Walkthrough
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {stage.walkthrough.map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "10px 14px",
                    background: "#0e1118",
                    borderRadius: 10,
                    borderLeft: `3px solid ${stage.tagColor}33`,
                  }}
                >
                  <span style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "#c0c8d8" }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {stage.wazeUrl && (
            <a
              href={stage.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "16px 24px",
                borderRadius: 14,
                border: "1px solid #33ccff",
                background:
                  "linear-gradient(135deg, rgba(51,204,255,0.15), rgba(51,204,255,0.05))",
                color: "#33ccff",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: 700,
                marginBottom: 24,
                transition: "all 0.2s",
              }}
            >
              <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.54 6.63c-1.62-4.15-6.38-5.93-9.47-5.59C7.29 1.44 3.52 4.01 2.42 7.8 1.2 12.02 3.28 16.78 6.33 19.31c1.07.89 2.01 1.84 2.67 2.98.37.64.71 1.35 1.23 1.71.82.57 1.85-.22 1.85-.22s2.42-1.67 3.72-3.1c2.69-2.96 5.65-7.89 4.74-14.05zm-8.5 8.87c-2.74 0-4.96-2.22-4.96-4.96s2.22-4.96 4.96-4.96 4.96 2.22 4.96 4.96-2.22 4.96-4.96 4.96z" />
              </svg>
              {stage.wazeLabel}
            </a>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              marginTop: 24,
            }}
          >
            <button
              onClick={() => activeStage > 0 && goTo(activeStage - 1)}
              disabled={activeStage === 0}
              style={{
                flex: 1,
                padding: "14px 20px",
                borderRadius: 12,
                border: "1px solid #252b38",
                background: "#14181f",
                color: activeStage > 0 ? "#e4e8f0" : "#3a4050",
                cursor: activeStage > 0 ? "pointer" : "default",
                fontSize: "0.9rem",
                fontWeight: 600,
                fontFamily: "inherit",
              }}
            >
              ← Previous Step
            </button>
            <button
              onClick={() =>
                activeStage < STAGES.length - 1 && goTo(activeStage + 1)
              }
              disabled={activeStage === STAGES.length - 1}
              style={{
                flex: 1,
                padding: "14px 20px",
                borderRadius: 12,
                border: `1px solid ${activeStage < STAGES.length - 1 ? "#4ecdc4" : "#252b38"}`,
                background:
                  activeStage < STAGES.length - 1
                    ? "rgba(78,205,196,0.1)"
                    : "#14181f",
                color:
                  activeStage < STAGES.length - 1 ? "#4ecdc4" : "#3a4050",
                cursor:
                  activeStage < STAGES.length - 1 ? "pointer" : "default",
                fontSize: "0.9rem",
                fontWeight: 600,
                fontFamily: "inherit",
              }}
            >
              Next Step →
            </button>
          </div>

          {activeStage === STAGES.length - 1 && (
            <button
              onClick={() => setView("restaurants")}
              style={{
                width: "100%",
                marginTop: 16,
                padding: "16px 24px",
                borderRadius: 14,
                border: "1px solid #ff6b6b",
                background: "rgba(255,107,107,0.1)",
                color: "#ff6b6b",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 700,
                fontFamily: "inherit",
              }}
            >
              🍽 Where should we eat and drink in St Anton? →
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
