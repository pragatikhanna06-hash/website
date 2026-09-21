// ── useEmailSubmit.js ─────────────────────────────────────────────────────
// Submit handler for the NyayShield booking / report forms.
//
// When the visitor presses the yellow submit button an email compose window
// opens with a ready-to-send message: To = the business mail id, subject and ALL
// the details (Booking ID first) already filled in. They just press Send.
// The page moves on to the next part / booking ID at the same moment.
//
//   1. The visitor's email app is opened (mailto:) — this is what phones and
//      most computers with Outlook / Mail / Gmail-as-default do.
//   2. If nothing takes over within a moment (a computer with no email app set up),
//      Gmail's compose window opens in a new tab instead, with the same message.
//
// No server, SMTP settings or third-party service is needed.

import { useCallback } from "react";
import { BUSINESS_EMAIL } from "../config";

const MAX_URL = 1900;      // whole mailto: link — longer links are rejected by some mail apps
const FALLBACK_MS = 1500;  // how long to wait for an email app before opening Gmail

// Builds the same message for mailto: and Gmail, cut so the mailto: link stays within MAX_URL.
function buildMessage(title, fields) {
  const rows = fields
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
    .map(([label, value]) => [String(label), String(value)]);
  // the Booking ID goes first so it can never be cut off
  rows.sort((a, b) => (b[0] === "Booking ID") - (a[0] === "Booking ID"));

  const head = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(title)}&body=`;
  let body = "";
  for (const [label, value] of rows) {
    const line = `${label}: ${value}\n`;
    if ((head + encodeURIComponent(body + line)).length <= MAX_URL) {
      body += line;
      continue;
    }
    // this line doesn't fit completely: keep as much of it as possible, then stop
    let cut = line;
    while (cut.length > 12 && (head + encodeURIComponent(body + cut + "…")).length > MAX_URL) {
      cut = cut.slice(0, Math.floor(cut.length * 0.9));
    }
    body += cut.trimEnd() + "…\n";
    break;
  }
  body = body.trimEnd();

  return {
    mailto: head + encodeURIComponent(body),
    gmail:
      "https://mail.google.com/mail/?view=cm&fs=1" +
      `&to=${encodeURIComponent(BUSINESS_EMAIL)}` +
      `&su=${encodeURIComponent(title)}` +
      `&body=${encodeURIComponent(body)}`,
  };
}

// Opens the visitor's email app exactly like tapping a mailto: link.
function openMailApp(href) {
  const a = document.createElement("a");
  a.href = href;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function openCompose({ mailto, gmail }) {
  // When an email app opens, the browser window loses focus / is hidden.
  let tookOver = false;
  const mark = () => { tookOver = true; };
  const onVisibility = () => { if (document.hidden) tookOver = true; };
  window.addEventListener("blur", mark);
  window.addEventListener("pagehide", mark);
  document.addEventListener("visibilitychange", onVisibility);

  openMailApp(mailto);

  setTimeout(() => {
    window.removeEventListener("blur", mark);
    window.removeEventListener("pagehide", mark);
    document.removeEventListener("visibilitychange", onVisibility);
    if (tookOver || document.hidden) return; // an email app is open — nothing more to do
    window.open(gmail, "_blank", "noopener"); // no email app: compose in Gmail on the web
  }, FALLBACK_MS);
}

/**
 * @returns {{ submit: (title: string, fields: Array<[string, string|undefined]>) => boolean }}
 */
export function useEmailSubmit() {
  // Call this directly inside the submit handler (a user click) so the browser
  // allows the email window to open.
  const submit = useCallback((title, fields) => {
    openCompose(buildMessage(title, fields));
    return true;
  }, []);

  return { submit };
}
