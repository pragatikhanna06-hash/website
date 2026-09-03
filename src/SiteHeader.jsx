import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link to="/" className="brand">
          <img src={logo} alt="Forfra Solutions" className="brand-logo" />
          FORFRA SOLUTIONS
        </Link>
        <nav className="main-nav">
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/clients">Clients</Link>
          <Link to="/contact" className="btn btn--gold">Contact Us</Link>
        </nav>
      </div>
    </header>
  );
}
