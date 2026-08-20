import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./pages/LanguageContext";

import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import ServicesPage from "./ServicesPage";
import ReportCrimePage from "./pages/ReportCrimePage";
import BookLawyerPage from "./pages/BookLawyerPage";
import BookLawyerDay1Page from "./pages/BookLawyerDay1Page";
import BookLawyerInBetweenPage from "./pages/BookLawyerInBetweenPage";
import ForensicExpertPage from "./pages/ForensicExpertPage";
import LegalDraftingPage from "./pages/LegalDraftingPage";
import CorporateCrimeAwarenessPage from "./pages/CorporateCrimeAwarenessPage";
import SchoolCrimeAwarenessPage from "./pages/SchoolCrimeAwarenessPage";

import DataSecurityPage from "./pages/services/DataSecurityPage";
import ForensicAuditPage from "./pages/services/ForensicAuditPage";
import DigitalForensicsPage from "./pages/services/DigitalForensicsPage";
import FraudInvestigationPage from "./pages/services/FraudInvestigationPage";
import InvestigationsPage from "./pages/services/InvestigationsPage";
import LegalConsultationPage from "./pages/services/LegalConsultationPage";
import DocumentExaminationPage from "./pages/services/DocumentExaminationPage";
import CyberInvestigationPage from "./pages/services/CyberInvestigationPage";

import WhatsAppButton from "./pages/WhatsAppButton";
import "./theme-brochure-override.css"; // imported last — brochure theme wins over every page's own CSS

/* Ensures every route change starts scrolled to the top of the page
   instead of resuming the previous page's scroll position (fixes the
   "opens in the middle of the page" issue when navigating). Hash links
   like /#contact still scroll to their target section as expected. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return; // let in-page anchor links do their own thing
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/report-crime" element={<ReportCrimePage />} />
          <Route path="/book-lawyer" element={<BookLawyerPage />} />
          <Route path="/book-lawyer/day-1" element={<BookLawyerDay1Page />} />
          <Route path="/book-lawyer/in-between" element={<BookLawyerInBetweenPage />} />
          <Route path="/forensic-expert" element={<ForensicExpertPage />} />
          <Route path="/legal-drafting" element={<LegalDraftingPage />} />
          <Route path="/corporate-crime-awareness" element={<CorporateCrimeAwarenessPage />} />
          <Route path="/school-crime-awareness" element={<SchoolCrimeAwarenessPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/data-security" element={<DataSecurityPage />} />
          <Route path="/services/forensic-audit" element={<ForensicAuditPage />} />
          <Route path="/services/digital-forensics" element={<DigitalForensicsPage />} />
          <Route path="/services/fraud-investigation" element={<FraudInvestigationPage />} />
          <Route path="/services/investigations" element={<InvestigationsPage />} />
          <Route path="/services/legal-consultation" element={<LegalConsultationPage />} />
          <Route path="/services/document-examination" element={<DocumentExaminationPage />} />
          <Route path="/services/cyber-investigation" element={<CyberInvestigationPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <WhatsAppButton />
      </BrowserRouter>
    </LanguageProvider>
  );
}