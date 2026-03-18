import { PublicClientApplication } from "@azure/msal-browser";

export const ALLOWED_EMAILS = [
  "andy.batty@hotmail.com",
  "jh@yellowbus.cc",
  "j.d.herbert@outlook.com",
  "lee.a.curtis@gmail.com",
  "lee@linarconsulting.com",
  "lee@legalengine.co.uk",
];

// Clear stale MSAL interaction state from BOTH storages before constructing
// MSAL v3+ uses sessionStorage for interaction tracking, v2 used localStorage
function clearStaleInteraction() {
  for (const storage of [localStorage, sessionStorage]) {
    for (const key of Object.keys(storage)) {
      if (key.startsWith("msal.") && key.includes("interaction")) {
        storage.removeItem(key);
      }
    }
  }
}
clearStaleInteraction();

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: "12c370ba-d0eb-43e1-b156-0b94c8c0377e",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: window.location.origin + "/",
  },
  cache: { cacheLocation: "localStorage", staleStateTTLInSeconds: 300 },
});

export { clearStaleInteraction };
export const msalReady = msalInstance.initialize();
