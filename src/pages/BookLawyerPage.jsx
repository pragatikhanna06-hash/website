import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import LangToggle from "./LangToggle";
import { CalendarClock, History, ArrowRight } from "lucide-react";
import "./BookLawyerPage.css";
import ForfraBrand from "./ForfraBrand";

export default function BookLawyerPage() {
  const { tr } = useLanguage();
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

      <section className="page-hero bl-hero">
        <div className="wrap">
          <div className="eyebrow">{tr("Book a Lawyer")}</div>
          <h1 className="bl-h1">{tr("When does your case need a lawyer —")}<br /><em>{tr("now, or already underway?")}</em></h1>
          <p className="bl-p">{tr("Pick the path that matches where you are. Both connect you to a verified criminal lawyer — the only difference is where in the case they step in.")}</p>
        </div>
      </section>

      <section className="page-body">
        <div className="wrap">
          <div className="choice-cards">
            <Link to="/book-lawyer/day-1" className="choice-card featured">
              <span className="tag">{tr("Flagship")}</span>
              <div className="icon-box"><CalendarClock size={26} /></div>
              <h3>{tr("Lawyer from Day 1 of the Case")}</h3>
              <p>{tr("File your report and get a lawyer assigned the same day — before evidence goes cold and while every detail is still fresh.")}</p>
              <span className="go">{tr("Start this path")} <ArrowRight size={15} /></span>
            </Link>

            <Link to="/book-lawyer/in-between" className="choice-card alt">
              <span className="tag" style={{ background: "#2fbfa6" }}>{tr("Mid-Case")}</span>
              <div className="icon-box"><History size={26} /></div>
              <h3>{tr("Lawyer in Between the Case")}</h3>
              <p>{tr("Already have an ongoing case — with or without a lawyer — and need someone to step in now? Get matched based on where things currently stand.")}</p>
              <span className="go">{tr("Start this path")} <ArrowRight size={15} /></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}