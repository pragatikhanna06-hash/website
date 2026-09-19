import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { useLanguage } from "./pages/LanguageContext";
import logo from "./assets/logo.png";

/* ══════════════════════════════════════════════════════════════════
   SHARED SITE NAVBAR
   Used on the homepage AND every service page so the header looks and
   behaves identically everywhere. Links always resolve to an absolute
   path (e.g. "/#services") so they work correctly no matter which page
   they're clicked from — not just when already on the homepage.
══════════════════════════════════════════════════════════════════ */

const NAV_LINKS = [
  { key: "about", href: "/about" },
  { key: "services", href: "/#services" },
  { key: "clients", href: "/#clients" },
  { key: "programs", href: "/#programs" },
];

const CONTACT_PLATFORMS = [
  { label: "Email", value: "hello@forfrasolutions.com", href: "mailto:hello@forfrasolutions.com" },
  { label: "Call", value: "+91 97110 15337", href: "tel:+919711015337" },
  { label: "Call", value: "+91 89823 07608", href: "tel:+918982307608" },
  { label: "Instagram", value: "@forfrasolutions", href: "https://instagram.com/forfrasolutions", external: true },
  { label: "LinkedIn", value: "Forfra Solutions", href: "https://www.linkedin.com/company/forfra-solutions/", external: true },
];

function LanguageToggle({ className = "" }) {
  const { lang, toggleLang } = useLanguage();
  return (
    <button
      type="button"
      className={`lang-toggle ${className}`}
      onClick={toggleLang}
      aria-label={lang === "en" ? "Switch to Hindi" : "अंग्रेज़ी में बदलें"}
      title={lang === "en" ? "हिंदी में देखें" : "View in English"}
    >
      <span className={`lang-toggle-opt ${lang === "en" ? "lang-toggle-opt--active" : ""}`}>EN</span>
      <span className="lang-toggle-sep">/</span>
      <span className={`lang-toggle-opt ${lang === "hi" ? "lang-toggle-opt--active" : ""}`}>हिं</span>
    </button>
  );
}

function ContactDropdown({ className = "", onItemClick }) {
  const { tr } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div className={`contact-dd-wrap ${className}`} ref={wrapRef}>
      <button
        type="button"
        className="nav-cta contact-dd-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {tr("Contact Us")}
      </button>
      {open && (
        <div className="contact-dd-menu" role="menu">
          {CONTACT_PLATFORMS.map((p, i) => (
            <a
              key={p.label + i}
              href={p.href}
              className="contact-dd-item"
              target={p.external ? "_blank" : undefined}
              rel={p.external ? "noopener noreferrer" : undefined}
              role="menuitem"
              onClick={() => { setOpen(false); onItemClick && onItemClick(); }}
            >
              <span className="contact-dd-label">{tr(p.label)}</span>
              <span className="contact-dd-value">{p.value}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar({ showHome = false, hideServices = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { t, tr } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Optional extra "Home" link (service pages) and optional removal of the
  // "Services" link (the /services page itself). The homepage passes neither.
  const links = [
    ...(showHome ? [{ key: "home", href: "/" }] : []),
    ...NAV_LINKS.filter((l) => !(hideServices && l.key === "services")),
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    navigate(href);
    setOpen(false);
  };

  return (
  <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
    <div className="navbar-inner">

      {/* Brand */}
      <a
        href="/"
        className="navbar-brand"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        <img src={logo} alt="Forfra Solutions" className="brand-logo" />
        <span className="brand-name">FORFRA</span>
        <span className="brand-sub">SOLUTIONS</span>
      </a>

      {/* Navigation Links */}
      <ul className={`navbar-links ${open ? "navbar-links--open" : ""}`}>
        {links.map((l) => (
          <li key={l.key}>
            <a
              href={l.href}
              onClick={(e) => handleLinkClick(e, l.href)}
            >
              {t.nav[l.key]}
            </a>
          </li>
        ))}

        <li>
          <a
            href="mailto:hello@forfrasolutions.com"
            className="nav-cta"
            onClick={() => setOpen(false)}
          >
            {tr("Apply Now")}
          </a>
        </li>

        <li>
          <ContactDropdown onItemClick={() => setOpen(false)} />
        </li>

        <li className="navbar-lang-item">
          <LanguageToggle />
        </li>
      </ul>

      {/* Mobile Controls */}
      <div className="navbar-mobile-controls">
        <LanguageToggle className="lang-toggle--compact" />

        <button
          className={`hamburger ${open ? "hamburger--open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

    </div>
  </nav>
  );
}
