import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import LangToggle from "./LangToggle";
import {
  Microscope, Smartphone, Siren, Sparkles, ShieldCheck, Users, ArrowLeft,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════
   SCHOOL CRIME AWARENESS
   Standalone page — content adapted from Forfra Solutions' own
   School Counselling program page.
══════════════════════════════════════════════════════════════════ */

const G = "#F5B400";
const BG = "#FFFFFF";
const PANEL = "#EAF5FD";
const BORD = "rgba(13,47,127,0.12)";
const BODY = "rgba(51,64,79,0.85)";

const WHY_US = [
  { icon: Sparkles, title: "Practical & Interactive", body: "Activities, games, and real-life examples that keep students engaged." },
  { icon: ShieldCheck, title: "Awareness With Safety", body: "We educate without spreading fear or negativity." },
  { icon: Users, title: "Expert Trainers", body: "Sessions conducted by professionals who work with law enforcement agencies." },
  { icon: Sparkles, title: "Student Empowerment", body: "Builds confidence, awareness, and future career interest." },
];

const MISSION = [
  "Teach juvenile laws and important helpline resources",
  "Inspire students to become confident, vigilant, and proactive citizens",
  "Encourage informed decision-making and standing against injustice",
  "Build a safer, smarter, and just society by spreading awareness today",
];

const SESSIONS = [
  {
    icon: Microscope,
    title: "Forensic Science & Career Opportunities",
    sub: "Unlock the Secrets of Forensics",
    body: "Students discover how forensic science solves real-life mysteries — from digital forensics and biology to handwriting analysis, chemistry, and ballistics. Interactive case studies and hands-on activities like fingerprint collection make learning fun and engaging.",
  },
  {
    icon: Smartphone,
    title: "Cyber Crime & Awareness",
    sub: "Stay Smart, Safe & Informed in the Digital World",
    body: "Students are constantly connected through mobiles, social media, and online games. Our sessions help them recognize online fraud, cyberbullying, identity theft, deepfakes, and fake websites or emails — with legal insights and practical tips to navigate the online world responsibly.",
  },
  {
    icon: Siren,
    title: "Crime Scene Management",
    sub: "Building Safer Minds: Crime Awareness & Prevention",
    body: "Covers why people commit crimes, juvenile justice laws, suicide prevention, and the basics of crime scene investigation — helping students understand their legal rights, public responsibilities, and how to act wisely in critical situations.",
  },
];

export default function SchoolCrimeAwarenessPage() {
  const { tr } = useLanguage();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#33404F", fontFamily: "'Inter',sans-serif" }}>
      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(234,245,253,.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${BORD}`, padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "#0D2F7F", textDecoration: "none", fontWeight: 700, letterSpacing: 1 }}>
          <ArrowLeft size={18} color={G} /> {tr("Back")}
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LangToggle light />
          <Link to="/services" style={{ background: G, color: "#000", textDecoration: "none", fontSize: ".8rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "10px 20px", borderRadius: 6 }}>
            {tr("View All Services")}
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "90px 32px 70px", textAlign: "center", background: `linear-gradient(160deg, #FFFFFF 0%, #EAF5FD 60%, #DBEEFC 100%)` }}>
        <span style={{ display: "inline-block", border: `1px solid rgba(232,151,26,.5)`, color: G, fontSize: ".75rem", fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", padding: "7px 20px", borderRadius: 20, marginBottom: 26 }}>
          {tr("Awareness Program")}
        </span>
        <h1 style={{ fontWeight: 900, fontSize: "2rem", lineHeight: 1.05, textTransform: "uppercase", margin: "0 0 20px" }}>
          {tr("Crime Awareness")} <span style={{ color: G }}>{tr("for Students")}</span>
        </h1>
        <p style={{ maxWidth: 680, margin: "0 auto", color: BODY, fontSize: "1.05rem", lineHeight: 1.75 }}>
          {tr("We don't just teach about crimes — we teach how to stay safe, smart, and responsible. Our mission is to empower young minds with awareness, skills, and opportunities in forensic science and cyber safety.")}
        </p>
        
      </section>

      {/* WHY SCHOOLS CHOOSE US */}
      <section style={{ padding: "80px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ fontWeight: 900, fontSize: "clamp(1.6rem, 3.1vw, 2rem)", textTransform: "uppercase", marginBottom: 40, textAlign: "center" }}>
          {tr("Why Schools")} <span style={{ color: G }}>{tr("Choose Us")}</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {WHY_US.map((item) => {
            const Icon = item.icon;
            return (
              <div key={tr(item.title)} style={{ background: PANEL, border: `1px solid ${BORD}`, borderRadius: 12, padding: "28px 24px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 10, background: "rgba(232,151,26,.12)", color: G, marginBottom: 16 }}>
                  <Icon size={20} />
                </span>
                <h3 style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: 10, textTransform: "uppercase" }}>{tr(item.title)}</h3>
                <p style={{ color: BODY, fontSize: ".9rem", lineHeight: 1.6 }}>{tr(item.body)}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* OUR MISSION */}
      <section style={{ padding: "80px 32px", background: PANEL }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(1.6rem, 3.1vw, 2rem)", textTransform: "uppercase", marginBottom: 32, textAlign: "center" }}>
            {tr("Our")} <span style={{ color: G }}>{tr("Mission")}</span>
          </h2>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
            {MISSION.map((m) => (
              <li key={m} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: ".98rem", color: BODY, lineHeight: 1.6 }}>
                <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: "50%", background: G, marginTop: 8 }} />
                {tr(m)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COUNSELLING SESSIONS */}
      <section style={{ padding: "80px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontWeight: 900, fontSize: "clamp(1.6rem, 3.1vw, 2rem)", textTransform: "uppercase", marginBottom: 40, textAlign: "center" }}>
          {tr("Counselling")} <span style={{ color: G }}>{tr("Sessions")}</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {SESSIONS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={tr(s.title)} style={{ background: PANEL, border: `1px solid ${BORD}`, borderRadius: 12, padding: "30px 28px", display: "flex", gap: 20, alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: 12, background: "rgba(232,151,26,.12)", color: G }}>
                  <Icon size={24} />
                </span>
                <div>
                  <span style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: G, display: "block", marginBottom: 6 }}>{tr(s.title)}</span>
                  <h3 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: 10 }}>{tr(s.sub)}</h3>
                  <p style={{ color: BODY, fontSize: ".92rem", lineHeight: 1.7 }}>{tr(s.body)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "90px 32px", textAlign: "center", background: `linear-gradient(160deg, #EAF5FD 0%, #FFFFFF 100%)` }}>
        <h2 style={{ fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2rem)", textTransform: "uppercase", marginBottom: 18 }}>
          {tr("Bring This Program")} <span style={{ color: G }}>{tr("To Your School")}</span>
        </h2>
        <p style={{ color: BODY, maxWidth: 520, margin: "0 auto 32px", fontSize: ".95rem", lineHeight: 1.7 }}>
          {tr("Reach out to schedule a session for your students — practical, safe, and delivered by certified experts.")}
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:hello@forfrasolutions.com" style={{ background: G, color: "#000", fontWeight: 800, fontSize: ".9rem", letterSpacing: 1, textTransform: "uppercase", padding: "14px 32px", borderRadius: 6, textDecoration: "none" }}>{tr("Email Us")}</a>
          <a href="tel:+919711015337" style={{ background: "transparent", color: "#0D2F7F", border: "1px solid rgba(13,47,127,.3)", fontWeight: 700, fontSize: ".9rem", letterSpacing: 1, textTransform: "uppercase", padding: "14px 32px", borderRadius: 6, textDecoration: "none" }}>+91 97110 15337</a>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${BORD}`, padding: "24px 32px", textAlign: "center", color: "rgba(51,64,79,.6)", fontSize: ".8rem" }}>
        {tr("© 2025 Forfra Solutions. ISO 9001:2015 & ISO 27001:2022 Certified.")}
      </footer>
    </div>
  );
}
