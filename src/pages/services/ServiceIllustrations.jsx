/* ----------------------------------------------------------------------
   Hero illustrations for the /services/* pages.
   One "case-board" scene per service, all drawn as inline SVG in the same
   navy + gold system as the rest of the site. They are deliberately static
   and contain no <img> (the site theme hides images and animations), and
   the only text inside them is language-neutral (codes / numerals).
   Canvas: 440 x 528.
------------------------------------------------------------------------- */

const NAVY_DEEP = "#08215C";
const NAVY = "#0D2F7F";
const BLUE = "#1B4DB8";
const SKY = "#BFD6FF";
const ICE = "#EAF2FF";
const GOLD = "#F5B400";
const GOLD_SOFT = "#FCE29B";
const MONO = "'SFMono-Regular', Menlo, Consolas, 'Courier New', monospace";

/* ── shared building blocks ─────────────────────────────────────────── */

function Defs() {
  return (
    <defs>
      <linearGradient id="hv-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#14409F" />
        <stop offset="1" stopColor="#08215C" />
      </linearGradient>
      <radialGradient id="hv-glow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#F5B400" stopOpacity="0.32" />
        <stop offset="1" stopColor="#F5B400" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="hv-gold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFD54F" />
        <stop offset="1" stopColor="#E8971A" />
      </linearGradient>
      <linearGradient id="hv-area" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1B4DB8" stopOpacity="0.35" />
        <stop offset="1" stopColor="#1B4DB8" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="hv-glass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.08" />
      </linearGradient>
      <pattern id="hv-grid" width="28" height="28" patternUnits="userSpaceOnUse">
        <path d="M28 0H0V28" fill="none" stroke="#FFFFFF" strokeOpacity="0.06" />
      </pattern>
      <filter id="hv-shadow" x="-20%" y="-20%" width="140%" height="160%">
        <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#031028" floodOpacity="0.38" />
      </filter>
      <filter id="hv-shadow-sm" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#031028" floodOpacity="0.3" />
      </filter>
    </defs>
  );
}

function Chrome({ tag }) {
  return (
    <g>
      <rect width="440" height="528" fill="url(#hv-bg)" />
      <rect width="440" height="528" fill="url(#hv-grid)" />
      <circle cx="404" cy="26" r="180" fill="url(#hv-glow)" />
      {[26, 40, 54].map((x) => (
        <circle key={x} cx={x} cy="24" r="4" fill="#fff" fillOpacity="0.32" />
      ))}
      <rect x="292" y="16" width="122" height="16" rx="8" fill="#fff" fillOpacity="0.12" />
      <text x="353" y="27.5" textAnchor="middle" fontSize="8.5" fill="#fff" fillOpacity="0.8" fontFamily={MONO} letterSpacing="1.6">
        {tag}
      </text>
    </g>
  );
}

const Card = ({ x, y, w, h, r = 12, fill = "#fff", op = 1, shadow = true }) => (
  <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} fillOpacity={op} filter={shadow ? "url(#hv-shadow)" : undefined} />
);

const Bar = ({ x, y, w, h = 6, fill = SKY, op = 1 }) => (
  <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} fillOpacity={op} />
);

/** straight edge between two node centres, trimmed to the node radius, with an arrow head */
function Edge({ a, b, ra = 20, rb = 20, color = SKY, w = 1.8, dash, head = true, op = 1 }) {
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const x1 = a[0] + ra * Math.cos(ang), y1 = a[1] + ra * Math.sin(ang);
  const x2 = b[0] - rb * Math.cos(ang), y2 = b[1] - rb * Math.sin(ang);
  const L = 8;
  const p1 = [x2 - L * Math.cos(ang - 0.5), y2 - L * Math.sin(ang - 0.5)];
  const p2 = [x2 - L * Math.cos(ang + 0.5), y2 - L * Math.sin(ang + 0.5)];
  return (
    <g opacity={op}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeDasharray={dash} strokeLinecap="round" />
      {head && <path d={`M${x2} ${y2} L${p1[0]} ${p1[1]} L${p2[0]} ${p2[1]} Z`} fill={color} />}
    </g>
  );
}

function Magnifier({ cx, cy, r, handle = 56, ring = "url(#hv-gold)" }) {
  const k = Math.SQRT1_2;
  const sx = cx + r * k, sy = cy + r * k;
  return (
    <g filter="url(#hv-shadow-sm)">
      <line x1={sx + 2} y1={sy + 2} x2={sx + handle} y2={sy + handle} stroke="#0A1A45" strokeWidth="16" strokeLinecap="round" />
      <line x1={sx + 2} y1={sy + 2} x2={sx + handle} y2={sy + handle} stroke="#123B98" strokeWidth="11" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={r} fill="url(#hv-glass)" stroke={ring} strokeWidth="9" />
      <path d={`M${cx - r * 0.62} ${cy - r * 0.1} A${r * 0.66} ${r * 0.66} 0 0 1 ${cx - r * 0.08} ${cy - r * 0.62}`} fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="3.5" strokeLinecap="round" />
    </g>
  );
}

const Coin = ({ r = 9, stroke = NAVY, sw = 2 }) => (
  <g fill="none" stroke={stroke} strokeWidth={sw}>
    <circle r={r} />
    <circle r={r * 0.55} strokeOpacity="0.7" />
  </g>
);

