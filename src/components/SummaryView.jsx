import React, { useState } from "react";
import { TRIP_SUMMARY } from "../data/restaurants.js";

export function SummaryView({ setView }) {
  const [summaryFilter, setSummaryFilter] = useState("all");

  const goToJourneyStart = () => {
    setView("journey");
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}>📋 Trip Summary</h2>
        <p style={{ color: "#8892a4", fontSize: "1rem" }}>
          Gatwick → Innsbruck → St Anton am Arlberg — 19–24 March 2026
        </p>
      </div>

      {/* Travellers */}
      <div
        style={{
          background: "#14181f",
          borderRadius: 14,
          padding: "20px 24px",
          border: "1px solid #1e2433",
          marginBottom: 20,
        }}
      >
        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 16, color: "#4ecdc4" }}>
          👥 Travellers
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            "Andrew Batty (Economy Plus)",
            "James Herbert (Economy Basic)",
            "Lee Curtis (Economy Basic)",
          ].map((name, i) => (
            <div
              key={i}
              style={{
                background: "#0e1118",
                borderRadius: 10,
                padding: "12px 16px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{name.split(" (")[0]}</div>
              <div style={{ fontSize: "0.75rem", color: "#8892a4", marginTop: 2 }}>
                {name.match(/\((.+)\)/)?.[1]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Itinerary */}
      <div
        style={{
          background: "#14181f",
          borderRadius: 14,
          padding: "20px 24px",
          border: "1px solid #1e2433",
          marginBottom: 20,
        }}
      >
        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 16, color: "#6c9bff" }}>
          📅 Itinerary
        </h3>
        {TRIP_SUMMARY.days.map((day, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 16,
              padding: "12px 0",
              borderBottom:
                i < TRIP_SUMMARY.days.length - 1 ? "1px solid #1e2433" : "none",
            }}
          >
            <div
              style={{
                width: 100,
                flexShrink: 0,
                fontFamily: "monospace",
                fontSize: "0.85rem",
                color: "#4ecdc4",
                fontWeight: 600,
              }}
            >
              {day.date}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{day.label}</div>
              <div style={{ fontSize: "0.8rem", color: "#8892a4" }}>{day.detail}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Flights */}
      <div
        style={{
          background: "#14181f",
          borderRadius: 14,
          padding: "20px 24px",
          border: "1px solid #1e2433",
          marginBottom: 20,
        }}
      >
        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 16, color: "#a78bfa" }}>
          ✈️ Flights
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div
            style={{
              background: "#0e1118",
              borderRadius: 12,
              padding: "16px",
              borderLeft: "3px solid #4ecdc4",
            }}
          >
            <div
              style={{ fontSize: "0.7rem", color: "#4ecdc4", fontWeight: 700, marginBottom: 8 }}
            >
              OUTBOUND — Fri 20 Mar
            </div>
            <div style={{ fontWeight: 700, fontSize: "1rem" }}>BA2620</div>
            <div style={{ fontSize: "0.85rem", color: "#8892a4", marginTop: 4 }}>
              LGW 7:45 AM → INN 10:45 AM
            </div>
            <div style={{ fontSize: "0.8rem", color: "#6b7588", marginTop: 2 }}>
              BA Euroflyer · Boarding 07:05
            </div>
            <div style={{ fontSize: "0.8rem", color: "#4ecdc4", marginTop: 4 }}>
              Row 18: Andy 18F · Lee 18E · Jim 18D
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#ffd93d",
                fontWeight: 600,
                marginTop: 8,
              }}
            >
              £207.64 (3 pax)
            </div>
          </div>
          <div
            style={{
              background: "#0e1118",
              borderRadius: 12,
              padding: "16px",
              borderLeft: "3px solid #ff6b6b",
            }}
          >
            <div
              style={{ fontSize: "0.7rem", color: "#ff6b6b", fontWeight: 700, marginBottom: 8 }}
            >
              RETURN — Tue 24 Mar
            </div>
            <div style={{ fontWeight: 700, fontSize: "1rem" }}>EZY8696</div>
            <div style={{ fontSize: "0.85rem", color: "#8892a4", marginTop: 4 }}>
              INN 18:55 → LGW 19:55
            </div>
            <div style={{ fontSize: "0.8rem", color: "#6b7588", marginTop: 2 }}>
              easyJet · Ref: KBXZJFX · Gate closes 18:25
            </div>
            <div style={{ fontSize: "0.8rem", color: "#4ecdc4", marginTop: 4 }}>
              Row 26: Andy 26A · Lee 26B · Jim 26C
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#ffd93d",
                fontWeight: 600,
                marginTop: 8,
              }}
            >
              €277.44 (3 pax, inc. 3x 23kg bags)
            </div>
          </div>
        </div>
      </div>

      {/* Taxis */}
      <div
        style={{
          background: "#14181f",
          borderRadius: 14,
          padding: "20px 24px",
          border: "1px solid #1e2433",
          marginBottom: 20,
        }}
      >
        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 16, color: "#a78bfa" }}>
          🚕 Taxis
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div
            style={{
              background: "#0e1118",
              borderRadius: 12,
              padding: "16px",
              borderLeft: "3px solid #4ecdc4",
            }}
          >
            <div
              style={{ fontSize: "0.7rem", color: "#4ecdc4", fontWeight: 700, marginBottom: 8 }}
            >
              TO GATWICK — Fri 20 Mar
            </div>
            <div style={{ fontWeight: 700 }}>05:30 — Estate Car</div>
            <div style={{ fontSize: "0.85rem", color: "#8892a4", marginTop: 4 }}>
              Upper Gatton Park → Gatwick South
            </div>
            <div style={{ fontSize: "0.8rem", color: "#6b7588", marginTop: 2 }}>
              Ref: 798854 · Mr J Herbert
            </div>
            <div style={{ fontSize: "0.8rem", color: "#6b7588", marginTop: 2 }}>
              📞 07775 578900
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#ffd93d",
                fontWeight: 600,
                marginTop: 8,
              }}
            >
              £55.00 cash/card
            </div>
          </div>
          <div
            style={{
              background: "#0e1118",
              borderRadius: 12,
              padding: "16px",
              borderLeft: "3px solid #ff6b6b",
            }}
          >
            <div
              style={{ fontSize: "0.7rem", color: "#ff6b6b", fontWeight: 700, marginBottom: 8 }}
            >
              FROM GATWICK — Tue 24 Mar
            </div>
            <div style={{ fontWeight: 700 }}>19:55 — Estate Car</div>
            <div style={{ fontSize: "0.85rem", color: "#8892a4", marginTop: 4 }}>
              Gatwick → Upper Gatton Park
            </div>
            <div style={{ fontSize: "0.8rem", color: "#6b7588", marginTop: 2 }}>
              Ref: 798855 · Mr J Herbert
            </div>
            <div style={{ fontSize: "0.8rem", color: "#6b7588", marginTop: 2 }}>
              Meeting flight EZY8696 · 3x hold bags
            </div>
            <div style={{ fontSize: "0.8rem", color: "#ff6b6b", marginTop: 4 }}>
              ⚠️ Booked from South — easyJet lands at NORTH
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#ffd93d",
                fontWeight: 600,
                marginTop: 8,
              }}
            >
              £60.00 cash/card
            </div>
          </div>
        </div>
        <div style={{ fontSize: "0.78rem", color: "#6b7588", marginTop: 12 }}>
          W3W pickup: ///energy.magma.exile — white signpost at bottom of drive, take right fork
          approaching house
        </div>
      </div>

      {/* Accommodation */}
      <div
        style={{
          background: "#14181f",
          borderRadius: 14,
          padding: "20px 24px",
          border: "1px solid #1e2433",
          marginBottom: 20,
        }}
      >
        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 16, color: "#ffd93d" }}>
          🏨 Accommodation
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div
            style={{
              background: "#0e1118",
              borderRadius: 12,
              padding: "16px",
              borderLeft: "3px solid #ffd93d",
            }}
          >
            <div
              style={{ fontSize: "0.7rem", color: "#ffd93d", fontWeight: 700, marginBottom: 8 }}
            >
              NIGHT 1 — Fri 20 Mar
            </div>
            <div style={{ fontWeight: 700 }}>Hotel Bruggner Stub'n ★★★</div>
            <div style={{ fontSize: "0.85rem", color: "#8892a4", marginTop: 4 }}>
              Flirstrasse 30, Landeck · Triple room
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#ffd93d",
                fontWeight: 600,
                marginTop: 8,
              }}
            >
              Ref: 5825157964
            </div>
          </div>
          <div
            style={{
              background: "#0e1118",
              borderRadius: 12,
              padding: "16px",
              borderLeft: "3px solid #4ecdc4",
            }}
          >
            <div
              style={{ fontSize: "0.7rem", color: "#4ecdc4", fontWeight: 700, marginBottom: 8 }}
            >
              NIGHTS 2–4 — Sat 21 – Tue 24 Mar
            </div>
            <div style={{ fontWeight: 700 }}>Hotel Kirchplatz</div>
            <div style={{ fontSize: "0.85rem", color: "#8892a4", marginTop: 4 }}>
              St Anton am Arlberg · Dorfstrasse 73
            </div>
            <div style={{ fontSize: "0.8rem", color: "#6b7588", marginTop: 2 }}>
              Sauna, ski depot, breakfast, parking
            </div>
          </div>
        </div>
      </div>

      {/* Car Hire */}
      <div
        style={{
          background: "#14181f",
          borderRadius: 14,
          padding: "20px 24px",
          border: "1px solid #1e2433",
          marginBottom: 20,
        }}
      >
        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 16, color: "#4ecdc4" }}>
          🚗 Car Hire
        </h3>
        <div
          style={{
            background: "#0e1118",
            borderRadius: 12,
            padding: "16px",
            borderLeft: "3px solid #4ecdc4",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: "1rem" }}>Kia Stonic 5-door A/C</div>
          <div style={{ fontSize: "0.85rem", color: "#8892a4", marginTop: 4 }}>
            Enterprise via DoYouSpain
          </div>
          <div
            style={{
              fontSize: "0.85rem",
              color: "#4ecdc4",
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            Ref: DYS-201495906
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginTop: 12,
            }}
          >
            {[
              { label: "Pickup", value: "Fri 20 Mar, 11:00" },
              { label: "Return", value: "Tue 24 Mar, 18:00" },
              { label: "Location", value: "INN Arrivals Hall" },
              { label: "Total", value: "€287.80" },
              { label: "Prepaid", value: "€34.54" },
              { label: "Due on arrival", value: "€253.26" },
            ].map((d, i) => (
              <div key={i} style={{ fontSize: "0.8rem" }}>
                <span style={{ color: "#6b7588" }}>{d.label + ": "}</span>
                <span style={{ color: "#c0c8d8" }}>{d.value}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: "1px solid #1e2433",
              marginTop: 12,
              paddingTop: 12,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {[
              "Credit card required (Visa/MC/Amex) in Andrew Batty's name",
              "CDW included (excess €1,200) — SCDW €24/day removes excess",
              "Deposit: €450 (€200 with SCDW)",
              "Additional driver: €9/day (max €90)",
              "Winter tyres included (Nov–Apr)",
              "Snow chains: €42/rental — ask at desk",
              "Ski rack: €42/rental",
              "Vignette: should be included — CONFIRM at desk",
              "Fuel: full-to-full — €18 refueling charge if not full",
              "Unlimited mileage",
              "📞 Enterprise: +43 7203712501500",
            ].map((line, i) => (
              <div key={i} style={{ fontSize: "0.78rem", color: "#8892a4" }}>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Snowboard Hire */}
      <div
        style={{
          background: "#14181f",
          borderRadius: 14,
          padding: "20px 24px",
          border: "1px solid #1e2433",
          marginBottom: 20,
        }}
      >
        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 16, color: "#a78bfa" }}>
          🏂 Snowboard Hire
        </h3>
        <div
          style={{
            background: "#0e1118",
            borderRadius: 12,
            padding: "16px",
            borderLeft: "3px solid #a78bfa",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: "1rem" }}>
            2x Master 5* Snowboard + Boots
          </div>
          <div style={{ fontSize: "0.85rem", color: "#8892a4", marginTop: 4 }}>
            Hervis Imst (2beGROUP)
          </div>
          <div
            style={{
              fontSize: "0.85rem",
              color: "#a78bfa",
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            Ref: BPPLCA
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginTop: 12,
            }}
          >
            {[
              { label: "Store", value: "Industriezone 35, 6460 Imst" },
              { label: "Period", value: "20/03 – 24/03/2026" },
              { label: "Hours (Fri)", value: "9:00–18:00" },
              { label: "Hours (Tue)", value: "9:00–18:00" },
              { label: "Paid", value: "£135.36 online" },
              { label: "Due in store", value: "€0.00" },
            ].map((d, i) => (
              <div key={i} style={{ fontSize: "0.8rem" }}>
                <span style={{ color: "#6b7588" }}>{d.label + ": "}</span>
                <span style={{ color: "#c0c8d8" }}>{d.value}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: "1px solid #1e2433",
              marginTop: 12,
              paddingTop: 12,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            <div style={{ background: "#14181f", borderRadius: 8, padding: "10px 12px" }}>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "#a78bfa",
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                ANDY (RXBPPLCA0)
              </div>
              <div style={{ fontSize: "0.78rem", color: "#c0c8d8" }}>
                176cm / 90kg / Shoe 42
              </div>
              <div style={{ fontSize: "0.78rem", color: "#8892a4" }}>Expert</div>
            </div>
            <div style={{ background: "#14181f", borderRadius: 8, padding: "10px 12px" }}>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "#a78bfa",
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                LEE (RXBPPLCA1)
              </div>
              <div style={{ fontSize: "0.78rem", color: "#c0c8d8" }}>
                163cm / 85kg / Shoe 41
              </div>
              <div style={{ fontSize: "0.78rem", color: "#8892a4" }}>Expert</div>
            </div>
          </div>
          <div style={{ fontSize: "0.78rem", color: "#6b7588", marginTop: 10 }}>
            📞 +43 5412 638132 · hm17-300.imst@hervis.at
          </div>
          <div style={{ fontSize: "0.78rem", color: "#6b7588", marginTop: 4 }}>
            Jim: own gear — nothing to collect
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div
        style={{
          background: "#14181f",
          borderRadius: 14,
          padding: "20px 24px",
          border: "1px solid #1e2433",
          marginBottom: 20,
        }}
      >
        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 16, color: "#ff6b6b" }}>
          💰 Cost Breakdown (excl. resort costs)
        </h3>
        {TRIP_SUMMARY.costs.map((c, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom:
                i < TRIP_SUMMARY.costs.length - 1 ? "1px solid #1e2433" : "none",
            }}
          >
            <span style={{ color: "#c0c8d8" }}>{c.item}</span>
            <span style={{ fontWeight: 700, fontFamily: "monospace", color: "#ffd93d" }}>
              {c.cost}
            </span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 16,
            marginTop: 8,
            borderTop: "2px solid #252b38",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>Estimated Total</span>
          <span
            style={{
              fontWeight: 700,
              fontFamily: "monospace",
              fontSize: "1.1rem",
              color: "#4ecdc4",
            }}
          >
            ~£800–950
          </span>
        </div>
      </div>

      {/* Don't Forget */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(255,107,107,0.08), rgba(255,217,61,0.08))",
          border: "1px solid rgba(255,107,107,0.2)",
          borderRadius: 14,
          padding: "20px 24px",
          marginBottom: 20,
        }}
      >
        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 12, color: "#ff6b6b" }}>
          ⚠️ Don't Forget
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            "Passport/ID for all three travellers",
            "James & Lee: Economy Basic — no checked bags, no seat selection (add at check-in if needed)",
            "easyJet check-in opens 30 days before (Feb 22) — do it early for better seats",
            "Add passport details to easyJet booking (ref: KBXZJFX)",
            "easyJet return: 3x 23kg hold bags included, but cabin is SMALL under-seat bag only",
            "Snowboard pickup: Hervis Imst on the way to St Anton (booking BPPLCA, print confirmation)",
            "Snowboard dropoff: Hervis Imst on the way back (allow 15 min)",
            "Rental car: confirm winter tyres, vignette, and ask about snow chains",
            "Arlberg Tunnel toll: ~€10-18 per trip (not covered by motorway vignette)",
            "Return flight Tue 24 Mar: leave St Anton by 3:45 PM for 6:55 PM flight",
          ].map((note, i) => (
            <div
              key={i}
              style={{
                fontSize: "0.88rem",
                color: "#c0c8d8",
                padding: "6px 0",
                borderBottom: "1px solid rgba(255,107,107,0.1)",
              }}
            >
              {`${i + 1}. ${note}`}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={goToJourneyStart}
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
