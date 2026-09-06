import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, FileCheck2, Heart, Target } from "lucide-react";
import { useSiteTheme } from "./useSiteTheme";
import logo from "./assets/logo.png";

/* ══════════════════════════════════════════
   GLOBAL STYLES (same design system as ServicesPage)
══════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif; overflow-x: hidden; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .au1 { animation: fadeUp .6s .15s both; }
  .au2 { animation: fadeUp .6s .35s both; }
  .au3 { animation: fadeUp .6s .55s both; }

  .rv  { opacity:0; transform:translateY(28px);  transition:opacity .7s ease,transform .7s ease; }
  .rv.vis { opacity:1; transform:none; }

  .cli:hover  { border-color:rgba(232,151,26,.35) !important; transform:translateY(-3px); }

  .nbtn { background:none; border:none; cursor:pointer; padding:0; font-family:'Inter',sans-serif; font-size:.9rem; font-weight:500; letter-spacing:.3px; transition:color .2s; }
  .nbtn.active { color:#e8971a; }

  .ncta { background:#e8971a; color:#000; font-family:'Inter',sans-serif; font-weight:700; font-size:.9rem; letter-spacing:1px; text-transform:uppercase; padding:9px 22px; border-radius:4px; cursor:pointer; border:none; transition:background .2s,transform .2s; white-space:nowrap; text-decoration:none; display:inline-block; }
  .ncta:hover { background:#f5a623; transform:translateY(-1px); }

  .bgold { background:#e8971a; color:#000; font-family:'Inter',sans-serif; font-weight:800; font-size:.95rem; letter-spacing:1.5px; text-transform:uppercase; padding:14px 34px; border-radius:4px; text-decoration:none; display:inline-block; transition:background .2s,transform .2s; }
  .bgold:hover { background:#f5a623; transform:translateY(-2px); }

  .bgh { background:transparent; font-family:'Inter',sans-serif; font-weight:700; font-size:.95rem; letter-spacing:1.5px; text-transform:uppercase; padding:14px 34px; border-radius:4px; text-decoration:none; display:inline-block; transition:border-color .2s,background .2s,transform .2s; }
  .bgh:hover { border-color:#e8971a; background:rgba(232,151,26,.08); transform:translateY(-2px); }

  .moba { text-decoration:none; font-family:'Inter',sans-serif; font-size:1.15rem; font-weight:700; letter-spacing:1px; text-transform:uppercase; padding:10px 0; transition:color .2s; display:block; background:none; border-top:none; border-left:none; border-right:none; cursor:pointer; text-align:left; width:100%; }
  .moba:hover { color:#e8971a; }

  @media (max-width:960px) {
    .dn  { display:none !important; }
    .dfl { display:flex !important; }
    .sp  { padding:56px 24px !important; }
    .dg1 { grid-template-columns:1fr !important; gap:40px !important; }
    .hpad{ padding:100px 24px 60px !important; }
  }
  @media (max-width:600px) {
    .g1 { grid-template-columns:1fr !important; }
  }
  @media (prefers-reduced-motion:reduce) {
    .rv { opacity:1 !important; transform:none !important; transition:none !important; }
    * { animation:none !important; }
  }
`;

const G = "#e8971a"; // accent gold — same in both themes

/* Colour tokens for the two themes. Light theme deliberately uses white /
   light-grey / light-blue only — no dark-navy tones anywhere, per spec;
   text uses a neutral charcoal instead of a blue-tinted dark colour. */
function tokens(isLight) {
  return isLight
    ? {
        page: "#F3F5F8",       // light grey
        alt: "#E7F0FB",        // light blue
        card: "#FFFFFF",
        footer: "#EAF1FB",
        navBg: "rgba(255,255,255,.92)",
        navBgScrolled: "rgba(255,255,255,.98)",
        border: "rgba(30,33,38,.12)",
        text: "#23262B",       // neutral dark charcoal (not navy)
        body: "rgba(35,38,43,.72)",
        hamburger: "#23262B",
      }
    : {
        page: "#090f1e",
        alt: "#0d1635",
        card: "#111d40",
        footer: "#060c1a",
        navBg: "rgba(9,15,30,.92)",
        navBgScrolled: "rgba(9,15,30,.98)",
        border: "rgba(255,255,255,.07)",
        text: "#ffffff",
        body: "rgba(255,255,255,.70)",
        hamburger: "#ffffff",
      };
}

