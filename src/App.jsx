import React, { useState, useEffect } from "react";
import { ALLOWED_EMAILS, msalInstance, msalInitPromise, loginRequest, nukeAuthAndReload } from "./auth.js";
import { STAGES } from "./data/stages.js";
import { LoadingScreen, LoginScreen, DeniedScreen } from "./components/LoginScreen.jsx";
import { JourneyView } from "./components/JourneyView.jsx";
import { SkiRoutesView } from "./components/SkiRoutesView.jsx";
import { RestaurantsView } from "./components/RestaurantsView.jsx";
import { SummaryView } from "./components/SummaryView.jsx";

export function App() {
  const [authState, setAuthState] = useState("loading"); // loading | login | denied | app
  const [authError, setAuthError] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);
  const [view, setView] = useState("journey");

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
    return <LoadingScreen />;
  }

  if (authState === "login") {
    return <LoginScreen authError={authError} loginBusy={loginBusy} onLogin={handleLogin} />;
  }

  if (authState === "denied") {
    return (
      <DeniedScreen
        authError={authError}
        setAuthState={setAuthState}
        setAuthError={setAuthError}
      />
    );
  }

  const progress = (0 / (STAGES.length - 1)) * 100;

  const navLabels = { journey: "🗺 Journey", skiroutes: "🏂 Ski Routes", restaurants: "🍽 Eat & Drink", summary: "📋 Summary" };
  const navColors = { journey: "#4ecdc4", skiroutes: "#ffd93d", restaurants: "#ff6b6b", summary: "#a78bfa" };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", background: "#0a0d12", color: "#e4e8f0", minHeight: "100vh" }}>
      <div style={{ position: "fixed", top: 0, left: 0, width: `${progress}%`, height: 3, background: "linear-gradient(90deg, #4ecdc4, #6c9bff, #a78bfa, #ff6b6b)", zIndex: 100, transition: "width 0.5s ease" }} />
      <header
        style={{
          padding: "1.5rem 2rem",
          borderBottom: "1px solid #1e2433",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          position: "sticky",
          top: 0,
          background: "rgba(10,13,18,0.95)",
          backdropFilter: "blur(10px)",
          zIndex: 90,
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              color: "#4ecdc4",
              textTransform: "uppercase",
              marginBottom: 4,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                background: "#4ecdc4",
                borderRadius: "50%",
                animation: "pulse 2s infinite",
              }}
            />
            Ski Trip Planner — 19–24 Mar 2026
          </div>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 700, margin: 0 }}>
            Gatwick <span style={{ color: "#4ecdc4" }}>→</span> Innsbruck{" "}
            <span style={{ color: "#4ecdc4" }}>→</span> St Anton
          </h1>
          <div style={{ fontSize: "0.75rem", color: "#6b7588", marginTop: 2 }}>
            Andrew Batty · James Herbert · Lee Curtis
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["journey", "skiroutes", "restaurants", "summary"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border:
                  view === v
                    ? `1px solid ${navColors[v]}`
                    : "1px solid #252b38",
                background:
                  view === v ? `${navColors[v]}18` : "#14181f",
                color: view === v ? navColors[v] : "#8892a4",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              {navLabels[v]}
            </button>
          ))}
          <span
            style={{
              fontSize: "0.6rem",
              color: "#3a4050",
              fontFamily: "monospace",
              marginLeft: 8,
            }}
          >
            {`v${__APP_VERSION__}`}
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #252b38",
              background: "#14181f",
              color: "#8892a4",
              cursor: "pointer",
              fontSize: "0.75rem",
              fontWeight: 500,
              marginLeft: 4,
            }}
          >
            Log out
          </button>
        </div>
      </header>

      {view === "journey" ? (
        <JourneyView setView={setView} />
      ) : view === "skiroutes" ? (
        <SkiRoutesView setView={setView} />
      ) : view === "restaurants" ? (
        <RestaurantsView setView={setView} />
      ) : (
        <SummaryView setView={setView} />
      )}

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button:hover { opacity: 0.9; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0d12; }
        ::-webkit-scrollbar-thumb { background: #252b38; border-radius: 3px; }
        @media (max-width: 768px) { .sidebar { display: none !important; } }
      `}</style>
    </div>
  );
}
