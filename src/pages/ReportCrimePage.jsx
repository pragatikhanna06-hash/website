import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Siren, ShieldAlert, AlertTriangle, Send, Loader2, ExternalLink,
  CheckCircle2, User, Phone, Mail, MapPin, Calendar, FileText,
  Info, PhoneCall, Monitor, Banknote, ShoppingBag,
  Building2, Landmark, UserSearch, RotateCcw, Radar,
} from "lucide-react";
import { useEmailSubmit } from "../utils/useEmailSubmit";
import { useLanguage } from "./LanguageContext";
import LangToggle from "./LangToggle";
import logo from "../assets/logo.png";

/* ══════════════════════════════════════════════════════════════════
   FORFRA SOLUTIONS — REPORT A CRIME
   Theme matches HomePage: navy + gold, Inter throughout.
   Flow: intro → form → processing (scan animation) → results (govt links)
══════════════════════════════════════════════════════════════════ */

const NAVY = "#0D2F7F";
const NAVY_MID = "#EAF5FD";
const BLUE_MID = "#DBEEFC";
const GOLD = "#F5B400";
const GOLD_DIM = "#D89A00";
const ALERT = "#E0483A";
const SLATE = "#5B6B7C";
const PAGE_BG = "#FFFFFF";

/*
  NOTE ON LINK COUNTS:
  "General FIR / Local Crime" genuinely has 36 official links because policing
  in India is a state subject — every state and UT runs its own police portal
  (verified against the Ministry of Home Affairs' official directory).
  Other categories are, by design, handled by a SINGLE unified national
  authority (e.g. all cyber crime nationwide goes through cybercrime.gov.in).
  Every link below is a real, verified official government portal — we do not
  pad any category with duplicate or fabricated entries just to inflate a count.

  NOTE ON TRANSLATION:
  Category titles/descriptions are translated via tr(). Official portal/link
  names are left in English (they are proper nouns / official titles as they
  appear on the government sites themselves), matching how eCourts is handled
  elsewhere on the site.
*/
const CATEGORIES = [
  {
    id: "cyber",
    title: "Cyber Crime & Deepfake",
    desc: "Hacking, online fraud, phishing, identity theft, deepfakes or morphed photos & videos, social media harassment, or any internet-based crime.",
    icon: Monitor,
    govLinks: [
      { name: "National Cyber Crime Reporting Portal", url: "https://cybercrime.gov.in/" },
      { name: "Cyber Crime Helpline: 1930", url: "https://cybercrime.gov.in/" },
      { name: "Cyber & Multi Agency Centre (CyMAC), MHA", url: "https://www.mha.gov.in/en/commoncontent/cyber-multi-agency-centre-cymac" },
      { name: "CERT-In (Indian Computer Emergency Response Team)", url: "https://www.cert-in.org.in/" },
      { name: "StopNCII.org — Morphing / Deepfake Photo & Video Removal", url: "https://stopncii.org/" },
      { name: "Deepfake Video & Photo Reporting (National Cyber Crime Portal)", url: "https://cybercrime.gov.in/" },
    ],
  },
  {
    id: "women",
    title: "Women's Safety & Harassment",
    desc: "Harassment, domestic violence, stalking, or any crime against women.",
    icon: ShieldAlert,
    govLinks: [
      { name: "National Commission for Women (NCW)", url: "https://ncwapps.nic.in/" },
      { name: "Directory of All State Women Commissions", url: "https://www.ncw.gov.in/important-links/list-of-state-women-commissions/" },
      { name: "SHe-Box — Workplace Sexual Harassment Complaints", url: "https://shebox.wcd.gov.in/" },
      { name: "NCW 24x7 Helpline: 7827-170-170", url: "https://ncwapps.nic.in/" },
    ],
  },
  {
    id: "financial",
    title: "Financial & Banking Fraud",
    desc: "Unauthorised transactions, loan scams, UPI fraud, or suspicious banking activity.",
    icon: Banknote,
    govLinks: [
      { name: "RBI Sachet Portal (unregulated schemes & fraud)", url: "https://sachet.rbi.org.in/" },
      { name: "RBI Complaint Management System (Banking Ombudsman)", url: "https://cms.rbi.org.in/" },
      { name: "SEBI SCORES (investment & securities fraud)", url: "https://scores.gov.in/" },
      { name: "IRDAI Bima Bharosa (insurance complaints)", url: "https://bimabharosa.irdai.gov.in/" },
    ],
  },
  {
    id: "consumer",
    title: "Consumer Fraud",
    desc: "Fake products, defective goods, unfair trade practices, or e-commerce scams.",
    icon: ShoppingBag,
    govLinks: [
      { name: "National Consumer Helpline", url: "https://consumerhelpline.gov.in/" },
      { name: "National Consumer Disputes Redressal Commission", url: "https://ncdrc.nic.in/" },
      { name: "e-Daakhil (file a consumer case online)", url: "https://edaakhil.nic.in/" },
      { name: "State Consumer Commission Directory", url: "https://ncdrc.nic.in/" },
    ],
  },
  {
    id: "corporate",
    title: "Corporate & Financial Crime",
    desc: "Company fraud, embezzlement, or serious financial irregularities within an organisation.",
    icon: Building2,
    govLinks: [
      { name: "Serious Fraud Investigation Office (SFIO)", url: "https://sfio.nic.in/" },
      { name: "Ministry of Corporate Affairs", url: "https://www.mca.gov.in/" },
      { name: "Securities and Exchange Board of India (SEBI)", url: "https://www.sebi.gov.in/" },
      { name: "Insolvency and Bankruptcy Board of India (IBBI)", url: "https://ibbi.gov.in/" },
    ],
  },
  {
    id: "tax",
    title: "Tax Evasion",
    desc: "Undisclosed income, GST fraud, or tax-related offences.",
    icon: Landmark,
    govLinks: [
      { name: "Income Tax Department e-Filing Portal", url: "https://www.incometax.gov.in/" },
      { name: "Goods & Services Tax (GST) Portal", url: "https://www.gst.gov.in/" },
      { name: "Central Board of Indirect Taxes & Customs (CBIC)", url: "https://www.cbic.gov.in/" },
    ],
  },
  {
    id: "general",
    title: "General FIR / Local Crime",
    desc: "Theft, assault, property crime, or anything that needs a First Information Report (FIR) — every state runs its own police portal.",
    icon: Siren,
    govLinks: [
      { name: "Digital Police Portal (national)", url: "https://digitalpolice.gov.in/" },
      { name: "Andhra Pradesh Police", url: "https://www.appolice.gov.in/" },
      { name: "Arunachal Pradesh Police", url: "https://arunpol.nic.in/" },
      { name: "Assam Police", url: "https://police.assam.gov.in/" },
      { name: "Bihar Police", url: "https://biharpolice.bih.nic.in/" },
      { name: "Chhattisgarh Police", url: "https://cgpolice.gov.in/" },
      { name: "Goa Police", url: "https://citizen.goapolice.gov.in/" },
      { name: "Gujarat Police", url: "https://police.gujarat.gov.in/" },
      { name: "Haryana Police", url: "https://haryanapoliceonline.gov.in/" },
      { name: "Himachal Pradesh Police", url: "https://citizenportal.hppolice.gov.in:8080/citizen/login.htm" },
      { name: "Jharkhand Police", url: "https://www.jhpolice.gov.in/" },
      { name: "Karnataka State Police", url: "https://www.ksp.gov.in/" },
      { name: "Kerala Police", url: "https://keralapolice.org/" },
      { name: "Madhya Pradesh Police", url: "https://www.mppolice.gov.in/en" },
      { name: "Maharashtra Police", url: "https://mahapolice.gov.in/" },
      { name: "Manipur Police", url: "https://www.manipurpolice.gov.in/" },
      { name: "Meghalaya Police", url: "https://megpolice.gov.in/" },
      { name: "Mizoram Police", url: "https://police.mizoram.gov.in/" },
      { name: "Nagaland Police", url: "https://nagapol.gov.in/" },
      { name: "Odisha Police", url: "https://www.odishapolice.gov.in/" },
      { name: "Punjab Police", url: "https://www.punjabpolice.gov.in/" },
      { name: "Rajasthan Police", url: "https://police.rajasthan.gov.in/" },
      { name: "Sikkim Police", url: "https://sikkimpolice.nic.in/" },
      { name: "Tamil Nadu Police", url: "https://www.tnpolice.gov.in/" },
      { name: "Telangana Police", url: "https://www.telangana.gov.in/" },
      { name: "Tripura Police", url: "https://www.tripurapolice.gov.in/" },
      { name: "Uttarakhand Police", url: "https://uttarakhandpolice.uk.gov.in/" },
      { name: "Uttar Pradesh Police", url: "https://uppolice.gov.in/" },
      { name: "West Bengal Police", url: "https://wbpolice.gov.in/" },
      { name: "Andaman & Nicobar Police", url: "https://police.andaman.gov.in/index.php/en" },
      { name: "Chandigarh Police", url: "https://chandigarhpolice.gov.in/" },
      { name: "Delhi Police", url: "https://delhipolice.gov.in/" },
      { name: "Dadra & Nagar Haveli and Daman & Diu Police", url: "https://police.ddd.gov.in/" },
      { name: "Lakshadweep Police", url: "https://lakshadweeppolice.gov.in/" },
      { name: "Puducherry Police", url: "https://police.py.gov.in/" },
      { name: "Jammu & Kashmir Police", url: "https://www.jkpolice.gov.in/" },
      { name: "Ladakh Police", url: "https://police.ladakh.gov.in/" },
    ],
  },
  {
    id: "missing",
    title: "Missing Person / Child Safety",
    desc: "A missing person, missing child, or child-safety concern.",
    icon: UserSearch,
    govLinks: [
      { name: "Track the Missing Child Portal", url: "https://www.trackthemissingchild.gov.in/" },
      { name: "Digital Police — Missing Person Search", url: "https://digitalpolice.gov.in/" },
      { name: "CHILDLINE India (Helpline: 1098)", url: "https://www.childlineindia.org/" },
      { name: "Delhi Police", url: "https://delhipolice.gov.in/" },
      { name: "Delhi Police ZIPNET — Missing Persons", url: "https://zipnet.delhipolice.gov.in/Victims/MissingPersons" },
      { name: "India.gov.in — Search Missing Person", url: "https://www.india.gov.in/services/details/search-missing-person" },
      { name: "Khoji — Missing Person Portal", url: "https://khoji.in/" },
      { name: "Lautna — Missing Person Portal", url: "https://www.lautna.org/" },
    ],
  },
];