/* ══════════════════════════════════════════
   DATA — mirrors www.forfrasolutions.com "About Us" page
══════════════════════════════════════════ */
const CERTIFICATIONS = [
  {
    icon: ShieldCheck,
    title: "ISO 9001:2015",
    sub: "Quality Management",
    body: "We are ISO 9001 certified, ensuring consistent quality, structured processes, and a customer-first approach.",
  },
  {
    icon: FileCheck2,
    title: "ISO 27001:2022",
    sub: "Information Security",
    body: "We are also ISO 27001 certified, guaranteeing the highest level of data security and risk management.",
  },
];

const WHO_WE_ARE = [
  "Forfra Solutions is a multidisciplinary hub of forensic, cyber, and risk management experts with experience across Income Tax, GST, CBI, Police, ED, and other agencies.",
  "We deliver trusted solutions in digital forensics, fraud investigation, data security, and forensic education.",
];

const PROMISE = [
  "We deliver precise, ethical, and confidential forensic and digital solutions.",
  "Across classrooms, courtrooms, and fieldwork, we uphold integrity, transparency, and excellence.",
];

const MISSION = [
  "At the intersection of science, education, and justice, Forfra Solutions empowers students, legal professionals, and law enforcement with expert-led forensic solutions.",
];

/* ══════════════════════════════════════════
   HOOKS
══════════════════════════════════════════ */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("rv");
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("vis"); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function useStagger() {
  const ref = useRef(null);
  useEffect(() => {
    const p = ref.current;
    if (!p) return;
    const ios = [...p.children].map((c, i) => {
      c.classList.add("rv");
      c.style.transitionDelay = `${i * 0.09}s`;
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { c.classList.add("vis"); io.disconnect(); }
      }, { threshold: 0.08 });
      io.observe(c);
      return io;
    });
    return () => ios.forEach((io) => io.disconnect());
  }, []);
  return ref;
}

function Rev({ children, style = {} }) {
  const ref = useReveal();
  return <div ref={ref} style={style}>{children}</div>;
}

/* Small highlighted eyebrow badge — bigger + visually distinct label used
   above every heading, matching the homepage treatment. */
function Eyebrow({ children, center }) {
  return (
    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: ".76rem", fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: G, marginBottom: 14, display: "inline-flex", background: "rgba(232,151,26,.12)", border: "1px solid rgba(232,151,26,.35)", borderRadius: 999, padding: "6px 16px", alignSelf: center ? "center" : "flex-start" }}>
      {children}
    </span>
  );
}

/* Bigger, highlighted section heading — gold underline glow, used the
   same way in every section on this page. */
function SectionHeading({ children, T, center }) {
  return (
    <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: "clamp(2.1rem,4.6vw,3.4rem)", textTransform: "uppercase", color: T.text, position: "relative", display: "inline-block", paddingBottom: 14, textAlign: center ? "center" : "left" }}>
      {children}
      <span style={{ position: "absolute", left: center ? "50%" : 0, transform: center ? "translateX(-50%)" : "none", bottom: 0, width: 60, height: 4, borderRadius: 999, background: `linear-gradient(90deg, ${G}, #c47d0e)`, boxShadow: "0 0 14px rgba(232,151,26,.55)" }} />
    </h2>
  );
}

