import { PublicClientApplication } from "@azure/msal-browser";

export const ALLOWED_EMAILS = [
  "andy.batty@hotmail.com",
  "jh@yellowbus.cc",
  "j.d.herbert@outlook.com",
  "lee.a.curtis@gmail.com",
  "lee@linarconsulting.com",
  "lee@legalengine.co.uk",
];

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: "12c370ba-d0eb-43e1-b156-0b94c8c0377e",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: window.location.origin + "/",
  },
  cache: { cacheLocation: "localStorage", staleStateTTLInSeconds: 300 },
});

export const msalReady = msalInstance.initialize();
