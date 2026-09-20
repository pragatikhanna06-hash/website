// ── email.js ──────────────────────────────────────────────────────────────
// Sends every form submission to the business mail id IN ADDITION to
// WhatsApp, by calling this site's own serverless function (/api/submit-form,
// see api/submit-form.js). Same-origin request — no third-party service.
//
// Best-effort and non-blocking: it never throws and never delays the
// WhatsApp hand-off; a failure is only logged to the console.
//
// Files (e.g. a resume) can be attached. Requests are limited to ~4.5 MB by
// the host, so files up to MAX_ATTACH_BYTES are attached; a bigger file is
// not attached and the email says so instead.

export const FORM_EMAIL_ENDPOINT = "/api/submit-form";
export const MAX_ATTACH_BYTES = 3 * 1024 * 1024; // 3 MB per file

function readAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * @param {string} title  Subject line, e.g. "New Crime Report — NyayShield".
 * @param {Array<[string, string | undefined]>} fields  Ordered [label, value]
 *   pairs (the same array that is sent to WhatsApp). Empty values are skipped.
 * @param {File[]} [attachments]  Optional files to attach to the email.
 * @returns {Promise<boolean>} true when the server accepted the submission.
 */
export async function sendFormToEmail(title, fields, attachments = []) {
  try {
    const clean = fields
      .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
      .map(([label, value]) => [String(label), String(value)]);

    const files = [];
    const skipped = [];
    for (const file of attachments || []) {
      if (!file) continue;
      if (file.size > MAX_ATTACH_BYTES) {
        skipped.push(file.name);
        continue;
      }
      files.push({
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        content: await readAsBase64(file),
      });
    }
    if (skipped.length) {
      clean.push(["Attachment not included", `${skipped.join(", ")} (too large to email — shared separately)`]);
    }

    const res = await fetch(FORM_EMAIL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        fields: clean,
        attachments: files,
        page: typeof window !== "undefined" ? window.location.href : "",
      }),
      // "keepalive" lets the request survive a page change, but browsers cap
      // such requests at 64 KB, so it is only used when nothing is attached.
      keepalive: files.length === 0,
    });

    if (!res.ok) {
      console.warn("[email] submission was not accepted:", res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[email] could not send form email:", err);
    return false;
  }
}
