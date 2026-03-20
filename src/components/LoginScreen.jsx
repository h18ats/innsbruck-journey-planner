import React from "react";
import { ALLOWED_EMAILS, msalInstance, msalInitPromise, loginRequest, nukeAuthAndReload } from "../auth.js";

const fullScreenStyle = {
  fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  background: "#0a0d12",
  color: "#e4e8f0",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cardStyle = {
  background: "#14181f",
  border: "1px solid #1e2433",
  borderRadius: 16,
  padding: "2.5rem",
  width: 360,
  textAlign: "center",
};

export function LoadingScreen() {
  return (
    <div style={fullScreenStyle}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>⛷️</div>
        <div style={{ color: "#8892a4" }}>Loading...</div>
      </div>
    </div>
  );
}

export function LoginScreen({ authError, loginBusy, onLogin }) {
  return (
    <div style={fullScreenStyle}>
      <div style={cardStyle}>
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>⛷️</div>
        <h1 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 4 }}>Innsbruck Ski Trip</h1>
        <p style={{ color: "#6b7588", fontSize: "0.85rem", marginBottom: 24 }}>
          Sign in with your Microsoft account to view the trip planner
        </p>
        {authError ? (
          <p style={{ color: "#ff6b6b", fontSize: "0.8rem", marginBottom: 16 }}>{authError}</p>
        ) : null}
        <button
          onClick={onLogin}
          disabled={loginBusy}
          style={{
            width: "100%",
            padding: "12px 24px",
            borderRadius: 10,
            border: "1px solid #4ecdc4",
            background: "rgba(78,205,196,0.15)",
            color: "#4ecdc4",
            cursor: loginBusy ? "wait" : "pointer",
            fontSize: "0.95rem",
            fontWeight: 600,
            fontFamily: "inherit",
            opacity: loginBusy ? 0.6 : 1,
          }}
        >
          {loginBusy ? "Signing in..." : "Sign in with Microsoft"}
        </button>
      </div>
    </div>
  );
}

export function DeniedScreen({ authError, setAuthState, setAuthError }) {
  const handleSwitchAccount = async () => {
    try {
      await msalInitPromise;
      await msalInstance.loginPopup({ ...loginRequest, prompt: "select_account" });
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        const email = (accounts[0].username || "").toLowerCase();
        if (ALLOWED_EMAILS.includes(email)) {
          setAuthState("app");
          setAuthError("");
        } else {
          setAuthError(email);
        }
      }
    } catch (e) {
      if (e?.errorCode === "user_cancelled") return;
      if (e?.errorCode === "popup_window_error" || e?.errorCode === "empty_window_error") {
        try {
          await msalInstance.loginRedirect({ ...loginRequest, prompt: "select_account" });
          return;
        } catch {}
      }
      if (e?.errorCode === "interaction_in_progress") {
        nukeAuthAndReload();
        return;
      }
    }
  };

  return (
    <div style={fullScreenStyle}>
      <div style={cardStyle}>
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>🚫</div>
        <h1 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 4 }}>Access Denied</h1>
        <p style={{ color: "#6b7588", fontSize: "0.85rem", marginBottom: 8 }}>
          This trip planner is private. Try a different Microsoft account.
        </p>
        <p style={{ color: "#ff6b6b", fontSize: "0.8rem", marginBottom: 16 }}>
          {authError ? `Signed in as ${authError}` : ""}
        </p>
        <p style={{ color: "#4ecdc4", fontSize: "0.75rem", marginBottom: 24, lineHeight: 1.5 }}>
          Allowed: hotmail, outlook, or gmail accounts for Andy, Jim, and Lee
        </p>
        <button
          onClick={handleSwitchAccount}
          style={{
            width: "100%",
            padding: "12px 24px",
            borderRadius: 10,
            border: "1px solid #6c9bff",
            background: "rgba(108,155,255,0.1)",
            color: "#6c9bff",
            cursor: "pointer",
            fontSize: "0.95rem",
            fontWeight: 600,
            fontFamily: "inherit",
            marginBottom: 10,
          }}
        >
          Try a different account
        </button>
        <button
          onClick={nukeAuthAndReload}
          style={{
            width: "100%",
            padding: "10px 24px",
            borderRadius: 10,
            border: "1px solid #252b38",
            background: "transparent",
            color: "#6b7588",
            cursor: "pointer",
            fontSize: "0.8rem",
            fontWeight: 500,
            fontFamily: "inherit",
          }}
        >
          Reset &amp; start over
        </button>
      </div>
    </div>
  );
}
