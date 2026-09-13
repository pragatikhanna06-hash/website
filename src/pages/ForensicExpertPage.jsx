import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, FileSearch, FileCheck2 } from "lucide-react";
import "./ForensicExpertPage.css";
import { sendFormToWhatsApp } from "../utils/whatsapp";
import { useLanguage } from "./LanguageContext";
import LangToggle from "./LangToggle";

const EXPERT_POOL = [
  "Dr. A. Krishnan — Digital Forensics Examiner",
  "Dr. L. Fernandes — Digital Forensics Examiner",
  "Dr. P. Bhatt — Physical Evidence Examiner",
  "Dr. S. Reddy — Physical Evidence Examiner",
];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export default function ForensicExpertPage() {
  const { tr } = useLanguage();
  const [evidenceType, setEvidenceType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [crimeLocation, setCrimeLocation] = useState("");
  const [firNumber, setFirNumber] = useState("");
  const [caseDoc, setCaseDoc] = useState(null);
  const [notes, setNotes] = useState("");
  const [match, setMatch] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!evidenceType) return;
    // DEMO ONLY — replace with a real matching API call.
    const seed = hashString(name + email + phone + evidenceType);
    const newMatch = {
      expert: EXPERT_POOL[seed % EXPERT_POOL.length],
      etaHours: 2 + (seed % 8),
      bookingId: "NS-FX-" + String(seed % 100000).padStart(5, "0"),
    };
    setMatch(newMatch);

    sendFormToWhatsApp("Forensic Expert Booking — NyayShield", [
      ["Evidence Type", evidenceType],
      ["Name", name],
      ["Email", email],
      ["Phone Number", phone],
      ["Address", address],
      ["Location of Crime", crimeLocation],
      ["FIR Number", firNumber],
      ["Case Document", caseDoc ? caseDoc.name + " (please attach this file in the chat)" : ""],
      ["Notes", notes],
      ["Booking ID", newMatch.bookingId],
    ]);
  };

  return (
    <div className="home-root">
      <nav className="topbar">
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div className="brand">
            <svg className="brand-mark" viewBox="0 0 48 48" fill="none">
              <path d="M24 4L6 12v10c0 11 7.6 19.6 18 22 10.4-2.4 18-11 18-22V12L24 4z" stroke="#c9a227" strokeWidth="2" fill="rgba(201,162,39,0.08)" />
              <path d="M24 14v20M17 20l7-4 7 4M17 20c0 3-2 6-4 6h8c-2 0-4-3-4-6M31 20c0 3-2 6-4 6h8c-2 0-4-3-4-6" stroke="#c9a227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="brand-name">Nyay<span>Shield</span></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link className="back-link" to="/">{tr("← Back")}</Link>
            <LangToggle />
          </div>
        </div>
      </nav>

      <section className="page-hero">
        <div className="wrap fx-hero-grid">
          <div>
            <div className="eyebrow">{tr("Forensic Services")}</div>
            <h1>{tr("Evidence fades fast —")} <em>{tr("secure it before it does.")}</em></h1>
            <p>{tr("Certified forensic experts document and preserve digital and physical evidence so it holds up in court, however long the case takes to conclude.")}</p>
          </div>
          
        </div>
      </section>

      <section className="page-body">
        <div className="wrap">
          <div className="evidence-timeline">
            <div className="et-track">
              <div className="et-scan" />
              <div className="et-stop">
                <div className="et-dot"><ShieldCheck size={20} /></div>
                <h4>{tr("Secure")}</h4>
                <p>{tr("Evidence is collected and sealed before it degrades or gets tampered with.")}</p>
              </div>
              <div className="et-stop">
                <div className="et-dot"><FileSearch size={20} /></div>
                <h4>{tr("Analyze")}</h4>
                <p>{tr("Certified examiners document chain of custody and findings.")}</p>
              </div>
              <div className="et-stop">
                <div className="et-dot"><FileCheck2 size={20} /></div>
                <h4>{tr("Court-Ready Report")}</h4>
                <p>{tr("A formal report your lawyer can submit directly as evidence.")}</p>
              </div>
            </div>
          </div>

          <div className="booking-grid">
            <form className="report-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="evType">{tr("Type of Evidence")}</label>
                <select id="evType" required value={evidenceType} onChange={(e) => setEvidenceType(e.target.value)}>
                  <option value="" disabled>{tr("Select what needs to be examined")}</option>
                  <option value="digital">{tr("Digital (phone, laptop, accounts)")}</option>
                  <option value="physical">{tr("Physical (objects, documents, scene)")}</option>
                  <option value="medical">{tr("Medical / Biological")}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="fxname">{tr("Your Name")}</label>
                <input id="fxname" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder={tr("Full name")} />
              </div>
              <div className="field">
                <label htmlFor="fxemail">{tr("Email")}</label>
                <input id="fxemail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={tr("you@example.com")} />
              </div>
              <div className="field">
                <label htmlFor="fxphone">{tr("Phone Number")}</label>
                <input id="fxphone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={tr("How can we reach you?")} />
              </div>
              <div className="field">
                <label htmlFor="fxaddress">{tr("Address")}</label>
                <input id="fxaddress" type="text" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder={tr("Your current address")} />
              </div>
              <div className="field">
                <label htmlFor="fxlocation">{tr("Location of Crime")}</label>
                <input id="fxlocation" type="text" required value={crimeLocation} onChange={(e) => setCrimeLocation(e.target.value)} placeholder={tr("Where did it happen?")} />
              </div>
              <div className="field">
                <label htmlFor="fxfir">{tr("FIR Number (if any)")}</label>
                <input id="fxfir" type="text" value={firNumber} onChange={(e) => setFirNumber(e.target.value)} placeholder={tr("e.g. FIR-2026-00231")} />
              </div>
              <div className="field">
                <label htmlFor="fxdoc">{tr("Case Document")}</label>
                <input id="fxdoc" type="file" onChange={(e) => setCaseDoc(e.target.files?.[0] || null)} />
              </div>
              <div className="field">
                <label htmlFor="fxnotes">{tr("What Needs to Be Preserved?")}</label>
                <textarea id="fxnotes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={tr("Briefly describe the evidence and where it currently is")} />
              </div>
              <button type="submit" className="submit-btn">{tr("Book a Forensic Expert")}</button>
              <p className="form-note">{tr("Confidential. Free, demo booking flow — no charges, no obligation.")}</p>
            </form>

            <div className="detail-panel" aria-live="polite">
              {!match && (
                <div className="detail-empty">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>
                  <p>{tr("Fill the form — your matched forensic expert and booking ID will appear here right away.")}</p>
                </div>
              )}
              {match && (
                <div className="detail-content">
                  <span className="detail-badge sev-forensic">{tr("Expert Matched")}</span>
                  <h3>{match.expert}</h3>
                  <p className="detail-desc">
                    {tr("They'll reach out within approximately")} <b style={{ color: "var(--text)" }}>{match.etaHours} {tr("hours")}</b> {tr("to begin securing and documenting the evidence.")}
                  </p>
                  <div className="links-label"><span>{tr("Booking Details")}</span></div>
                  <div className="link-list">
                    <div className="link-item" style={{ cursor: "default" }}>
                      <span className="l-left">
                        <span className="l-dot" />
                        <span className="l-text">
                          <div className="l-title">{tr("Booking ID")}</div>
                          <div className="l-url">{match.bookingId}</div>
                        </span>
                      </span>
                    </div>
                  </div>
                  <p className="form-note" style={{ marginTop: 18 }}>{tr("Demo flow — not yet connected to a live forensic network.")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}