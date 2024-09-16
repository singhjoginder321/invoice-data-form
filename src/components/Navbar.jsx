import React from "react";
import { Link } from "react-router-dom";
import "./../style/Header.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-buttons-left">
        <Link to="/" className="nav-link-button">
          Invoice Sum
        </Link>
        <Link to="/edit-table" className="nav-link-button">
          Line Items
        </Link>
      </div>
      <div className="navbar-buttons-right">
        <Link to="/form" className="nav-link-button2">
          Add-form
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
