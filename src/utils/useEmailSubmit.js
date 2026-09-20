// ── useEmailSubmit.js ─────────────────────────────────────────────────────
// Email-only form submission with a visible "sending" and "error" state.
//
// Used by the NyayShield booking / report forms. Unlike sendFormToWhatsApp()
// (which is fire-and-forget), this WAITS for the server so a form is only
// treated as submitted when the email was really accepted. If sending fails,
// `error` becomes true and `mailto` holds a ready-made mailto: link (subject +
// all the details) so the visitor can still reach the team from their own mail
// app instead of losing what they typed.

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
      setMailto(buildMailto(title, fields));
      setError(true);
    }
    return ok;
  }, []);

  return { sending, error, mailto, submit };
}
