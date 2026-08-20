import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList, User, Hash, Scale, Send, Info, RotateCcw,
  Gavel, BarChart3, BookOpen, Landmark, ScrollText, ShieldCheck, ExternalLink,
  Mail, Phone, MapPin, Paperclip,
} from "lucide-react";
import "./CaseStatusPage.css";
import { sendFormToWhatsApp } from "../utils/whatsapp";
import { useLanguage } from "./LanguageContext";
import LangToggle from "./LangToggle";

// Verified Government of India links relevant to tracking a case.
// Official domains only — no redirectors, no embeds, no tracking.
const GOVT_LINKS = [
  {
    title: "eCourts Services",
    desc: "Official case status, cause lists & orders for district/high courts.",
    url: "https://services.ecourts.gov.in",
    icon: Gavel,
  },
  {
    title: "National Judicial Data Grid (NJDG)",
    desc: "Live pendency & disposal data for courts across India.",
    url: "https://njdg.ecourts.gov.in",
    icon: BarChart3,
  },
  {
    title: "NALSA — Free Legal Aid",
    desc: "Apply for free legal aid under the Legal Services Authorities Act.",
    url: "https://nalsa.gov.in",
    icon: BookOpen,
  },
  {
    title: "Digital Police Portal",
    desc: "NCRB / MHA portal for FIR status, verification & citizen services.",
    url: "https://digitalpolice.gov.in",
    icon: Landmark,
  },
  {
    title: "India Code",
    desc: "Official digital repository of all Central & State Acts.",
    url: "https://www.indiacode.nic.in",
    icon: ScrollText,
  },
  {
    title: "National Cyber Crime Reporting Portal",
    desc: "Report cybercrime directly to the Ministry of Home Affairs (I4C).",
    url: "https://cybercrime.gov.in",
    icon: ShieldCheck,
  },
];

/* ══════════════════════════════════════════════════════════════════
   NYAYSHIELD — CASE INFORMATION / STATUS TRACKER
   IMPORTANT: This is a DEMO screen. It is NOT connected to any real
   court or police database (eCourts, CIS, etc). The "progress %" and
   "next hearing date" shown are deterministically generated from the
   case number you type in, purely so the same input always gives the
   same demo result. Wire the fetchCaseStatus() function below to a
   real API (e.g. eCourts) before using this in production.
══════════════════════════════════════════════════════════════════ */

const STAGES = ["FIR Filed", "Investigation", "Chargesheet", "Trial", "Judgment"];

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  address: "",
  crimeLocation: "",
  caseNumber: "",
  caseType: "",
  city: "",
};

// Simple deterministic hash so the same case number always produces the same demo result.
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

// DEMO ONLY — replace with a real API call, e.g.:
// const res = await fetch(`/api/case-status?caseNumber=${caseNumber}`);
function fetchCaseStatus({ caseNumber }) {
  const seed = hashString(caseNumber.trim().toUpperCase());
  const progress = 10 + (seed % 86); // 10–95%
  const stageIndex = Math.min(STAGES.length - 1, Math.floor((progress / 100) * STAGES.length));
  const daysAhead = 5 + (seed % 55); // 5–60 days out
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + daysAhead);
  const formattedDate = nextDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  return { progress, stageIndex, nextDate: formattedDate };
}

// Builds a search link scoped to the official eCourts domain only
// (Google's "site:" operator), so whatever comes back can only be an
// ecourts.gov.in page — never a random/unverified result.
function buildCourtSearchUrl(city) {
  const q = city && city.trim() ? `${city.trim()} court` : "district court";
  return `https://www.google.com/search?q=${encodeURIComponent(q)}+site:ecourts.gov.in`;
}

// The real, official case-status search page on the eCourts portal —
// this is where an actual case can be tracked (by CNR number, case
// number, party name, FIR number, etc). It's free and government-run.
const ECOURTS_CASE_STATUS_URL = "https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus/index";


