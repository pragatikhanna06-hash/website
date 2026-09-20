import ServiceIllustration from "./ServiceIllustrations";
import "./ServiceHeroVisual.css";

/* ----------------------------------------------------------------------
   Hero visual shared by every /services/* page.
   Replaces the old animated radar circles with a professional illustrated
   "case board" (inline SVG, see ServiceIllustrations.jsx) in a framed card
   with a brand-gold offset outline and a navy service-icon badge.

   Props
     variant  — which illustration: fraud | data-security | forensic-audit |
                digital-forensics | investigations | legal | document | cyber
     label    — short description of the illustration (screen readers)
     Icon     — lucide icon component that represents the service
------------------------------------------------------------------------- */
export default function ServiceHeroVisual({ variant, label, Icon }) {
  return (
    <div className="fa-hv">
      <div className="fa-hv-art">
        <ServiceIllustration variant={variant} label={label} />
      </div>
      {Icon && (
        <div className="fa-hv-badge" aria-hidden="true">
          <Icon size={24} />
        </div>
      )}
    </div>
  );
}
