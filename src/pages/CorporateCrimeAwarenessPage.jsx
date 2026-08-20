import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck, Mail, MessageSquareWarning, UserX, Scale, HeartHandshake,
  BookOpenCheck, Presentation, ClipboardCheck, ArrowLeft,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════
   CORPORATE CRIME AWARENESS PROGRAM
   Standalone page — content adapted from Forfra Solutions' own
   Corporate Crime Awareness Program page.
══════════════════════════════════════════════════════════════════ */

const G = "#F5B400";
const BG = "#FFFFFF";
const PANEL = "#EAF5FD";
const BORD = "rgba(13,47,127,0.12)";
const BODY = "rgba(51,64,79,0.85)";

const LEARN = [
  { icon: ShieldCheck, title: "Fintech & Corporate Frauds", body: "Payment gateway scams, fake invoicing, and money mule networks." },
  { icon: Mail, title: "Digital Exploitation", body: "Business Email Compromise (BEC), phishing, and impersonation attacks." },
  { icon: UserX, title: "Internal Threats", body: "Insider data theft, policy misuse, and weak compliance systems." },
  { icon: Scale, title: "Legal Frameworks", body: "IT Act, IPC provisions, and internal reporting obligations." },
  { icon: HeartHandshake, title: "Workplace Safety", body: "POSH Act guidelines, employee rights, and prevention mechanisms." },
];

const HIGHLIGHTS = [
  "Real case studies of corporate & fintech crimes in India",
  "How scams, phishing, and impersonation attacks unfold",
  "Data security & insider threat prevention",
  "Legal awareness under IT & corporate laws",
  "Workplace safety and POSH compliance",
];

const DELIVERY = [
  { icon: Presentation, title: "Expert-Led Sessions", body: "Interactive sessions run by certified forensic and cyber-risk experts." },
  { icon: MessageSquareWarning, title: "Visual Case Breakdowns", body: "Real-world case walkthroughs and simulations that make risks tangible." },
  { icon: ClipboardCheck, title: "Tailored Checklists", body: "Custom risk checklists and compliance recommendations for your team." },
];

export default function CorporateCrimeAwarenessPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#33404F", fontFamily: "'Inter',sans-serif" }}>
      <style>{`@media(max-width:760px){ .cca-deliver-grid{ grid-template-columns:1fr !important; } }`}</style>
      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(234,245,253,.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${BORD}`, padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "#0D2F7F", textDecoration: "none", fontWeight: 700, letterSpacing: 1 }}>
          <ArrowLeft size={18} color={G} /> Back to Home
        </Link>
        <Link to="/services" style={{ color: G, textDecoration: "none", fontSize: ".85rem", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
          All Services
        </Link>
      </nav>

      {/* HERO */}
      <section style={{ padding: "90px 32px 70px", textAlign: "center", background: `linear-gradient(160deg, #FFFFFF 0%, #EAF5FD 60%, #DBEEFC 100%)` }}>
        <span style={{ display: "inline-block", border: `1px solid rgba(232,151,26,.5)`, color: G, fontSize: ".75rem", fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", padding: "7px 20px", borderRadius: 20, marginBottom: 26 }}>
          Awareness Program
        </span>
        <h1 style={{ fontWeight: 900, fontSize: "clamp(2.4rem,6vw,4.2rem)", lineHeight: 1.05, textTransform: "uppercase", margin: "0 0 20px" }}>
          Corporate Crime <span style={{ color: G }}>Awareness Program</span>
        </h1>
        <p style={{ maxWidth: 680, margin: "0 auto", color: BODY, fontSize: "1.05rem", lineHeight: 1.75 }}>
          In the digital era, one careless click or misplaced trust can cost a company millions. Our program is
          designed to protect organizations from fintech frauds, insider scams, cyber threats, and workplace
          misconduct through real-world education and proactive defence training.
        </p>
        <p style={{ maxWidth: 680, margin: "16px auto 0", color: BODY, fontSize: ".95rem", lineHeight: 1.7 }}>
          Delivered by certified forensic and cyber-risk experts, these sessions transform employees into your
          first line of defence — alert, informed, and legally aware.
        </p>
        
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section style={{ padding: "80px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ fontWeight: 900, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", textTransform: "uppercase", marginBottom: 40, textAlign: "center" }}>
          What You'll <span style={{ color: G }}>Learn</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {LEARN.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} style={{ background: PANEL, border: `1px solid ${BORD}`, borderRadius: 12, padding: "28px 24px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 10, background: "rgba(232,151,26,.12)", color: G, marginBottom: 16 }}>
                  <Icon size={20} />
                </span>
                <h3 style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: 10, textTransform: "uppercase" }}>{item.title}</h3>
                <p style={{ color: BODY, fontSize: ".9rem", lineHeight: 1.6 }}>{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* KEY HIGHLIGHTS */}
      <section style={{ padding: "80px 32px", background: PANEL }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", textTransform: "uppercase", marginBottom: 32, textAlign: "center" }}>
            Key <span style={{ color: G }}>Highlights</span>
          </h2>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
            {HIGHLIGHTS.map((h) => (
              <li key={h} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: ".98rem", color: BODY, lineHeight: 1.6 }}>
                <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: "50%", background: G, marginTop: 8 }} />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW WE DELIVER */}
      <section style={{ padding: "80px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ fontWeight: 900, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", textTransform: "uppercase", marginBottom: 40, textAlign: "center" }}>
          How We <span style={{ color: G }}>Deliver</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", marginBottom: 48 }} className="cca-deliver-grid">
          
          <p style={{ color: BODY, fontSize: "1rem", lineHeight: 1.8 }}>
            Every session is built around your organization's real risk profile — not a generic slideshow.
            We sit down with your leadership team first, understand where the exposure actually is, and design
            a session that leaves employees with practical habits, not just awareness.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {DELIVERY.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} style={{ background: PANEL, border: `1px solid ${BORD}`, borderRadius: 12, padding: "28px 24px", textAlign: "center" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: "rgba(232,151,26,.12)", color: G, marginBottom: 16 }}>
                  <Icon size={22} />
                </span>
                <h3 style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: 10, textTransform: "uppercase" }}>{item.title}</h3>
                <p style={{ color: BODY, fontSize: ".9rem", lineHeight: 1.6 }}>{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "90px 32px", textAlign: "center", background: `linear-gradient(160deg, #EAF5FD 0%, #FFFFFF 100%)` }}>
        <h2 style={{ fontWeight: 900, fontSize: "clamp(2rem,4.5vw,3.2rem)", textTransform: "uppercase", marginBottom: 18 }}>
          Bring This Program <span style={{ color: G }}>To Your Team</span>
        </h2>
        <p style={{ color: BODY, maxWidth: 520, margin: "0 auto 32px", fontSize: ".95rem", lineHeight: 1.7 }}>
          Reach out to schedule a session for your organization — tailored, practical, and delivered by certified experts.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:hello@forfrasolutions.com" style={{ background: G, color: "#000", fontWeight: 800, fontSize: ".9rem", letterSpacing: 1, textTransform: "uppercase", padding: "14px 32px", borderRadius: 6, textDecoration: "none" }}>Email Us</a>
          <a href="tel:+919711015337" style={{ background: "transparent", color: "#0D2F7F", border: "1px solid rgba(13,47,127,.3)", fontWeight: 700, fontSize: ".9rem", letterSpacing: 1, textTransform: "uppercase", padding: "14px 32px", borderRadius: 6, textDecoration: "none" }}>+91 97110 15337</a>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${BORD}`, padding: "24px 32px", textAlign: "center", color: "rgba(51,64,79,.6)", fontSize: ".8rem" }}>
        © 2025 Forfra Solutions. ISO 9001:2015 &amp; ISO 27001:2022 Certified.
      </footer>
    </div>
  );
}
