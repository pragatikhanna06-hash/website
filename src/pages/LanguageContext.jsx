import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { translations } from "./translations";
import { uiStrings } from "./uiStrings";

const LanguageContext = createContext(null);

const STORAGE_KEY = "forfra-lang";

function getInitialLang() {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "hi") return saved;
  } catch {
    /* localStorage unavailable (e.g. private browsing) — fall back silently */
  }
  return "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore write errors */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "hi" : "en"));
  }, []);

  const t = useMemo(() => translations[lang], [lang]);

  // Flat lookup translator for pages that use inline English strings
  // (as opposed to HomePage's structured `t` object). Pass the English
  // string as written in the JSX; returns the Hindi version when
  // lang === "hi", or the original string in English mode / if missing.
  const tr = useCallback(
    (str) => (lang === "hi" ? uiStrings[str] || str : str),
    [lang]
  );

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t, tr }),
    [lang, toggleLang, t, tr]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}