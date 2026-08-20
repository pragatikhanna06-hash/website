import { Link } from "react-router-dom";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link to="/" className="brand">FORFRA SOLUTIONS</Link>
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
