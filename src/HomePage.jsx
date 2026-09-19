import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Siren, Scale, Microscope, FileText, ShieldCheck, FileCheck2, Fingerprint, Landmark, Building2, Briefcase, Globe, Mail, Phone } from "lucide-react";
import "./HomePage.css";
import "./pages/NyayShieldPage.css"; // adjust this path to wherever NyayShieldPage.css actually sits relative to HomePage.jsx (per your App.jsx, it's in "./pages/")
import { useLanguage } from "./pages/LanguageContext";
import logo from "./assets/logo.png";
import Navbar from "./SiteNavbar";
// useSiteTheme import removed — theme toggle retired, site stays on brochure light theme.
// All photo imports removed — theme now matches the brochure (no images).

// Inline brand icons (not all lucide-react versions ship Instagram/Linkedin,
// so these are hand-drawn to avoid any install-version mismatch).
function InstagramIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function LinkedinIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

// ── data ──────────────────────────────────────────────────────────────────────
// SERVICES, CAPABILITIES, CLIENTS text now lives in src/i18n/translations.js
// and is read via useLanguage() inside each section component below.

// ── cyber background animation ─────────────────────────────────────────────
// Circuit-trace network with traveling data pulses, a floating particle mesh,
// sparse binary rain, and a slow security-style scan line.

function CyberBackground() {
  // Disabled — no background animation in the brochure-matched theme.
  return null;
}

// ── useInView hook ────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── sub-components ────────────────────────────────────────────────────────────
const HERO_ACTION_META = [
  { to: "/report-crime", icon: Siren, className: "qa-btn qa-report" },
  { to: "/book-lawyer", icon: Scale, className: "qa-btn qa-lawyer" },
  { to: "/forensic-expert", icon: Microscope, className: "qa-btn qa-forensic" },
  { to: "/legal-drafting", icon: FileText, className: "qa-btn qa-drafting" },
];

