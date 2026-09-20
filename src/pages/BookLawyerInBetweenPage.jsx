import { useState } from "react";
import { Link } from "react-router-dom";
import "./BookLawyerInBetweenPage.css";
import { useLanguage } from "./LanguageContext";
import LangToggle from "./LangToggle";
import { useEmailSubmit } from "../utils/useEmailSubmit";
import FormSubmitError from "./FormSubmitError";
import ForfraBrand from "./ForfraBrand";

const LAWYER_POOL = [
  "Adv. R. Menon — Mid-Case Transition Specialist",
  "Adv. S. Ghosh — Mid-Case Transition Specialist",
  "Adv. V. Nair — Mid-Case Transition Specialist",
  "Adv. J. Thakur — Mid-Case Transition Specialist",
];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export default function BookLawyerInBetweenPage() {
  const { tr } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [crimeLocation, setCrimeLocation] = useState("");
  const [firNumber, setFirNumber] = useState("");
  const [stage, setStage] = useState("");
  const [caseDesc, setCaseDesc] = useState("");
  const [match, setMatch] = useState(null);
  const { sending, error, mailto, submit } = useEmailSubmit();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    // DEMO ONLY — replace with a real matching API call.
    const seed = hashString(email + phone + caseDesc + stage);
    const newMatch = {
      lawyer: LAWYER_POOL[seed % LAWYER_POOL.length],
      etaHours: 3 + (seed % 12),
      bookingId: "NS-MC-" + String(seed % 100000).padStart(5, "0"),
    };
    const ok = await submit("Book a Lawyer (Mid-Case) — NyayShield", [
      ["Name", name],
      ["Email", email],
      ["Phone Number", phone],
      ["Address", address],
      ["Location of Crime", crimeLocation],
      ["FIR Number", firNumber],
      ["Current Stage", stage],
      ["Case Description", caseDesc],
      ["Booking ID", newMatch.bookingId],
    ]);
    if (ok) setMatch(newMatch);
  };

  return (
    <div className="home-root">
      <nav className="topbar">
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <ForfraBrand />
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <LangToggle />
          </div>
        </div>
      </nav>

      <section className="page-hero ib-hero">
        <div className="wrap">
          <div className="eyebrow">{tr("Lawyer · In Between the Case")}</div>
          <h1>{tr("Bring in a lawyer")}<br /><em>{tr("wherever your case currently stands.")}</em></h1>
          <p>{tr("Whether you're mid-investigation, awaiting a hearing, or switching representation, tell us the current stage and we'll match someone who can step in without losing time.")}</p>
        </div>
      </section>

      <section className="page-body">
        <div className="wrap booking-grid">
          <form className="report-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="mcname">{tr("Full Name")}</label>
              <input id="mcname" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder={tr("Your full name")} />
            </div>
            <div className="field">
              <label htmlFor="mcemail">{tr("Email")}</label>
              <input id="mcemail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={tr("you@example.com")} />
            </div>
            <div className="field">
              <label htmlFor="mcphone">{tr("Phone Number")}</label>
              <input id="mcphone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={tr("How can we reach you?")} />
            </div>
            <div className="field">
              <label htmlFor="mcaddress">{tr("Address")}</label>
              <input id="mcaddress" type="text" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder={tr("Your current address")} />
            </div>
            <div className="field">
              <label htmlFor="mclocation">{tr("Location of Crime")}</label>
              <input id="mclocation" type="text" required value={crimeLocation} onChange={(e) => setCrimeLocation(e.target.value)} placeholder={tr("Where did it happen?")} />
            </div>
            <div className="field">
              <label htmlFor="mcfir">{tr("FIR Number")}</label>
              <input id="mcfir" type="text" value={firNumber} onChange={(e) => setFirNumber(e.target.value)} placeholder={tr("e.g. FIR-2026-00231")} />
            </div>
            <div className="field">
              <label htmlFor="mcstage">{tr("Current Stage of the Case")}</label>
              <select id="mcstage" required value={stage} onChange={(e) => setStage(e.target.value)}>
                <option value="" disabled>{tr("Select the current stage")}</option>
                <option value="investigation">{tr("Under Police Investigation")}</option>
                <option value="chargesheet">{tr("Chargesheet Filed")}</option>
                <option value="trial">{tr("Trial in Progress")}</option>
                <option value="switching">{tr("Switching from Current Lawyer")}</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="mcdesc">{tr("Briefly Describe the Case")}</label>
              <textarea id="mcdesc" value={caseDesc} onChange={(e) => setCaseDesc(e.target.value)} placeholder={tr("What's the case about, and where does it stand?")} />
            </div>
            <FormSubmitError show={error} mailto={mailto} />
            <button type="submit" className="submit-btn gold" disabled={sending}>{sending ? tr("Sending…") : tr("Submit your details")}</button>
            <p className="form-note">{tr("Confidential. Free, demo booking flow — no charges, no obligation.")}</p>
          </form>

          <div className="detail-panel">
            {!match && (
              <div className="detail-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>
                <p>{tr("Fill the form — your matched lawyer and booking ID will appear here right away.")}</p>
              </div>
            )}
            {match && (
              <div className="detail-content">
                <span className="detail-badge sev-cyber">{tr("Lawyer Matched")}</span>
                <h3>{tr("A lawyer has been matched to your case")}</h3>
                <p className="detail-desc">
                  {tr("They'll review your case stage and reach out within approximately")} <b style={{ color: "var(--text)" }}>{match.etaHours} {tr("hours")}</b> {tr("to discuss next steps.")}
                </p>
                <div className="links-label">
                  <span>{tr("Booking Details")}</span>
                </div>
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
                <p className="form-note" style={{ marginTop: 18 }}>{tr("Demo flow — not yet connected to a live lawyer network.")}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}