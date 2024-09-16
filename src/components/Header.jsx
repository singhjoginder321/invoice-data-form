import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo-kanerika.png";
import "./../style/Navbar.css";

function Header() {
  return (
    <nav className="header">
      <div className="header-logo">
        <Link to="/" className="header-link">
          <img src={logo} alt="Home Icon" />
        </Link>
      </div>
    </nav>
  );
}

export default Header;
