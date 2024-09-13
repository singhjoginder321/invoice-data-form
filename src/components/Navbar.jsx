import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo-kanerika.png";
import "./../style/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="nav-link">
          <img src={logo} alt="Home Icon" />
        </Link>
      </div>
      <div className="navbar-buttons">
        <Link to="/" className="nav-link-button">
          Home
        </Link>
        <Link to="/form" className="nav-link-button">
          Open Form
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