export default function CaseStatusPage() {
  const { tr } = useLanguage();
  const [form, setForm] = useState(EMPTY_FORM);
  const [caseDoc, setCaseDoc] = useState(null);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your name.";
    if (!form.email.trim()) er.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) er.email = "Please enter a valid email.";
    if (!form.phone.trim()) er.phone = "Please enter your phone number.";
    if (!form.address.trim()) er.address = "Please enter your address.";
    if (!form.crimeLocation.trim()) er.crimeLocation = "Please enter the location of the crime.";
    if (!form.caseNumber.trim()) er.caseNumber = "Please enter your case / FIR number.";
    if (!form.caseType) er.caseType = "Please select a case type.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    sendFormToWhatsApp("Case Status Check — NyayShield", [
      ["Name", form.name],
      ["Email", form.email],
      ["Phone Number", form.phone],
      ["Address", form.address],
      ["Location of Crime", form.crimeLocation],
      ["Case / FIR Number", form.caseNumber],
      ["Case Type", form.caseType],
      ["City", form.city],
      ["Case Document", caseDoc ? caseDoc.name + " (please attach this file in the chat)" : ""],
    ]);

    setResult(fetchCaseStatus(form));
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setCaseDoc(null);
    setErrors({});
    setResult(null);
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
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Link className="back-link" to="/">← {tr("Back to Home Page")}</Link>
            <LangToggle />
          </div>
        </div>
      </nav>

      <div className="cs-wrap">
        {!result && (
          <>
            <div className="page-hero cs-hero">
              <div className="eyebrow" style={{ justifyContent: "center" }}>{tr("Case Information")}</div>
              <h1>{tr("Track your")} <em>{tr("case status.")}</em></h1>
              <p>{tr("Enter your details and case number to see how far your case has progressed and your next hearing date.")}</p>
            </div>

            <div className="cs-disclaimer">
              <Info size={18} />
              <span>
                <b>{tr("This is a demo tracker, not a live court database.")}</b>{" "}
                {tr("It is not connected to eCourts or any police/judicial system, so the result shown below is illustrative only. What you enter is sent to our team over WhatsApp so we can follow up, but no real case data is fetched from any court. For your actual case status, use the official")}{" "}
                <a href={ECOURTS_CASE_STATUS_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--teal)" }}>
                  {tr("eCourts India — Case Status")}
                </a>{" "}
                {tr("page.")}
              </span>
            </div>

            <a
              className="cs-track-official-btn"
              href={ECOURTS_CASE_STATUS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} />
              <span>
                <span className="t">{tr("Track your real case on the official eCourts portal")}</span>
                <span className="s">{tr("Free · Govt. of India · Opens in a new tab")}</span>
              </span>
            </a>

            <div className="cs-or-divider"><span>{tr("or try the illustrative demo below")}</span></div>

            <form className="cs-form-card" onSubmit={handleSubmit}>
              <div className="cs-grid">
                <div className="cs-field">
                  <label><User size={14} style={{ verticalAlign: -2, marginRight: 6 }} />{tr("Your Name")}</label>
                  <input type="text" placeholder={tr("Full name")} value={form.name} onChange={handleChange("name")} />
                  {errors.name && <div className="cs-error"><Info size={12} /> {tr(errors.name)}</div>}
                </div>

                <div className="cs-field">
                  <label><Mail size={14} style={{ verticalAlign: -2, marginRight: 6 }} />{tr("Email")}</label>
                  <input type="email" placeholder={tr("you@example.com")} value={form.email} onChange={handleChange("email")} />
                  {errors.email && <div className="cs-error"><Info size={12} /> {tr(errors.email)}</div>}
                </div>

                <div className="cs-field">
                  <label><Phone size={14} style={{ verticalAlign: -2, marginRight: 6 }} />{tr("Phone Number")}</label>
                  <input type="tel" placeholder={tr("Your phone number")} value={form.phone} onChange={handleChange("phone")} />
                  {errors.phone && <div className="cs-error"><Info size={12} /> {tr(errors.phone)}</div>}
                </div>

                <div className="cs-field">
                  <label><MapPin size={14} style={{ verticalAlign: -2, marginRight: 6 }} />{tr("Address")}</label>
                  <input type="text" placeholder={tr("Your current address")} value={form.address} onChange={handleChange("address")} />
                  {errors.address && <div className="cs-error"><Info size={12} /> {tr(errors.address)}</div>}
                </div>

                <div className="cs-field">
                  <label><MapPin size={14} style={{ verticalAlign: -2, marginRight: 6 }} />{tr("Location of Crime")}</label>
                  <input type="text" placeholder={tr("Where did it happen?")} value={form.crimeLocation} onChange={handleChange("crimeLocation")} />
                  {errors.crimeLocation && <div className="cs-error"><Info size={12} /> {tr(errors.crimeLocation)}</div>}
                </div>

                <div className="cs-field">
                  <label><Hash size={14} style={{ verticalAlign: -2, marginRight: 6 }} />{tr("Case / FIR Number")}</label>
                  <input type="text" placeholder={tr("e.g. FIR-2026-00231")} value={form.caseNumber} onChange={handleChange("caseNumber")} />
                  {errors.caseNumber && <div className="cs-error"><Info size={12} /> {tr(errors.caseNumber)}</div>}
                </div>

                <div className="cs-field full">
                  <label><Paperclip size={14} style={{ verticalAlign: -2, marginRight: 6 }} />{tr("Case Document (optional)")}</label>
                  <input type="file" onChange={(e) => setCaseDoc(e.target.files?.[0] || null)} />
                </div>

                <div className="cs-field full">
                  <label><Scale size={14} style={{ verticalAlign: -2, marginRight: 6 }} />{tr("Type of Case")}</label>
                  <select value={form.caseType} onChange={handleChange("caseType")}>
                    <option value="">{tr("Select a case type")}</option>
                    <option>{tr("Cybercrime / Online Fraud")}</option>
                    <option>{tr("Theft / Burglary")}</option>
                    <option>{tr("Assault / Physical Violence")}</option>
                    <option>{tr("Domestic Violence")}</option>
                    <option>{tr("Missing Person / Child")}</option>
                    <option>{tr("Harassment / Cyberbullying")}</option>
                    <option>{tr("Financial Fraud / Cheating")}</option>
                    <option>{tr("Drug-Related Crime")}</option>
                    <option>{tr("Other")}</option>
                  </select>
                  {errors.caseType && <div className="cs-error"><Info size={12} /> {tr(errors.caseType)}</div>}
                </div>

                <div className="cs-field full">
                  <label><ClipboardList size={14} style={{ verticalAlign: -2, marginRight: 6 }} />{tr("City / Court (optional)")}</label>
                  <input type="text" placeholder={tr("e.g. Ludhiana District Court")} value={form.city} onChange={handleChange("city")} />
                  <a
                    className="cs-court-link"
                    href={buildCourtSearchUrl(form.city)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={12} /> {tr("Find this court on eCourts")}
                  </a>
                </div>
              </div>

              <button type="submit" className="cs-submit"><Send size={16} /> {tr("Check Case Status")}</button>
              <p className="form-note">{tr("Free to use. No penalty or fee involved.")}</p>
            </form>
          </>
        )}

        {result && (
          <div className="cs-result">
            <span className="cs-demo-tag">{tr("Demo Result — Not Live Court Data")}</span>
            <div className="cs-demo-banner">
              <Info size={16} />
              <span>
                {tr("This is a")} <b>{tr("simulated demo result")}</b>,{" "}
                {tr("generated only from the case number you typed. It is")}{" "}
                <b>{tr("not fetched from eCourts or any real court/police database")}</b>{" "}
                {tr("and must not be used to plan your actual hearing date. For your real case status, visit the official")}{" "}
                <a href={ECOURTS_CASE_STATUS_URL} target="_blank" rel="noopener noreferrer">
                  {tr("eCourts India — Case Status")}
                </a>{" "}
                {tr("page.")}
              </span>
            </div>
            <div className="cs-result-head">
              <h2>{tr("Case Status")}{form.name ? ` ${tr("for")} ${form.name}` : ""}</h2>
              <span className="cs-case-id">{form.caseNumber}</span>
            </div>

            <div className="cs-progress-wrap">
              <div className="cs-progress-label">
                <span>{tr("Progress")}</span>
                <span>{result.progress}%</span>
              </div>
              <div className="cs-progress-track">
                <div className="cs-progress-fill" style={{ width: `${result.progress}%` }} />
              </div>
              <div className="cs-stage-row">
                {STAGES.map((s, i) => (
                  <div key={s} className={`cs-stage ${i < result.stageIndex ? "done" : i === result.stageIndex ? "current" : ""}`}>
                    {tr(s)}
                  </div>
                ))}
              </div>
            </div>

            <div className="cs-info-grid">
              <div className="cs-info-card">
                <div className="k">{tr("Current Stage")}</div>
                <div className="v">{tr(STAGES[result.stageIndex])}</div>
              </div>
              <div className="cs-info-card next-date">
                <div className="k">{tr("Next Hearing Date")}</div>
                <div className="v">{result.nextDate}</div>
              </div>
              <div className="cs-info-card">
                <div className="k">{tr("Case Type")}</div>
                <div className="v">{tr(form.caseType)}</div>
              </div>
              <div className="cs-info-card">
                <div className="k">{tr("City / Court")}</div>
                <div className="v">{form.city || tr("Not specified")}</div>
                <a
                  className="cs-court-link"
                  href={buildCourtSearchUrl(form.city)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={12} /> {tr("Find this court on eCourts")}
                </a>
              </div>
            </div>

            <div className="cs-result-actions">
              <a
                className="cs-gold-btn"
                href={ECOURTS_CASE_STATUS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={14} style={{ verticalAlign: -2, marginRight: 6 }} />
                {tr("Track on Official eCourts Portal")}
              </a>
              <button className="cs-ghost-btn" onClick={resetForm}><RotateCcw size={15} style={{ verticalAlign: -2, marginRight: 6 }} />{tr("Check Another Case")}</button>
              <Link className="cs-ghost-btn" to="/">{tr("Back to Home")}</Link>
            </div>
          </div>
        )}

        <section className="govt-section">
          <div className="govt-head">
            <div className="eyebrow" style={{ justifyContent: "center" }}>{tr("Official Government Resources")}</div>
            <h2>{tr("Verified links, straight from the source")}</h2>
            <p>{tr("Every link below points to an official Government of India (.gov.in / .nic.in) portal. Nothing is proxied, embedded, or tracked — each opens directly in a new tab.")}</p>
          </div>
          <div className="govt-list">
            {GOVT_LINKS.map(({ title, desc, url, icon: Icon }) => (
              <a
                key={url}
                className="govt-card"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="govt-icon"><Icon size={20} /></span>
                <span className="govt-text">
                  <span className="govt-title">{tr(title)} <ExternalLink size={13} className="govt-ext" /></span>
                  <span className="govt-desc">{tr(desc)}</span>
                  <span className="govt-url">{url.replace("https://", "")}</span>
                </span>
                <span className="govt-free-tag">{tr("Free · No charges")}</span>
              </a>
            ))}
          </div>
        </section>
      </div>

    </div>
  );
}