/* ══════════════════════════════════════════
   NAV
══════════════════════════════════════════ */
function Nav({ T }) {
  const [open, setOpen] = useState(false);
  const [sc, setSc] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fn = () => setSc(scrollY > 8);
    addEventListener("scroll", fn);
    return () => removeEventListener("scroll", fn);
  }, []);

  const links = [
    ["Home", "/", false],
    ["About", "/about", true],
    ["Services", "/#services", false],
    ["Clients", "/#clients", false],
    ["Programs", "/#programs", false],
  ];

  const go = (href) => { navigate(href); setOpen(false); };

  return (<>
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: sc ? T.navBgScrolled : T.navBg, backdropFilter: "blur(12px)", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: 64, transition: "background .3s" }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }} onClick={(e) => { e.preventDefault(); navigate("/"); }}>
        <img src={logo} alt="Forfra Solutions" className="brand-logo" style={{ width: 34, height: 34, objectFit: "contain" }} />
        <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: "1.15rem", letterSpacing: 2, textTransform: "uppercase", color: T.text }}>FORFRA<span style={{ color: T.text, fontWeight: 800, fontSize: "1.15rem", letterSpacing: 2, marginLeft: 6 }}>SOLUTIONS</span></span>
      </a>
      <ul className="dn" id="dnav" style={{ display: "flex", gap: 34, listStyle: "none" }}>
        {links.map(([l, href, active]) => (
          <li key={l}><button className={`nbtn ${active ? "active" : ""}`} style={{ color: active ? G : T.body }} onClick={() => go(href)}>{l}</button></li>
        ))}
      </ul>
      <button className="ncta dn" id="dcta" onClick={() => go("/#contact")}>Get in Touch</button>
      <button onClick={() => setOpen((o) => !o)} aria-label="Menu" style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4 }} className="dfl" id="hambtn">
        {[0, 1, 2].map((i) => <span key={i} style={{ display: "block", width: 22, height: 2, background: T.hamburger, borderRadius: 2 }} />)}
      </button>
    </nav>
    {open && <div style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 99, background: T.page, padding: "20px 28px 28px", display: "flex", flexDirection: "column", gap: 0, borderBottom: `1px solid ${T.border}` }}>
      {links.map(([l, href]) => <button key={l} className="moba" style={{ color: T.body, borderBottom: `1px solid ${T.border}` }} onClick={() => go(href)}>{l}</button>)}
      <button className="ncta" onClick={() => go("/#contact")} style={{ marginTop: 16 }}>Get in Touch</button>
    </div>}
    <style>{`@media(min-width:961px){#dnav{display:flex!important}#dcta{display:block!important}#hambtn{display:none!important}}`}</style>
  </>);
}

