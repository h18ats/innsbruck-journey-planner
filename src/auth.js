import { PublicClientApplication } from "@azure/msal-browser";

export const ALLOWED_EMAILS = [
  "andy.batty@hotmail.com",
  "jh@yellowbus.cc",
  "j.d.herbert@outlook.com",
  "lee.a.curtis@gmail.com",
  "lee@linarconsulting.com",
  "lee@legalengine.co.uk",
];

export const loginRequest = {
  scopes: ["openid", "profile", "email"],
};

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: "12c370ba-d0eb-43e1-b156-0b94c8c0377e",
    authority: "https://login.microsoftonline.com/consumers",
    redirectUri: window.location.origin + "/",
  },
  cache: {
    cacheLocation: "localStorage",
    staleStateTTLInSeconds: 300,
  },
});

export const msalInitPromise = msalInstance.initialize();

/**
 * Nuclear auth reset — clear all MSAL state from both storages and reload.
 */
export function nukeAuthAndReload() {
  // Clear ALL MSAL-related keys — accounts, tokens, interaction state
  const msalPattern = /^msal\.|^login\.|12c370ba/;
  Object.keys(localStorage).filter(k => msalPattern.test(k)).forEach(k => localStorage.removeItem(k));
  Object.keys(sessionStorage).filter(k => msalPattern.test(k)).forEach(k => sessionStorage.removeItem(k));
  // Also try MSAL's own clear if instance is available
  try { msalInstance.clearCache(); } catch {}
  window.location.replace(window.location.origin + "/");
}
