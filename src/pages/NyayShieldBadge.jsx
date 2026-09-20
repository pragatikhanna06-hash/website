import "./NyayShieldBadge.css";

/* ----------------------------------------------------------------------
   NyayShield badge — the NyayShield shield-and-scales logo mark plus the
   two-tone wordmark (NYAY in navy, SHIELD in gold), inside a pill.
   Shown above the "We are here to support you" heading.

   `label` is the (translated) product name, e.g. "NyayShield" or
   "न्यायशील्ड"; it is split at "Shield"/"शील्ड" so both halves keep the
   two-colour treatment in either language.
------------------------------------------------------------------------- */
export function NyayShieldMark({ size = 22 }) {
  return (
    <svg className="ns-badge-mark" width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M24 4L6 12v10c0 11 7.6 19.6 18 22 10.4-2.4 18-11 18-22V12L24 4z"
        stroke="#E8971A" strokeWidth="2.6" fill="rgba(232,151,26,0.14)"
      />
      <path
        d="M24 14v20M17 20l7-4 7 4M17 20c0 3-2 6-4 6h8c-2 0-4-3-4-6M31 20c0 3-2 6-4 6h8c-2 0-4-3-4-6"
        stroke="#0D2F7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NyayShieldBadge({ label = "NyayShield" }) {
  const m = String(label).match(/^(.*?)(shield|शील्ड)$/i);
  const first = m ? m[1] : label;
  const second = m ? m[2] : "";
  return (
    <div className="eyebrow ns-badge" style={{ justifyContent: "center" }}>
      <NyayShieldMark />
      <span className="ns-badge-word">
        <span className="ns-badge-nyay">{first}</span>
        {second && <span className="ns-badge-shield">{second}</span>}
      </span>
    </div>
  );
}
