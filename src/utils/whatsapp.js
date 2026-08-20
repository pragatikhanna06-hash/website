// // ── whatsapp.js ───────────────────────────────────────────────────────────
// // Sends form submissions to WhatsApp using the free wa.me deep-link — no
// // backend, no API key, no WhatsApp Business API subscription needed.
// //
// // How it works: we build a nicely formatted text message from whatever the
// // user typed into the form, then open https://wa.me/<number>?text=<message>
// // in a new tab. That opens WhatsApp (the desktop/mobile app if installed,
// // otherwise WhatsApp Web) with the message already typed into the chat with
// // your business number. The user (or your team, depending on which number
// // you use) just has to tap "Send" — nothing is transmitted silently or
// // automatically in the background.
// //
// // IMPORTANT: change WHATSAPP_BUSINESS_NUMBER below to the real number
// // that should receive these messages, in country-code format with NO
// // leading "+", spaces, or dashes (e.g. India: 91XXXXXXXXXX).

// export const WHATSAPP_BUSINESS_NUMBER = "919217970978"; // replace with your real WhatsApp number

// /**
//  * Builds a WhatsApp deep-link and opens it in a new tab, pre-filled with the
//  * submitted form's data.
//  *
//  * @param {string} title - Heading shown at the top of the WhatsApp message,
//  *   e.g. "New Report a Crime Submission".
//  * @param {Array<[string, string | undefined]>} fields - Ordered [label, value]
//  *   pairs. Empty/undefined values are skipped automatically.
//  * @param {string} [number] - Optional override for the destination number,
//  *   defaults to WHATSAPP_BUSINESS_NUMBER.
//  */
// export function sendFormToWhatsApp(title, fields, number = WHATSAPP_BUSINESS_NUMBER) {
//   const lines = [`*${title}*`, ""];

//   fields.forEach(([label, value]) => {
//     if (value !== undefined && value !== null && String(value).trim() !== "") {
//       lines.push(`*${label}:* ${value}`);
//     }
//   });

//   lines.push("", `_Sent from the website on ${new Date().toLocaleString("en-IN")}_`);

//   const text = encodeURIComponent(lines.join("\n"));
//   const url = `https://wa.me/${number}?text=${text}`;

//   // Opened synchronously inside the same click/submit handler that calls
//   // this function, so browsers won't block it as an unwanted popup.
//   window.open(url, "_blank", "noopener,noreferrer");
// }





























// ── whatsapp.js ───────────────────────────────────────────────────────────
// Sends form submissions to WhatsApp using the free wa.me deep-link — no
// backend, no API key, no WhatsApp Business API subscription needed.
//
// How it works: we build a nicely formatted text message from whatever the
// user typed into the form, then open https://wa.me/<number>?text=<message>
// in a new tab. That opens WhatsApp (the desktop/mobile app if installed,
// otherwise WhatsApp Web) with the message already typed into the chat with
// your business number. The user (or your team, depending on which number
// you use) just has to tap "Send" — nothing is transmitted silently or
// automatically in the background.
//
// IMPORTANT: change WHATSAPP_BUSINESS_NUMBER below to the real number
// that should receive these messages, in country-code format with NO
// leading "+", spaces, or dashes (e.g. India: 91XXXXXXXXXX).

export const WHATSAPP_BUSINESS_NUMBER = "919711015337"; // replace with your real WhatsApp number

/**
 * Builds a WhatsApp deep-link and opens it in a new tab, pre-filled with the
 * submitted form's data.
 *
 * @param {string} title - Heading shown at the top of the WhatsApp message,
 *   e.g. "New Report a Crime Submission".
 * @param {Array<[string, string | undefined]>} fields - Ordered [label, value]
 *   pairs. Empty/undefined values are skipped automatically.
 * @param {string} [number] - Optional override for the destination number,
 *   defaults to WHATSAPP_BUSINESS_NUMBER.
 */
export function sendFormToWhatsApp(title, fields, number = WHATSAPP_BUSINESS_NUMBER) {
  const lines = [`*${title}*`, ""];

  fields.forEach(([label, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      lines.push(`*${label}:* ${value}`);
    }
  });

  lines.push("", `_Sent from the website on ${new Date().toLocaleString("en-IN")}_`);

  const text = encodeURIComponent(lines.join("\n"));
  const url = `https://wa.me/${number}?text=${text}`;

  // Use a real, temporary <a> click instead of window.open(). Browsers
  // (especially mobile Safari and in-app browsers) are much more likely to
  // block or silently swallow a programmatic window.open() call than a
  // genuine anchor click, even when it happens inside the same submit
  // handler. This is just as free/backend-free — it's just a more reliable
  // way of triggering the same navigation.
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}