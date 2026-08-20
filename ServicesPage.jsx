import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Landmark, Siren, Building2, Briefcase, FileText } from "lucide-react";
// Photo imports removed — no images per brochure-match theme.
import { useSiteTheme } from "./useSiteTheme";

/* ══════════════════════════════════════════
   GLOBAL STYLES
══════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif; overflow-x: hidden; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 1; } 50% { opacity: 0.25; }
  }
  @keyframes floatY {
    0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); }
  }

  .au1 { animation: fadeUp .6s .15s both; }
  .au2 { animation: fadeUp .6s .35s both; }
  .au3 { animation: fadeUp .6s .55s both; }
  .au4 { animation: fadeUp .6s .75s both; }
  .au5 { animation: fadeUp .5s 1.1s  both; }
  .pulse  { animation: scrollPulse 2s infinite; }
  .floaty { animation: floatY 4s ease-in-out infinite; }

  .rv  { opacity:0; transform:translateY(28px);  transition:opacity .7s ease,transform .7s ease; }
  .rvl { opacity:0; transform:translateX(-28px); transition:opacity .7s ease,transform .7s ease; }
  .rvr { opacity:0; transform:translateX(28px);  transition:opacity .7s ease,transform .7s ease; }
  .rv.vis,.rvl.vis,.rvr.vis { opacity:1; transform:none; }

  /* svc card gold sweep */
  .sc { position:relative; overflow:hidden; transition:transform .35s ease,border-color .35s ease,box-shadow .35s ease; }
  .sc::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:#e8971a; transform:scaleX(0); transform-origin:left; transition:transform .4s ease; }
  .sc:hover::after { transform:scaleX(1); }
  .sc:hover { transform:translateY(-6px); box-shadow:0 24px 60px rgba(0,0,0,.4); }
  .sc:hover .sc-num { color:rgba(232,151,26,.08) !important; }
  .sc:hover .sc-arr { transform:translateX(5px); }

  /* interactive */
  .cli:hover  { border-color:rgba(232,151,26,.35) !important; transform:translateY(-3px); }
  .prog:hover { transform:translateY(-5px); border-color:rgba(232,151,26,.3) !important; box-shadow:0 20px 50px rgba(0,0,0,.3); }

  .nbtn { background:none; border:none; cursor:pointer; padding:0; color:rgba(var(--sp-fg-rgb), .78); font-family:'Inter',sans-serif; font-size:.9rem; font-weight:500; letter-spacing:.3px; transition:color .2s; }
  .nbtn:hover { color:#fff; }

  .hpill { border:1px solid rgba(232,151,26,.35); color:rgba(var(--sp-fg-rgb), .75); font-family:'Inter',sans-serif; font-size:.8rem; font-weight:600; letter-spacing:1px; text-transform:uppercase; padding:8px 16px; border-radius:3px; cursor:pointer; background:transparent; transition:all .25s; }
  .hpill:hover { background:#e8971a; border-color:#e8971a; color:#000; }

  .ncta { background:#e8971a; color:#000; font-family:'Inter',sans-serif; font-weight:700; font-size:.9rem; letter-spacing:1px; text-transform:uppercase; padding:9px 22px; border-radius:4px; cursor:pointer; border:none; transition:background .2s,transform .2s; white-space:nowrap; }
  .ncta:hover { background:#f5a623; transform:translateY(-1px); }

  .bgold { background:#e8971a; color:#000; font-family:'Inter',sans-serif; font-weight:800; font-size:.95rem; letter-spacing:1.5px; text-transform:uppercase; padding:14px 34px; border-radius:4px; text-decoration:none; display:inline-block; transition:background .2s,transform .2s; }
  .bgold:hover { background:#f5a623; transform:translateY(-2px); }

  .bgh { background:transparent; color:#fff; border:1px solid rgba(var(--sp-fg-rgb), .3); font-family:'Inter',sans-serif; font-weight:700; font-size:.95rem; letter-spacing:1.5px; text-transform:uppercase; padding:14px 34px; border-radius:4px; text-decoration:none; display:inline-block; transition:border-color .2s,background .2s,transform .2s; }
  .bgh:hover { border-color:#e8971a; background:rgba(232,151,26,.08); transform:translateY(-2px); }

  .flink { color:rgba(var(--sp-fg-rgb), .45); font-size:.8rem; text-decoration:none; transition:color .2s; }
  .flink:hover { color:#e8971a; }

  .moba { color:rgba(var(--sp-fg-rgb), .82); text-decoration:none; font-family:'Inter',sans-serif; font-size:1.15rem; font-weight:700; letter-spacing:1px; text-transform:uppercase; padding:10px 0; border-bottom:1px solid rgba(var(--sp-fg-rgb), .07); transition:color .2s; display:block; background:none; border-top:none; border-left:none; border-right:none; cursor:pointer; text-align:left; width:100%; }
  .moba:hover { color:#e8971a; }

  @media (max-width:960px) {
    .dn  { display:none !important; }
    .dfl { display:flex !important; }
    .sp  { padding:72px 24px !important; }
    .dg1 { grid-template-columns:1fr !important; gap:40px !important; }
    .hpad{ padding:100px 24px 72px !important; }
    .stsp{ padding:28px 24px !important; gap:40px !important; }
  }
  @media (max-width:600px) {
    .g1 { grid-template-columns:1fr !important; }
    .sg { gap:28px !important; }
  }
  @media (prefers-reduced-motion:reduce) {
    .rv,.rvl,.rvr { opacity:1 !important; transform:none !important; transition:none !important; }
    * { animation:none !important; }
  }
`;

/* ══════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════ */
const G     = "#e8971a";
const BORD  = "var(--sp-border)";
const BODY  = "var(--sp-body)";
const CBKG  = "var(--sp-card)";

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const PILLS = [
  {label:"DATA SECURITY",        id:"data-security"},
  {label:"FORENSIC AUDIT",       id:"forensic-audit"},
  {label:"DIGITAL FORENSICS",    id:"digital-forensics"},
  {label:"FRAUD INVESTIGATION",  id:"fraud"},
  {label:"INVESTIGATIONS",       id:"investigations"},
  {label:"LEGAL CONSULTATION",   id:"legal"},
  {label:"DOCUMENT EXAMINATION", id:"document"},
  {label:"CYBER INVESTIGATION",  id:"cyber-investigation"},
];

const CARDS = [
  {num:"01",sub:"ROYAL VAULT APPROACH",    title:"Data Security",                   body:"Air-gapped systems, strong encryption, and strict access controls keep your data completely isolated, private, and tamper-proof.",                                                               id:"data-security"},
  {num:"02",sub:"BEYOND TRADITIONAL AUDITS",title:"Forensic Audit",                 body:"Uncover fraud, financial irregularities, and hidden risks with investigative expertise and advanced analytics. Court-admissible reports guaranteed.",                                           id:"forensic-audit"},
  {num:"03",sub:"END-TO-END INVESTIGATION", title:"Digital Forensics",              body:"Data imaging, extraction, and in-depth analysis from mobile devices, computers, and networks with full chain of custody.",                                                                     id:"digital-forensics"},
  {num:"04",sub:"FOLLOW THE MONEY",         title:"Financial & Fraud Investigation",body:"Uncover financial irregularities, trace complex transactions, and track fraud across banking systems — including cryptocurrency tracing.",                                                     id:"fraud"},
  {num:"05",sub:"OSINT & DUE DILIGENCE",   title:"Investigations & Intelligence", body:"Background verification, corporate & private investigations, OSINT, litigation support, and business risk assessment.",                                                                         id:"investigations"},
  {num:"06",sub:"FORENSIC-LEGAL BRIDGE",   title:"Legal Consultation",             body:"Translating digital and physical evidence into legally admissible insights — bridging forensic science and courtroom strategy.",                                                               id:"legal"},
  {num:"07",sub:"VERIFY. AUTHENTICATE.",   title:"Document Examination",           body:"Handwriting authentication, forgery detection, metadata inspection, and tamper checks — scientifically verified and court-ready.",                                                             id:"document"},
  {num:"08",sub:"DETECT. RESPOND. RECOVER.",title:"Cyber Investigation",           body:"Malware analysis, threat intelligence, and data breach investigation — identifying, containing, and tracing cyber attacks back to their source.",                                                 id:"cyber-investigation"},
];

const STATS = [
  {num:"2",   label:"ISO Certifications"},
  {num:"10+", label:"Service Verticals"},
  {num:"6+",  label:"Client Categories"},
  {num:"100%",label:"Court-Admissible"},
];

const DETAILS = [
  {id:"data-security",   bg:"#0d1635",flip:false,
   eyebrow:"DATA SECURITY",hw:"AIR-GAPPED.",hg:"ENCRYPTED.\nCOMPLIANT.",
   cert:"ISO 27001:2022 Certified",vt:"Royal Vault Approach",
   vb:"Data treated as high-value assets — hidden, isolated, and accessible only to verified authorities.",
   body:"Combining secrecy, layered control, and modern air-gapped systems to create environments where data is not just stored — it is protected with discipline and zero exposure.",
   feats:["Isolated air-gapped environments with no internet connectivity","Strong encryption protocols for data at rest","Role-based and device-based access with multi-layer authentication","Safe offline transfer via encrypted drives and controlled ports","Full chain of custody — admissible and traceable in court","Aligned with DPDP Act 2023 and Section 63(4)(c) compliance"]},
  {id:"forensic-audit",  bg:"#090f1e",flip:true,
   eyebrow:"FORENSIC AUDIT",hw:"UNCOVER WHAT",hg:"OTHERS MISS.",
   vt:"10+ Targeted Industries",
   vb:"Banking, fintech, healthcare, real estate, NGOs, government PSU projects, and more.",
   body:"Beyond traditional audits — identifying fraud, financial irregularities, and hidden risks using investigative expertise and advanced analytics across 10+ targeted industries.",
   feats:["Fraud detection and financial irregularity identification","Advanced analytics to trace discrepancies and hidden risks","Banking, Manufacturing, Real Estate, Healthcare & E-commerce","Government & PSU projects, NGOs, Insurance companies","Court-admissible, litigation-ready documentation"]},
  {id:"digital-forensics",bg:"#0d1635",flip:false,
   eyebrow:"DIGITAL FORENSICS",hw:"EVIDENCE.",hg:"INTEGRITY.\nJUSTICE.",
   vt:"Multi-Platform Forensics",
   vb:"Computers, mobiles, cloud, CCTV, audio — every digital surface covered with evidence integrity guaranteed.",
   body:"End-to-end investigations for law enforcement and corporate clients — evidence acquisition, analysis, and expert reporting with proper chain of custody.",
   feats:["Computer Forensics — desktops, laptops, servers","Mobile Device Forensics — smartphones, SIM cards, WhatsApp, call logs","Email & Communication Forensics — phishing detection, deleted recovery","Cloud Forensics — Google Drive, AWS, OneDrive","CCTV & Video Forensics — enhancement and authentication","Audio Forensics — voice analysis and tampering detection","Expert Witness & Litigation Support"]},
  {id:"fraud",            bg:"#090f1e",flip:true,
   eyebrow:"FINANCIAL & FRAUD INVESTIGATION",hw:"TRACE THE MONEY.",hg:"EXPOSE THE FRAUD.",
   vt:"Financial Crime Specialists",
   vb:"Forensic accounting, cryptocurrency tracing, benami entities, transaction trail analysis.",
   body:"Tracing digital evidence, reconstructing transactions, and identifying fraudulent intent — supporting organizations and authorities in cases of fraud, embezzlement, bribery, and corporate misconduct.",
   feats:["Transaction Trail Analysis — bank statements and digital ledgers","Forensic Accounting — detecting manipulation and fund diversion","Data Manipulation Detection — altered or fabricated records","Benami & Shell Entity Investigation — hidden ownership tracing","Insider Fraud — system logs and access history analysis","Cryptocurrency tracing across banking and digital platforms"]},
  {id:"investigations",   bg:"#0d1635",flip:false,
   eyebrow:"INVESTIGATIONS & INTELLIGENCE",hw:"VERIFY.",hg:"INVESTIGATE.\nMITIGATE.",
   vt:"OSINT & Beyond",
   vb:"Professional intelligence combined with investigative services for accurate, confident decisions.",
   body:"Helping businesses and individuals verify information, identify risks, and make informed decisions — accurate, confidential, and built for security and compliance.",
   feats:["Background Verification — identity, employment, education, criminal records","Corporate & Private Detective Services — misconduct, asset tracing, surveillance","Litigation Support — fact-finding, document review, case strategy","Due Diligence — financial integrity, corporate history, reputation","Open-Source Intelligence (OSINT) — social media, corporate records","Business Intelligence & Risk Assessment"]},
  {id:"legal",            bg:"#090f1e",flip:true,
   eyebrow:"LEGAL CONSULTATION",hw:"EVIDENCE TO",hg:"COURTROOM.",
   vt:"Forensic-Legal Bridge",
   vb:"Technical evidence translated into legally admissible insights — every case structured and court-ready.",
   body:"Strategic legal consultation backed by forensic insights — bridging the gap between technical evidence and legal strategy, ensuring every case is compliant and court-ready.",
   feats:["Forensic-Legal Advisory — digital and physical evidence to admissible insights","Regulatory Compliance — DPDP Act 2023, IT Act 2000, financial regulations","Expert Witness Services — courtroom testimony and technical explanations","Corporate Fraud & Risk Advisory","Litigation Support & Case Strategy"]},
  {id:"document",         bg:"#0d1635",flip:false,
   eyebrow:"DOCUMENT EXAMINATION & VALIDATION",hw:"AUTHENTIC OR",hg:"FORGED?\nWE KNOW.",
   vt:"Document Validation",
   vb:"Physical and digital document forensics — detecting forgery, tampering, and manipulation scientifically.",
   body:"Comprehensive forensic examination of physical and digital documents — combining scientific analysis with advanced digital forensics to support legal proceedings and fraud investigations.",
   feats:["Handwriting & Signature Authentication","Forgery & Alteration Detection","Metadata & Digital Document Inspection — timestamps, backdating","Paper, Ink & Print Analysis","Tamper & Manipulation Checks","Evidentiary File Preparation — chain of custody compliance"]},
  {id:"cyber-investigation",bg:"#090f1e",flip:true,
   eyebrow:"CYBER INVESTIGATION",hw:"DETECT THE BREACH.",hg:"TRACE THE ATTACKER.",
   vt:"Full-Spectrum Cyber Response",
   vb:"Malware analysis, threat intelligence, and data breach investigation — under one roof.",
   body:"When systems are compromised, speed and precision matter. Our cyber investigation team identifies malicious activity, maps the threat, and reconstructs how a breach happened — delivering clear, evidence-backed findings your organization and legal counsel can act on.",
   feats:["Malware Analysis — static & dynamic analysis to identify malicious code and its behaviour","Threat Intelligence — profiling attackers, tracking indicators of compromise (IOCs), and threat actor patterns","Data Breach Investigation — scope assessment, root-cause analysis, and impact reporting","Incident Response & Containment — isolating compromised systems and stopping active threats","Network & Log Forensics — tracing intrusion paths across servers, endpoints, and cloud systems","Post-Incident Reporting — compliance-ready reports for regulators, insurers, and leadership"]},
];

const CLIENTS = [
  {title:"Government & Regulatory",icon:Landmark, items:["Income Tax Department","GST Department","Enforcement Directorate","CBI","SEBI","SFIO"]},
  {title:"Law Enforcement & Legal", icon:Siren,    items:["State Police & Cyber Crime Cells","Economic Offences Wings","Law Firms & Litigation Teams","Courts & Judicial Authorities"]},
  {title:"Banking & Finance",       icon:Building2,items:["Public & Private Banks","NBFCs","Insurance Companies","FinTech & Payment Providers"]},
  {title:"Corporate & Business",    icon:Briefcase,items:["Large Corporates & MNCs","SMEs & Family Businesses","Internal Audit Teams","Compliance Departments"]},
  {title:"Professional Firms",      icon:FileText, items:["CA Firms & Forensic Auditors","Risk Advisory Firms","IBBI Insolvency Professionals"]},
];

const PROGRAMS = [
  {title:"Corporate Crime Awareness",
   sub:"Equipping organizations to detect, prevent, and respond to modern financial and digital threats.",
   items:["Payment gateway manipulation & refund scams","Business Email Compromise (BEC) attacks","CEO/CFO impersonation & social engineering","Insider data theft & confidential leaks","Legal & regulatory compliance obligations","POSH Act awareness & workplace ethics"]},
  {title:"School Crime Awareness",
   sub:"Building safer schools by educating students, teachers, and parents about digital safety and protection.",
   items:["Cyberbullying, phishing & online scams","Social media safety & privacy protection","Stranger danger & substance abuse awareness","Juvenile laws & student responsibilities","Mental health & peer pressure management","POSH & safe school environment"]},
];

/* ══════════════════════════════════════════
   HOOKS
══════════════════════════════════════════ */
function useReveal(cls="rv") {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add(cls);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("vis"); io.disconnect(); }
    },{threshold:0.1});
    io.observe(el);
    return () => io.disconnect();
  },[cls]);
  return ref;
}

function useStagger() {
  const ref = useRef(null);
  useEffect(() => {
    const p = ref.current;
    if (!p) return;
    const ios = [...p.children].map((c,i) => {
      c.classList.add("rv");
      c.style.transitionDelay = `${i*0.09}s`;
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { c.classList.add("vis"); io.disconnect(); }
      },{threshold:0.08});
      io.observe(c);
      return io;
    });
    return () => ios.forEach(io => io.disconnect());
  },[]);
  return ref;
}

/* ══════════════════════════════════════════
   STARS
══════════════════════════════════════════ */
function Stars() {
  const cv = useRef(null);
  useEffect(() => {
    const canvas = cv.current;
    const ctx = canvas.getContext("2d");
    let W,H,stars=[],raf;
    const resize = () => { W=canvas.width=innerWidth; H=canvas.height=innerHeight; };
    const init = () => { stars=Array.from({length:120},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.2+.3,vx:(Math.random()-.5)*.15,vy:(Math.random()-.5)*.15,alpha:Math.random()*.6+.2,pulse:Math.random()*Math.PI*2})); };
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      for(let i=0;i<stars.length;i++) for(let j=i+1;j<stars.length;j++){
        const dx=stars[i].x-stars[j].x,dy=stars[i].y-stars[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<130){ctx.beginPath();ctx.strokeStyle=`rgba(232,151,26,${.07*(1-d/130)})`;ctx.lineWidth=.5;ctx.moveTo(stars[i].x,stars[i].y);ctx.lineTo(stars[j].x,stars[j].y);ctx.stroke();}
      }
      stars.forEach(s=>{
        s.pulse+=.015;
        ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(232,151,26,${s.alpha*(.7+.3*Math.sin(s.pulse))})`;ctx.fill();
        s.x+=s.vx;s.y+=s.vy;
        if(s.x<0)s.x=W;if(s.x>W)s.x=0;if(s.y<0)s.y=H;if(s.y>H)s.y=0;
      });
      raf=requestAnimationFrame(draw);
    };
    resize();init();draw();
    window.addEventListener("resize",()=>{resize();init();});
    return()=>cancelAnimationFrame(raf);
  },[]);
  return <canvas ref={cv} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}/>;
}

/* ══════════════════════════════════════════
   CONTACT DROPDOWN — all platforms, one click away
══════════════════════════════════════════ */
const CONTACT_PLATFORMS=[
  {label:"Website", value:"www.forfrasolutions.com", href:"https://www.forfrasolutions.com", external:true},
  {label:"Email",    value:"hello@forfrasolutions.com", href:"mailto:hello@forfrasolutions.com"},
  {label:"Call",     value:"+91 97110 15337", href:"tel:+919711015337"},
  {label:"Call",     value:"+91 89823 07608", href:"tel:+918982307608"},
  {label:"Instagram",value:"@forfrasolutions", href:"https://instagram.com/forfrasolutions", external:true},
  {label:"LinkedIn", value:"Forfra Solutions", href:"https://www.linkedin.com/company/forfra-solutions/", external:true},
];

function ContactDropdown({triggerClass,triggerStyle,onItemClick}) {
  const [open,setOpen]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    if(!open)return;
    const onDoc=(e)=>{ if(ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown",onDoc);
    return()=>document.removeEventListener("mousedown",onDoc);
  },[open]);
  return(
    <div ref={ref} style={{position:"relative",display:"inline-block"}}>
      <button className={triggerClass} style={{...triggerStyle,border:"none",cursor:"pointer"}} onClick={()=>setOpen(o=>!o)} aria-haspopup="true" aria-expanded={open}>Contact Us</button>
      {open && (
        <div role="menu" style={{position:"absolute",top:"calc(100% + 10px)",right:0,minWidth:230,background:"var(--sp-card)",border:"1px solid rgba(232,151,26,.3)",borderRadius:12,boxShadow:"0 20px 50px rgba(0,0,0,.45)",padding:8,zIndex:1200,display:"flex",flexDirection:"column",gap:2}}>
          {CONTACT_PLATFORMS.map((p,i)=>(
            <a key={p.label+i} href={p.href} target={p.external?"_blank":undefined} rel={p.external?"noopener noreferrer":undefined} role="menuitem"
               onClick={()=>{setOpen(false);onItemClick&&onItemClick();}}
               style={{display:"flex",flexDirection:"column",gap:1,padding:"9px 12px",borderRadius:8,textDecoration:"none"}}
               onMouseEnter={(e)=>e.currentTarget.style.background="rgba(232,151,26,.12)"}
               onMouseLeave={(e)=>e.currentTarget.style.background="transparent"}>
              <span style={{fontSize:".65rem",fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:G}}>{p.label}</span>
              <span style={{fontSize:".85rem",color:"var(--sp-text)"}}>{p.value}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   NAV
══════════════════════════════════════════ */
function Nav() {
  const [open,setOpen]=useState(false);
  const [sc,setSc]=useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    const fn=()=>setSc(scrollY>8);
    addEventListener("scroll",fn);return()=>removeEventListener("scroll",fn);
  },[]);

  // "Home" -> "/", "About" -> "/about" via router;
  // "Services"/"Clients"/"Programs" scroll within this same page (already here)
  const go=(id)=>{
    if(id==="/"){ navigate("/"); }
    else if(id==="/about"){ navigate("/about"); }
    else if(id){ document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); }
    setOpen(false);
  };
  const links=[["Home","/"],["About","/about"],["Services","overview"],["Clients","clients"],["Programs","programs"]];
  return(<>
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:sc?"var(--sp-nav-scrolled)":"var(--sp-nav)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${BORD}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 48px",height:64,transition:"background .3s"}}>
      <a href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}} onClick={(e)=>{e.preventDefault();navigate("/");}}>
        
        <span style={{fontFamily:"'Inter',sans-serif",fontWeight:800,fontSize:"1.15rem",letterSpacing:2,textTransform:"uppercase",color:"var(--sp-text)"}}>FORFRA<span style={{color:"var(--sp-text)",fontWeight:800,fontSize:"1.15rem",letterSpacing:2,marginLeft:6}}>SOLUTIONS</span></span>
      </a>
      <ul className="dn" id="dnav" style={{display:"flex",gap:34,listStyle:"none"}}>
        {links.map(([l,id])=><li key={l}><button className="nbtn" onClick={()=>go(id)}>{l}</button></li>)}
      </ul>
      <span className="dn" id="dcta"><ContactDropdown triggerClass="ncta" /></span>
      <button onClick={()=>setOpen(o=>!o)} aria-label="Menu" style={{display:"none",flexDirection:"column",gap:5,background:"none",border:"none",cursor:"pointer",padding:4}} className="dfl" id="hambtn">
        {[0,1,2].map(i=><span key={i} style={{display:"block",width:22,height:2,background:"var(--sp-text)",borderRadius:2}}/>)}
      </button>
    </nav>
    {open&&<div style={{position:"fixed",top:64,left:0,right:0,zIndex:99,background:"var(--sp-page)",padding:"20px 28px 28px",display:"flex",flexDirection:"column",gap:0,borderBottom:`1px solid ${BORD}`}}>
      {links.map(([l,id])=><button key={l} className="moba" onClick={()=>go(id)}>{l}</button>)}
      <div style={{marginTop:16}}><ContactDropdown triggerClass="ncta" onItemClick={()=>setOpen(false)} /></div>
    </div>}
    <style>{`@media(min-width:961px){#dnav{display:flex!important}#dcta{display:block!important}#hambtn{display:none!important}}`}</style>
  </>);
}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
function Hero() {
  return(
    <section className="hpad" style={{minHeight:"100vh",background:"var(--sp-hero)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"120px 48px 80px",position:"relative",overflow:"hidden",zIndex:1}}>
      <span className="au1" style={{display:"inline-block",border:"1px solid rgba(232,151,26,.5)",color:G,fontFamily:"'Inter',sans-serif",fontSize:".75rem",fontWeight:600,letterSpacing:4,textTransform:"uppercase",padding:"7px 22px",borderRadius:20,marginBottom:32}}>DETECT. PROTECT. EVOLVE.</span>
      <h1 className="au2" style={{fontFamily:"'Inter',sans-serif",fontWeight:900,fontSize:"clamp(3.6rem,9vw,7.4rem)",lineHeight:.95,letterSpacing:-1,textTransform:"uppercase",color:"var(--sp-text)"}}>
        EVERY THREAT.<br/><span style={{color:G}}>ONE PARTNER.</span>
      </h1>
      <p className="au3" style={{fontFamily:"'Inter',sans-serif",fontWeight:400,fontSize:"1.05rem",color:BODY,maxWidth:560,margin:"28px auto 0",lineHeight:1.7}}>
        Comprehensive forensic, security, and investigation solutions — court-ready, legally defensible, and backed by ISO-certified expertise.
      </p>
      <div className="au4" style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",marginTop:44}}>
        {PILLS.map(p=><button key={p.id} className="hpill" onClick={()=>document.getElementById(p.id)?.scrollIntoView({behavior:"smooth"})}>{p.label}</button>)}
      </div>
      <div className="au5" style={{position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
        <span style={{color:"rgba(var(--sp-fg-rgb), .45)",fontFamily:"'Inter',sans-serif",fontSize:".68rem",letterSpacing:3,textTransform:"uppercase"}}>Scroll</span>
        <div className="pulse" style={{width:1,height:48,background:`linear-gradient(to bottom,${G},transparent)`}}/>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SERVICE CARD
══════════════════════════════════════════ */
function SvcCard({d}) {
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    el.classList.add("rv");
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.classList.add("vis");io.disconnect();}},{threshold:.08});
    io.observe(el);return()=>io.disconnect();
  },[]);
  return(
    <div ref={ref}>
      <div className="sc" onClick={()=>document.getElementById(d.id)?.scrollIntoView({behavior:"smooth"})}
        style={{background:CBKG,border:`1px solid ${BORD}`,borderRadius:12,padding:"36px 30px 32px",cursor:"pointer"}}>
        <span className="sc-num" style={{position:"absolute",top:18,right:24,fontFamily:"'Inter',sans-serif",fontWeight:900,fontSize:"3.5rem",color:"rgba(var(--sp-fg-rgb), .04)",lineHeight:1,pointerEvents:"none",transition:"color .35s"}}>{d.num}</span>
        <span style={{fontFamily:"'Inter',sans-serif",fontSize:".65rem",fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:G,marginBottom:8,display:"block"}}>{d.sub}</span>
        <h3 style={{fontFamily:"'Inter',sans-serif",fontWeight:800,fontSize:"1.45rem",textTransform:"uppercase",letterSpacing:.5,color:"var(--sp-text)",marginBottom:14,lineHeight:1.15}}>{d.title}</h3>
        <p style={{fontSize:".88rem",color:BODY,lineHeight:1.65,marginBottom:24}}>{d.body}</p>
        <span className="sc-arr" style={{color:G,fontSize:"1.2rem",display:"inline-block",transition:"transform .25s"}}>→</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   DETAIL SECTION
══════════════════════════════════════════ */
function Detail({d}) {
  const vizRef =useReveal(d.flip?"rvr":"rvl");
  const conRef =useReveal(d.flip?"rvl":"rvr");
  const Visual=(
    <div ref={vizRef}>
      {d.img ? (
        <div className="floaty" style={{display:"flex",flexDirection:"column",borderRadius:16,overflow:"hidden",border:`1px solid ${BORD}`}}>
          {/* Photo shown clean, on its own — no text laid over it, so it
              never "merges" with the caption below. */}
          
          <div style={{padding:"22px 26px",textAlign:"left",background:CBKG}}>
            {d.cert&&<span style={{background:G,color:"#000",fontSize:".65rem",fontWeight:800,letterSpacing:2,textTransform:"uppercase",padding:"5px 14px",borderRadius:3,display:"inline-block",marginBottom:10}}>{d.cert}</span>}
            <h4 style={{fontFamily:"'Inter',sans-serif",fontWeight:800,fontSize:"1.25rem",textTransform:"uppercase",color:"var(--sp-text)"}}>{d.vt}</h4>
            <p style={{fontSize:".85rem",color:BODY,lineHeight:1.6}}>{d.vb}</p>
          </div>
        </div>
      ) : (
        <div className="floaty" style={{background:CBKG,border:`1px solid ${BORD}`,borderRadius:16,padding:"52px 40px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",gap:16,minHeight:300,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 0%,rgba(232,151,26,.08) 0%,transparent 65%)"}}/>
          {d.cert&&<span style={{background:G,color:"#000",fontFamily:"'Inter',sans-serif",fontSize:".65rem",fontWeight:800,letterSpacing:2,textTransform:"uppercase",padding:"5px 14px",borderRadius:3,position:"relative"}}>{d.cert}</span>}
          <h4 style={{fontFamily:"'Inter',sans-serif",fontWeight:800,fontSize:"1.25rem",textTransform:"uppercase",color:"var(--sp-text)",position:"relative"}}>{d.vt}</h4>
          <p style={{fontSize:".85rem",color:BODY,lineHeight:1.6,position:"relative",maxWidth:240}}>{d.vb}</p>
        </div>
      )}
    </div>
  );
  const Content=(
    <div ref={conRef}>
      <span style={{fontFamily:"'Inter',sans-serif",fontSize:".76rem",fontWeight:800,letterSpacing:3,textTransform:"uppercase",color:G,marginBottom:14,display:"inline-block",background:"rgba(232,151,26,.12)",border:"1px solid rgba(232,151,26,.35)",borderRadius:999,padding:"6px 16px"}}>{d.eyebrow}</span>
      <h2 style={{fontFamily:"'Inter',sans-serif",fontWeight:900,fontSize:"clamp(2.1rem,3.6vw,3.2rem)",textTransform:"uppercase",lineHeight:1.04,color:"var(--sp-text)",marginBottom:16,position:"relative",display:"inline-block",paddingBottom:14}}>
        {d.hw}<br/>
        <span style={{color:G}}>{d.hg.split("\n").map((l,i,a)=><span key={i}>{l}{i<a.length-1&&<br/>}</span>)}</span>
        <span style={{position:"absolute",left:0,bottom:0,width:60,height:4,borderRadius:999,background:`linear-gradient(90deg, ${G}, #c47d0e)`,boxShadow:"0 0 14px rgba(232,151,26,.55)"}}/>
      </h2>
      <p style={{fontFamily:"'Inter',sans-serif",fontSize:".95rem",color:BODY,lineHeight:1.75,marginBottom:28}}>{d.body}</p>
      <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:11}}>
        {d.feats.map((f,i)=>(
          <li key={i} style={{display:"flex",alignItems:"flex-start",gap:12,fontSize:".9rem",color:BODY,lineHeight:1.55}}>
            <span style={{flexShrink:0,width:6,height:6,background:G,borderRadius:"50%",marginTop:7}}/>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
  return(
    <section id={d.id} className="sp" style={{background:d.bg==="#0d1635"?"var(--sp-alt)":"var(--sp-page)",padding:"90px 48px",position:"relative",zIndex:1}}>
      <div className="dg1" style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}}>
        {d.flip?<>{Content}{Visual}</>:<>{Visual}{Content}</>}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   REVEAL WRAPPER
══════════════════════════════════════════ */
function Rev({children,style={}}) {
  const ref=useReveal();
  return <div ref={ref} style={style}>{children}</div>;
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function ServicesPage() {
  const { isLight } = useSiteTheme();

  useEffect(()=>{
    const s=document.createElement("style");
    s.textContent=GLOBAL_CSS;
    document.head.appendChild(s);
    return()=>document.head.removeChild(s);
  },[]);

  const cardsRef  =useStagger();
  const clientsRef=useStagger();
  const progsRef  =useStagger();
  const statsRef  =useReveal();

  // Theme bridge: every colour in this file reads one of these CSS
  // variables (var(--sp-...)) instead of a hardcoded hex, so toggling
  // the site theme updates the whole page at once. Light theme is
  // strictly white / light-grey / light-blue — no dark-navy tone.
  const themeVars = isLight ? {
    "--sp-page":"#F3F5F8", "--sp-alt":"#E7F0FB", "--sp-card":"#FFFFFF",
    "--sp-footer":"#EAF1FB", "--sp-nav":"rgba(255,255,255,.92)",
    "--sp-nav-scrolled":"rgba(255,255,255,.98)", "--sp-border":"rgba(30,33,38,.12)",
    "--sp-body":"rgba(35,38,43,.72)", "--sp-text":"#23262B", "--sp-fg-rgb":"35, 38, 43",
    "--sp-hero":"linear-gradient(160deg,#FFFFFF 0%,#E7F0FB 55%,#DCEAFB 100%)",
  } : {
    "--sp-page":"#090f1e", "--sp-alt":"#0d1635", "--sp-card":"#111d40",
    "--sp-footer":"#060c1a", "--sp-nav":"rgba(9,15,30,.92)",
    "--sp-nav-scrolled":"rgba(9,15,30,.98)", "--sp-border":"rgba(255,255,255,.07)",
    "--sp-body":"rgba(255,255,255,.70)", "--sp-text":"#ffffff", "--sp-fg-rgb":"255, 255, 255",
    "--sp-hero":"linear-gradient(160deg,#090f1e 0%,#0d1635 50%,#0a1a42 100%)",
  };

  return(
    <div style={{...themeVars,background:"var(--sp-page)",minHeight:"100vh",position:"relative",transition:"background .4s"}}>
      <Stars/>
      <Nav/>
      <Hero/>

      {/* OVERVIEW */}
      <section id="overview" className="sp" style={{background:"var(--sp-page)",padding:"100px 48px",position:"relative",zIndex:1}}>
        <Rev style={{maxWidth:1300,margin:"0 auto 64px"}}>
          <span style={{fontFamily:"'Inter',sans-serif",fontSize:".75rem",fontWeight:700,letterSpacing:4,textTransform:"uppercase",color:G,marginBottom:12,display:"block"}}>OUR SERVICES</span>
          <h2 style={{fontFamily:"'Inter',sans-serif",fontWeight:900,fontSize:"clamp(2.4rem,5vw,4.2rem)",textTransform:"uppercase",lineHeight:1,color:"var(--sp-text)"}}>
            EVERY THREAT. <span style={{color:G}}>ONE PARTNER.</span>
          </h2>
        </Rev>
        <div ref={cardsRef} className="g1" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20,maxWidth:1300,margin:"0 auto"}}>
          {CARDS.map(c=><SvcCard key={c.num} d={c}/>)}
        </div>
      </section>

      {/* STATS */}
      <div ref={statsRef} className="stsp sg" style={{background:G,padding:"36px 48px",display:"flex",justifyContent:"center",gap:80,flexWrap:"wrap",position:"relative",zIndex:1}}>
        {STATS.map(s=>(
          <div key={s.label} style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Inter',sans-serif",fontWeight:900,fontSize:"2.8rem",color:"#000",lineHeight:1}}>{s.num}</div>
            <div style={{fontFamily:"'Inter',sans-serif",fontSize:".72rem",fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:"rgba(0,0,0,.65)",marginTop:4}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* DETAIL SECTIONS */}
      {DETAILS.map(d=><Detail key={d.id} d={d}/>)}

      {/* CLIENTS */}
      <section id="clients" className="sp" style={{background:"var(--sp-page)",padding:"100px 48px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <Rev style={{marginBottom:56}}>
            <span style={{fontFamily:"'Inter',sans-serif",fontSize:".75rem",fontWeight:700,letterSpacing:4,textTransform:"uppercase",color:G,marginBottom:12,display:"block"}}>WHO WE SERVE</span>
            <h2 style={{fontFamily:"'Inter',sans-serif",fontWeight:900,fontSize:"clamp(2.4rem,5vw,4.2rem)",textTransform:"uppercase",color:"var(--sp-text)"}}>OUR <span style={{color:G}}>CLIENTS</span></h2>
            <div style={{width:60,height:4,background:`linear-gradient(90deg, ${G}, #c47d0e)`,borderRadius:999,boxShadow:"0 0 14px rgba(232,151,26,.55)",marginTop:18}}/>
          </Rev>
          <div ref={clientsRef} className="g1" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:20}}>
            {CLIENTS.map(c=>{
              const Icon=c.icon;
              return(
              <div key={c.title}>
                <div className="cli" style={{background:CBKG,border:`1px solid ${BORD}`,borderRadius:12,padding:"26px 22px",position:"relative",overflow:"hidden",transition:"border-color .25s,transform .25s"}}>
                  <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${G},transparent)`}}/>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                    <span style={{display:"flex",alignItems:"center",justifyContent:"center",width:34,height:34,borderRadius:9,background:"rgba(232,151,26,.12)",color:G,flexShrink:0}}>
                      <Icon size={17}/>
                    </span>
                    <h4 style={{fontFamily:"'Inter',sans-serif",fontSize:".85rem",fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"var(--sp-text)",lineHeight:1.3}}>{c.title}</h4>
                  </div>
                  <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:9}}>
                    {c.items.map(item=>(
                      <li key={item} style={{color:BODY,fontSize:".85rem",paddingLeft:16,position:"relative",lineHeight:1.4}}>
                        <span style={{position:"absolute",left:0,top:".55em",width:5,height:5,borderRadius:"50%",background:G}}/>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );})}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="sp" style={{background:"var(--sp-alt)",padding:"100px 48px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <Rev style={{marginBottom:56}}>
            <span style={{fontFamily:"'Inter',sans-serif",fontSize:".75rem",fontWeight:700,letterSpacing:4,textTransform:"uppercase",color:G,marginBottom:12,display:"block"}}>AWARENESS PROGRAMS</span>
            <h2 style={{fontFamily:"'Inter',sans-serif",fontWeight:900,fontSize:"clamp(2.4rem,5vw,4.2rem)",textTransform:"uppercase",color:"var(--sp-text)",lineHeight:1}}>
              EDUCATION IS THE <span style={{color:G}}>FIRST DEFENSE.</span>
            </h2>
            <div style={{width:60,height:4,background:`linear-gradient(90deg, ${G}, #c47d0e)`,borderRadius:999,boxShadow:"0 0 14px rgba(232,151,26,.55)",margin:"18px 0 20px"}}/>
            <p style={{fontFamily:"'Inter',sans-serif",fontSize:".95rem",color:BODY,lineHeight:1.75,maxWidth:560}}>We extend our expertise beyond investigations into proactive crime prevention through structured awareness programs.</p>
          </Rev>
          <div ref={progsRef} className="g1" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:24}}>
            {PROGRAMS.map(p=>(
              <div key={p.title}>
                <div className="prog" style={{background:CBKG,border:`1px solid ${BORD}`,borderRadius:12,overflow:"hidden",transition:"transform .3s,border-color .3s,box-shadow .3s"}}>
                  <div style={{padding:"32px 30px 28px",borderBottom:`1px solid ${BORD}`,background:`linear-gradient(135deg,${CBKG} 0%,rgba(17,29,64,.5) 100%)`,position:"relative"}}>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:G}}/>
                    <h3 style={{fontFamily:"'Inter',sans-serif",fontWeight:800,fontSize:"1.4rem",textTransform:"uppercase",color:"var(--sp-text)",marginBottom:8}}>{p.title}</h3>
                    <p style={{fontSize:".85rem",color:BODY,lineHeight:1.6}}>{p.sub}</p>
                  </div>
                  <div style={{padding:"24px 30px"}}>
                    <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:9}}>
                      {p.items.map(item=>(
                        <li key={item} style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:".85rem",color:BODY,lineHeight:1.5}}>
                          <span style={{flexShrink:0,width:5,height:5,background:G,borderRadius:"50%",marginTop:7}}/>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="sp" style={{padding:"110px 48px",background:"var(--sp-page)",textAlign:"center",position:"relative",zIndex:1,overflow:"hidden"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,background:"radial-gradient(circle,rgba(232,151,26,.07) 0%,transparent 65%)",pointerEvents:"none"}}/>
        <Rev>
          <h2 style={{fontFamily:"'Inter',sans-serif",fontWeight:900,fontSize:"clamp(2.6rem,5.4vw,4.8rem)",textTransform:"uppercase",color:"var(--sp-text)",marginBottom:20,position:"relative"}}>
            READY TO PROTECT<br/><span style={{color:G}}>WHAT MATTERS?</span>
          </h2>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:".95rem",color:BODY,lineHeight:1.75,maxWidth:520,margin:"0 auto 40px",position:"relative"}}>
            Whether you need digital forensics, fraud investigation, or document validation — our certified team delivers court-admissible solutions when it matters most.
          </p>
          <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",position:"relative"}}>
            <a href="mailto:hello@forfrasolutions.com" className="bgold">Email Us</a>
            <a href="tel:+919711015337" className="bgh">+91 97110 15337</a>
          </div>
        </Rev>
      </section>

      {/* FOOTER */}
      <footer style={{background:"var(--sp-footer)",borderTop:`1px solid ${BORD}`,padding:"28px 48px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,position:"relative",zIndex:1}}>
        <p style={{color:"rgba(var(--sp-fg-rgb), .45)",fontSize:".8rem"}}>© 2025 Forfra Solutions. ISO 9001:2015 &amp; ISO 27001:2022 Certified.</p>
        <div style={{display:"flex",gap:24}}>
          <a href="mailto:hello@forfrasolutions.com" className="flink">hello@forfrasolutions.com</a>
          <a href="https://www.forfrasolutions.com" target="_blank" rel="noopener noreferrer" className="flink">forfrasolutions.com</a>
        </div>
      </footer>
    </div>
  );
}