/* ══════════════════════════════════════════
   HERO — no photo behind the headline, so text never merges with an image
══════════════════════════════════════════ */
function Hero({ T, isLight }) {
  return (
    <section className="hpad" style={{ minHeight: "56vh", background: isLight ? "linear-gradient(160deg,#FFFFFF 0%,#E7F0FB 60%,#DCEAFB 100%)" : "linear-gradient(160deg,#090f1e 0%,#0d1635 50%,#0a1a42 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "150px 48px 70px", position: "relative", overflow: "hidden" }}>
      <h1 className="au1" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: "clamp(3.4rem,8.5vw,7.2rem)", lineHeight: 1.05, letterSpacing: -1, textTransform: "uppercase", color: T.text, marginBottom: 18 }}>
        ABOUT US
      </h1>
      <p className="au2" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: "clamp(1rem,2vw,1.4rem)", lineHeight: 1.4, color: T.body, width: "min(900px, 92vw)", margin: "0 auto" }}>
        Education, technology, and <span style={{ color: G, fontWeight: 700 }}>justice</span> — united.
      </p>
    </section>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function AboutPage() {
  const { isLight } = useSiteTheme();
  const T = tokens(isLight);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = GLOBAL_CSS;
    document.head.appendChild(s);
    window.scrollTo(0, 0);
    return () => document.head.removeChild(s);
  }, []);

  const certRef = useStagger();
  const promiseRef = useReveal();
  const missionRef = useReveal();

  return (
    <div style={{ background: T.page, minHeight: "100vh", position: "relative", transition: "background .4s" }}>
      <Nav T={T} />
      <Hero T={T} isLight={isLight} />

      {/* WHO WE ARE */}
      <section className="sp" style={{ background: T.page, padding: "20px 48px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Rev style={{ marginBottom: 24 }}>
            <Eyebrow>Who We Are?</Eyebrow>
          </Rev>
          <Rev>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
              {WHO_WE_ARE.map((line) => (
                <li key={line} style={{ display: "flex", gap: 14, alignItems: "flex-start", fontSize: "1rem", color: T.body, lineHeight: 1.7 }}>
                  <span style={{ flexShrink: 0, width: 6, height: 6, background: G, borderRadius: "50%", marginTop: 10 }} />
                  {line}
                </li>
              ))}
            </ul>
          </Rev>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="sp" style={{ background: T.alt, padding: "70px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Rev style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Eyebrow center>Our Approach</Eyebrow>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "1.05rem", color: T.body, lineHeight: 1.8, marginTop: 18 }}>
              At the crossroads of science and technology, Forfra Solutions redefines modern forensic practices — integrating advanced methodologies with innovative tools to accelerate investigations.
            </p>
          </Rev>
        </div>
      </section>

      {/* ISO CERTIFICATIONS */}
      <section className="sp" style={{ background: T.page, padding: "80px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Rev style={{ marginBottom: 44, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Eyebrow center>Credentials</Eyebrow>
            <SectionHeading T={T} center>Our ISO <span style={{ color: G }}>Certifications</span></SectionHeading>
          </Rev>
          <div ref={certRef} className="g1" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 24 }}>
            {CERTIFICATIONS.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="cli" style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: "34px 30px", transition: "border-color .25s,transform .25s", position: "relative", overflow: "hidden", boxShadow: isLight ? "0 4px 18px rgba(20,33,58,.06)" : "none" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${G},transparent)` }} />
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 46, height: 46, borderRadius: 10, background: "rgba(232,151,26,.12)", color: G, marginBottom: 18 }}>
                    <Icon size={22} />
                  </span>
                  <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: "1.25rem", color: T.text, marginBottom: 4 }}>{c.title}</h3>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: ".72rem", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: G, display: "block", marginBottom: 14 }}>{c.sub}</span>
                  <p style={{ fontSize: ".9rem", color: T.body, lineHeight: 1.7 }}>{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR PROMISE */}
      <section className="sp" style={{ background: T.alt, padding: "70px 48px", position: "relative", zIndex: 1 }}>
        <div ref={promiseRef} style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(200px,320px) 1fr", gap: 48 }} className="dg1">
          <div>
            <Eyebrow>Our Promise</Eyebrow>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 46, height: 46, borderRadius: 10, background: "rgba(232,151,26,.12)", color: G, marginTop: 14 }}>
              <Heart size={22} />
            </span>
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
            {PROMISE.map((line) => (
              <li key={line} style={{ display: "flex", gap: 14, alignItems: "flex-start", fontSize: "1rem", color: T.body, lineHeight: 1.7 }}>
                <span style={{ flexShrink: 0, width: 6, height: 6, background: G, borderRadius: "50%", marginTop: 10 }} />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="sp" style={{ background: T.page, padding: "70px 48px", position: "relative", zIndex: 1 }}>
        <div ref={missionRef} style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(200px,320px) 1fr", gap: 48 }} className="dg1">
          <div>
            <Eyebrow>Our Mission</Eyebrow>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 46, height: 46, borderRadius: 10, background: "rgba(232,151,26,.12)", color: G, marginTop: 14 }}>
              <Target size={22} />
            </span>
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
            {MISSION.map((line) => (
              <li key={line} style={{ display: "flex", gap: 14, alignItems: "flex-start", fontSize: "1rem", color: T.body, lineHeight: 1.7 }}>
                <span style={{ flexShrink: 0, width: 6, height: 6, background: G, borderRadius: "50%", marginTop: 10 }} />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 48px", background: T.alt, textAlign: "center", position: "relative", zIndex: 1, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle,rgba(232,151,26,.09) 0%,transparent 65%)", pointerEvents: "none" }} />
        <Rev style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SectionHeading T={T} center>
            Ready to work with <span style={{ color: G }}>certified experts?</span>
          </SectionHeading>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", position: "relative", marginTop: 12 }}>
            <a href="mailto:hello@forfrasolutions.com" className="bgold">Email Us</a>
            <a href="tel:+919711015337" className="bgh" style={{ color: T.text, border: `1px solid ${T.border}` }}>+91 97110 15337</a>
          </div>
        </Rev>
      </section>

      {/* FOOTER */}
      <footer style={{ background: T.footer, borderTop: `1px solid ${T.border}`, padding: "28px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, position: "relative", zIndex: 1 }}>
        <p style={{ color: T.body, fontSize: ".8rem" }}>© 2025 Forfra Solutions. ISO 9001:2015 &amp; ISO 27001:2022 Certified.</p>
      </footer>
    </div>
  );
}
