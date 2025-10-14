import React, { useState } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="navbar">
      {/* ===== Left Section ===== */}
      <div className="navbar-left">
        <div className="logo">
          <span className="logo-highlight">Event</span>Hub
        </div>

        <div className="location">
          <FaMapMarkerAlt className="location-icon" />
          <select className="location-select">
            <option>Ahmedabad</option>
            <option>Surat</option>
            <option>Vadodara</option>
            <option>Rajkot</option>
            <option>Gandhinagar</option>
          </select>
        </div>
      </div>

      {/* ===== Right Section ===== */}
      <div className="navbar-right">
        {/* === Desktop Search Bar === */}
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search events..."
            className="search-input"
          />
        </div>

        {/* === Mobile Icons === */}
        <div className="mobile-icons">
          <FaSearch
            className="mobile-icon"
            onClick={() => setShowSearch(!showSearch)}
          />
          <FaMapMarkerAlt className="mobile-icon" />
        </div>

        <button className="login-btn">Login</button>
      </div>

      {/* === Mobile Expanded Search === */}
      {showSearch && (
        <div className="mobile-search">
          <input
            type="text"
            placeholder="Search events..."
            className="mobile-search-input"
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