const Person = ({ s = 1, fill = NAVY }) => (
  <g transform={`scale(${s})`} fill={fill}>
    <circle cx="0" cy="-5" r="7" />
    <path d="M-13 13 a13 13 0 0 1 26 0 z" />
  </g>
);

/* ── 1 · FRAUD & FINANCIAL — follow the money ───────────────────────── */
function Fraud() {
  const A = [76, 300], B = [178, 244], C = [178, 356], D = [270, 212], E = [270, 300], F = [270, 388], G = [366, 300];
  const dash = "5 5";
  return (
    <g>
      <Chrome tag="TRACE 2041-FR" />
      {/* trend card with anomaly spike */}
      <Card x="28" y="50" w="384" h="118" />
      <Bar x="44" y="64" w="74" h="7" fill={NAVY} />
      <Bar x="44" y="78" w="46" h="5" fill={SKY} />
      <path d="M44 146 L82 142 L120 148 L158 140 L196 144 L234 137 L272 142 L302 138 L316 88 L332 140 L372 134 L396 138 V150 H44 Z" fill="url(#hv-area)" />
      <path d="M44 146 L82 142 L120 148 L158 140 L196 144 L234 137 L272 142 L302 138 L316 88 L332 140 L372 134 L396 138" fill="none" stroke={BLUE} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" />
      <line x1="316" y1="94" x2="316" y2="150" stroke={GOLD} strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="316" cy="88" r="7" fill={GOLD} stroke="#fff" strokeWidth="2.5" />
      <rect x="330" y="66" width="62" height="20" rx="10" fill={NAVY} />
      <text x="361" y="79.5" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={GOLD} fontFamily={MONO} letterSpacing="1">+412%</text>

      {/* transaction trail */}
      <g>
        <Edge a={A} b={B} ra={24} rb={19} color={GOLD} w={3} />
        <Edge a={A} b={C} ra={24} rb={19} color={SKY} w={1.8} dash={dash} op={0.7} />
        <Edge a={B} b={D} ra={19} rb={17} color={SKY} w={1.8} dash={dash} op={0.7} />
        <Edge a={B} b={E} ra={19} rb={17} color={GOLD} w={3} />
        <Edge a={C} b={E} ra={19} rb={17} color={SKY} w={1.8} dash={dash} op={0.7} />
        <Edge a={C} b={F} ra={19} rb={17} color={SKY} w={1.8} dash={dash} op={0.7} />
        <Edge a={D} b={G} ra={17} rb={27} color={SKY} w={1.8} dash={dash} op={0.7} />
        <Edge a={E} b={G} ra={17} rb={27} color={GOLD} w={3} />
        <Edge a={F} b={G} ra={17} rb={27} color={SKY} w={1.8} dash={dash} op={0.7} />

        {/* origin */}
        <g transform={`translate(${A[0]} ${A[1]})`} filter="url(#hv-shadow-sm)">
          <circle r="25" fill={NAVY_DEEP} stroke={GOLD} strokeWidth="3" />
          <g transform="translate(0 0)"><Coin r={11} stroke={GOLD} sw={2.2} /></g>
        </g>
        {/* intermediaries */}
        {[B, C].map((p, i) => (
          <g key={i} transform={`translate(${p[0]} ${p[1]})`} filter="url(#hv-shadow-sm)">
            <circle r="19" fill="#fff" />
            <Coin r={8} />
          </g>
        ))}
        {/* shell entities */}
        {[D, E, F].map((p, i) => (
          <g key={i} transform={`translate(${p[0]} ${p[1]})`} filter="url(#hv-shadow-sm)">
            <rect x="-17" y="-17" width="34" height="34" rx="9" fill={i === 1 ? "#fff" : ICE} />
            <rect x="-8" y="-9" width="16" height="18" rx="2" fill="none" stroke={NAVY} strokeWidth="2" />
            <path d="M-4 -4h8M-4 0h8M-4 4h5" stroke={NAVY} strokeWidth="1.6" strokeLinecap="round" />
          </g>
        ))}
        {/* flagged destination */}
        <g transform={`translate(${G[0]} ${G[1]})`} filter="url(#hv-shadow)">
          <circle r="27" fill="url(#hv-gold)" />
          <circle r="20" fill="#fff" />
          <path d="M0 -11 L11 8 H-11 Z" fill={NAVY} />
          <rect x="-1.5" y="-4" width="3" height="7" rx="1.5" fill="#fff" />
          <circle cx="0" cy="5.2" r="1.7" fill="#fff" />
        </g>
      </g>

      {/* ledger */}
      <Card x="28" y="428" w="384" h="74" />
      {[0, 1, 2].map((i) => {
        const y = 440 + i * 20;
        const hot = i === 1;
        return (
          <g key={i}>
            {hot && <rect x="36" y={y - 3} width="368" height="18" rx="6" fill={GOLD_SOFT} />}
            <circle cx="52" cy={y + 6} r="5" fill={hot ? GOLD : SKY} />
            <Bar x="66" y={y + 3} w={hot ? 120 : 96 - i * 12} h="6" fill={hot ? NAVY : "#9DB8E8"} />
            <Bar x="290" y={y + 3} w="64" h="6" fill={hot ? NAVY : SKY} />
            <Bar x="364" y={y + 3} w="28" h="6" fill={hot ? GOLD : "#D6E4FF"} />
          </g>
        );
      })}
    </g>
  );
}

