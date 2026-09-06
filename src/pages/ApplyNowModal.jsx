import { useState, useEffect } from "react";
import {
  Briefcase, X, User, Phone, Mail, FileText, Send,
  CheckCircle2, Info, Clock,
} from "lucide-react";
import { sendFormToWhatsApp } from "../utils/whatsapp";
import { useLanguage } from "./LanguageContext";

/* ══════════════════════════════════════════════════════════════════
   FORFRA SOLUTIONS — APPLY NOW MODAL
   Opens from the navbar / footer "Apply Now" button. Same theme as
   ReportCrimePage (navy + gold, Inter). On submit, the form's data is
   sent to the business WhatsApp number via sendFormToWhatsApp — same
   free wa.me deep-link mechanism used by the Report a Crime form.
   No backend, no file upload: since wa.me can't attach a resume file,
   the success screen asks the applicant to attach their CV directly
   inside the WhatsApp chat that opens.
══════════════════════════════════════════════════════════════════ */

const NAVY = "#0D2F7F";
const NAVY_MID = "#EAF5FD";
const GOLD = "#F5B400";
const GOLD_DIM = "#D89A00";
const ALERT = "#E0483A";
const SLATE = "#5B6B7C";

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  role: "",
  experience: "",
  message: "",
};

export default function ApplyNowModal({ isOpen, onClose }) {
  const { tr } = useLanguage();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Lock background scroll + allow Escape-to-close while the modal is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your name.";
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone.trim())) er.phone = "Please enter a valid phone number.";
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) er.email = "Please enter a valid email.";
    if (!form.role.trim()) er.role = "Please tell us which role you're applying for.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    sendFormToWhatsApp("New Job Application — Forfra Solutions", [
      ["Name", form.name],
      ["Phone", form.phone],
      ["Email", form.email],
      ["Role Applying For", form.role],
      ["Experience", form.experience],
      ["Message", form.message],
    ]);

    setSubmitted(true);
  };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="anm-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <style>{`
        .anm-overlay, .anm-overlay *, .anm-overlay *::before, .anm-overlay *::after { box-sizing: border-box; }
        .anm-overlay {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(8,33,92,0.55);
          backdrop-filter: blur(3px);
          display: flex; align-items: center; justify-content: center;
          padding: 1.25rem;
          overflow-y: auto;
        }
        .anm-card {
          position: relative;
          width: 100%;
          max-width: 560px;
          max-height: calc(100vh - 2.5rem);
          overflow-y: auto;
          background: ${NAVY_MID};
          border: 1px solid rgba(245,166,35,0.3);
          border-radius: 18px;
          padding: 2.4rem 2rem;
          font-family: "Inter", sans-serif;
          color: #33404F;
        }
        .anm-close {
          position: absolute; top: 1rem; right: 1rem;
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(13,47,127,0.06);
          border: none; cursor: pointer; color: #0D2F7F;
        }
        .anm-close:hover { background: rgba(13,47,127,0.12); }

        .anm-head { text-align: center; margin-bottom: 1.6rem; }
        .anm-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(245,166,35,0.15); color: ${GOLD_DIM};
          margin-bottom: 0.9rem;
        }
        .anm-head h2 { font-size: 1.7rem; color: ${NAVY}; margin-bottom: 0.4rem; font-weight: 800; }
        .anm-head p { color: rgba(51,64,79,0.75); font-size: 0.92rem; }

        .anm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; }
        .anm-field { display: flex; flex-direction: column; gap: 0.4rem; min-width: 0; }
        .anm-field.full { grid-column: 1 / -1; }
        .anm-field label {
          font-size: 0.76rem; font-weight: 600; color: rgba(51,64,79,0.9);
          display: flex; align-items: center; gap: 0.35rem;
        }
        .anm-field label svg { color: ${GOLD_DIM}; }
        .anm-field input, .anm-field textarea {
          width: 100%;
          background: rgba(13,47,127,0.04);
          border: 1.5px solid rgba(13,47,127,0.2);
          border-radius: 8px;
          padding: 0.7rem 0.85rem;
          color: #23262B;
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
        }
        .anm-field input::placeholder, .anm-field textarea::placeholder { color: rgba(51,64,79,0.45); }
        .anm-field input:focus, .anm-field textarea:focus {
          outline: none;
          border-color: ${GOLD};
          box-shadow: 0 0 0 3px rgba(245,166,35,0.18);
        }
        .anm-field.error input, .anm-field.error textarea { border-color: ${ALERT}; }
        .anm-error-msg { font-size: 0.74rem; color: ${ALERT}; display: flex; align-items: center; gap: 0.3rem; }
        .anm-field textarea { resize: vertical; min-height: 80px; }

        .anm-submit-row { margin-top: 1.6rem; display: flex; justify-content: center; }
        .anm-submit {
          display: inline-flex; align-items: center; gap: 0.55rem;
          background: ${GOLD}; color: ${NAVY};
          font-weight: 700; font-size: 0.95rem;
          padding: 0.85rem 2rem;
          border-radius: 6px; border: 2px solid ${GOLD};
          cursor: pointer;
        }
        .anm-submit:hover { background: ${GOLD_DIM}; border-color: ${GOLD_DIM}; }

        .anm-note {
          margin-top: 1.3rem;
          display: flex; gap: 0.6rem; align-items: flex-start;
          background: rgba(13,47,127,0.05);
          border: 1px solid rgba(13,47,127,0.12);
          border-radius: 10px;
          padding: 0.8rem 1rem;
        }
        .anm-note svg { color: ${GOLD_DIM}; flex-shrink: 0; margin-top: 2px; }
        .anm-note p { margin: 0; font-size: 0.8rem; color: rgba(51,64,79,0.85); line-height: 1.55; }

        .anm-success { text-align: center; padding: 1rem 0 0.5rem; }
        .anm-success svg { color: #22C55E; margin-bottom: 1rem; }
        .anm-success h3 { font-size: 1.5rem; color: ${NAVY}; margin-bottom: 0.7rem; font-weight: 800; }
        .anm-success p { color: rgba(51,64,79,0.8); font-size: 0.92rem; line-height: 1.6; max-width: 420px; margin: 0 auto 1.6rem; }

        @media (max-width: 560px) {
          .anm-card { padding: 1.8rem 1.3rem; border-radius: 14px; }
          .anm-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="anm-card" role="dialog" aria-modal="true" aria-label={tr("Apply Now")}>
        <button className="anm-close" onClick={handleClose} aria-label="Close">
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <div className="anm-head">
              <div className="anm-icon">
                <Briefcase size={24} />
              </div>
              <h2>{tr("Apply Now")}</h2>
              <p>{tr("Tell us a bit about yourself — we'll reach out over WhatsApp.")}</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="anm-grid">
                <div className={`anm-field ${errors.name ? "error" : ""}`}>
                  <label><User size={13} /> {tr("Full Name")}</label>
                  <input
                    type="text"
                    placeholder={tr("Your full name")}
                    value={form.name}
                    onChange={handleChange("name")}
                  />
                  {errors.name && <span className="anm-error-msg"><Info size={12} /> {tr(errors.name)}</span>}
                </div>

                <div className={`anm-field ${errors.phone ? "error" : ""}`}>
                  <label><Phone size={13} /> {tr("Phone Number")}</label>
                  <input
                    type="tel"
                    placeholder={tr("e.g. +91 98765 43210")}
                    value={form.phone}
                    onChange={handleChange("phone")}
                  />
                  {errors.phone && <span className="anm-error-msg"><Info size={12} /> {tr(errors.phone)}</span>}
                </div>

                <div className={`anm-field ${errors.email ? "error" : ""}`}>
                  <label><Mail size={13} /> {tr("Email (optional)")}</label>
                  <input
                    type="email"
                    placeholder={tr("you@example.com")}
                    value={form.email}
                    onChange={handleChange("email")}
                  />
                  {errors.email && <span className="anm-error-msg"><Info size={12} /> {tr(errors.email)}</span>}
                </div>

                <div className={`anm-field ${errors.role ? "error" : ""}`}>
                  <label><Briefcase size={13} /> {tr("Role Applying For")}</label>
                  <input
                    type="text"
                    placeholder={tr("e.g. Cyber Investigator")}
                    value={form.role}
                    onChange={handleChange("role")}
                  />
                  {errors.role && <span className="anm-error-msg"><Info size={12} /> {tr(errors.role)}</span>}
                </div>

                <div className="anm-field full">
                  <label><Clock size={13} /> {tr("Experience (optional)")}</label>
                  <input
                    type="text"
                    placeholder={tr("e.g. 2 years / Fresher")}
                    value={form.experience}
                    onChange={handleChange("experience")}
                  />
                </div>

                <div className="anm-field full">
                  <label><FileText size={13} /> {tr("Message (optional)")}</label>
                  <textarea
                    placeholder={tr("Anything you'd like us to know...")}
                    value={form.message}
                    onChange={handleChange("message")}
                  />
                </div>
              </div>

              <div className="anm-submit-row">
                <button type="submit" className="anm-submit">
                  <Send size={16} /> {tr("Send Application")}
                </button>
              </div>
            </form>

            <div className="anm-note">
              <Info size={16} />
              <p>{tr("Your details will open in WhatsApp addressed to our team — please attach your resume/CV there before hitting send.")}</p>
            </div>
          </>
        ) : (
          <div className="anm-success">
            <CheckCircle2 size={44} />
            <h3>{tr("Thank You!")}</h3>
            <p>{tr("Your details were sent to WhatsApp. Please attach your resume/CV in the chat and hit send — our team will get back to you soon.")}</p>
            <button className="anm-submit" onClick={handleClose}>{tr("Close")}</button>
          </div>
        )}
      </div>
    </div>
  );
}
