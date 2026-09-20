import { useState } from "react";
import { Link } from "react-router-dom";
import "./BookLawyerDay1Page.css";
import { useLanguage } from "./LanguageContext";
import LangToggle from "./LangToggle";
import { useEmailSubmit } from "../utils/useEmailSubmit";
import FormSubmitError from "./FormSubmitError";
import ForfraBrand from "./ForfraBrand";

const LAWYER_POOL = [
  "Adv. K. Rao — Criminal Defence, Day-1 Response Team",
  "Adv. M. Sinha — Criminal Defence, Day-1 Response Team",
  "Adv. T. Bose — Criminal Defence, Day-1 Response Team",
  "Adv. D. Chauhan — Criminal Defence, Day-1 Response Team",
];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export default function BookLawyerDay1Page() {
  const { tr } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [crimeLocation, setCrimeLocation] = useState("");
  const [firNumber, setFirNumber] = useState("");
  const [caseDesc, setCaseDesc] = useState("");
  const [match, setMatch] = useState(null);
  const { sending, error, mailto, submit } = useEmailSubmit();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    // DEMO ONLY — replace with a real matching API call.
    const seed = hashString(email + phone + caseDesc);
    const newMatch = {
      lawyer: LAWYER_POOL[seed % LAWYER_POOL.length],
      etaHours: 1 + (seed % 4),
      bookingId: "NS-D1-" + String(seed % 100000).padStart(5, "0"),
    };
    const ok = await submit("Book a Lawyer (Day 1) — NyayShield", [
      ["Name", name],
      ["Email", email],
      ["Phone Number", phone],
      ["Address", address],
      ["Location of Crime", crimeLocation],
      ["FIR Number", firNumber],
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

      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{tr("Lawyer · Day 1")}</div>
          <h1>{tr("Get a lawyer assigned")}<br /><em>{tr("the same day you report.")}</em></h1>
          <p>{tr("Tell us the basics and a criminal defence lawyer from our Day-1 response team is matched to your case immediately.")}</p>
        </div>
      </section>

      <section className="page-body">
        <div className="wrap booking-grid">
          <form className="report-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="d1name">{tr("Full Name")}</label>
              <input id="d1name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder={tr("Your full name")} />
            </div>
            <div className="field">
              <label htmlFor="d1email">{tr("Email")}</label>
              <input id="d1email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={tr("you@example.com")} />
            </div>
            <div className="field">
              <label htmlFor="d1phone">{tr("Phone Number")}</label>
              <input id="d1phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={tr("How can we reach you?")} />
            </div>
            <div className="field">
              <label htmlFor="d1address">{tr("Address")}</label>
              <input id="d1address" type="text" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder={tr("Your current address")} />
            </div>
            <div className="field">
              <label htmlFor="d1location">{tr("Location of Crime")}</label>
              <input id="d1location" type="text" required value={crimeLocation} onChange={(e) => setCrimeLocation(e.target.value)} placeholder={tr("Where did it happen?")} />
            </div>
            <div className="field">
              <label htmlFor="d1fir">{tr("FIR Number (if already filed)")}</label>
              <input id="d1fir" type="text" value={firNumber} onChange={(e) => setFirNumber(e.target.value)} placeholder={tr("e.g. FIR-2026-00231")} />
            </div>
            <div className="field">
              <label htmlFor="d1desc">{tr("Briefly Describe the Case")}</label>
              <textarea id="d1desc" value={caseDesc} onChange={(e) => setCaseDesc(e.target.value)} placeholder={tr("What happened, and when?")} />
            </div>
            <FormSubmitError show={error} mailto={mailto} />
            <button type="submit" className="submit-btn gold" disabled={sending}>{sending ? tr("Sending…") : tr("Submit your details")}</button>
            <p className="form-note">{tr("Confidential. Free, demo booking flow — no charges, no obligation.")}</p>
          </form>

          <div className="detail-panel">
            {!match && (
              <div className="detail-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>
                <p>{tr("Fill the form — your assigned lawyer and booking ID will appear here right away.")}</p>
              </div>
            )}
            {match && (
              <div className="detail-content">
                <span className="detail-badge sev-medium">{tr("Lawyer Assigned")}</span>
                <h3>{tr("A criminal defence lawyer has been assigned to your case")}</h3>
                <p className="detail-desc">
                  {tr("They'll reach out within approximately")} <b style={{ color: "var(--text)" }}>{match.etaHours} {tr("hour(s)")}</b> {tr("to begin building your defence while the case is still fresh.")}
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