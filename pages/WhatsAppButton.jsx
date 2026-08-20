import { useState } from "react";
import { WHATSAPP_BUSINESS_NUMBER } from "../utils/whatsapp";

/* ══════════════════════════════════════════════════════════════════
   FLOATING WHATSAPP BUTTON
══════════════════════════════════════════════════════════════════ */

const DEFAULT_MESSAGE =
  "Hi Forfra Solutions, I'd like to know more about your services.";

export default function WhatsAppButton({ message = DEFAULT_MESSAGE }) {
  const [hovered, setHovered] = useState(false);

  const href = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        background: "#25D366",
        color: "#0A1628",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        fontSize: "0.9rem",
        padding: hovered ? "0.85rem 1.3rem" : "0.85rem",
        borderRadius: "999px",
        boxShadow: hovered
          ? "0 10px 32px rgba(37, 211, 102, 0.45)"
          : "0 6px 20px rgba(37, 211, 102, 0.35)",
        textDecoration: "none",
        transition:
          "padding 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <path
          d="M16 3C9.373 3 4 8.373 4 15c0 2.29.635 4.435 1.737 6.264L4 29l7.938-1.678A11.93 11.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3Z"
          fill="#0A1628"
        />
        <path
          d="M16 4.4C10.146 4.4 5.4 9.146 5.4 15c0 2.02.556 3.912 1.523 5.53L5.4 26.6l6.24-1.487A10.56 10.56 0 0 0 16 25.6c5.854 0 10.6-4.746 10.6-10.6S21.854 4.4 16 4.4Z"
          fill="#25D366"
        />
        <path
          d="M12.4 10.2c-.28-.62-.574-.633-.84-.644-.217-.01-.466-.009-.715-.009-.25 0-.653.093-.995.467-.342.373-1.307 1.278-1.307 3.117 0 1.84 1.338 3.618 1.524 3.867.187.25 2.586 4.147 6.39 5.646 3.16 1.245 3.804.998 4.492.936.687-.062 2.219-.906 2.532-1.782.312-.875.312-1.626.218-1.783-.093-.156-.343-.25-.716-.437-.374-.187-2.22-1.096-2.563-1.221-.343-.125-.593-.187-.842.187-.25.374-.965 1.221-1.183 1.471-.218.25-.436.281-.81.094-.374-.187-1.578-.582-3.007-1.856-1.111-.99-1.862-2.213-2.08-2.587-.218-.374-.023-.576.164-.762.169-.169.374-.437.561-.656.187-.219.25-.375.374-.625.125-.25.062-.469-.031-.656-.093-.187-.822-2.05-1.161-2.795Z"
          fill="#0A1628"
        />
      </svg>

      {hovered && (
        <span
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          Chat on WhatsApp
        </span>
      )}
    </a>
  );
}