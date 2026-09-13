import { Link } from "react-router-dom";
import { Siren, Scale, Microscope, FileText } from "lucide-react";
import "./NyayShieldPage.css";
import { useLanguage } from "./LanguageContext";
import LangToggle from "./LangToggle";

/* ══════════════════════════════════════════════════════════════════
   NYAYSHIELD — HOME PAGE
   Restyled to match AboutPage's clean, spacious design system:
   Inter everywhere, gold (#e8971a) accent, white/light-blue neutral
   background, no busy animation — just a nav, a short intro with the
   same eyebrow-pill + underlined-heading treatment as AboutPage, and
   4 quick-action cards that route to their own dedicated pages.
══════════════════════════════════════════════════════════════════ */

export default function NyayShieldPage() {
  const { tr } = useLanguage();
  return (
    <div className="home-root">
      {/* ---------- NAV — only a back-to-home link ---------- */}
      <nav className="topbar">
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div className="brand">
            <svg className="brand-mark" viewBox="0 0 48 48" fill="none">
              <path d="M24 4L6 12v10c0 11 7.6 19.6 18 22 10.4-2.4 18-11 18-22V12L24 4z" stroke="#e8971a" strokeWidth="2" fill="rgba(232,151,26,0.08)" />
              <path d="M24 14v20M17 20l7-4 7 4M17 20c0 3-2 6-4 6h8c-2 0-4-3-4-6M31 20c0 3-2 6-4 6h8c-2 0-4-3-4-6" stroke="#e8971a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="brand-name">Nyay<span>Shield</span></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link className="back-link" to="/">{tr("← Back")}</Link>
            <LangToggle />
          </div>
        </div>
      </nav>

      {/* ---------- QUICK ACTIONS — the 4 buttons ---------- */}
      <section className="quick-actions">
        <div className="wrap">
          <div className="quick-actions-head">
            <span className="eyebrow">NyayShield</span>
            <h1>{tr("We are here to support you")}</h1>
            <p>{tr("Pick one — each takes you straight to the right place, no digging through menus.")}</p>
          </div>

          <div className="quick-actions-inner">
            <Link className="qa-btn qa-report" to="/report-crime">
              <span className="qa-icon"><Siren size={24} /></span>
              <span>
                <div className="qa-text-title">{tr("Report a Crime")}</div>
                <div className="qa-text-sub">{tr("File details, get routed instantly")}</div>
              </span>
            </Link>

            <Link className="qa-btn qa-lawyer" to="/book-lawyer">
              <span className="qa-icon"><Scale size={24} /></span>
              <span>
                <div className="qa-text-title">{tr("Book a Lawyer")}</div>
                <div className="qa-text-sub">{tr("From Day 1, or later in the case")}</div>
              </span>
            </Link>

            <Link className="qa-btn qa-forensic" to="/forensic-expert">
              <span className="qa-icon"><Microscope size={24} /></span>
              <span>
                <div className="qa-text-title">{tr("Book a Forensic Expert")}</div>
                <div className="qa-text-sub">{tr("Secure evidence before it's gone")}</div>
              </span>
            </Link>

            <Link className="qa-btn qa-drafting" to="/legal-drafting">
              <span className="qa-icon"><FileText size={24} /></span>
              <span>
                <div className="qa-text-title">{tr("Legal / Corporate Report Drafting")}</div>
                <div className="qa-text-sub">{tr("Notices, contracts & compliance docs")}</div>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
