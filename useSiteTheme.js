import { useState, useEffect } from "react";

/* Shared across every page. The site is locked to the brochure's light
   theme (sky-blue / white / navy / yellow) — the old dark-mode branch is
   no longer reachable, so every page using tokens(isLight) now always
   renders its light-theme colors, which already match the brochure. */
export function useSiteTheme() {
  const [theme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("forfra-theme", "light");
  }, []);

  // toggle disabled — site stays on the brochure theme only
  const toggleTheme = () => {};
  return { theme, isLight: true, toggleTheme };
}
