import { useLanguage } from "./LanguageContext";

/* ══════════════════════════════════════════════════════════════════
   LANG TOGGLE — self-contained EN / हिं switch.
   Inline-styled on purpose so it can be dropped into any page's nav
   regardless of that page's own CSS system (dark navs everywhere).
   Pass `style` to override/position it (e.g. margin) from the caller.
══════════════════════════════════════════════════════════════════ */
export default function LangToggle({ style = {} }) {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={lang === "en" ? "Switch to Hindi" : "Switch to English"}
      title={lang === "en" ? "हिंदी में देखें" : "View in English"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.22)",
        borderRadius: 999,
        padding: 3,
        cursor: "pointer",
        lineHeight: 1,
        flexShrink: 0,
        ...style,
      }}
    >
      <span
        style={{
          padding: "5px 10px",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.02em",
          transition: "background .2s, color .2s",
          background: lang === "en" ? "#fff" : "transparent",
          color: lang === "en" ? "#0a0f1f" : "#cbd5e1",
        }}
      >
        EN
      </span>
      <span
        style={{
          padding: "5px 10px",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.02em",
          transition: "background .2s, color .2s",
          background: lang === "hi" ? "#fff" : "transparent",
          color: lang === "hi" ? "#0a0f1f" : "#cbd5e1",
        }}
      >
        हिं
      </span>
    </button>
  );
}