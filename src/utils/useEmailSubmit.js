// ── useEmailSubmit.js ─────────────────────────────────────────────────────
// Email-only form submission for the NyayShield booking / report forms.
//
// 1. The yellow submit button posts the form to this site's own email function
//    (/api/submit-form). If the email is accepted → `submit()` resolves true
//    and the page shows its "submitted" screen.
// 2. If the server can't send it (e.g. email settings not configured yet, or the
//    network is down) the visitor's own email app is opened automatically with
//    the subject and all the details pre-filled to the business mail id, so they
//    just press Send. `error` becomes true so the form can show a small
//    "Send by email" link to open that email again.
//    Nothing they typed is lost either way.

import { useCallback, useState } from "react";
import { sendFormToEmail } from "./email";
import { BUSINESS_EMAIL } from "../config";

const MAX_BODY = 1500; // keep the mailto: link within what mail apps accept

function buildMailto(title, fields) {
  const body = fields
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n")
    .slice(0, MAX_BODY);
  return `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
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

/**
 * @returns {{ sending: boolean, error: boolean, mailto: string,
 *   submit: (title: string, fields: Array<[string, string|undefined]>) => Promise<boolean> }}
 */
export function useEmailSubmit() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [mailto, setMailto] = useState("");

  const submit = useCallback(async (title, fields) => {
    setSending(true);
    setError(false);
    const ok = await sendFormToEmail(title, fields);
    setSending(false);
    if (!ok) {
      const href = buildMailto(title, fields);
      setMailto(href);
      setError(true);
      openMailApp(href); // fall back to the visitor's own email app
    }
    return ok;
  }, []);

  return { sending, error, mailto, submit };
}