/* ── 2 · DATA SECURITY — layered vault ──────────────────────────────── */
function plate(cx, cy, hw, hh, th, top, left, right, stroke) {
  const P = (pts) => pts.map((p) => p.join(",")).join(" ");
  return (
    <g>
      <polygon points={P([[cx - hw, cy], [cx, cy + hh], [cx, cy + hh + th], [cx - hw, cy + th]])} fill={left} />
      <polygon points={P([[cx, cy + hh], [cx + hw, cy], [cx + hw, cy + th], [cx, cy + hh + th]])} fill={right} />
      <polygon points={P([[cx - hw, cy], [cx, cy - hh], [cx + hw, cy], [cx, cy + hh]])} fill={top} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      <polygon points={P([[cx - hw * 0.62, cy], [cx, cy - hh * 0.62], [cx + hw * 0.62, cy], [cx, cy + hh * 0.62]])} fill="none" stroke={stroke} strokeOpacity="0.5" strokeWidth="1.2" />
    </g>
  );
}
function DataSecurity() {
  const cx = 220, hw = 146, hh = 66, th = 16;
  return (
    <g>
      <Chrome tag="VAULT 07-DS" />
      {/* vertical guides between layers */}
      {[-hw + 2, hw - 2].map((dx, i) => (
        <line key={i} x1={cx + dx} y1="300" x2={cx + dx} y2="470" stroke={SKY} strokeOpacity="0.4" strokeDasharray="3 5" />
      ))}
      <g filter="url(#hv-shadow)">
        {plate(cx, 410, hw, hh, th, "#1A4AB0", "#0F2F80", "#0B2569", SKY)}
        {plate(cx, 346, hw, hh, th, "#2A63D6", "#1A4AB0", "#123B98", SKY)}
        {plate(cx, 282, hw, hh, th, "#EAF2FF", "#9DB8E8", "#7FA0DC", GOLD)}
      </g>
      {/* data dots on the layers */}
      {[-60, -20, 20, 60].map((dx, i) => (
        <circle key={i} cx={cx + dx} cy={346 + (i % 2 ? 6 : -6)} r="3" fill={SKY} fillOpacity="0.85" />
      ))}
      {[-70, -30, 30, 70].map((dx, i) => (
        <circle key={i} cx={cx + dx} cy={410 + (i % 2 ? -5 : 5)} r="3" fill={SKY} fillOpacity="0.7" />
      ))}
      {/* shield + lock */}
      <g transform="translate(220 178)" filter="url(#hv-shadow)">
        <path d="M0 -84 L64 -58 V4 C64 50 34 80 0 96 C-34 80 -64 50 -64 4 V-58 Z" fill={NAVY_DEEP} stroke="url(#hv-gold)" strokeWidth="5" strokeLinejoin="round" />
        <path d="M0 -70 L52 -49 V3 C52 41 28 66 0 80 C-28 66 -52 41 -52 3 V-49 Z" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="1.5" />
        <rect x="-19" y="-6" width="38" height="32" rx="7" fill="#fff" />
        <path d="M-11 -6 V-16 a11 11 0 0 1 22 0 V-6" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        <circle cx="0" cy="8" r="5" fill={NAVY} />
        <rect x="-2" y="10" width="4" height="9" rx="2" fill={NAVY} />
      </g>
      {/* spec pills */}
      <g fontFamily={MONO} fontSize="10" fontWeight="700" letterSpacing="1.2">
        <rect x="30" y="74" width="82" height="24" rx="12" fill="#fff" fillOpacity="0.14" />
        <text x="71" y="90" textAnchor="middle" fill="#fff">AES-256</text>
        <rect x="340" y="120" width="70" height="24" rx="12" fill={GOLD} />
        <text x="375" y="136" textAnchor="middle" fill={NAVY_DEEP}>2FA</text>
        <rect x="30" y="118" width="64" height="24" rx="12" fill="#fff" fillOpacity="0.14" />
        <text x="62" y="134" textAnchor="middle" fill="#fff">RBAC</text>
      </g>
      {/* status footer */}
      <Card x="30" y="482" w="380" h="30" r="15" fill="#fff" op={0.1} shadow={false} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx={54 + i * 92} cy="497" r="5" fill={GOLD} />
          <path d={`M${51.2 + i * 92} 497.2 l2 2 l3.6 -4`} fill="none" stroke={NAVY_DEEP} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <Bar x={66 + i * 92} y="494.5" w="54" h="5" fill="#fff" op={0.5} />
        </g>
      ))}
    </g>
  );
}

