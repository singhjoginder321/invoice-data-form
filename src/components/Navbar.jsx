import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./../style/Header.css";

function Navbar() {
  const location = useLocation(); // Get current location
  const [isEditable, setIsEditable] = useState(false); // Track if the path is editable

  // Set the active state for "Line Items" button based on the current path
  useEffect(() => {
    if (location.pathname === "/edit-table") {
      setIsEditable(true); // Make the path editable
    } else {
      setIsEditable(false); // Remove the editable state if not on /edit-table
    }
  }, [location.pathname]);

  // Activate "Invoice Sum" if path is either "/" or "/form"
  const isInvoiceSumActive = location.pathname === "/" || location.pathname === "/form";

  return (
    <nav className="navbar">
      <div className="navbar-buttons-left">
        {/* Apply "active" class to "Invoice Sum" if the path is "/" or "/form" */}
        <Link
          to="/"
          className={`nav-link-button ${isInvoiceSumActive ? "active" : ""}`} // Conditionally apply "active" class
        >
          Invoice Summary
        </Link>

        {/* Apply "active" class when isEditable is true */}
        <Link
          to="/edit-table"
          className={`nav-link-button ${isEditable ? "active" : ""}`} // Conditionally apply "active" class
        >
          Line Items
        </Link>
      </div>

      <div className="navbar-buttons-right">
        {/* Hide "Add-form" button when the path is either /edit-table or /form */}
        {location.pathname !== "/edit-table" && location.pathname !== "/form" && (
          <Link to="/form" className="nav-link-button2">
            Add-form
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
