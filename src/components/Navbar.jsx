import React, { useState, useEffect, useRef } from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaChevronDown,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const CITIES = [
  "Ahmedabad",
  "Surat",
  "Palanpur",
  "Mehsana",
  "Gandhinagar",
  "Rajkot",
];

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("Ahmedabad");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const locationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("eventhubUser"));
    setUser(savedUser || null);

    const savedCity = localStorage.getItem("ehCity");
    if (savedCity) setSelectedCity(savedCity);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target)
      ) {
        setShowCityDropdown(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/search?query=${encodeURIComponent(search)}`);
    setSearch("");
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    localStorage.setItem("ehCity", city);
    setShowCityDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("eventhubUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="eh-navbar">

      {/* LEFT */}
      <div className="eh-left">
        <div className="eh-logo" onClick={() => navigate("/")}>
          <span className="eh-logo-accent">Event</span>Hub
        </div>

        <div
          className="eh-location desktop-only"
          ref={locationRef}
          onClick={() => setShowCityDropdown((prev) => !prev)}
        >
          <FaMapMarkerAlt />
          <span>{selectedCity}</span>
          <FaChevronDown />

          {showCityDropdown && (
            <div className="eh-location-dropdown">
              {CITIES.map((city) => (
                <div
                  key={city}
                  className={`eh-location-option ${
                    selectedCity === city ? "active" : ""
                  }`}
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CENTER */}
      <div className="eh-center desktop-only">
        <form className="eh-search" onSubmit={handleSearchSubmit}>
          <FaSearch className="eh-search-icon" />
          <input
            type="text"
            placeholder="Search events…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="eh-search-input"
          />
        </form>
      </div>

      {/* RIGHT */}
      <div className="eh-right desktop-only" ref={profileRef}>
        {!user ? (
          <button className="eh-login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        ) : (
          <div
            className="eh-profile-btn"
            onClick={() => setShowProfileDropdown((prev) => !prev)}
            onMouseEnter={() => setShowProfileDropdown(true)}
          >
            <FaUserCircle className="eh-profile-icon" />
            <span>{user.name}</span>
            <FaChevronDown />
          </div>
        )}

        {showProfileDropdown && user && (
          <div className="eh-profile-dropdown">
            <div
              className="eh-dropdown-item"
              onClick={() => navigate("/profile")}
            >
              Profile
            </div>
            <div className="eh-dropdown-item logout" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </div>

      {/* MOBILE ICON BAR */}
      <div className="eh-mobile-icons mobile-only">
        <FaMapMarkerAlt
          className="eh-mobile-icon"
          onClick={() => alert("Static City: " + selectedCity)}
        />
        <FaSearch
          className="eh-mobile-icon"
          onClick={() => navigate("/search")}
        />
        <FaUserCircle
          className="eh-mobile-icon"
          onClick={() => navigate(user ? "/profile" : "/login")}
        />
      </div>
    </nav>
  );
};

export default Navbar;
