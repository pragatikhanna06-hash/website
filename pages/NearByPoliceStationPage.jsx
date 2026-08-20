import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import "./NearByPoliceStationPage.css";

/* NOTE: This is intentionally static, illustrative data — no live
   geolocation, no third-party maps API, no tracking. Swap STATIONS
   for a real dataset (e.g. your state police open-data portal) when
   you're ready to make this live. */
const STATIONS = [
  { name: "Model Town Police Station", address: "Model Town Rd, Sector 11", phone: "0161-2401234", dist: "1.2 km" },
  { name: "Civil Lines Police Station", address: "Civil Lines, near District Court", phone: "0161-2405678", dist: "2.4 km" },
  { name: "Sarabha Nagar Police Station", address: "Sarabha Nagar Market Rd", phone: "0161-2409012", dist: "3.1 km" },
  { name: "Division No. 5 Police Station", address: "Ghumar Mandi Chowk", phone: "0161-2403456", dist: "4.6 km" },
];

export default function NearbyPoliceStationPage() {
  const [city, setCity] = useState("current");

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
          <Link className="back-link" to="/">← Back to Home Page</Link>
        </div>
      </nav>

      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Nearby Police Station</div>
          <h1>Find the station closest to you.</h1>
          <p>A quick list of nearby stations with address and phone, so you know exactly where to go or who to call.</p>
        </div>
      </section>

      <section className="page-body">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <div className="field" style={{ maxWidth: 320, marginBottom: 28 }}>
            <label htmlFor="cityPick">Area</label>
            <select id="cityPick" value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="current">Near Me (sample list)</option>
            </select>
          </div>

          <div className="station-list">
            {STATIONS.map((s) => (
              <div className="station-card" key={s.name}>
                <div>
                  <div className="s-name">{s.name}</div>
                  <div className="s-addr"><MapPin size={13} style={{ marginRight: 6, verticalAlign: -2 }} />{s.address}</div>
                  <div className="s-meta">
                    <span><Phone size={12} style={{ marginRight: 5, verticalAlign: -2 }} />{s.phone}</span>
                  </div>
                </div>
                <div className="s-dist">{s.dist}</div>
              </div>
            ))}
          </div>

          <p className="station-note">
            📍 Sample listing shown for demo purposes — not live location data, no tracking involved.
            Contact your local station directly, or dial <b style={{ color: "var(--text)" }}>112</b> for emergencies.
          </p>
        </div>
      </section>
    </div>
  );
}