/* ── 3 · FORENSIC AUDIT — ledger under the lens ─────────────────────── */
function ForensicAudit() {
  const rows = [0, 1, 2, 3, 4, 5];
  return (
    <g>
      <Chrome tag="AUDIT 118-FA" />
      {/* ledger */}
      <Card x="28" y="56" w="272" h="300" />
      <path d="M28 68 a12 12 0 0 1 12 -12 h248 a12 12 0 0 1 12 12 v22 h-272 z" fill={NAVY} />
      <Bar x="44" y="68" w="86" h="7" fill="#fff" op={0.9} />
      <Bar x="44" y="79" w="52" h="5" fill="#fff" op={0.45} />
      {rows.map((i) => {
        const y = 106 + i * 40;
        const flag = i === 2 || i === 4;
        return (
          <g key={i}>
            {flag && <rect x="36" y={y - 8} width="256" height="32" rx="8" fill={GOLD_SOFT} />}
            <rect x="46" y={y} width="16" height="16" rx="4" fill={flag ? GOLD : "#D6E4FF"} />
            {flag && <path d={`M50 ${y + 8} l3 3 l6 -6`} fill="none" stroke={NAVY_DEEP} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
            <Bar x="74" y={y + 2} w={112 - (i % 3) * 14} h="6" fill={NAVY} op={flag ? 1 : 0.85} />
            <Bar x="74" y={y + 12} w={70 - (i % 2) * 10} h="4" fill="#9DB8E8" />
            <Bar x="220" y={y + 5} w="60" h="6" fill={flag ? NAVY : "#9DB8E8"} />
          </g>
        );
      })}

      {/* bar chart */}
      <Card x="318" y="56" w="94" h="130" />
      <Bar x="330" y="68" w="40" h="6" fill={NAVY} />
      {[26, 42, 34, 58, 76].map((h, i) => (
        <rect key={i} x={332 + i * 15} y={172 - h} width="10" height={h} rx="3" fill={i === 4 ? "url(#hv-gold)" : "#7FA0DC"} />
      ))}

      {/* compliance gauge */}
      <Card x="318" y="204" w="94" h="86" />
      <g transform="translate(365 252)">
        <path d="M-28 0 A28 28 0 0 1 28 0" fill="none" stroke="#D6E4FF" strokeWidth="9" strokeLinecap="round" />
        <path d="M-28 0 A28 28 0 0 1 14 -24.2" fill="none" stroke={NAVY} strokeWidth="9" strokeLinecap="round" />
        <circle cx="14" cy="-24.2" r="4.5" fill={GOLD} />
      </g>
      <text x="365" y="278" textAnchor="middle" fontSize="12" fontWeight="800" fill={NAVY} fontFamily={MONO}>94%</text>

      {/* magnifier on a flagged row */}
      <Magnifier cx="238" cy="244" r="50" handle={60} />
      <clipPath id="hv-lens-fa"><circle cx="238" cy="244" r="46" /></clipPath>
      <g clipPath="url(#hv-lens-fa)">
        <rect x="188" y="198" width="100" height="92" fill="#fff" fillOpacity="0.9" />
        <rect x="188" y="222" width="100" height="44" fill={GOLD_SOFT} />
        <rect x="200" y="232" width="22" height="22" rx="6" fill={GOLD} />
        <path d="M206 243 l5 5 l9 -10" fill="none" stroke={NAVY_DEEP} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <Bar x="230" y="234" w="46" h="8" fill={NAVY} />
        <Bar x="230" y="248" w="30" h="6" fill="#7FA0DC" />
      </g>

      {/* findings strip */}
      <Card x="28" y="384" w="384" h="118" />
      <Bar x="44" y="400" w="96" h="7" fill={NAVY} />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${44 + i * 124} 424)`}>
          <rect width="108" height="62" rx="10" fill={i === 1 ? GOLD_SOFT : ICE} />
          <rect x="10" y="10" width="22" height="22" rx="7" fill={i === 1 ? GOLD : NAVY} />
          <path d={i === 1 ? "M21 15 v8 M21 26.5 v.5" : "M15.5 21 l4 4 l7 -8"} fill="none" stroke={i === 1 ? NAVY_DEEP : "#fff"} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <Bar x="10" y="42" w="60" h="6" fill={NAVY} op={0.85} />
          <Bar x="10" y="52" w="38" h="4" fill="#9DB8E8" />
          <text x="98" y="26" textAnchor="end" fontSize="13" fontWeight="800" fill={NAVY} fontFamily={MONO}>{["128", "07", "121"][i]}</text>
        </g>
      ))}
    </g>
  );
}

/* ── 4 · DIGITAL FORENSICS — device, hex dump, chain of custody ─────── */
function DigitalForensics() {
  const hex = [
    [70, 34, 52, 24, 40], [46, 60, 30, 44], [80, 26, 62, 36, 22], [38, 72, 28, 50],
    [64, 40, 58, 30], [52, 24, 76, 40, 30], [34, 66, 44, 56],
  ];
  return (
    <g>
      <Chrome tag="IMG 5C7A-DF" />
      {/* laptop */}
      <g filter="url(#hv-shadow)">
        <rect x="44" y="62" width="262" height="178" rx="14" fill="#0A1A45" stroke="#DDE8FF" strokeWidth="6" />
        <path d="M22 250 H328 L316 268 a8 8 0 0 1 -7 4 H41 a8 8 0 0 1 -7 -4 Z" fill="#DDE8FF" />
        <rect x="150" y="250" width="50" height="5" rx="2.5" fill="#9DB8E8" />
      </g>
      <rect x="58" y="76" width="234" height="150" rx="6" fill="#0A1A45" />
      {hex.map((row, r) => {
        let x = 96;
        const y = 92 + r * 18;
        return (
          <g key={r}>
            <rect x="72" y={y} width="14" height="6" rx="3" fill={SKY} fillOpacity="0.35" />
            {row.map((w, i) => {
              const bx = x; x += w + 8;
              const hot = r === 3 && i === 1;
              return <rect key={i} x={bx} y={y} width={w} height="6" rx="3" fill={hot ? GOLD : i % 2 ? "#5B88E6" : "#9DB8E8"} fillOpacity={hot ? 1 : 0.9} />;
            })}
          </g>
        );
      })}
      <rect x="66" y="142" width="218" height="15" rx="5" fill={GOLD} fillOpacity="0.16" stroke={GOLD} strokeOpacity="0.6" />

      {/* phone */}
      <g filter="url(#hv-shadow)" transform="translate(328 118) rotate(6)">
        <rect x="0" y="0" width="80" height="150" rx="14" fill="#0A1A45" stroke="#DDE8FF" strokeWidth="5" />
        <rect x="30" y="7" width="20" height="4" rx="2" fill="#DDE8FF" fillOpacity="0.7" />
        <rect x="10" y="26" width="46" height="18" rx="9" fill="#2A63D6" />
        <rect x="24" y="52" width="46" height="18" rx="9" fill="#EAF2FF" />
        <rect x="10" y="78" width="38" height="18" rx="9" fill="#2A63D6" />
        <rect x="24" y="104" width="46" height="18" rx="9" fill={GOLD} />
        <path d="M32 113 l5 5 l9 -10" fill="none" stroke={NAVY_DEEP} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* chain of custody */}
      <Card x="28" y="306" w="384" h="196" />
      <Bar x="44" y="322" w="104" h="7" fill={NAVY} />
      <Bar x="44" y="335" w="64" h="5" fill="#9DB8E8" />
      {[0, 1, 2, 3].map((i) => {
        const cx = 80 + i * 90;
        return (
          <g key={i}>
            {i < 3 && <line x1={cx + 22} y1="398" x2={cx + 68} y2="398" stroke={i < 2 ? NAVY : SKY} strokeWidth="3" strokeDasharray={i < 2 ? undefined : "4 4"} />}
            <polygon points={`${cx},374 ${cx + 21},386 ${cx + 21},410 ${cx},422 ${cx - 21},410 ${cx - 21},386`} fill={i === 3 ? "#EAF2FF" : NAVY} stroke={i === 3 ? SKY : GOLD} strokeWidth="2.5" />
            {i === 0 && <g transform={`translate(${cx} 398)`} fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><rect x="-8" y="-6" width="16" height="12" rx="2" /><path d="M-4 9h8" /></g>}
            {i === 1 && <g transform={`translate(${cx} 398)`} fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><rect x="-6" y="-9" width="12" height="18" rx="3" /><path d="M-2 5h4" /></g>}
            {i === 2 && <g transform={`translate(${cx} 398)`} fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M-8 -3 h16 v11 h-16 z M-8 -3 l3 -5 h10 l3 5" /></g>}
            {i === 3 && <g transform={`translate(${cx} 398)`} fill="none" stroke={NAVY} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M-7 1 l5 5 l9 -11" /></g>}
          </g>
        );
      })}
      {/* hash line */}
      <rect x="44" y="440" width="352" height="44" rx="10" fill={ICE} />
      <path d="M62 462 v-5 a7 7 0 0 1 14 0 v5" fill="none" stroke={NAVY} strokeWidth="2.6" strokeLinecap="round" />
      <rect x="58" y="462" width="22" height="16" rx="4" fill={NAVY} />
      <text x="92" y="467" fontSize="10.5" fontWeight="700" fill={NAVY} fontFamily={MONO} letterSpacing="0.6">SHA-256</text>
      <text x="92" y="479" fontSize="9" fill="#5B7FC4" fontFamily={MONO} letterSpacing="0.4">a9f3 e07c 51bd 88c1 d07a</text>
      <circle cx="372" cy="462" r="11" fill={GOLD} />
      <path d="M366.5 462 l4 4 l7 -8" fill="none" stroke={NAVY_DEEP} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/* ── 5 · INVESTIGATIONS & INTELLIGENCE — link analysis ──────────────── */
function Investigations() {
  const C = [220, 236];
  const sats = [
    { p: [86, 132], kind: "person" }, { p: [212, 96], kind: "doc" }, { p: [352, 128], kind: "building" },
    { p: [90, 330], kind: "pin" }, { p: [350, 336], kind: "phone" }, { p: [220, 388], kind: "person", gold: true },
  ];
  const icon = (k) => {
    if (k === "doc") return <g fill="none" stroke={NAVY} strokeWidth="2.2" strokeLinecap="round"><path d="M-7 -10 h10 l5 5 v15 h-15 z" /><path d="M-3 0h8M-3 5h8" /></g>;
    if (k === "building") return <g fill="none" stroke={NAVY} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M-8 10 V-8 h11 V10 M3 -2 h6 V10 M-8 10 h17 M-4 -4 h3 M-4 1 h3 M-4 6 h3" /></g>;
    if (k === "pin") return <g fill="none" stroke={NAVY} strokeWidth="2.2" strokeLinecap="round"><path d="M0 11 C-9 2 -9 -3 -9 -5 a9 9 0 0 1 18 0 c0 2 0 7 -9 16 z" /><circle cx="0" cy="-5" r="3" /></g>;
    if (k === "phone") return <g fill="none" stroke={NAVY} strokeWidth="2.2" strokeLinecap="round"><rect x="-6" y="-10" width="12" height="20" rx="3" /><path d="M-2 6h4" /></g>;
    return <Person s={0.95} />;
  };
  return (
    <g>
      <Chrome tag="INTEL 0427-IV" />
      {/* links */}
      {sats.map((s, i) => (
        <line key={i} x1={C[0]} y1={C[1]} x2={s.p[0]} y2={s.p[1]} stroke={s.gold ? GOLD : SKY} strokeWidth={s.gold ? 3 : 1.8} strokeOpacity={s.gold ? 1 : 0.55} strokeDasharray={s.gold ? undefined : "5 5"} />
      ))}
      <line x1="86" y1="132" x2="212" y2="96" stroke={SKY} strokeOpacity="0.35" strokeWidth="1.5" />
      <line x1="352" y1="128" x2="350" y2="336" stroke={SKY} strokeOpacity="0.35" strokeWidth="1.5" />
      <line x1="90" y1="330" x2="220" y2="388" stroke={SKY} strokeOpacity="0.35" strokeWidth="1.5" />
      {/* satellites */}
      {sats.map((s, i) => (
        <g key={i} transform={`translate(${s.p[0]} ${s.p[1]})`} filter="url(#hv-shadow-sm)">
          <circle r="27" fill="#fff" stroke={s.gold ? GOLD : "none"} strokeWidth="3.5" />
          {icon(s.kind)}
        </g>
      ))}
      {/* subject */}
      <g transform={`translate(${C[0]} ${C[1]})`} filter="url(#hv-shadow)">
        <circle r="44" fill={NAVY_DEEP} stroke="url(#hv-gold)" strokeWidth="5" />
        <circle r="34" fill="#fff" fillOpacity="0.08" />
        <g transform="translate(0 4)"><Person s={1.9} fill="#fff" /></g>
      </g>
      <Magnifier cx="272" cy="190" r="32" handle={34} />

      {/* dossier */}
      <Card x="28" y="438" w="242" h="68" />
      <rect x="40" y="450" width="36" height="44" rx="8" fill={ICE} />
      <g transform="translate(58 468)"><Person s={0.9} fill="#7FA0DC" /></g>
      <Bar x="88" y="452" w="92" h="7" fill={NAVY} />
      <Bar x="88" y="466" w="140" h="5" fill="#9DB8E8" />
      <Bar x="88" y="477" w="110" h="5" fill="#9DB8E8" />
      <rect x="196" y="488" width="60" height="12" rx="6" fill={GOLD_SOFT} />
      <text x="226" y="497.5" textAnchor="middle" fontSize="7.5" fontWeight="800" fill={NAVY} fontFamily={MONO} letterSpacing="1">0427-A</text>
      {/* confidence */}
      <Card x="286" y="438" w="126" h="68" />
      <Bar x="298" y="452" w="52" h="6" fill={NAVY} />
      <text x="298" y="486" fontSize="24" fontWeight="800" fill={NAVY} fontFamily={MONO}>92%</text>
      <rect x="298" y="493" width="102" height="6" rx="3" fill="#D6E4FF" />
      <rect x="298" y="493" width="94" height="6" rx="3" fill="url(#hv-gold)" />
    </g>
  );
}

/* ── 6 · LEGAL CONSULTATION — scales, gavel, document ───────────────── */
function Legal() {
  return (
    <g>
      <Chrome tag="LEGAL 9-LC" />
      {/* document */}
      <g transform="translate(34 300) rotate(-5)" filter="url(#hv-shadow)">
        <rect width="150" height="190" rx="10" fill="#fff" />
        <Bar x="16" y="18" w="72" h="8" fill={NAVY} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <Bar key={i} x="16" y={42 + i * 14} w={i === 6 ? 60 : 118} h="5" fill="#B9CCF1" />
        ))}
        <circle cx="112" cy="152" r="20" fill="url(#hv-gold)" />
        <circle cx="112" cy="152" r="14" fill="none" stroke="#fff" strokeWidth="2" />
        <path d="M112 143 l3 6 6.5 1 -4.8 4.5 1.3 6.4 -6 -3.2 -6 3.2 1.3 -6.4 -4.8 -4.5 6.5 -1 z" fill="#fff" />
      </g>

      {/* scales */}
      <g filter="url(#hv-shadow)">
        {/* base */}
        <path d="M168 468 h104 l-10 -16 h-84 z" fill="#0F2F80" stroke={GOLD} strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="204" y="404" width="32" height="50" rx="6" fill="#123B98" />
        <rect x="214" y="96" width="12" height="320" rx="6" fill="url(#hv-gold)" />
        <circle cx="220" cy="90" r="12" fill="url(#hv-gold)" />
        {/* beam */}
        <path d="M86 138 Q220 116 354 138" fill="none" stroke="url(#hv-gold)" strokeWidth="9" strokeLinecap="round" />
        <circle cx="220" cy="126" r="9" fill={NAVY_DEEP} stroke={GOLD} strokeWidth="3" />
        {/* chains + pans */}
        {[[86, 138], [354, 138]].map(([x, y], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2={x - 50} y2={y + 108} stroke={SKY} strokeWidth="2" />
            <line x1={x} y1={y} x2={x + 50} y2={y + 108} stroke={SKY} strokeWidth="2" />
            <path d={`M${x - 62} ${y + 108} h124 a62 30 0 0 1 -124 0 z`} fill={i ? "url(#hv-gold)" : "#EAF2FF"} stroke={i ? "none" : GOLD} strokeWidth="3" />
            <path d={`M${x - 48} ${y + 116} h96`} stroke="#fff" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" />
          </g>
        ))}
      </g>

      {/* gavel */}
      <g transform="translate(300 388) rotate(-28)" filter="url(#hv-shadow)">
        <rect x="-8" y="-6" width="14" height="86" rx="7" fill="#C57F12" />
        <rect x="-8" y="-6" width="14" height="86" rx="7" fill="url(#hv-gold)" />
        <rect x="-38" y="-30" width="74" height="34" rx="9" fill={NAVY_DEEP} stroke={GOLD} strokeWidth="3" />
        <rect x="-30" y="-24" width="6" height="22" rx="3" fill="#fff" fillOpacity="0.25" />
        <rect x="24" y="-24" width="6" height="22" rx="3" fill="#fff" fillOpacity="0.25" />
      </g>
      <ellipse cx="330" cy="486" rx="70" ry="12" fill="#0A1A45" fillOpacity="0.5" />
      <rect x="292" y="470" width="76" height="16" rx="8" fill="#123B98" stroke={GOLD} strokeWidth="2" />
    </g>
  );
}

/* ── 7 · DOCUMENT EXAMINATION — signature under the lens ────────────── */
function DocumentExam() {
  const sig = "M0 22 C8 -6 14 -6 16 14 C18 30 24 4 34 8 C42 12 40 26 50 16 C58 8 64 12 70 20 L98 6";
  return (
    <g>
      <Chrome tag="DOC 3-EX/88" />
      {/* the document */}
      <g transform="translate(46 60) rotate(-4 130 200)" filter="url(#hv-shadow)">
        <rect width="270" height="376" rx="12" fill="#fff" />
        <Bar x="24" y="26" w="120" h="9" fill={NAVY} />
        <Bar x="24" y="42" w="70" h="5" fill="#9DB8E8" />
        <rect x="200" y="22" width="46" height="46" rx="8" fill={ICE} />
        <path d="M212 56 l10 -12 l8 8 l6 -6 l10 10" fill="none" stroke="#7FA0DC" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Bar key={i} x="24" y={92 + i * 18} w={i === 5 ? 110 : 222} h="5" fill="#C9D9F5" />
        ))}
        {/* altered line */}
        <rect x="18" y="209" width="234" height="16" rx="4" fill={GOLD_SOFT} />
        <Bar x="24" y="213" w="146" h="7" fill={NAVY} op={0.85} />
        <path d="M18 209 v16 M252 209 v16" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <Bar key={i} x="24" y={244 + i * 18} w={i === 2 ? 90 : 222} h="5" fill="#C9D9F5" />
        ))}
        {/* signature */}
        <line x1="24" y1="338" x2="150" y2="338" stroke="#9DB8E8" strokeWidth="1.5" />
        <g transform="translate(28 306)"><path d={sig} fill="none" stroke={NAVY} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></g>
        {/* stamp */}
        <g transform="translate(212 320)" opacity="0.95">
          <circle r="30" fill="none" stroke={GOLD} strokeWidth="4" />
          <circle r="22" fill="none" stroke={GOLD} strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M0 -12 l3.5 7.4 8 1.1 -5.8 5.6 1.4 8 -7.1 -3.8 -7.1 3.8 1.4 -8 -5.8 -5.6 8 -1.1 z" fill={GOLD} />
        </g>
      </g>

      {/* lens over signature */}
      <clipPath id="hv-lens-de"><circle cx="286" cy="392" r="60" /></clipPath>
      <Magnifier cx="286" cy="392" r="64" handle={62} />
      <g clipPath="url(#hv-lens-de)">
        <rect x="222" y="328" width="128" height="128" fill="#fff" fillOpacity="0.93" />
        <line x1="222" y1="424" x2="350" y2="424" stroke="#9DB8E8" strokeWidth="2" />
        <g transform="translate(232 366) scale(1.5)"><path d={sig} fill="none" stroke={NAVY} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /></g>
        <g stroke={GOLD} strokeWidth="1.4" strokeDasharray="4 4"><line x1="286" y1="332" x2="286" y2="452" /><line x1="226" y1="392" x2="346" y2="392" /></g>
        <circle cx="286" cy="392" r="5" fill="none" stroke={GOLD} strokeWidth="2" />
      </g>

      {/* verification checklist */}
      <Card x="330" y="60" w="82" h="120" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(342 ${76 + i * 34})`}>
          <rect width="20" height="20" rx="6" fill={i === 2 ? GOLD : NAVY} />
          <path d="M5.5 10.5 l3.5 3.5 l6 -7" fill="none" stroke={i === 2 ? NAVY_DEEP : "#fff"} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <Bar x="26" y="4" w="30" h="5" fill={NAVY} op={0.8} />
          <Bar x="26" y="12" w="20" h="4" fill="#9DB8E8" />
        </g>
      ))}
    </g>
  );
}

