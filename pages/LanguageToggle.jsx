import { useLanguage } from "./LanguageContext";
import "./LanguageToggle.css";

/* ══════════════════════════════════════════════════════════════════
   LANGUAGE TOGGLE — shared across every page.
   Drop <LanguageToggle /> into any page's header/topbar. It reads and
   flips the single global language state from LanguageContext, so
   toggling on ANY page instantly changes the language everywhere
   (including pages the user hasn't visited yet), exactly like the
   homepage toggle.
══════════════════════════════════════════════════════════════════ */
export default function LanguageToggle({ className = "" }) {
  const { lang, toggleLang } = useLanguage();
  return (
    <button
      type="button"
      className={`nsw-lang-toggle ${className}`}
      onClick={toggleLang}
      aria-label={lang === "en" ? "Switch to Hindi" : "अंग्रेज़ी में बदलें"}
      title={lang === "en" ? "हिंदी में देखें" : "View in English"}
    >
      <span className={`nsw-lang-toggle-opt ${lang === "en" ? "nsw-lang-toggle-opt--active" : ""}`}>EN</span>
      <span className="nsw-lang-toggle-sep">/</span>
      <span className={`nsw-lang-toggle-opt ${lang === "hi" ? "nsw-lang-toggle-opt--active" : ""}`}>हिं</span>
    </button>
  );
}