function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="hero hero--nyay" id="hero">
      <div className="home-root hero-nyay-embed">
        <section className="quick-actions">
          <div className="wrap">
            <div className="quick-actions-head">
              <div className="eyebrow" style={{ justifyContent: "center" }}>{t.hero.eyebrow}</div>
              <h1>{t.hero.title}</h1>
            </div>

            <div className="quick-actions-inner">
              {HERO_ACTION_META.map((meta, i) => {
                const action = t.hero.actions[i];
                const Icon = meta.icon;
                return (
                  <Link className={meta.className} to={meta.to} key={meta.to}>
                    <span className="qa-icon"><Icon size={26} /></span>
                    <span>
                      <div className="qa-text-title">{action.title}</div>
                      <div className="qa-text-sub">{action.sub}</div>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      <a href="#about" className="hero-scroll-hint">
        <span className="scroll-arrow">↓</span>
      </a>
    </section>
  );
}

function AboutSection() {
  const [ref, inView] = useInView();
  const { t, tr } = useLanguage();
  const navigate = useNavigate();
  return (
    <section className="about" id="about" ref={ref}>
      <div className={`about-inner ${inView ? "reveal" : ""}`}>
        <div className="about-text">
          <span className="section-eyebrow">{t.about.eyebrow}</span>
          <h2 className="section-title">
            {t.about.titleLine1} <em>{t.about.titleLine2}</em>
          </h2>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <div className="about-stats">
            {t.about.stats.map((s) => (
              <div key={s.label} className="stat-item">
                <span className="stat-val">{s.val}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <button className="btn-primary" style={{ marginTop: 28 }} onClick={() => navigate("/about")}>
            {tr("Learn More")}
          </button>
        </div>

        <div className="about-visual" aria-hidden="true">
          <svg viewBox="0 0 320 320" className="justice-scale-svg" xmlns="http://www.w3.org/2000/svg">
            <circle cx="160" cy="160" r="150" fill="#0D2F7F" opacity="0.05" />
            <circle cx="160" cy="160" r="112" fill="none" stroke="var(--gold)" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 7" />

            {/* base */}
            <rect x="110" y="266" width="100" height="10" rx="3" fill="#0D2F7F" />
            <rect x="132" y="252" width="56" height="14" rx="3" fill="#0D2F7F" />
            {/* central post */}
            <rect x="156" y="88" width="8" height="168" rx="2" fill="#0D2F7F" />
            {/* top finial */}
            <circle cx="160" cy="78" r="12" fill="var(--gold)" />
            {/* beam */}
            <rect x="70" y="94" width="180" height="7" rx="3.5" fill="#0D2F7F" />
            {/* beam pivot */}
            <circle cx="160" cy="97.5" r="9" fill="var(--gold)" />

            {/* left chain */}
            <line x1="80" y1="99" x2="80" y2="150" stroke="#0D2F7F" strokeWidth="2" />
            <line x1="60" y1="150" x2="100" y2="150" stroke="#0D2F7F" strokeWidth="2" />
            <line x1="60" y1="150" x2="80" y2="99" stroke="#0D2F7F" strokeWidth="1.5" />
            <line x1="100" y1="150" x2="80" y2="99" stroke="#0D2F7F" strokeWidth="1.5" />
            {/* left pan */}
            <path d="M50 150 Q80 182 110 150" fill="none" stroke="var(--gold)" strokeWidth="6" strokeLinecap="round" />

            {/* right chain */}
            <line x1="240" y1="99" x2="240" y2="150" stroke="#0D2F7F" strokeWidth="2" />
            <line x1="220" y1="150" x2="260" y2="150" stroke="#0D2F7F" strokeWidth="2" />
            <line x1="220" y1="150" x2="240" y2="99" stroke="#0D2F7F" strokeWidth="1.5" />
            <line x1="260" y1="150" x2="240" y2="99" stroke="#0D2F7F" strokeWidth="1.5" />
            {/* right pan */}
            <path d="M210 150 Q240 182 270 150" fill="none" stroke="var(--gold)" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <div className="justice-scale-caption">
            <span className="justice-scale-caption-title">{tr("Justice, Weighed Precisely")}</span>
            <span className="justice-scale-caption-sub">{tr("Every case handled with balance & integrity")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [ref, inView] = useInView(0.05);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section className="services" id="services" ref={ref}>
      <div className={`services-header ${inView ? "reveal" : ""}`}>
        <div className="services-header-top">
          <div>
            <span className="section-eyebrow">{t.services.eyebrow}</span>
            <h2 className="section-title">{t.services.title}</h2>
          </div>
        </div>
      </div>
      <div className="services-strip">
        {t.services.items.map((s, i) => {
          const hasFeats = Array.isArray(s.feats) && s.feats.length > 0;
          const isOpen = expandedId === s.id;
          const go = () => {
            if (s.slug) navigate(`/services/${s.slug}`);
            else if (hasFeats) setExpandedId(isOpen ? null : s.id);
          };
          return (
            <div
              className={`service-card ${isOpen ? "service-card--open" : ""}`}
              key={s.id}
              style={{ animationDelay: `${i * 0.07}s`, cursor: "pointer" }}
              onClick={go}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") go(); }}
            >
              <div className="card-id">{s.id}</div>
              <div className="card-icon">{s.icon}</div>
              <div className="card-tag">{s.tag}</div>
              <h3 className="card-title">{s.title}</h3>
              <p className="card-desc">{s.desc}</p>

              {hasFeats && (
                <>
                  <button
                    className="card-toggle"
                    aria-expanded={isOpen}
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedId(isOpen ? null : s.id);
                    }}
                  >
                    {isOpen ? "Hide details" : "View key details"}
                    <span className={`card-toggle-icon ${isOpen ? "card-toggle-icon--open" : ""}`}>▾</span>
                  </button>
                  <ul className={`card-feats ${isOpen ? "card-feats--open" : ""}`}>
                    {s.feats.map((f) => (
                      <li key={f}><span className="bullet-dot" />{f}</li>
                    ))}
                  </ul>
                </>
              )}

              {!hasFeats && <div className="card-arrow">→</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView();
  const { t } = useLanguage();

  return (
    <section className="capabilities" id="capabilities" ref={ref}>
      <div className={`cap-inner ${inView ? "reveal" : ""}`}>
        <div className="cap-left">
          <span className="section-eyebrow">{t.capabilities.eyebrow}</span>
          <h2 className="section-title">{t.capabilities.title}</h2>
          <div className="cap-tabs">
            {t.capabilities.items.map((c, i) => (
              <button
                key={c.phase}
                className={`cap-tab ${active === i ? "cap-tab--active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="tab-phase">{c.phase}</span>
                <span className="tab-title">{c.title}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="cap-right">
          <div className="cap-panels">
            {t.capabilities.items.map((c, i) => (
              <div
                key={c.phase}
                className={`cap-panel ${active === i ? "cap-panel--active" : ""}`}
              >
                <div className="panel-phase-badge">{c.phase}</div>
                <h3 className="panel-title">{c.title}</h3>
                <p className="panel-body">{c.body}</p>
                <ul className="panel-bullets">
                  {c.bullets.map((b) => (
                    <li key={b}>
                      <span className="bullet-dot" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Position-indexed icons for the differentiator cards (order matches
// t.differentiator.points in both EN and HI translations).
const DIFFERENTIATOR_ICONS = [ShieldCheck, Scale, FileCheck2, Fingerprint];
// Position-indexed photos, same order as DIFFERENTIATOR_ICONS above.


function DifferentiatorSection() {
  const [ref, inView] = useInView();
  const { t } = useLanguage();
  return (
    <section className="differentiator" id="differentiator" ref={ref}>
      <div className={`diff-inner ${inView ? "reveal" : ""}`}>
        <div className="diff-header">
          <span className="section-eyebrow">{t.differentiator.eyebrow}</span>
          <h2 className="section-title">
            {t.differentiator.titleLine1} <em>{t.differentiator.titleLine2}</em>
          </h2>
        </div>
        <div className="diff-grid">
          {t.differentiator.points.map((p, i) => {
            const Icon = DIFFERENTIATOR_ICONS[i];
            return (
              <div
                className="diff-card"
                key={p.title}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="diff-icon"><Icon size={22} /></div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Position-indexed icons for the client category pills (order matches
// t.clients.categories in both EN and HI translations).
const CLIENT_CATEGORY_ICONS = [Landmark, Siren, Building2, Briefcase, FileText];

function ClientsSection() {
  const [ref, inView] = useInView();
  const { t } = useLanguage();
  return (
    <section className="clients-section" id="clients" ref={ref}>
      <div className={`clients-header ${inView ? "reveal" : ""}`}>
        <span className="section-eyebrow">{t.clients.eyebrow}</span>
        <h2 className="section-title">{t.clients.title}</h2>
      </div>
      <div className="marquee-outer">
        <div className="marquee-track">
          {[...t.clients.names, ...t.clients.names].map((c, i) => (
            <span key={i} className="marquee-item">{c}</span>
          ))}
        </div>
      </div>
      <div className={`client-categories ${inView ? "reveal" : ""}`}>
        {t.clients.categories.map((cat, i) => {
          const Icon = CLIENT_CATEGORY_ICONS[i];
          return (
            <Link key={cat.label} to="/services#clients" className="cat-pill" style={{ cursor: "pointer" }}>
              <span><Icon size={16} /></span> {cat.label}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const PROGRAM_COLORS = ["var(--gold)", "var(--gold)"];
const PROGRAM_LINKS = ["/corporate-crime-awareness", "/school-crime-awareness"];


function ProgramsSection() {
  const [ref, inView] = useInView();
  const { t, tr } = useLanguage();
  const navigate = useNavigate();
  const programs = t.programs.items.map((p, i) => ({ ...p, color: PROGRAM_COLORS[i], to: PROGRAM_LINKS[i] }));
  return (
    <section className="programs" id="programs" ref={ref}>
      <div className={`programs-inner ${inView ? "reveal" : ""}`}>
        <span className="section-eyebrow">{t.programs.eyebrow}</span>
        <h2 className="section-title">
          {t.programs.titleLine1} <em>{t.programs.titleLine2}</em>
        </h2>
        <div className="programs-grid">
          {programs.map((p) => (
            <div
              key={p.title}
              className="program-card"
              role="link"
              tabIndex={0}
              style={{ cursor: p.to ? "pointer" : "default" }}
              onClick={() => p.to && navigate(p.to)}
              onKeyDown={(e) => { if (p.to && (e.key === "Enter" || e.key === " ")) navigate(p.to); }}
            >
              <div className="prog-accent" style={{ background: p.color }} />
              <h3>{p.title}</h3>
              <span className="prog-sub">{p.subtitle}</span>
              <ul>
                {p.points.map((pt) => (
                  <li key={pt}><span className="prog-dot" />  {pt}</li>
                ))}
              </ul>
              {p.to && <span className="prog-more">{t.programs.learnMore || tr("Learn more →")}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [ref, inView] = useInView();
  const { t, tr } = useLanguage();

  const links = [
    { icon: Mail, label: tr("Email"), value: "hello@forfrasolutions.com", href: "mailto:hello@forfrasolutions.com" },
    { icon: Phone, label: tr("Call Us"), value: "+91 97110 15337", href: "tel:+919711015337" },
    { icon: Phone, label: tr("Call Us"), value: "+91 89823 07608", href: "tel:+918982307608" },
    { icon: InstagramIcon, label: "Instagram", value: "@forfrasolutions", href: "https://instagram.com/forfrasolutions", external: true },
    { icon: LinkedinIcon, label: "LinkedIn", value: "Forfra Solutions", href: "https://www.linkedin.com/company/forfra-solutions/", external: true },
  ];

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className={`contact-inner ${inView ? "reveal" : ""}`}>
        <div className="contact-text">
          <span className="section-eyebrow">{t.contact.eyebrow}</span>
          <h2 className="section-title">
            {t.contact.titleLine1} {t.contact.titleLine2}
          </h2>
          <p>{t.contact.desc}</p>
          <div className="contact-links">
            {links.map((l) => (
              <a
                key={l.label + l.value}
                href={l.href}
                className="contact-link"
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="contact-link-icon"><l.icon size={19} /></span>
                <span className="contact-link-text">
                  <span className="contact-link-label">{l.label}</span>
                  <span className="contact-link-value">{l.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="contact-cta-box">
          <div className="cta-box-title">{t.contact.ctaTitle}</div>
          <a href="mailto:hello@forfrasolutions.com" className="btn-primary btn-primary--large">
            {t.contact.contactUsNow}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t, tr } = useLanguage();
  return (
    <footer className="footer-v2">
      <div className="footer-v2-top">
        <div className="footer-v2-brand-col">
          <div className="footer-v2-brand">
            <img src={logo} alt="Forfra Solutions" className="brand-logo" />
            <div className="footer-v2-brand-text">
              <span className="footer-v2-brand-main">FORFRA SOLUTIONS</span>
              <span className="footer-v2-brand-sub">{t.footer.tagline}</span>
            </div>
          </div>
          <p className="footer-v2-desc">
            {t.servicesPage.hero.subtitle}
          </p>
        </div>

        <div className="footer-v2-col">
          <h4>{tr("Company")}</h4>
          <Link to="/about">{tr("About Us")}</Link>
          <Link to="/services">{tr("Services")}</Link>
          <a href="mailto:hello@forfrasolutions.com" className="footer-v2-link-btn">{tr("Apply Now")}</a>
          <a href="mailto:hello@forfrasolutions.com">{tr("Contact Us")}</a>
        </div>

        <div className="footer-v2-col">
          <h4>{tr("Services")}</h4>
          <Link to="/services/data-security">{tr("Data Security")}</Link>
          <Link to="/services/forensic-audit">{tr("Forensic Audit")}</Link>
          <Link to="/services/digital-forensics">{tr("Digital Forensics")}</Link>
          <Link to="/services/fraud-investigation">{tr("Fraud Investigation")}</Link>
          <Link to="/services/investigations">{tr("Investigations")}</Link>
          <Link to="/services/legal-consultation">{tr("Legal Consultation")}</Link>
          <Link to="/services/document-examination">{tr("Document Examination")}</Link>
          <Link to="/services/cyber-investigation">{tr("Cyber Investigation")}</Link>
        </div>
      </div>

      <div className="footer-v2-divider" />

      <div className="footer-v2-bottom">
        <span>© 2026 Forfra Solutions. {t.footer.rights}</span>
        <a href="mailto:hello@forfrasolutions.com">hello@forfrasolutions.com</a>
      </div>
    </footer>
  );
}

// ── HomePage ──────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { hash } = useLocation();

  // Reliably scroll to the right section when arriving here via a
  // "/#services" (or similar) link from another page — client-side route
  // changes don't always trigger the browser's native hash-scroll.
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    // small delay lets the page's sections finish mounting first
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <div className="page">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CapabilitiesSection />
      <DifferentiatorSection />
      <ClientsSection />
      <ProgramsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