/* ── 8 · CYBER INVESTIGATION — terminal, alert, attack path ─────────── */
function Cyber() {
  const N = [[74, 372], [168, 330], [168, 434], [262, 372], [356, 330], [356, 434]];
  return (
    <g>
      <Chrome tag="INC 6E21-CY" />
      {/* terminal */}
      <g filter="url(#hv-shadow)">
        <rect x="28" y="52" width="384" height="220" rx="14" fill="#071739" stroke="#2A63D6" strokeOpacity="0.55" />
        <path d="M28 66 a14 14 0 0 1 14 -14 h356 a14 14 0 0 1 14 14 v16 h-384 z" fill="#0F2F80" />
        {[0, 1, 2].map((i) => <circle key={i} cx={46 + i * 14} cy="67" r="4" fill={i === 0 ? GOLD : "#fff"} fillOpacity={i === 0 ? 1 : 0.4} />)}
      </g>
      <text x="44" y="108" fontSize="10.5" fill="#5B88E6" fontFamily={MONO}>$</text>
      <Bar x="58" y="101" w="112" h="6" fill="#9DB8E8" />
      {[170, 134, 110, 190].map((w, i) => (
        <g key={i}>
          <rect x="44" y={124 + i * 22} width="30" height="6" rx="3" fill="#2A63D6" fillOpacity="0.8" />
          <Bar x="84" y={124 + i * 22} w={w} h="6" fill="#5B88E6" op={0.7} />
        </g>
      ))}
      {/* alert line */}
      <rect x="36" y="206" width="368" height="24" rx="6" fill={GOLD} fillOpacity="0.18" stroke={GOLD} strokeOpacity="0.7" />
      <path d="M52 213 l8 14 h-16 z" fill={GOLD} />
      <rect x="51" y="217" width="2" height="5" fill={NAVY_DEEP} />
      <Bar x="72" y="215.5" w="190" h="6" fill={GOLD} />
      <text x="392" y="222" textAnchor="end" fontSize="9" fontWeight="800" fill={GOLD} fontFamily={MONO} letterSpacing="1">10.4.7.22</text>
      <text x="44" y="252" fontSize="10.5" fill="#5B88E6" fontFamily={MONO}>$</text>
      <rect x="58" y="243" width="8" height="12" fill="#fff" fillOpacity="0.85" />

      {/* attack path */}
      <Card x="28" y="292" w="384" h="210" />
      <Bar x="44" y="306" w="88" h="7" fill={NAVY} />
      <Bar x="44" y="319" w="52" h="5" fill="#9DB8E8" />
      <g transform="translate(0 6)">
        <Edge a={N[0]} b={N[1]} ra={15} rb={15} color={SKY} w={2} dash="4 4" />
        <Edge a={N[0]} b={N[2]} ra={15} rb={15} color={SKY} w={2} dash="4 4" />
        <Edge a={N[1]} b={N[3]} ra={15} rb={15} color={GOLD} w={3.2} />
        <Edge a={N[2]} b={N[3]} ra={15} rb={15} color={SKY} w={2} dash="4 4" />
        <Edge a={N[3]} b={N[4]} ra={15} rb={15} color={GOLD} w={3.2} />
        <Edge a={N[3]} b={N[5]} ra={15} rb={15} color={SKY} w={2} dash="4 4" />
        {N.map((p, i) => {
          const hot = i === 1 || i === 3 || i === 4;
          return (
            <g key={i} transform={`translate(${p[0]} ${p[1]})`}>
              <rect x="-15" y="-15" width="30" height="30" rx="9" fill={hot ? NAVY : ICE} stroke={hot ? GOLD : SKY} strokeWidth="2.5" />
              <g fill="none" stroke={hot ? "#fff" : NAVY} strokeWidth="2" strokeLinecap="round">
                <rect x="-8" y="-8" width="16" height="10" rx="2" />
                <path d="M-4 5h8M0 2v3" />
              </g>
            </g>
          );
        })}
      </g>
      {/* shield alert */}
      <g transform="translate(356 438)" filter="url(#hv-shadow-sm)">
        <path d="M0 -26 L20 -18 V2 C20 16 10 24 0 29 C-10 24 -20 16 -20 2 V-18 Z" fill={GOLD} stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
        <rect x="-2" y="-12" width="4" height="15" rx="2" fill={NAVY_DEEP} />
        <circle cx="0" cy="9" r="2.6" fill={NAVY_DEEP} />
      </g>
    </g>
  );
}

const SCENES = {
  fraud: Fraud,
  "data-security": DataSecurity,
  "forensic-audit": ForensicAudit,
  "digital-forensics": DigitalForensics,
  investigations: Investigations,
  legal: Legal,
  document: DocumentExam,
  cyber: Cyber,
};

export default function ServiceIllustration({ variant, label }) {
  const Scene = SCENES[variant] || Fraud;
  return (
    <svg
      viewBox="0 0 440 528"
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      role="img"
      aria-label={label}
      style={{ display: "block" }}
    >
      <Defs />
      <Scene />
    </svg>
  );
}
