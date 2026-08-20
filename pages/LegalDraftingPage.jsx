import { useState } from "react";
import { Link } from "react-router-dom";
import { FilePenLine, FileSearch2, FileCheck2 } from "lucide-react";
import "./LegalDraftingPage.css";
import { sendFormToWhatsApp } from "../utils/whatsapp";
import { useLanguage } from "./LanguageContext";
import LangToggle from "./LangToggle";

const DRAFTER_POOL = [
  "Adv. N. Iyer — Corporate & Legal Drafting",
  "Adv. R. Kapoor — Corporate & Legal Drafting",
  "Adv. S. Varma — Corporate & Legal Drafting",
  "Adv. A. Mehta — Corporate & Legal Drafting",
];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export default function LegalDraftingPage() {
  const { tr } = useLanguage();
  const [docType, setDocType] = useState("");
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [crimeLocation, setCrimeLocation] = useState("");
  const [firNumber, setFirNumber] = useState("");
  const [caseDoc, setCaseDoc] = useState(null);
  const [requirements, setRequirements] = useState("");
  const [match, setMatch] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!docType) return;
    // DEMO ONLY — replace with a real matching API call.
    const seed = hashString(orgName + email + phone + docType);
    const newMatch = {
      drafter: DRAFTER_POOL[seed % DRAFTER_POOL.length],
      etaHours: 4 + (seed % 20),
      bookingId: "NS-LD-" + String(seed % 100000).padStart(5, "0"),
    };
    setMatch(newMatch);

    sendFormToWhatsApp("Legal / Corporate Drafting Request — NyayShield", [
      ["Document Type", docType],
      ["Name / Organization", orgName],
      ["Email", email],
      ["Phone Number", phone],
      ["Address", address],
      ["Location of Crime / Incident", crimeLocation],
      ["FIR Number", firNumber],
      ["Case Document", caseDoc ? caseDoc.name + " (please attach this file in the chat)" : ""],
      ["Requirements", requirements],
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
            <Link className="back-link" to="/">{tr("← Back to Home Page")}</Link>
            <LangToggle />
          </div>
        </div>
      </nav>

      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{tr("Legal & Corporate Drafting")}</div>
          <h1>{tr("Notices, contracts, policies —")} <em>{tr("drafted right, drafted fast.")}</em></h1>
          <p>{tr("Get legal notices, agreements, compliance reports, and corporate policy documents drafted by a qualified legal professional, ready for review or filing.")}</p>
        </div>
      </section>

      <section className="page-body">
        <div className="wrap">
          <div className="drafting-timeline">
            <div className="dt-track">
              <div className="dt-write" />
              <div className="dt-stop">
                <div className="dt-dot"><FilePenLine size={20} /></div>
                <h4>{tr("Brief")}</h4>
                <p>{tr("Tell us the document type and what it needs to cover.")}</p>
              </div>
              <div className="dt-stop">
                <div className="dt-dot"><FileSearch2 size={20} /></div>
                <h4>{tr("Draft & Review")}</h4>
                <p>{tr("A qualified drafter prepares the document and checks it against applicable law.")}</p>
              </div>
              <div className="dt-stop">
                <div className="dt-dot"><FileCheck2 size={20} /></div>
                <h4>{tr("Ready to Use")}</h4>
                <p>{tr("Delivered in a format ready for signature, filing, or internal circulation.")}</p>
              </div>
            </div>
          </div>

          <div className="booking-grid">
            <form className="report-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="ldType">{tr("Type of Document")}</label>
                <select id="ldType" required value={docType} onChange={(e) => setDocType(e.target.value)}>
                  <option value="" disabled>{tr("Select what needs to be drafted")}</option>
                  <option value="notice">{tr("Legal Notice")}</option>
                  <option value="contract">{tr("Contract / Agreement")}</option>
                  <option value="compliance">{tr("Compliance Report")}</option>
                  <option value="policy">{tr("Corporate Policy Document")}</option>
                  <option value="other">{tr("Other")}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="ldorg">{tr("Your Name / Organization")}</label>
                <input id="ldorg" type="text" required value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder={tr("Full name or company name")} />
              </div>
              <div className="field">
                <label htmlFor="ldemail">{tr("Email")}</label>
                <input id="ldemail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={tr("you@example.com")} />
              </div>
              <div className="field">
                <label htmlFor="ldphone">{tr("Phone Number")}</label>
                <input id="ldphone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={tr("How can we reach you?")} />
              </div>
              <div className="field">
                <label htmlFor="ldaddress">{tr("Address")}</label>
                <input id="ldaddress" type="text" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder={tr("Your current / registered address")} />
              </div>
              <div className="field">
                <label htmlFor="ldlocation">{tr("Location of Crime / Incident (if applicable)")}</label>
                <input id="ldlocation" type="text" value={crimeLocation} onChange={(e) => setCrimeLocation(e.target.value)} placeholder={tr("Where did it happen?")} />
              </div>
              <div className="field">
                <label htmlFor="ldfir">{tr("FIR Number (if applicable)")}</label>
                <input id="ldfir" type="text" value={firNumber} onChange={(e) => setFirNumber(e.target.value)} placeholder={tr("e.g. FIR-2026-00231")} />
              </div>
              <div className="field">
                <label htmlFor="lddoc">{tr("Case Document")}</label>
                <input id="lddoc" type="file" onChange={(e) => setCaseDoc(e.target.files?.[0] || null)} />
              </div>
              <div className="field">
                <label htmlFor="ldreq">{tr("What Should the Document Cover?")}</label>
                <textarea id="ldreq" value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder={tr("Key terms, parties involved, purpose, deadlines, etc.")} />
              </div>
              <button type="submit" className="submit-btn">{tr("Request a Draft")}</button>
              <p className="form-note">{tr("Confidential. Free, demo booking flow — no charges, no obligation.")}</p>
            </form>

            <div className="detail-panel" aria-live="polite">
              {!match && (
                <div className="detail-empty">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>
                  <p>{tr("Fill the form — your matched drafter and booking ID will appear here right away.")}</p>
                </div>
              )}
              {match && (
                <div className="detail-content">
                  <span className="detail-badge sev-drafting">{tr("Drafter Matched")}</span>
                  <h3>{match.drafter}</h3>
                  <p className="detail-desc">
                    {tr("Your document will be ready within approximately")} <b style={{ color: "var(--text)" }}>{match.etaHours} {tr("hours")}</b> {tr("for your review before it's finalized.")}
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
                  <p className="form-note" style={{ marginTop: 18 }}>{tr("Demo flow — not yet connected to a live drafting network.")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}