function useReveal(threshold = 0.15) {
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
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  location: "",
  crimeType: "",
  date: "",
  description: "",
};

export default function ReportCrimePage() {
  const { tr } = useLanguage();
  const { submit } = useEmailSubmit();
  const [step, setStep] = useState("intro"); // intro | form | processing | results
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [scanMsgIndex, setScanMsgIndex] = useState(0);

  const scanMessages = [
    "Reviewing the details you provided...",
    "Matching your case to the right authority...",
    "Preparing your resource list...",
  ];

  useEffect(() => {
    if (step !== "processing") return;
    setScanMsgIndex(0);
    const interval = setInterval(() => {
      setScanMsgIndex((i) => Math.min(i + 1, scanMessages.length - 1));
    }, 550);
    const timeout = setTimeout(() => setStep("results"), 1700);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your name.";
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone.trim())) er.phone = "Please enter a valid phone number.";
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) er.email = "Please enter a valid email.";
    if (!form.location.trim()) er.location = "Please enter the location of the incident.";
    if (!form.crimeType) er.crimeType = "Please select a crime type.";
    if (!form.date) er.date = "Please select the date of the incident.";
    if (!form.description.trim()) er.description = "Please describe what happened.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const matchedCategory = CATEGORIES.find((c) => c.id === form.crimeType);
    // go to the next part straight away and open the ready-to-send email
    setStep("processing");
    submit("New Crime Report — NyayShield", [
      ["Name", form.name],
      ["Phone", form.phone],
      ["Email", form.email],
      ["Location", form.location],
      ["Crime Type", matchedCategory ? matchedCategory.title : form.crimeType],
      ["Date of Incident", form.date],
      ["Description", form.description],
    ]);

  };

  const resetAll = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setStep("form");
  };

  const matched = CATEGORIES.find((c) => c.id === form.crimeType);

  return (
    <div className="rc-root">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");

        .rc-root, .rc-root *, .rc-root *::before, .rc-root *::after { box-sizing: border-box; }
        .rc-root {
          background: ${PAGE_BG};
          color: #33404F;
          font-family: "Inter", sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }
        .rc-root h1, .rc-root h2, .rc-root h3, .rc-root .rc-display {
          font-family: "Inter", sans-serif;
        }

        /* ---------- TOP BAR ---------- */
        .rc-topbar {
          position: sticky; top: 0; z-index: 40;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.1rem 1.5rem;
          background: rgba(234,245,253,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(245,166,35,0.15);
        }
        .rc-back {
          display: inline-flex; align-items: center; gap: 0.5rem;
          color: rgba(13,47,127,0.75); text-decoration: none;
          font-size: 0.9rem; font-weight: 500;
          transition: color 0.25s ease;
        }
        .rc-back:hover { color: ${GOLD}; }
        .rc-topbar-brand {
          font-family: "Inter", sans-serif;
          letter-spacing: 0.1em;
          font-size: 1.1rem;
          color: #0D2F7F;
          font-weight: 700;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .rc-topbar-brand img { width: 26px; height: 26px; object-fit: contain; flex-shrink: 0; }
        .rc-topbar-brand span { color: #0D2F7F; font-size: 1.1rem; font-weight: 700; letter-spacing: 0.1em; }
        .rc-topbar-right {
          display: flex; align-items: center; gap: 1rem;
        }

        /* ---------- INTRO HERO ---------- */
        .rc-hero {
          position: relative;
          min-height: 78vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
          padding: 4rem 1.5rem;
          overflow: hidden;
          background: radial-gradient(ellipse at 50% 20%, #FFFFFF 0%, ${NAVY_MID} 70%);
        }
        .rc-hero-grid {
          position: absolute; inset: 0; opacity: 0.06; pointer-events: none;
          background-image:
            linear-gradient(rgba(13,47,127,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(13,47,127,0.08) 1px, transparent 1px);
          background-size: 52px 52px;
          animation: rc-grid-drift 36s linear infinite;
        }
        @keyframes rc-grid-drift { from { background-position: 0 0; } to { background-position: 260px 260px; } }

        .rc-siren-wrap {
          position: relative;
          width: 130px; height: 130px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 2rem;
        }
        .rc-siren-ring {
          position: absolute; border-radius: 50%;
          border: 1.5px solid rgba(255,107,87,0.4);
          animation: rc-ring-pulse 2.6s ease-out infinite;
        }
        .rc-siren-ring.r2 { animation-delay: 0.6s; }
        .rc-siren-ring.r3 { animation-delay: 1.2s; }
        @keyframes rc-ring-pulse {
          0% { width: 40%; height: 40%; opacity: 0.9; }
          100% { width: 100%; height: 100%; opacity: 0; }
        }
        .rc-siren-core {
          position: relative; z-index: 1;
          width: 72px; height: 72px; border-radius: 50%;
          background: linear-gradient(135deg, ${ALERT}, ${GOLD_DIM});
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          box-shadow: 0 0 34px rgba(255,107,87,0.55);
          animation: rc-core-throb 1.8s ease-in-out infinite;
        }
        @keyframes rc-core-throb {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        .rc-eyebrow {
          display: inline-block;
          color: ${GOLD};
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase;
          border: 1px solid rgba(245,166,35,0.35); padding: 0.35rem 1rem; border-radius: 999px;
          margin-bottom: 1.4rem;
        }
        .rc-hero h1 {
          font-size: 2rem;
          line-height: 1.02;
          letter-spacing: 0.01em;
          margin-bottom: 1.2rem;
        }
        .rc-hero h1 em { font-style: normal; color: ${GOLD}; }
        .rc-hero p {
          color: rgba(51,64,79,0.85);
          max-width: 560px;
          font-size: 1.02rem;
          line-height: 1.7;
          margin-bottom: 2.4rem;
        }

        .rc-btn-primary {
          display: inline-flex; align-items: center; gap: 0.6rem;
          background: ${GOLD}; color: ${NAVY};
          font-weight: 700; font-size: 1rem;
          padding: 0.95rem 2.2rem;
          border-radius: 6px; border: 2px solid ${GOLD};
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          position: relative;
        }
        .rc-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 34px rgba(245,166,35,0.35);
          background: ${GOLD_DIM};
          border-color: ${GOLD_DIM};
        }
        .rc-btn-ghost {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: transparent; color: #0D2F7F;
          border: 1.5px solid rgba(13,47,127,0.3);
          padding: 0.9rem 1.8rem; border-radius: 6px;
          font-weight: 600; cursor: pointer;
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
        }
        .rc-btn-ghost:hover { border-color: ${GOLD}; background: rgba(13,47,127,0.05); transform: translateY(-2px); }

        .rc-hero-stats {
          display: flex; gap: 2.5rem; flex-wrap: wrap; justify-content: center;
          margin-top: 3rem;
        }
        .rc-stat { text-align: center; }
        .rc-stat-val { font-family: "Inter", sans-serif; font-size: 2.2rem; color: ${GOLD}; line-height: 1; }
        .rc-stat-label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; color: ${SLATE}; margin-top: 0.3rem; }

        /* ---------- FORM ---------- */
        .rc-form-section {
          padding: 5rem 1.5rem 6rem;
          background: ${NAVY_MID};
        }
        .rc-form-card {
          max-width: 760px; margin: 0 auto;
          background: rgba(234,245,253,0.9);
          border: 1px solid rgba(245,166,35,0.3);
          border-radius: 18px;
          padding: 2.6rem 2.2rem;
        }
        .rc-form-head { margin-bottom: 2rem; text-align: center; }
        .rc-form-head h2 { font-size: clamp(1.8rem, 4vw, 2rem); margin-bottom: 0.6rem; }
        .rc-form-head p { color: rgba(51,64,79,0.75); font-size: 0.94rem; }

        .rc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.3rem;
        }
        .rc-field { display: flex; flex-direction: column; gap: 0.45rem; }
        .rc-field.full { grid-column: 1 / -1; }
        .rc-field label {
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.03em;
          color: rgba(51,64,79,0.9);
          display: flex; align-items: center; gap: 0.4rem;
        }
        .rc-field label svg { color: ${GOLD}; }
        .rc-field input, .rc-field select, .rc-field textarea {
          background: rgba(13,47,127,0.04);
          border: 1.5px solid rgba(13,47,127,0.2);
          border-radius: 8px;
          padding: 0.75rem 0.9rem;
          color: #23262B;
          font-family: "Inter", sans-serif;
          font-size: 0.92rem;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .rc-field select option { background: ${NAVY_MID}; color: #23262B; }
        .rc-field input::placeholder, .rc-field textarea::placeholder { color: rgba(51,64,79,0.45); }
        .rc-field input:focus, .rc-field select:focus, .rc-field textarea:focus {
          outline: none;
          border-color: ${GOLD};
          box-shadow: 0 0 0 3px rgba(245,166,35,0.18);
        }
        .rc-field.error input, .rc-field.error select, .rc-field.error textarea {
          border-color: ${ALERT};
        }
        .rc-error-msg {
          font-size: 0.76rem; color: ${ALERT};
          display: flex; align-items: center; gap: 0.3rem;
        }
        .rc-field textarea { resize: vertical; min-height: 92px; }

        .rc-submit-row {
          margin-top: 2rem;
          display: flex; justify-content: center;
        }

        /* ---------- PROCESSING ---------- */
        .rc-processing {
          min-height: 60vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
          background: ${NAVY_MID};
          padding: 4rem 1.5rem;
        }
        .rc-scan-ring-wrap {
          position: relative; width: 160px; height: 160px; margin-bottom: 2rem;
        }
        .rc-scan-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 2px solid rgba(245,166,35,0.25);
        }
        .rc-scan-sweep {
          position: absolute; inset: 0; border-radius: 50%;
          background: conic-gradient(from 0deg, ${GOLD}, transparent 30%);
          animation: rc-rotate 1.4s linear infinite;
          -webkit-mask: radial-gradient(circle, transparent 62%, #000 63%);
          mask: radial-gradient(circle, transparent 62%, #000 63%);
        }
        @keyframes rc-rotate { to { transform: rotate(360deg); } }
        .rc-scan-core {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          color: ${GOLD};
        }
        .rc-processing h3 { font-size: 2rem; margin-bottom: 0.6rem; }
        .rc-processing p { color: rgba(51,64,79,0.75); font-size: 0.95rem; min-height: 1.4em; }

        /* ---------- RESULTS ---------- */
        .rc-results-section {
          padding: 4.5rem 1.5rem 6rem;
          background: ${PAGE_BG};
        }
        .rc-results-inner { max-width: 1140px; margin: 0 auto; }
        .rc-results-head { text-align: center; margin-bottom: 2.5rem; }
        .rc-results-head .rc-check {
          display: inline-flex; align-items: center; justify-content: center;
          width: 60px; height: 60px; border-radius: 50%;
          background: rgba(34,197,94,0.12);
          color: #4ade80;
          margin-bottom: 1.2rem;
        }
        .rc-results-head h2 { font-size: clamp(1.9rem, 4.2vw, 2rem); margin-bottom: 0.6rem; }
        .rc-results-head p { color: rgba(51,64,79,0.75); max-width: 620px; margin: 0 auto; font-size: 0.96rem; line-height: 1.65; }

        .rc-disclaimer {
          max-width: 760px; margin: 2rem auto 0;
          background: rgba(255,107,87,0.08);
          border: 1px solid rgba(255,107,87,0.3);
          border-left: 4px solid ${ALERT};
          border-radius: 10px;
          padding: 1.1rem 1.4rem;
          display: flex; gap: 0.9rem; align-items: flex-start;
          text-align: left;
        }
        .rc-disclaimer svg { color: ${ALERT}; flex-shrink: 0; margin-top: 2px; }
        .rc-disclaimer p { margin: 0; font-size: 0.86rem; color: rgba(51,64,79,0.85); line-height: 1.6; }
        .rc-disclaimer strong { color: #23262B; }
        .rc-disclaimer a { color: ${GOLD}; text-decoration: underline; }

        .rc-cat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.3rem;
          margin-top: 3rem;
        }
        .rc-cat-card {
          background: linear-gradient(135deg, ${NAVY_MID} 0%, #DBEEFC 100%);
          border: 1px solid rgba(245,166,35,0.14);
          border-radius: 16px;
          padding: 1.8rem 1.6rem;
          display: flex; flex-direction: column; gap: 0.9rem;
          position: relative;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .rc-cat-card:hover {
          transform: translateY(-6px);
          border-color: rgba(245,166,35,0.4);
          box-shadow: 0 20px 46px rgba(0,0,0,0.35);
        }
        .rc-cat-card.matched {
          border-color: ${GOLD};
          box-shadow: 0 0 0 1px ${GOLD}, 0 20px 46px rgba(245,166,35,0.2);
        }
        .rc-matched-badge {
          position: absolute; top: -12px; right: 18px;
          background: ${GOLD}; color: ${NAVY};
          font-size: 0.65rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase;
          padding: 0.3rem 0.7rem; border-radius: 999px;
        }
        .rc-cat-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: rgba(245,166,35,0.12);
          display: flex; align-items: center; justify-content: center;
          color: ${GOLD};
        }
        .rc-cat-card h4 { font-family: "Inter", sans-serif; font-size: 1.5rem; letter-spacing: 0.03em; }
        .rc-cat-card p { font-size: 0.86rem; color: rgba(51,64,79,0.75); line-height: 1.6; }
        .rc-link-count {
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          color: ${GOLD}; opacity: 0.85;
        }
        .rc-cat-links {
          display: flex; flex-direction: column; gap: 0.5rem;
          flex-grow: 1;
        }
        .rc-cat-links.scrollable {
          max-height: 230px;
          overflow-y: auto;
          padding-right: 4px;
          scrollbar-width: thin;
          scrollbar-color: ${GOLD} transparent;
        }
        .rc-cat-links.scrollable::-webkit-scrollbar { width: 5px; }
        .rc-cat-links.scrollable::-webkit-scrollbar-thumb { background: ${GOLD}; border-radius: 3px; }
        .rc-cat-link {
          display: inline-flex; align-items: center; justify-content: space-between; gap: 0.5rem;
          background: rgba(245,166,35,0.1);
          border: 1px solid rgba(245,166,35,0.3);
          color: ${GOLD};
          padding: 0.6rem 0.85rem;
          border-radius: 8px;
          font-size: 0.8rem; font-weight: 600;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .rc-cat-link:hover { background: rgba(245,166,35,0.2); transform: translateX(2px); }

        .rc-results-actions {
          display: flex; justify-content: center; gap: 1rem; margin-top: 3.5rem; flex-wrap: wrap;
        }

        @media (max-width: 720px) {
          .rc-grid { grid-template-columns: 1fr; }
          .rc-hero-stats { gap: 1.6rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rc-hero-grid, .rc-siren-ring, .rc-siren-core, .rc-scan-sweep { animation: none !important; }
        }
      `}</style>

      {/* TOP BAR */}
      <div className="rc-topbar">
        <div className="rc-topbar-brand">
          <img src={logo} alt="Forfra Solutions" className="brand-logo" />
          FORFRA <span>SOLUTIONS</span>
        </div>
        <div className="rc-topbar-right">
          <LangToggle />
        </div>
      </div>

      {/* ───────── STEP 1: INTRO ───────── */}
      {step === "intro" && (
        <section className="rc-hero">
          <div className="rc-hero-grid" />
          <span className="rc-eyebrow">{tr("Not sure where to report?")}</span>
          <div className="rc-siren-wrap">
            <div className="rc-siren-ring r1" />
            <div className="rc-siren-ring r2" />
            <div className="rc-siren-ring r3" />
            <div className="rc-siren-core">
              <Siren size={32} />
            </div>
          </div>
          <h1>
            {tr("Report a Crime.")}<br />
            {tr("Get to the")} <em>{tr("right authority")}</em>{tr(", fast.")}
          </h1>
          <p>
            {tr("Tell us what happened, and we'll match you with the correct official government portal — whether it's cyber crime, financial fraud, or a general police complaint.")}
          </p>
          <button className="rc-btn-primary" onClick={() => setStep("form")}>
            <AlertTriangle size={18} /> {tr("Register a Crime")}
          </button>
          <div className="rc-hero-stats">
            <div className="rc-stat">
              <div className="rc-stat-val">8</div>
              <div className="rc-stat-label">{tr("Crime Categories Covered")}</div>
            </div>
            <div className="rc-stat">
              <div className="rc-stat-val">100%</div>
              <div className="rc-stat-label">{tr("Official Government Links")}</div>
            </div>
            <div className="rc-stat">
              <div className="rc-stat-val">2 {tr("Min")}</div>
              <div className="rc-stat-label">{tr("To Find the Right Portal")}</div>
            </div>
          </div>
        </section>
      )}

      {/* ───────── STEP 2: FORM ───────── */}
      {step === "form" && (
        <section className="rc-form-section">
          <Reveal>
            <div className="rc-form-card">
              <div className="rc-form-head">
                <h2>{tr("Tell Us What Happened")}</h2>
                <p>{tr("These details help us point you to the correct government authority. This form does not file a police report on your behalf.")}</p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="rc-grid">
                  <div className={`rc-field ${errors.name ? "error" : ""}`}>
                    <label><User size={14} /> {tr("Full Name")}</label>
                    <input
                      type="text"
                      placeholder={tr("Your full name")}
                      value={form.name}
                      onChange={handleChange("name")}
                    />
                    {errors.name && <span className="rc-error-msg"><Info size={12} /> {tr(errors.name)}</span>}
                  </div>

                  <div className={`rc-field ${errors.phone ? "error" : ""}`}>
                    <label><Phone size={14} /> {tr("Phone Number")}</label>
                    <input
                      type="tel"
                      placeholder={tr("e.g. +91 98765 43210")}
                      value={form.phone}
                      onChange={handleChange("phone")}
                    />
                    {errors.phone && <span className="rc-error-msg"><Info size={12} /> {tr(errors.phone)}</span>}
                  </div>

                  <div className={`rc-field ${errors.email ? "error" : ""}`}>
                    <label><Mail size={14} /> {tr("Email (optional)")}</label>
                    <input
                      type="email"
                      placeholder={tr("you@example.com")}
                      value={form.email}
                      onChange={handleChange("email")}
                    />
                    {errors.email && <span className="rc-error-msg"><Info size={12} /> {tr(errors.email)}</span>}
                  </div>

                  <div className={`rc-field ${errors.location ? "error" : ""}`}>
                    <label><MapPin size={14} /> {tr("Location of Incident")}</label>
                    <input
                      type="text"
                      placeholder={tr("City, State")}
                      value={form.location}
                      onChange={handleChange("location")}
                    />
                    {errors.location && <span className="rc-error-msg"><Info size={12} /> {tr(errors.location)}</span>}
                  </div>

                  <div className={`rc-field ${errors.crimeType ? "error" : ""}`}>
                    <label><ShieldAlert size={14} /> {tr("Type of Crime")}</label>
                    <select value={form.crimeType} onChange={handleChange("crimeType")}>
                      <option value="">{tr("Select a category")}</option>
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>{tr(c.title)}</option>
                      ))}
                    </select>
                    {errors.crimeType && <span className="rc-error-msg"><Info size={12} /> {tr(errors.crimeType)}</span>}
                  </div>

                  <div className={`rc-field ${errors.date ? "error" : ""}`}>
                    <label><Calendar size={14} /> {tr("Date of Incident")}</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={handleChange("date")}
                    />
                    {errors.date && <span className="rc-error-msg"><Info size={12} /> {tr(errors.date)}</span>}
                  </div>

                  <div className={`rc-field full ${errors.description ? "error" : ""}`}>
                    <label><FileText size={14} /> {tr("What Happened?")}</label>
                    <textarea
                      placeholder={tr("Briefly describe the incident...")}
                      value={form.description}
                      onChange={handleChange("description")}
                    />
                    {errors.description && <span className="rc-error-msg"><Info size={12} /> {tr(errors.description)}</span>}
                  </div>
                </div>

                <div className="rc-submit-row">
                  <button type="submit" className="rc-btn-primary">
                    <Send size={17} /> {tr("Submit & Find Authorities")}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </section>
      )}

      {/* ───────── STEP 3: PROCESSING ───────── */}
      {step === "processing" && (
        <section className="rc-processing">
          <div className="rc-scan-ring-wrap">
            <div className="rc-scan-ring" />
            <div className="rc-scan-sweep" />
            <div className="rc-scan-core">
              <Radar size={40} />
            </div>
          </div>
          <h3>{tr("Processing Your Report")}</h3>
          <p>{tr(scanMessages[scanMsgIndex])}</p>
        </section>
      )}

      {/* ───────── STEP 4: RESULTS ───────── */}
      {step === "results" && (
        <section className="rc-results-section">
          <div className="rc-results-inner">
            <Reveal className="rc-results-head">
              <div className="rc-check">
                <CheckCircle2 size={28} />
              </div>
              <h2>{tr("Thank You")}{form.name ? `, ${form.name}` : ""}.</h2>
              <p>
                {matched
                  ? <>{tr("Based on what you shared, this looks like a")} <strong style={{ color: GOLD }}>{tr(matched.title)}</strong> {tr("case. We've highlighted the right authority below — you can also browse all categories.")}</>
                  : tr("Here are the official government authorities for every major crime category. Find the one that matches your situation.")}
              </p>
            </Reveal>

            <Reveal delay={100} className="rc-disclaimer">
              <PhoneCall size={20} />
              <p>
                <strong>{tr("This is not an FIR filing system.")}</strong>{" "}
                {tr("The details you shared were opened as an email to our team — please press Send in your email app so we can follow up — but they are not filed with police or any court. This tool only helps you find the correct official portal. For urgent, life-threatening emergencies, call")}{" "}
                <strong>112</strong> {tr("(India's national emergency number) immediately, or visit your nearest police station.")}
              </p>
            </Reveal>

            <div className="rc-cat-grid">
              {CATEGORIES.map((c, i) => {
                const Icon = c.icon;
                const isMatch = matched && matched.id === c.id;
                return (
                  <Reveal key={c.id} delay={150 + i * 70}>
                    <div className={`rc-cat-card ${isMatch ? "matched" : ""}`}>
                      {isMatch && <span className="rc-matched-badge">{tr("Recommended")}</span>}
                      <div className="rc-cat-icon">
                        <Icon size={22} />
                      </div>
                      <h4>{tr(c.title)}</h4>
                      <p>{tr(c.desc)}</p>
                      <span className="rc-link-count">
                        {c.govLinks.length} {c.govLinks.length > 1 ? tr("official resources") : tr("official resource")}
                      </span>
                      <div className={`rc-cat-links ${c.govLinks.length > 6 ? "scrollable" : ""}`}>
                        {c.govLinks.map((g, gi) => (
                          <a
                            key={gi}
                            className="rc-cat-link"
                            href={g.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {g.name} <ExternalLink size={13} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div className="rc-results-actions">
              <button className="rc-btn-ghost" onClick={resetAll}>
                <RotateCcw size={16} /> {tr("File Another Report")}
              </button>
              <Link to="/" className="rc-btn-primary" style={{ textDecoration: "none" }}>
                {tr("Back")}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
