import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./ForfraBrand.css";

/* ----------------------------------------------------------------------
   Forfra Solutions brand lockup (logo + wordmark) for the top bar of every
   NyayShield page. Same look as the main site navbar; clicking it goes to
   the Forfra Solutions homepage.
   Uses its own class names so it can't be affected by the different
   .brand / .brand-name rules each NyayShield page stylesheet defines.
------------------------------------------------------------------------- */
export default function ForfraBrand() {
  return (
    <Link to="/" className="fsb" aria-label="Forfra Solutions — home">
      <img src={logo} alt="" className="fsb-logo" />
      <span className="fsb-name">FORFRA</span>
      <span className="fsb-name">SOLUTIONS</span>
    </Link>
  );
}
