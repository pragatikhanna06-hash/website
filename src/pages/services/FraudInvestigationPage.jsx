import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck, Scale, Landmark, Briefcase, CheckCircle2, Quote, Building2, FileCheck2, Banknote, Calculator, FileWarning, Bitcoin, Mail, Phone,
} from "lucide-react";
import { useLanguage } from "../LanguageContext";
import Navbar from "../../SiteNavbar";

/* ----------------------------------------------------------------------
   FORFRA SOLUTIONS — FRAUD INVESTIGATION PAGE
   Same brand system as the other service pages: deep navy + gold accent,
   "case file" / evidentiary visual language, radar-scan signature motif.
------------------------------------------------------------------------- */

const COLORS = {
  navyDeep: "#08215C",
  navy: "#0D2F7F",
  navyLight: "#1B4DB8",
  gold: "#F5B400",
  goldSoft: "#FCE29B",
  paper: "#FFFFFF",
  ink: "#33404F",
};

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(.22,.61,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function useCountUp(target, duration = 1400, start) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

function StatCounter({ value, suffix = "", label }) {
  const [ref, visible] = useReveal();
  const val = useCountUp(value, 1500, visible);
  return (
    <div ref={ref} className="fa-stat">
      <div className="fa-stat-num">
        {val}
        {suffix}
      </div>
      <div className="fa-stat-label">{label}</div>
    </div>
  );
}

const SERVICES_META = [
    { n: "01", icon: Banknote },
    { n: "02", icon: Calculator },
    { n: "03", icon: FileWarning },
    { n: "04", icon: Building2 },
    { n: "05", icon: Bitcoin },
  ];

const CLIENT_TYPES_META = [
    { icon: Building2 },
    { icon: Landmark },
    { icon: Briefcase },
    { icon: ShieldCheck },
    { icon: Scale },
    { icon: FileCheck2 },
  ];

function ScanRadar() {
  const Icon = Banknote;
  return (
    <div className="fa-radar" aria-hidden="true">
      <div className="fa-radar-ring r1" />
      <div className="fa-radar-ring r2" />
      <div className="fa-radar-ring r3" />
      <div className="fa-radar-sweep" />
      <div className="fa-radar-core">
        <Icon size={20} />
      </div>
    </div>
  );
}

function Particles({ count = 22 }) {
  // Random particle layout generated once via a lazy useState initializer
  // (not useMemo, whose factory React may legitimately re-run) so it stays
  // a pure render and doesn't reshuffle on re-renders.
  const [particles] = useState(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 2 + Math.random() * 3,
      dur: 9 + Math.random() * 10,
      delay: Math.random() * 10,
      drift: (Math.random() - 0.5) * 60,
    }))
  );
  return (
    <div className="fa-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="fa-particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            "--drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function FraudInvestigationPage() {
  const { t } = useLanguage();
  const sc = t.svcCommon;
  const fi = t.fraudInvestigation;
  const SERVICES = SERVICES_META.map((m, i) => ({ ...m, ...fi.services[i] }));
  const CLIENT_TYPES = CLIENT_TYPES_META.map((m, i) => ({ ...m, label: fi.clientTypes[i] }));
  const WHY_POINTS = fi.whyPoints;

  const [scrollPct, setScrollPct] = useState(0);
  const SignatureIcon = Banknote;

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop || document.body.scrollTop) / ((h.scrollHeight || document.body.scrollHeight) - h.clientHeight);
      setScrollPct(Math.min(1, Math.max(0, pct || 0)) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fa-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; }
        .fa-root {
          --navy-deep: ${COLORS.navyDeep};
          --navy: ${COLORS.navy};
          --navy-light: ${COLORS.navyLight};
          --gold: ${COLORS.gold};
          --gold-soft: ${COLORS.goldSoft};
          --paper: ${COLORS.paper};
          --ink: ${COLORS.ink};
          font-family: 'Inter', -apple-system, sans-serif;
          background: var(--paper);
          color: var(--ink);
          overflow-x: hidden;
        }
        .fa-root h1, .fa-root h2, .fa-root h3, .fa-root .fa-serif {
          font-family: 'Fraunces', Georgia, serif;
        }


        /* ---------- HERO ---------- */
        .fa-hero {
          position: relative; min-height: 92vh;
          background:
            radial-gradient(ellipse 80% 60% at 80% 0%, rgba(216,169,59,0.10), transparent 60%),
            linear-gradient(165deg, #FFFFFF 0%, #EAF5FD 55%, #DBEEFC 100%);
          display:flex; flex-direction:column; justify-content:center;
          padding: 140px 5vw 100px;
          overflow:hidden;
        }
        .fa-hero-grid {
          position:absolute; inset:0; opacity:0.07;
          background-image:
            linear-gradient(rgba(13,47,127,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(13,47,127,0.08) 1px, transparent 1px);
          background-size: 56px 56px;
          animation: fa-grid-drift 40s linear infinite;
        }
        @keyframes fa-grid-drift { from{ background-position: 0 0;} to{ background-position: 280px 280px;} }
        .fa-hero-glow {
          position:absolute; width:620px; height:620px; border-radius:50%;
          background: radial-gradient(circle, rgba(216,169,59,0.16), transparent 70%);
          top:-180px; right:-160px; filter: blur(10px);
          animation: fa-pulse 7s ease-in-out infinite;
        }
        @keyframes fa-pulse { 0%,100%{ transform:scale(1); opacity:0.8;} 50%{ transform:scale(1.12); opacity:1;} }

        .fa-eyebrow {
          display:flex; align-items:center; gap:14px;
          color: var(--navy); font-weight:900;
          font-size: clamp(0.95rem, 1.6vw, 1.3rem) !important;
          text-transform:uppercase; margin-bottom: 18px; max-width: 880px;
        }
        .fa-hero .fa-subhead-oneline {
          color: rgba(51,64,79,0.85); font-size: clamp(1.1rem, 2.4vw, 1.6rem);
          font-weight:700; letter-spacing:-0.01em; text-transform:uppercase;
          max-width:92vw; overflow-wrap:break-word;
          margin: 0 0 22px;
        }
        .fa-hero .fa-subhead-oneline em { color: var(--gold); font-style:normal; }

        .fa-hero p.lede {
          color: rgba(51,64,79,0.85); font-size:1.08rem; max-width:620px; line-height:1.7;
          margin-bottom:38px; animation: fa-fade-up 0.9s 0.22s ease both;
        }
        .fa-hero-actions { display:flex; gap:16px; flex-wrap:wrap; animation: fa-fade-up 0.9s 0.34s ease both; }
        .fa-btn-primary {
          background: var(--gold); color: var(--navy-deep); border:none; padding:15px 30px;
          font-weight:700; border-radius:4px; font-size:14.5px; display:flex; align-items:center; gap:9px;
          cursor:pointer; transition: transform .25s ease, box-shadow .25s ease;
        }
        .fa-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 14px 30px rgba(216,169,59,0.3); }
        .fa-btn-ghost {
          background: transparent; color:#0D2F7F; border:1px solid rgba(13,47,127,0.3);
          padding:15px 28px; border-radius:4px; font-weight:600; font-size:14.5px; cursor:pointer;
          transition: border-color .25s ease, background .25s ease;
        }
        .fa-btn-ghost:hover { border-color: var(--gold); background: rgba(13,47,127,0.04); }

        .fa-hero-stats {
          display:flex; gap:48px; margin-top:64px; flex-wrap:wrap;
          padding-top:36px; border-top:1px solid rgba(13,47,127,0.15);
          animation: fa-fade-up 0.9s 0.46s ease both;
        }
        .fa-stat-num { color:#0D2F7F; font-family:'Fraunces',serif; font-size:2.1rem; font-weight:600; }
        .fa-stat-label { color: rgba(51,64,79,0.65); font-size:12.5px; letter-spacing:0.04em; margin-top:4px; }

        /* ---------- SECTION SHELL ---------- */
        .fa-section { padding: 110px 5vw; position:relative; }
        .fa-section.tight { padding: 80px 5vw; }
        .fa-kicker {
          color: var(--navy-light); font-weight:700; font-size:12.5px; letter-spacing:0.2em;
          text-transform:uppercase; display:flex; align-items:center; gap:10px; margin-bottom:14px;
        }
        .fa-kicker::before { content:''; width:28px; height:2px; background: var(--gold); display:inline-block; }
        .fa-h2 { font-size: clamp(1.9rem, 3.2vw, 2rem); font-weight:600; color: var(--navy-deep); max-width:760px; margin:0 0 18px; line-height:1.15; }
        .fa-sub { color:#5a6072; font-size:1.02rem; line-height:1.75; max-width:640px; }

        /* ---------- INTRO / DEFINITION PANEL ---------- */
        .fa-intro-wrap {
          display:grid; grid-template-columns: 1.1fr 0.9fr; gap:60px; align-items:start;
        }
        .fa-intro-card {
          background: var(--panel-light, #EAF5FD); border-radius: 14px; padding: 38px;
          color: #33404F; position:relative; overflow:hidden;
        }
        .fa-intro-card::before {
          content:'TRACE A'; position:absolute; top:18px; right:22px;
          font-size:11px; letter-spacing:0.18em; color: rgba(216,169,59,0.5); font-weight:700;
        }
        .fa-intro-card h3 { color: var(--gold-soft); font-size:1.3rem; margin: 0 0 14px; font-weight:600; }
        .fa-intro-card p { color: rgba(51,64,79,0.85); line-height:1.8; font-size:0.97rem; }
        .fa-intro-quote {
          margin-top:22px; padding-top:22px; border-top:1px dashed rgba(13,47,127,0.2);
          display:flex; gap:12px; align-items:flex-start;
        }
        .fa-intro-quote svg { color: var(--gold); flex-shrink:0; margin-top:2px; }
        .fa-intro-quote span { font-family:'Fraunces',serif; font-style: italic; color:#0D2F7F; font-size:1.02rem; line-height:1.6; }
        @media (max-width: 920px){ .fa-intro-wrap{ grid-template-columns:1fr; } }

        /* ---------- PROCESS TIMELINE ---------- */
        .fa-process { position:relative; margin-top: 50px; }
        .fa-process-line {
          position:absolute; left:29px; top:14px; bottom:14px; width:2px;
          background: linear-gradient(to bottom, var(--gold), rgba(216,169,59,0.15));
        }
        @media (max-width:720px){ .fa-process-line{ left:23px; } }
        .fa-step {
          display:flex; gap:26px; position:relative; padding-bottom: 46px;
        }
        .fa-step:last-child { padding-bottom:0; }
        .fa-step-badge {
          width:60px; height:60px; border-radius:50%; background:#fff; border:2px solid var(--gold);
          display:flex; align-items:center; justify-content:center; flex-shrink:0; z-index:2;
          color: var(--navy-deep); transition: transform .35s ease, background .35s ease;
        }
        .fa-step:hover .fa-step-badge { transform: scale(1.08) rotate(-4deg); background: var(--gold); color:#fff; }
        @media (max-width:720px){ .fa-step-badge{ width:48px; height:48px; } }
        .fa-step-body { background:#fff; border:1px solid #e7e2d4; border-radius:12px; padding:22px 26px; flex:1;
          box-shadow: 0 2px 10px rgba(14,36,82,0.04); transition: box-shadow .3s ease, transform .3s ease; }
        .fa-step:hover .fa-step-body { box-shadow: 0 14px 32px rgba(14,36,82,0.1); transform: translateY(-3px); }
        .fa-step-num { color: var(--gold); font-family:'Fraunces',serif; font-size:0.8rem; font-weight:700; letter-spacing:0.1em; }
        .fa-step-body h4 { margin: 4px 0 8px; font-size:1.16rem; color: var(--navy-deep); font-weight:600; font-family:'Fraunces',serif;}
        .fa-step-body p { margin:0; color:#5b6074; font-size:0.94rem; line-height:1.65; }

        /* ---------- WHY GRID ---------- */
        .fa-why {
          background: linear-gradient(180deg, #fff, var(--paper));
        }
        .fa-why-grid { display:grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 40px; }
        @media (max-width:780px){ .fa-why-grid{ grid-template-columns:1fr; } }
        .fa-why-item {
          display:flex; gap:14px; align-items:flex-start; background:#fff; border:1px solid #e7e2d4;
          border-radius:10px; padding:20px 22px; transition: border-color .3s ease, transform .3s ease;
        }
        .fa-why-item:hover { border-color: var(--gold); transform: translateX(4px); }
        .fa-why-item svg { color: var(--gold); flex-shrink:0; margin-top:2px; }
        .fa-why-item p { margin:0; font-size:0.95rem; color: var(--ink); font-weight:500; line-height:1.55; }

        /* ---------- CLIENTS ---------- */
        .fa-industries-band { background: var(--panel-light, #EAF5FD); position:relative; overflow:hidden; }
        .fa-industries-band::before {
          content:''; position:absolute; inset:0; opacity:0.05;
          background-image: repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 18px);
        }
        .fa-ind-head { position:relative; z-index:1; }
        .fa-ind-head .fa-kicker { color: #0D2F7F; font-size: 1.45rem !important; }
        .fa-ind-head .fa-h2 { color:#0D2F7F; }
        .fa-ind-head .fa-sub { color: rgba(51,64,79,0.7); }
        .fa-ind-grid {
          position:relative; z-index:1; display:grid; grid-template-columns: repeat(3, 1fr); gap:18px; margin-top:44px;
        }
        @media (max-width:980px){ .fa-ind-grid{ grid-template-columns: repeat(2,1fr); } }
        @media (max-width:620px){ .fa-ind-grid{ grid-template-columns: 1fr; } }
        .fa-ind-card {
          background: rgba(13,47,127,0.04); border:1px solid rgba(13,47,127,0.12);
          border-radius:10px; padding:26px 22px; text-align:left; display:flex; gap:14px; align-items:flex-start;
          transition: background .3s ease, border-color .3s ease, transform .3s ease;
        }
        .fa-ind-card:hover { background: rgba(216,169,59,0.1); border-color: var(--gold); transform: translateY(-5px); }
        .fa-ind-card svg { color: var(--navy); flex-shrink:0; margin-top:2px; }
        .fa-ind-card span.fa-ind-label { color: rgba(51,64,79,0.85); font-size:0.92rem; font-weight:500; line-height:1.45; display:block; }

        /* ---------- CTA ---------- */
        .fa-cta {
          background: linear-gradient(120deg, #EAF5FD 0%, #DBEEFC 100%);
          border-radius: 18px; margin: 70px 5vw 110px; padding: 64px 6vw;
          display:flex; justify-content:space-between; align-items:center; gap:40px; flex-wrap:wrap;
          position:relative; overflow:hidden;
        }
        .fa-cta::after {
          content:''; position:absolute; width:340px; height:340px; border-radius:50%;
          background: radial-gradient(circle, rgba(216,169,59,0.22), transparent 70%);
          right:-100px; top:-120px;
        }
        .fa-cta h3 { color:#0D2F7F; font-size: clamp(1.5rem, 2.6vw, 2rem); margin:0 0 10px; max-width:480px; position:relative; z-index:1;}
        .fa-cta p { color: rgba(51,64,79,0.75); margin:0; max-width:440px; position:relative; z-index:1; }
        .fa-cta-actions { display:flex; gap:14px; flex-wrap:wrap; position:relative; z-index:1; }
        .fa-cta-contact { display:flex; flex-direction:column; gap:8px; color: rgba(51,64,79,0.9); font-size:0.92rem; }
        .fa-cta-contact a { color:#0D2F7F; text-decoration:none; display:flex; align-items:center; gap:8px; }
        .fa-cta-contact a:hover { color: var(--gold-soft); }

        /* ---------- FOOTER ---------- */
        .fa-footer { background: var(--panel-light, #EAF5FD); color: rgba(51,64,79,0.7); padding: 30px 5vw; text-align:center; font-size:0.82rem; }
        .fa-footer b { color: var(--gold-soft); }

        /* ---------- SCROLL PROGRESS ---------- */
        .fa-progress {
          position: fixed; top:0; left:0; right:0; height:3px; z-index:1001;
          background: linear-gradient(90deg, var(--gold), var(--gold-soft));
          transform-origin: left; transform: scaleX(0);
          box-shadow: 0 0 12px rgba(216,169,59,0.6);
        }

        .fa-spin-slow { animation: fa-spin 5s linear infinite; }
        @keyframes fa-spin { to { transform: rotate(360deg); } }

        /* ---------- PARTICLES ---------- */
        .fa-particles { position:absolute; inset:0; overflow:hidden; pointer-events:none; z-index:0; }
        .fa-particle {
          position:absolute; bottom:-20px; border-radius:50%;
          background: radial-gradient(circle, rgba(216,169,59,0.9), rgba(216,169,59,0));
          animation: fa-float-up linear infinite;
          opacity:0;
        }
        @keyframes fa-float-up {
          0% { transform: translate(0,0) scale(0.6); opacity:0; }
          10% { opacity:0.9; }
          90% { opacity:0.5; }
          100% { transform: translate(var(--drift), -780px) scale(1.1); opacity:0; }
        }

        /* ---------- RADAR / SCAN SIGNATURE ---------- */
        .fa-radar {
          position:absolute; right:6vw; top:50%; transform: translateY(-50%);
          width: 280px; height: 280px; display:flex; align-items:center; justify-content:center;
          z-index:0; opacity:0.9;
        }
        @media (max-width: 1080px){ .fa-radar{ display:none; } }
        .fa-radar-ring {
          position:absolute; border-radius:50%; border:1px solid rgba(216,169,59,0.35);
        }
        .fa-radar-ring.r1 { width:100%; height:100%; animation: fa-ring-pulse 3.2s ease-out infinite; }
        .fa-radar-ring.r2 { width:70%; height:70%; animation: fa-ring-pulse 3.2s ease-out infinite 1s; }
        .fa-radar-ring.r3 { width:40%; height:40%; animation: fa-ring-pulse 3.2s ease-out infinite 2s; }
        @keyframes fa-ring-pulse {
          0% { transform: scale(0.6); opacity:0; }
          30% { opacity:0.8; }
          100% { transform: scale(1.15); opacity:0; }
        }
        .fa-radar-sweep {
          position:absolute; width:100%; height:100%; border-radius:50%;
          background: conic-gradient(from 0deg, rgba(216,169,59,0.55), transparent 28%);
          animation: fa-rotate 4.5s linear infinite;
          -webkit-mask: radial-gradient(circle, transparent 0, transparent 0, #000 1px, #000 100%);
        }
        @keyframes fa-rotate { to { transform: rotate(360deg); } }
        .fa-radar-core {
          position:relative; width:54px; height:54px; border-radius:50%;
          background: var(--navy-deep); border:2px solid var(--gold);
          display:flex; align-items:center; justify-content:center; color: var(--gold);
          box-shadow: 0 0 26px rgba(216,169,59,0.5);
          animation: fa-core-pulse 2.6s ease-in-out infinite;
        }
        @keyframes fa-core-pulse {
          0%,100% { box-shadow: 0 0 18px rgba(216,169,59,0.35); }
          50% { box-shadow: 0 0 34px rgba(216,169,59,0.7); }
        }

        /* ---------- GLOW-TRACE BORDER (cards) ---------- */
        .fa-glow-card { position:relative; }
        .fa-glow-card::before {
          content:''; position:absolute; inset:-1.5px; border-radius:inherit; padding:1.5px;
          background: conic-gradient(from var(--ang,0deg), transparent 0 70%, var(--gold) 85%, transparent 100%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          opacity:0; transition: opacity .35s ease;
          animation: fa-rotate-ang 3.2s linear infinite paused;
          pointer-events:none;
        }
        .fa-glow-card:hover::before { opacity:1; animation-play-state: running; }
        @property --ang { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
        @keyframes fa-rotate-ang { to { --ang: 360deg; } }

        /* ---------- TRAVELING PULSE ON PROCESS LINE ---------- */
        .fa-process-line::after {
          content:''; position:absolute; left:50%; top:0; width:9px; height:9px; margin-left:-4.5px;
          border-radius:50%; background: var(--gold);
          box-shadow: 0 0 14px 4px rgba(216,169,59,0.7);
          animation: fa-travel 4s ease-in-out infinite;
        }
        @keyframes fa-travel {
          0% { top:0; opacity:0; }
          8% { opacity:1; }
          92% { opacity:1; }
          100% { top:100%; opacity:0; }
        }

        /* ---------- SHIMMER SWEEP (client cards) ---------- */
        .fa-ind-card { position:relative; overflow:hidden; }
        .fa-ind-card .fa-shimmer {
          position:absolute; top:0; left:-60%; width:50%; height:100%;
          background: linear-gradient(100deg, transparent, rgba(13,47,127,0.1), transparent);
          transform: skewX(-18deg);
        }
        .fa-ind-card:hover .fa-shimmer { animation: fa-shimmer-sweep 0.9s ease; }
        @keyframes fa-shimmer-sweep { from { left:-60%; } to { left:120%; } }

        /* ---------- KPI marquee ---------- */
        .fa-marquee-wrap { overflow:hidden; border-top:1px solid #e7e2d4; border-bottom:1px solid #e7e2d4; background:#fff; }
        .fa-marquee-track { display:flex; gap:64px; width:max-content; padding:18px 0; animation: fa-marquee 22s linear infinite; }
        .fa-marquee-track span { display:flex; align-items:center; gap:10px; color: var(--navy); font-weight:600; font-size:0.85rem; letter-spacing:0.04em; white-space:nowrap; }
        .fa-marquee-track span svg { color: var(--gold); }
        @keyframes fa-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ---------- CTA pulse rings ---------- */
        .fa-cta-pulse { position:absolute; left:-60px; bottom:-80px; width:220px; height:220px; border-radius:50%;
          border: 1px solid rgba(216,169,59,0.3); }
        .fa-cta-pulse.p2 { width:160px; height:160px; left:-40px; bottom:-50px; animation: fa-ring-pulse 3.6s ease-out infinite 0.8s; }
        .fa-cta-pulse.p1 { animation: fa-ring-pulse 3.6s ease-out infinite; }

        /* ---------- SIGNATURE CORNER ICON ---------- */
        .fa-gavel-strike {
          position:absolute; left:6vw; bottom:8%; width:120px; height:120px; z-index:0;
          opacity:0.85; pointer-events:none;
        }
        @media (max-width: 1080px){ .fa-gavel-strike{ display:none; } }
        .fa-gavel-strike svg { color: var(--gold); filter: drop-shadow(0 0 14px rgba(216,169,59,0.45)); width:64px; height:64px; }
        .fa-gavel-icon { animation: fa-gavel-tap 3.4s ease-in-out infinite; transform-origin: 30% 30%; }
        @keyframes fa-gavel-tap {
          0%, 70%, 100% { transform: rotate(0deg); }
          76% { transform: rotate(-26deg); }
          82% { transform: rotate(4deg); }
          86% { transform: rotate(-8deg); }
          90% { transform: rotate(0deg); }
        }
        .fa-gavel-ring {
          position:absolute; left:18px; bottom:6px; width:42px; height:10px; border-radius:50%;
          border: 1.5px solid rgba(216,169,59,0.5); opacity:0;
          animation: fa-gavel-ripple 3.4s ease-in-out infinite;
        }
        @keyframes fa-gavel-ripple {
          0%, 78% { opacity:0; transform: scale(0.4); }
          84% { opacity:0.9; transform: scale(1); }
          100% { opacity:0; transform: scale(1.8); }
        }

        @media (prefers-reduced-motion: reduce) {
          .fa-hero-grid, .fa-hero-glow { animation: none; }
          .fa-particle, .fa-radar-sweep, .fa-radar-ring, .fa-radar-core, .fa-process-line::after,
          .fa-marquee-track, .fa-spin-slow, .fa-glow-card::before, .fa-gavel-icon, .fa-gavel-ring { animation: none !important; }
        }
      `}</style>

      {/* SCROLL PROGRESS */}
      <div className="fa-progress" style={{ transform: `scaleX(${scrollPct / 100})` }} />

      <Navbar showHome />

      {/* HERO */}
      <header className="fa-hero">
        <div className="fa-hero-grid" />
        <div className="fa-hero-glow" />
        <Particles count={24} />
        <ScanRadar />
        <div className="fa-gavel-strike">
          <div className="fa-gavel-ring" />
          <SignatureIcon className="fa-gavel-icon" />
        </div>
        <h1 className="fa-eyebrow">
          <SignatureIcon size={14} className="fa-spin-slow" /> {fi.heroEyebrow}
        </h1>
        <p className="fa-subhead-oneline">
          {fi.heroTitle1} {fi.heroTitle2}<em>{fi.heroTitle3}</em>{fi.heroTitle4}
        </p>
        <p className="lede">
          {fi.heroLede}
        </p>
        <div className="fa-hero-stats">
          <StatCounter value={5} suffix="" label={fi.stats[0].label} />
          <StatCounter value={6} suffix="" label={fi.stats[1].label} />
          <StatCounter value={100} suffix="%" label={fi.stats[2].label} />
        </div>
      </header>

      {/* INTRO */}
      <section className="fa-section" id="about">
        <Reveal>
          <div className="fa-kicker">{fi.introKicker}</div>
          <h2 className="fa-h2">{fi.introHeading}</h2>
        </Reveal>
        <div className="fa-intro-wrap" style={{ marginTop: 40 }}>
          <Reveal delay={80}>
            <p className="fa-sub" style={{ fontSize: "1.05rem" }}>
              {fi.introP1}
            </p>
            <p className="fa-sub" style={{ marginTop: 18 }}>
              {fi.introP2}
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="fa-intro-card fa-glow-card">
              <h3>{fi.introCardTitle}</h3>
              <p>
                {fi.introCardBody}
              </p>
              <div className="fa-intro-quote">
                <Quote size={20} />
                <span>{fi.introQuote}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="fa-section tight" id="services" style={{ background: "#fff" }}>
        <Reveal>
          <div className="fa-kicker">{fi.servicesKicker}</div>
          <h2 className="fa-h2">{fi.servicesHeading}</h2>
          <p className="fa-sub">
            {fi.servicesSub}
          </p>
        </Reveal>
        <div className="fa-process">
          <div className="fa-process-line" />
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.n} delay={i * 90}>
                <div className="fa-step">
                  <div className="fa-step-badge">
                    <Icon size={24} />
                  </div>
                  <div className="fa-step-body fa-glow-card">
                    <span className="fa-step-num">{fi.protocolLabel} {s.n}</span>
                    <h4>{s.title}</h4>
                    <p>{s.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* WHY US */}
      <section className="fa-section fa-why" id="why">
        <Reveal>
          <div className="fa-kicker">{fi.whyKicker}</div>
          <h2 className="fa-h2">{fi.whyHeading}</h2>
          <p className="fa-sub">
            {fi.whySub}
          </p>
        </Reveal>
        <div className="fa-why-grid">
          {WHY_POINTS.map((p, i) => (
            <Reveal key={p} delay={i * 90}>
              <div className="fa-why-item">
                <CheckCircle2 size={20} />
                <p>{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CLIENTS */}
      <section className="fa-section fa-industries-band" id="clients">
        <div className="fa-ind-head">
          <Reveal>
            <div className="fa-kicker">{fi.clientsKicker}</div>
            <h2 className="fa-h2">{fi.clientsHeading}</h2>
            <p className="fa-sub">
              {fi.clientsSub}
            </p>
          </Reveal>
        </div>
        <div className="fa-ind-grid">
          {CLIENT_TYPES.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.label} delay={i * 70}>
                <div className="fa-ind-card">
                  <span className="fa-shimmer" />
                  <Icon size={24} />
                  <span className="fa-ind-label">{c.label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <Reveal>
        <section className="fa-cta" id="contact">
          <div className="fa-cta-pulse p1" />
          <div className="fa-cta-pulse p2" />
          <div>
            <h3>{fi.ctaTitle}</h3>
            <p>
              {fi.ctaBody}
            </p>
          </div>
          <div className="fa-cta-actions">
            <div className="fa-cta-contact">
              <a href="mailto:hello@forfrasolutions.com"><Mail size={16} /> hello@forfrasolutions.com</a>
              <a href="tel:+919711015337"><Phone size={16} /> +91 97110 15337</a>
              <a href="tel:+918982307608"><Phone size={16} /> +91 89823 07608</a>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FOOTER */}
      <footer className="fa-footer">
        © {new Date().getFullYear()} <b>FORFRA SOLUTIONS</b> — {sc.footer}
      </footer>
    </div>
  );
}
