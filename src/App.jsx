import React, { useState, useEffect } from "react";
import { ALLOWED_EMAILS, msalInstance, msalInitPromise, loginRequest, nukeAuthAndReload } from "./auth.js";
import { STAGES } from "./data/stages.js";
import { RESTAURANTS, TRIP_SUMMARY } from "./data/restaurants.js";

export function App() {
  const [authState, setAuthState] = useState("loading"); // loading | login | denied | app
  const [authError, setAuthError] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [view, setView] = useState("journey");
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
        // Timeout prevents MSAL init hanging forever (known issue with stale localStorage)
        const resp = await Promise.race([
          msalInitPromise.then(() => msalInstance.handleRedirectPromise()),
          new Promise((_, reject) => setTimeout(() => reject(new Error("MSAL init timeout")), 3000)),
        ]);

        const accounts = msalInstance.getAllAccounts();
        if (resp && resp.account) {
          const email = (resp.account.username || "").toLowerCase();
          if (ALLOWED_EMAILS.includes(email)) { setAuthState("app"); }
          else { setAuthError(email); setAuthState("denied"); }
        } else if (accounts.length > 0) {
          const email = (accounts[0].username || "").toLowerCase();
          if (ALLOWED_EMAILS.includes(email)) { setAuthState("app"); }
          else { setAuthError(email); setAuthState("denied"); }
        } else {
          setAuthState("login");
        }
      } catch (err) {
        console.error("MSAL init error:", err);
        setAuthState("login");
      }
    };
    init();
  }, []);

  const handleLogin = async () => {
    setLoginBusy(true);
    setAuthError("");
    try {
      await msalInitPromise;
      await msalInstance.loginPopup(loginRequest);
      // Re-check accounts after popup returns
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        const email = (accounts[0].username || "").toLowerCase();
        if (ALLOWED_EMAILS.includes(email)) { setAuthState("app"); }
        else { setAuthError(email); setAuthState("denied"); }
      }
    } catch (e) {
      console.error("Login error:", e?.errorCode, e?.message);
      if (e?.errorCode === "user_cancelled") { setLoginBusy(false); return; }
      // Popup blocked — fall back to redirect
      if (e?.errorCode === "popup_window_error" || e?.errorCode === "empty_window_error") {
        try { await msalInstance.loginRedirect(loginRequest); return; } catch {}
      }
      // Stale interaction — nuke and reload
      if (e?.errorCode === "interaction_in_progress") {
        nukeAuthAndReload();
        return;
      }
      setAuthError(e?.message || "Sign-in failed. Please try again.");
      setLoginBusy(false);
    }
  };

  const handleLogout = async () => {
    try {
      await msalInitPromise;
      await msalInstance.logoutPopup();
      setAuthState("login");
      setAuthError("");
    } catch (err) {
      if (err?.errorCode !== "user_cancelled") {
        // Logout popup blocked — nuke state manually
        nukeAuthAndReload();
      }
    }
  };

  if (authState === "loading") {
    return React.createElement("div", { style: { fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", background: "#0a0d12", color: "#e4e8f0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" } },
      React.createElement("div", { style: { textAlign: "center" } },
        React.createElement("div", { style: { fontSize: "3rem", marginBottom: 16 } }, "\u26F7\uFE0F"),
        React.createElement("div", { style: { color: "#8892a4" } }, "Loading...")
      )
    );
  }

  if (authState === "login") {
    return React.createElement("div", { style: { fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", background: "#0a0d12", color: "#e4e8f0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" } },
      React.createElement("div", { style: { background: "#14181f", border: "1px solid #1e2433", borderRadius: 16, padding: "2.5rem", width: 360, textAlign: "center" } },
        React.createElement("div", { style: { fontSize: "3rem", marginBottom: 16 } }, "\u26F7\uFE0F"),
        React.createElement("h1", { style: { fontSize: "1.3rem", fontWeight: 700, marginBottom: 4 } }, "Innsbruck Ski Trip"),
        React.createElement("p", { style: { color: "#6b7588", fontSize: "0.85rem", marginBottom: 24 } }, "Sign in with your Microsoft account to view the trip planner"),
        authError ? React.createElement("p", { style: { color: "#ff6b6b", fontSize: "0.8rem", marginBottom: 16 } }, authError) : null,
        React.createElement("button", { onClick: handleLogin, disabled: loginBusy, style: { width: "100%", padding: "12px 24px", borderRadius: 10, border: "1px solid #4ecdc4", background: "rgba(78,205,196,0.15)", color: "#4ecdc4", cursor: loginBusy ? "wait" : "pointer", fontSize: "0.95rem", fontWeight: 600, fontFamily: "inherit", opacity: loginBusy ? 0.6 : 1 } }, loginBusy ? "Signing in..." : "Sign in with Microsoft")
      )
    );
  }

  if (authState === "denied") {
    const handleSwitchAccount = async () => {
      try {
        await msalInitPromise;
        // Prompt: select_account forces Microsoft to show the account picker
        await msalInstance.loginPopup({ ...loginRequest, prompt: "select_account" });
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
          const email = (accounts[0].username || "").toLowerCase();
          if (ALLOWED_EMAILS.includes(email)) { setAuthState("app"); setAuthError(""); }
          else { setAuthError(email); }
        }
      } catch (e) {
        if (e?.errorCode === "user_cancelled") return;
        if (e?.errorCode === "popup_window_error" || e?.errorCode === "empty_window_error") {
          try { await msalInstance.loginRedirect({ ...loginRequest, prompt: "select_account" }); return; } catch {}
        }
        if (e?.errorCode === "interaction_in_progress") { nukeAuthAndReload(); return; }
      }
    };
    return React.createElement("div", { style: { fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", background: "#0a0d12", color: "#e4e8f0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" } },
      React.createElement("div", { style: { background: "#14181f", border: "1px solid #1e2433", borderRadius: 16, padding: "2.5rem", width: 360, textAlign: "center" } },
        React.createElement("div", { style: { fontSize: "3rem", marginBottom: 16 } }, "\uD83D\uDEAB"),
        React.createElement("h1", { style: { fontSize: "1.3rem", fontWeight: 700, marginBottom: 4 } }, "Access Denied"),
        React.createElement("p", { style: { color: "#6b7588", fontSize: "0.85rem", marginBottom: 8 } }, "This trip planner is private. Try a different Microsoft account."),
        React.createElement("p", { style: { color: "#ff6b6b", fontSize: "0.8rem", marginBottom: 16 } }, authError ? `Signed in as ${authError}` : ""),
        React.createElement("p", { style: { color: "#4ecdc4", fontSize: "0.75rem", marginBottom: 24, lineHeight: 1.5 } }, "Allowed: hotmail, outlook, or gmail accounts for Andy, Jim, and Lee"),
        React.createElement("button", { onClick: handleSwitchAccount, style: { width: "100%", padding: "12px 24px", borderRadius: 10, border: "1px solid #6c9bff", background: "rgba(108,155,255,0.1)", color: "#6c9bff", cursor: "pointer", fontSize: "0.95rem", fontWeight: 600, fontFamily: "inherit", marginBottom: 10 } }, "Try a different account"),
        React.createElement("button", { onClick: nukeAuthAndReload, style: { width: "100%", padding: "10px 24px", borderRadius: 10, border: "1px solid #252b38", background: "transparent", color: "#6b7588", cursor: "pointer", fontSize: "0.8rem", fontWeight: 500, fontFamily: "inherit" } }, "Reset & start over")
      )
    );
  }

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
    React.createElement("div", { style: { fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", background: "#0a0d12", color: "#e4e8f0", minHeight: "100vh" } },
      React.createElement("div", { style: { position: "fixed", top: 0, left: 0, width: `${progress}%`, height: 3, background: "linear-gradient(90deg, #4ecdc4, #6c9bff, #a78bfa, #ff6b6b)", zIndex: 100, transition: "width 0.5s ease" } }),
      React.createElement("header", { style: { padding: "1.5rem 2rem", borderBottom: "1px solid #1e2433", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", position: "sticky", top: 0, background: "rgba(10,13,18,0.95)", backdropFilter: "blur(10px)", zIndex: 90 } },
        React.createElement("div", null,
          React.createElement("div", { style: { fontSize: "0.7rem", letterSpacing: "0.1em", color: "#4ecdc4", textTransform: "uppercase", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 } },
            React.createElement("span", { style: { width: 6, height: 6, background: "#4ecdc4", borderRadius: "50%", animation: "pulse 2s infinite" } }),
            "Ski Trip Planner \u2014 19\u201324 Mar 2026"
          ),
          React.createElement("h1", { style: { fontSize: "1.3rem", fontWeight: 700, margin: 0 } },
            "Gatwick ", React.createElement("span", { style: { color: "#4ecdc4" } }, "\u2192"), " Innsbruck ", React.createElement("span", { style: { color: "#4ecdc4" } }, "\u2192"), " St Anton"
          ),
          React.createElement("div", { style: { fontSize: "0.75rem", color: "#6b7588", marginTop: 2 } }, "Andrew Batty \u00B7 James Herbert \u00B7 Lee Curtis")
        ),
        React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } },
          ["journey", "restaurants", "summary"].map(v => {
            const labels = { journey: "\uD83D\uDDFA Journey", restaurants: "\uD83C\uDF7D Eat & Drink", summary: "\uD83D\uDCCB Trip Summary" };
            const colors = { journey: "#4ecdc4", restaurants: "#ff6b6b", summary: "#a78bfa" };
            return React.createElement("button", {
              key: v, onClick: () => setView(v),
              style: { padding: "8px 16px", borderRadius: 8, border: view === v ? `1px solid ${colors[v]}` : "1px solid #252b38", background: view === v ? `${colors[v]}18` : "#14181f", color: view === v ? colors[v] : "#8892a4", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }
            }, labels[v]);
          }),
          React.createElement("button", {
            onClick: handleLogout,
            style: { padding: "8px 12px", borderRadius: 8, border: "1px solid #252b38", background: "#14181f", color: "#8892a4", cursor: "pointer", fontSize: "0.75rem", fontWeight: 500, marginLeft: 8 }
          }, "Log out")
        )
      ),
      view === "journey" ?
        React.createElement("div", { style: { display: "flex", minHeight: "calc(100vh - 80px)" } },
          React.createElement("aside", { className: "sidebar", style: { width: 280, minWidth: 280, borderRight: "1px solid #1e2433", overflowY: "auto", background: "#0e1118", display: "flex", flexDirection: "column" } },
            React.createElement("div", { style: { padding: "1rem", borderBottom: "1px solid #1e2433" } },
              React.createElement("div", { style: { fontSize: "0.7rem", color: "#8892a4", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 } }, `Journey Steps (${STAGES.length})`),
              React.createElement("div", { style: { display: "flex", gap: 4 } },
                STAGES.map((s, i) => React.createElement("div", { key: i, style: { flex: 1, height: 3, borderRadius: 2, background: i <= activeStage ? typeColors[s.type] || "#4ecdc4" : "#252b38", transition: "background 0.3s" } }))
              )
            ),
            STAGES.map((s, i) =>
              React.createElement("button", {
                key: i, onClick: () => goTo(i),
                style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: i === activeStage ? "rgba(78,205,196,0.08)" : "transparent", border: "none", borderLeft: i === activeStage ? `3px solid ${typeColors[s.type]}` : "3px solid transparent", color: i === activeStage ? "#e4e8f0" : "#6b7588", cursor: "pointer", textAlign: "left", transition: "all 0.2s", width: "100%", fontFamily: "inherit" }
              },
                React.createElement("span", { style: { fontSize: "1.2rem", flexShrink: 0 } }, s.icon),
                React.createElement("div", { style: { minWidth: 0 } },
                  React.createElement("div", { style: { fontSize: "0.65rem", color: typeColors[s.type], fontWeight: 600, fontFamily: "monospace" } }, s.time),
                  React.createElement("div", { style: { fontSize: "0.82rem", fontWeight: i === activeStage ? 600 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, s.title)
                )
              )
            )
          ),
          React.createElement("main", { key: animKey, style: { flex: 1, overflowY: "auto", padding: 0 } },
            React.createElement("div", { style: { position: "relative", width: "100%", height: 300, overflow: "hidden", background: "#14181f" } },
              React.createElement("img", { src: stage.image, alt: stage.imageAlt, style: { width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }, onError: (e) => { e.target.style.display = "none"; } }),
              React.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0d12, transparent 50%)" } }),
              React.createElement("div", { style: { position: "absolute", bottom: 24, left: 32, right: 32 } },
                React.createElement("div", { style: { display: "inline-block", padding: "4px 12px", borderRadius: 6, background: `${stage.tagColor}22`, border: `1px solid ${stage.tagColor}44`, color: stage.tagColor, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 8 } }, stage.tag),
                React.createElement("h2", { style: { fontSize: "1.8rem", fontWeight: 700, margin: "0 0 4px", lineHeight: 1.2 } }, stage.title),
                React.createElement("div", { style: { fontSize: "0.9rem", color: "#8892a4" } }, stage.location)
              ),
              React.createElement("div", { style: { position: "absolute", top: 16, right: 24 } },
                React.createElement("div", { style: { background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 } },
                  React.createElement("span", { style: { fontSize: "1.4rem" } }, stage.weather.icon),
                  React.createElement("div", null,
                    React.createElement("div", { style: { fontWeight: 700, fontSize: "1rem", fontFamily: "monospace" } }, stage.weather.temp),
                    React.createElement("div", { style: { fontSize: "0.7rem", color: "#8892a4" } }, stage.weather.condition)
                  )
                )
              )
            ),
            React.createElement("div", { style: { padding: "2rem" } },
              React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 24 } },
                [{ label: "Time", value: stage.time }, { label: "Temperature", value: stage.weather.temp, color: "#4ecdc4" }, { label: "Wind", value: stage.weather.wind }, { label: "Humidity", value: stage.weather.humidity }].map((card, i) =>
                  React.createElement("div", { key: i, style: { background: "#14181f", borderRadius: 12, padding: "14px 18px", border: "1px solid #1e2433" } },
                    React.createElement("div", { style: { fontSize: "0.65rem", color: "#8892a4", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 } }, card.label),
                    React.createElement("div", { style: { fontWeight: 700, fontFamily: "monospace", fontSize: "1.1rem", color: card.color || "#e4e8f0" } }, card.value)
                  )
                )
              ),
              React.createElement("div", { style: { background: "#14181f", borderRadius: 14, padding: "20px 24px", border: "1px solid #1e2433", marginBottom: 24 } },
                React.createElement("p", { style: { fontSize: "1rem", lineHeight: 1.7, color: "#c0c8d8", margin: 0 } }, stage.description)
              ),
              React.createElement("div", { style: { background: "#14181f", borderRadius: 14, padding: "20px 24px", border: "1px solid #1e2433", marginBottom: 24 } },
                React.createElement("h3", { style: { fontSize: "1rem", fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 } },
                  React.createElement("span", { style: { color: stage.tagColor } }, "\u25B8"), " Step-by-Step Walkthrough"
                ),
                React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
                  stage.walkthrough.map((step, i) =>
                    React.createElement("div", { key: i, style: { display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 14px", background: "#0e1118", borderRadius: 10, borderLeft: `3px solid ${stage.tagColor}33` } },
                      React.createElement("span", { style: { fontSize: "0.9rem", lineHeight: 1.6, color: "#c0c8d8" } }, step)
                    )
                  )
                )
              ),
              stage.wazeUrl && React.createElement("a", { href: stage.wazeUrl, target: "_blank", rel: "noopener noreferrer", style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 24px", borderRadius: 14, border: "1px solid #33ccff", background: "linear-gradient(135deg, rgba(51,204,255,0.15), rgba(51,204,255,0.05))", color: "#33ccff", textDecoration: "none", fontSize: "1rem", fontWeight: 700, marginBottom: 24, transition: "all 0.2s" } },
                React.createElement("svg", { width: 22, height: 22, viewBox: "0 0 24 24", fill: "currentColor" }, React.createElement("path", { d: "M20.54 6.63c-1.62-4.15-6.38-5.93-9.47-5.59C7.29 1.44 3.52 4.01 2.42 7.8 1.2 12.02 3.28 16.78 6.33 19.31c1.07.89 2.01 1.84 2.67 2.98.37.64.71 1.35 1.23 1.71.82.57 1.85-.22 1.85-.22s2.42-1.67 3.72-3.1c2.69-2.96 5.65-7.89 4.74-14.05zm-8.5 8.87c-2.74 0-4.96-2.22-4.96-4.96s2.22-4.96 4.96-4.96 4.96 2.22 4.96 4.96-2.22 4.96-4.96 4.96z" })),
                stage.wazeLabel
              ),
              React.createElement("div", { style: { display: "flex", justifyContent: "space-between", gap: 12, marginTop: 24 } },
                React.createElement("button", { onClick: () => activeStage > 0 && goTo(activeStage - 1), disabled: activeStage === 0, style: { flex: 1, padding: "14px 20px", borderRadius: 12, border: "1px solid #252b38", background: "#14181f", color: activeStage > 0 ? "#e4e8f0" : "#3a4050", cursor: activeStage > 0 ? "pointer" : "default", fontSize: "0.9rem", fontWeight: 600, fontFamily: "inherit" } }, "\u2190 Previous Step"),
                React.createElement("button", { onClick: () => activeStage < STAGES.length - 1 && goTo(activeStage + 1), disabled: activeStage === STAGES.length - 1, style: { flex: 1, padding: "14px 20px", borderRadius: 12, border: `1px solid ${activeStage < STAGES.length - 1 ? "#4ecdc4" : "#252b38"}`, background: activeStage < STAGES.length - 1 ? "rgba(78,205,196,0.1)" : "#14181f", color: activeStage < STAGES.length - 1 ? "#4ecdc4" : "#3a4050", cursor: activeStage < STAGES.length - 1 ? "pointer" : "default", fontSize: "0.9rem", fontWeight: 600, fontFamily: "inherit" } }, "Next Step \u2192")
              ),
              activeStage === STAGES.length - 1 && React.createElement("button", { onClick: () => setView("restaurants"), style: { width: "100%", marginTop: 16, padding: "16px 24px", borderRadius: 14, border: "1px solid #ff6b6b", background: "rgba(255,107,107,0.1)", color: "#ff6b6b", cursor: "pointer", fontSize: "1rem", fontWeight: 700, fontFamily: "inherit" } }, "\uD83C\uDF7D Where should we eat and drink in St Anton? \u2192")
            )
          )
        )
      : view === "restaurants" ?
        React.createElement("div", { style: { maxWidth: 900, margin: "0 auto", padding: "2rem" } },
          React.createElement("div", { style: { textAlign: "center", marginBottom: "2.5rem" } },
            React.createElement("h2", { style: { fontSize: "2rem", fontWeight: 700, marginBottom: 8 } }, "\uD83C\uDF7D Eat & Drink in St Anton"),
            React.createElement("p", { style: { color: "#8892a4", fontSize: "1rem" } }, "Top apr\u00E8s-ski bars and restaurants \u2014 from legendary slope-side parties to fine Tyrolean dining")
          ),
          React.createElement("div", { style: { background: "linear-gradient(135deg, rgba(78,205,196,0.08), rgba(108,155,255,0.08))", border: "1px solid rgba(78,205,196,0.2)", borderRadius: 14, padding: "1.25rem 1.5rem", marginBottom: "2rem", display: "flex", alignItems: "flex-start", gap: 12 } },
            React.createElement("span", { style: { fontSize: "1.5rem" } }, "\uD83D\uDCA1"),
            React.createElement("div", null,
              React.createElement("strong", { style: { color: "#4ecdc4" } }, "My Top Picks"),
              React.createElement("p", { style: { margin: "4px 0 0", color: "#8892a4", fontSize: "0.9rem" }, dangerouslySetInnerHTML: { __html: "<strong style='color:#e4e8f0'>Apr\u00E8s-ski:</strong> Hit the <strong style='color:#ff6b6b'>MooserWirt</strong> at least once \u2014 it's a rite of passage.<br/><strong style='color:#e4e8f0'>Dinner:</strong> <strong style='color:#4ecdc4'>Fuhrmannstube by Buffy</strong> is literally next door to your hotel \u2014 incredible schnitzel, great value.<br/><strong style='color:#e4e8f0'>Treat night:</strong> <strong style='color:#a78bfa'>Alte Stube</strong> in the Schwarzer Adler is a 400-year-old gem \u2014 book ahead." } })
            )
          ),
          RESTAURANTS.map((r, i) =>
            React.createElement("div", { key: i, style: { background: "#14181f", border: "1px solid #1e2433", borderRadius: 16, padding: "1.75rem", marginBottom: 16, borderTop: `3px solid ${r.color}` } },
              React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 12 } },
                React.createElement("div", null,
                  React.createElement("div", { style: { fontSize: "0.7rem", color: r.color, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 4 } }, r.recommended),
                  React.createElement("h3", { style: { fontSize: "1.3rem", fontWeight: 700, margin: "0 0 4px" } }, r.name),
                  React.createElement("div", { style: { fontSize: "0.85rem", color: "#8892a4" } }, r.cuisine)
                ),
                React.createElement("div", { style: { textAlign: "right" } },
                  React.createElement("div", { style: { fontSize: "1rem", fontWeight: 700, color: "#ffd93d" } }, r.rating),
                  React.createElement("div", { style: { fontSize: "0.8rem", color: "#8892a4" } }, r.price)
                )
              ),
              React.createElement("p", { style: { color: "#a0a8b8", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: 16 } }, r.description),
              React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 14 } },
                [{ label: "Distance", value: r.distance }, { label: "Hours", value: r.hours, color: "#4ecdc4" }, { label: "Location", value: r.location }].map((card, j) =>
                  React.createElement("div", { key: j, style: { background: "#0e1118", borderRadius: 10, padding: "10px 14px" } },
                    React.createElement("div", { style: { fontSize: "0.65rem", color: "#8892a4", textTransform: "uppercase", marginBottom: 2 } }, card.label),
                    React.createElement("div", { style: { fontWeight: 600, fontSize: "0.88rem", color: card.color || "#e4e8f0" } }, card.value)
                  )
                )
              ),
              React.createElement("div", { style: { background: `${r.color}11`, border: `1px solid ${r.color}22`, borderRadius: 10, padding: "10px 14px", fontSize: "0.85rem", color: "#c0c8d8" } }, "\uD83D\uDCA1 ", React.createElement("strong", null, "Tip:"), " ", r.tip)
            )
          ),
          React.createElement("button", { onClick: () => { setView("journey"); goTo(STAGES.length - 1); }, style: { width: "100%", marginTop: 8, padding: "14px 24px", borderRadius: 12, border: "1px solid #6c9bff", background: "rgba(108,155,255,0.1)", color: "#6c9bff", cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, fontFamily: "inherit" } }, "\u2190 Back to Journey Timeline")
        )
      :
        React.createElement("div", { style: { maxWidth: 900, margin: "0 auto", padding: "2rem" } },
          React.createElement("div", { style: { textAlign: "center", marginBottom: "2.5rem" } },
            React.createElement("h2", { style: { fontSize: "2rem", fontWeight: 700, marginBottom: 8 } }, "\uD83D\uDCCB Trip Summary"),
            React.createElement("p", { style: { color: "#8892a4", fontSize: "1rem" } }, "Gatwick \u2192 Innsbruck \u2192 St Anton am Arlberg \u2014 19\u201324 March 2026")
          ),
          React.createElement("div", { style: { background: "#14181f", borderRadius: 14, padding: "20px 24px", border: "1px solid #1e2433", marginBottom: 20 } },
            React.createElement("h3", { style: { fontSize: "1rem", fontWeight: 700, marginBottom: 16, color: "#4ecdc4" } }, "\uD83D\uDC65 Travellers"),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 } },
              ["Andrew Batty (Economy Plus)", "James Herbert (Economy Basic)", "Lee Curtis (Economy Basic)"].map((name, i) =>
                React.createElement("div", { key: i, style: { background: "#0e1118", borderRadius: 10, padding: "12px 16px", textAlign: "center" } },
                  React.createElement("div", { style: { fontSize: "0.9rem", fontWeight: 600 } }, name.split(" (")[0]),
                  React.createElement("div", { style: { fontSize: "0.75rem", color: "#8892a4", marginTop: 2 } }, name.match(/\((.+)\)/)?.[1])
                )
              )
            )
          ),
          React.createElement("div", { style: { background: "#14181f", borderRadius: 14, padding: "20px 24px", border: "1px solid #1e2433", marginBottom: 20 } },
            React.createElement("h3", { style: { fontSize: "1rem", fontWeight: 700, marginBottom: 16, color: "#6c9bff" } }, "\uD83D\uDCC5 Itinerary"),
            TRIP_SUMMARY.days.map((day, i) =>
              React.createElement("div", { key: i, style: { display: "flex", gap: 16, padding: "12px 0", borderBottom: i < TRIP_SUMMARY.days.length - 1 ? "1px solid #1e2433" : "none" } },
                React.createElement("div", { style: { width: 100, flexShrink: 0, fontFamily: "monospace", fontSize: "0.85rem", color: "#4ecdc4", fontWeight: 600 } }, day.date),
                React.createElement("div", null,
                  React.createElement("div", { style: { fontWeight: 600, fontSize: "0.9rem" } }, day.label),
                  React.createElement("div", { style: { fontSize: "0.8rem", color: "#8892a4" } }, day.detail)
                )
              )
            )
          ),
          React.createElement("div", { style: { background: "#14181f", borderRadius: 14, padding: "20px 24px", border: "1px solid #1e2433", marginBottom: 20 } },
            React.createElement("h3", { style: { fontSize: "1rem", fontWeight: 700, marginBottom: 16, color: "#a78bfa" } }, "\u2708\uFE0F Flights"),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 } },
              React.createElement("div", { style: { background: "#0e1118", borderRadius: 12, padding: "16px", borderLeft: "3px solid #4ecdc4" } },
                React.createElement("div", { style: { fontSize: "0.7rem", color: "#4ecdc4", fontWeight: 700, marginBottom: 8 } }, "OUTBOUND \u2014 Fri 20 Mar"),
                React.createElement("div", { style: { fontWeight: 700, fontSize: "1rem" } }, "BA2620"),
                React.createElement("div", { style: { fontSize: "0.85rem", color: "#8892a4", marginTop: 4 } }, "LGW 7:45 AM \u2192 INN 10:45 AM"),
                React.createElement("div", { style: { fontSize: "0.8rem", color: "#6b7588", marginTop: 2 } }, "British Airways (BA Euroflyer)"),
                React.createElement("div", { style: { fontSize: "0.85rem", color: "#ffd93d", fontWeight: 600, marginTop: 8 } }, "\u00A3207.64 (3 pax)")
              ),
              React.createElement("div", { style: { background: "#0e1118", borderRadius: 12, padding: "16px", borderLeft: "3px solid #ff6b6b" } },
                React.createElement("div", { style: { fontSize: "0.7rem", color: "#ff6b6b", fontWeight: 700, marginBottom: 8 } }, "RETURN \u2014 Tue 24 Mar"),
                React.createElement("div", { style: { fontWeight: 700, fontSize: "1rem" } }, "EZY8696"),
                React.createElement("div", { style: { fontSize: "0.85rem", color: "#8892a4", marginTop: 4 } }, "INN 6:55 PM \u2192 LGW 7:55 PM"),
                React.createElement("div", { style: { fontSize: "0.8rem", color: "#6b7588", marginTop: 2 } }, "easyJet \u00B7 Ref: KBXZJFX"),
                React.createElement("div", { style: { fontSize: "0.85rem", color: "#ffd93d", fontWeight: 600, marginTop: 8 } }, "\u20AC277.44 (3 pax, inc. 23kg bags)")
              )
            )
          ),
          React.createElement("div", { style: { background: "#14181f", borderRadius: 14, padding: "20px 24px", border: "1px solid #1e2433", marginBottom: 20 } },
            React.createElement("h3", { style: { fontSize: "1rem", fontWeight: 700, marginBottom: 16, color: "#ffd93d" } }, "\uD83C\uDFE8 Accommodation"),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 } },
              React.createElement("div", { style: { background: "#0e1118", borderRadius: 12, padding: "16px", borderLeft: "3px solid #ffd93d" } },
                React.createElement("div", { style: { fontSize: "0.7rem", color: "#ffd93d", fontWeight: 700, marginBottom: 8 } }, "NIGHT 1 \u2014 Fri 20 Mar"),
                React.createElement("div", { style: { fontWeight: 700 } }, "Hotel Bruggner Stub'n \u2605\u2605\u2605"),
                React.createElement("div", { style: { fontSize: "0.85rem", color: "#8892a4", marginTop: 4 } }, "Flirstrasse 30, Landeck \u00B7 Triple room"),
                React.createElement("div", { style: { fontSize: "0.85rem", color: "#ffd93d", fontWeight: 600, marginTop: 8 } }, "Ref: 5825157964")
              ),
              React.createElement("div", { style: { background: "#0e1118", borderRadius: 12, padding: "16px", borderLeft: "3px solid #4ecdc4" } },
                React.createElement("div", { style: { fontSize: "0.7rem", color: "#4ecdc4", fontWeight: 700, marginBottom: 8 } }, "NIGHTS 2\u20134 \u2014 Sat 21 \u2013 Tue 24 Mar"),
                React.createElement("div", { style: { fontWeight: 700 } }, "Hotel Kirchplatz"),
                React.createElement("div", { style: { fontSize: "0.85rem", color: "#8892a4", marginTop: 4 } }, "St Anton am Arlberg \u00B7 Dorfstrasse 73"),
                React.createElement("div", { style: { fontSize: "0.8rem", color: "#6b7588", marginTop: 2 } }, "Sauna, ski depot, breakfast, parking")
              )
            )
          ),
          React.createElement("div", { style: { background: "#14181f", borderRadius: 14, padding: "20px 24px", border: "1px solid #1e2433", marginBottom: 20 } },
            React.createElement("h3", { style: { fontSize: "1rem", fontWeight: 700, marginBottom: 16, color: "#ff6b6b" } }, "\uD83D\uDCB0 Cost Breakdown (excl. resort costs)"),
            TRIP_SUMMARY.costs.map((c, i) =>
              React.createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < TRIP_SUMMARY.costs.length - 1 ? "1px solid #1e2433" : "none" } },
                React.createElement("span", { style: { color: "#c0c8d8" } }, c.item),
                React.createElement("span", { style: { fontWeight: 700, fontFamily: "monospace", color: "#ffd93d" } }, c.cost)
              )
            ),
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", paddingTop: 16, marginTop: 8, borderTop: "2px solid #252b38" } },
              React.createElement("span", { style: { fontWeight: 700, fontSize: "1.1rem" } }, "Estimated Total"),
              React.createElement("span", { style: { fontWeight: 700, fontFamily: "monospace", fontSize: "1.1rem", color: "#4ecdc4" } }, "~\u00A3800\u2013950")
            )
          ),
          React.createElement("div", { style: { background: "linear-gradient(135deg, rgba(255,107,107,0.08), rgba(255,217,61,0.08))", border: "1px solid rgba(255,107,107,0.2)", borderRadius: 14, padding: "20px 24px", marginBottom: 20 } },
            React.createElement("h3", { style: { fontSize: "1rem", fontWeight: 700, marginBottom: 12, color: "#ff6b6b" } }, "\u26A0\uFE0F Don't Forget"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
              ["Passport/ID for all three travellers", "James & Lee: Economy Basic \u2014 no checked bags, no seat selection (add at check-in if needed)", "easyJet check-in opens 30 days before (Feb 22) \u2014 do it early for better seats", "Add passport details to easyJet booking (ref: KBXZJFX)", "easyJet return: 3x 23kg hold bags included, but cabin is SMALL under-seat bag only", "Snowboard pickup: Hervis Imst on the way to St Anton (booking BPPLCA, print confirmation)", "Snowboard dropoff: Hervis Imst on the way back (allow 15 min)", "Rental car: confirm winter tyres, vignette, and ask about snow chains", "Arlberg Tunnel toll: ~\u20AC10-18 per trip (not covered by motorway vignette)", "Return flight Tue 24 Mar: leave St Anton by 3:45 PM for 6:55 PM flight"].map((note, i) =>
                React.createElement("div", { key: i, style: { fontSize: "0.88rem", color: "#c0c8d8", padding: "6px 0", borderBottom: "1px solid rgba(255,107,107,0.1)" } }, `${i + 1}. ${note}`)
              )
            )
          ),
          React.createElement("button", { onClick: () => { setView("journey"); goTo(0); }, style: { width: "100%", marginTop: 8, padding: "14px 24px", borderRadius: 12, border: "1px solid #6c9bff", background: "rgba(108,155,255,0.1)", color: "#6c9bff", cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, fontFamily: "inherit" } }, "\u2190 Back to Journey Timeline")
        ),
      React.createElement("style", null, `
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button:hover { opacity: 0.9; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0d12; }
        ::-webkit-scrollbar-thumb { background: #252b38; border-radius: 3px; }
        @media (max-width: 768px) { .sidebar { display: none !important; } }
      `)
    )
  );
}
