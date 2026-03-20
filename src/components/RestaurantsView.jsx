import React from "react";
import { RESTAURANTS } from "../data/restaurants.js";
import { STAGES } from "../data/stages.js";

export function RestaurantsView({ setView }) {
  const goToJourneyEnd = () => {
    setView("journey");
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}>
          🍽 Eat &amp; Drink in St Anton
        </h2>
        <p style={{ color: "#8892a4", fontSize: "1rem" }}>
          Top apr&egrave;s-ski bars and restaurants — from legendary slope-side parties to fine
          Tyrolean dining
        </p>
      </div>

      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(78,205,196,0.08), rgba(108,155,255,0.08))",
          border: "1px solid rgba(78,205,196,0.2)",
          borderRadius: 14,
          padding: "1.25rem 1.5rem",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <span style={{ fontSize: "1.5rem" }}>💡</span>
        <div>
          <strong style={{ color: "#4ecdc4" }}>My Top Picks</strong>
          <p
            style={{ margin: "4px 0 0", color: "#8892a4", fontSize: "0.9rem" }}
            dangerouslySetInnerHTML={{
              __html:
                "<strong style='color:#e4e8f0'>Apr\u00E8s-ski:</strong> Hit the <strong style='color:#ff6b6b'>MooserWirt</strong> at least once \u2014 it's a rite of passage.<br/><strong style='color:#e4e8f0'>Dinner:</strong> <strong style='color:#4ecdc4'>Fuhrmannstube by Buffy</strong> is literally next door to your hotel \u2014 incredible schnitzel, great value.<br/><strong style='color:#e4e8f0'>Treat night:</strong> <strong style='color:#a78bfa'>Alte Stube</strong> in the Schwarzer Adler is a 400-year-old gem \u2014 book ahead.",
            }}
          />
        </div>
      </div>

      {RESTAURANTS.map((r, i) => (
        <div
          key={i}
          style={{
            background: "#14181f",
            border: "1px solid #1e2433",
            borderRadius: 16,
            padding: "1.75rem",
            marginBottom: 16,
            borderTop: `3px solid ${r.color}`,
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
              <div
                style={{
                  fontSize: "0.7rem",
                  color: r.color,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  marginBottom: 4,
                }}
              >
                {r.recommended}
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 4px" }}>
                {r.name}
              </h3>
              <div style={{ fontSize: "0.85rem", color: "#8892a4" }}>{r.cuisine}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "#ffd93d" }}>
                {r.rating}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#8892a4" }}>{r.price}</div>
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
            {r.description}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 10,
              marginBottom: 14,
            }}
          >
            {[
              { label: "Distance", value: r.distance },
              { label: "Hours", value: r.hours, color: "#4ecdc4" },
              { label: "Location", value: r.location },
            ].map((card, j) => (
              <div
                key={j}
                style={{ background: "#0e1118", borderRadius: 10, padding: "10px 14px" }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "#8892a4",
                    textTransform: "uppercase",
                    marginBottom: 2,
                  }}
                >
                  {card.label}
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.88rem",
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
              background: `${r.color}11`,
              border: `1px solid ${r.color}22`,
              borderRadius: 10,
              padding: "10px 14px",
              fontSize: "0.85rem",
              color: "#c0c8d8",
            }}
          >
            {"💡 "}
            <strong>Tip:</strong> {r.tip}
          </div>
        </div>
      ))}

      <button
        onClick={goToJourneyEnd}
        style={{
          width: "100%",
          marginTop: 8,
          padding: "14px 24px",
          borderRadius: 12,
          border: "1px solid #6c9bff",
          background: "rgba(108,155,255,0.1)",
          color: "#6c9bff",
          cursor: "pointer",
          fontSize: "0.9rem",
          fontWeight: 600,
          fontFamily: "inherit",
        }}
      >
        ← Back to Journey Timeline
      </button>
    </div>
  );
}
