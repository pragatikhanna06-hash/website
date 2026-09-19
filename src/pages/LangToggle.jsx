import { useLanguage } from "./LanguageContext";

/* ══════════════════════════════════════════════════════════════════
   LANG TOGGLE — self-contained EN / हिं switch.
   Inline-styled on purpose so it can be dropped into any page's nav
   regardless of that page's own CSS system.
   • default   → for dark navs (light text on translucent white)
   • light     → for light navs (navy text / navy active pill)
   Pass `style` to override/position it (e.g. margin) from the caller.
══════════════════════════════════════════════════════════════════ */
export default function LangToggle({ style = {}, light = false }) {
  const { lang, toggleLang } = useLanguage();

  const pill = (active) => ({
    padding: "5px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.02em",
    transition: "background .2s, color .2s",
    background: active ? (light ? "#0D2F7F" : "#fff") : "transparent",
    color: active ? (light ? "#fff" : "#0a0f1f") : (light ? "#0D2F7F" : "#cbd5e1"),
  });

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
        background: light ? "rgba(13,47,127,0.06)" : "rgba(255,255,255,0.08)",
        border: light ? "1px solid rgba(13,47,127,0.25)" : "1px solid rgba(255,255,255,0.22)",
        borderRadius: 999,
        padding: 3,
        cursor: "pointer",
        lineHeight: 1,
        flexShrink: 0,
        ...style,
      }}
    >
      <span style={pill(lang === "en")}>EN</span>
      <span style={pill(lang === "hi")}>हिं</span>
    </button>
  );
}
