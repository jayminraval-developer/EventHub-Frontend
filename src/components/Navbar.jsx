// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaChevronDown,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showMobileProfile, setShowMobileProfile] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Ahmedabad");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);
  const mobileProfileRef = useRef(null);
  const navigate = useNavigate();
  const cities = ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 20) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        mobileProfileRef.current &&
        !mobileProfileRef.current.contains(e.target)
      ) {
        setShowProfileDropdown(false);
        setShowMobileProfile(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Disable scroll when modals open
  useEffect(() => {
    document.body.classList.toggle(
      "no-scroll",
      showSearchModal || showLocationModal
    );
  }, [showSearchModal, showLocationModal]);

  // Load user & city
  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("eventhubUser"));
      if (savedUser) setUser(savedUser);
    } catch {
      localStorage.removeItem("eventhubUser");
    }
    const savedCity = localStorage.getItem("selectedCity");
    if (savedCity) setSelectedCity(savedCity);
  }, []);

  // 🔁 Listen for user login/logout changes dynamically
  useEffect(() => {
    const handleUserUpdate = () => {
      const savedUser = JSON.parse(localStorage.getItem("eventhubUser"));
      setUser(savedUser || null);
    };

    window.addEventListener("userUpdated", handleUserUpdate);
    window.addEventListener("storage", handleUserUpdate); // for multi-tab sync

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
      window.removeEventListener("storage", handleUserUpdate);
    };
  }, []);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    localStorage.setItem("selectedCity", city);
    setShowLocationModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("eventhubUser");
    window.dispatchEvent(new Event("userUpdated")); // 🔔 notify all listeners
    setUser(null);
    setShowProfileDropdown(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setShowSearchModal(false);
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <nav className="navbar">
        {/* === LEFT SIDE === */}
        <div className="navbar-left">
          <div className="logo" onClick={() => navigate("/")}>
            <span className="logo-highlight">Event</span>Hub
          </div>

          {/* Location Selector (Desktop only) */}
          <div
            className="location desktop-only"
            onClick={() => setShowLocationModal(true)}
          >
            <FaMapMarkerAlt className="location-icon" />
            <span className="location-text">{selectedCity}</span>
            <FaChevronDown className="chevron-icon" />
          </div>
        </div>

        {/* === RIGHT SIDE === */}
        <div className="navbar-right">
          {/* Search Bar (Desktop Only) */}
          <form className="search-bar desktop-only" onSubmit={handleSearch}>
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search events..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Login or Profile (Desktop) */}
          {!user ? (
            <button
              className="login-btn desktop-only"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ) : (
            <div className="profile-container desktop-only" ref={dropdownRef}>
              <button
                className="login-btn profile-btn"
                onClick={() => setShowProfileDropdown((p) => !p)}
              >
                <FaUserCircle className="profile-icon" />
                <span className="profile-name">{user.name || "User"}</span>
                <FaChevronDown className="dropdown-arrow" />
              </button>

              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </button>
                  <hr className="dropdown-divider" />
                  <button
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* === MOBILE ICONS === */}
          <div className="mobile-icons">
            <FaMapMarkerAlt
              className="mobile-icon"
              onClick={() => {
                setShowLocationModal(true);
                setShowSearchModal(false);
              }}
            />
            <FaSearch
              className="mobile-icon"
              onClick={() => {
                setShowSearchModal(true);
                setShowLocationModal(false);
              }}
            />
            {!user ? (
              <FaUserCircle
                className="mobile-icon"
                onClick={() => navigate("/login")}
              />
            ) : (
              <div className="mobile-profile-wrapper" ref={mobileProfileRef}>
                <FaUserCircle
                  className="mobile-icon"
                  onClick={() => setShowMobileProfile((prev) => !prev)}
                />
                {showMobileProfile && (
                  <div className="mobile-profile-dropdown">
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/profile");
                        setShowMobileProfile(false);
                      }}
                    >
                      Profile
                    </button>
                    <hr className="dropdown-divider" />
                    <button
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* === POPUPS === */}
      {(showSearchModal || showLocationModal) && (
        <div
          className="popup-backdrop"
          onClick={() => {
            setShowSearchModal(false);
            setShowLocationModal(false);
          }}
        >
          <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
            <div className="popup-close">
              <FaTimes
                onClick={() => {
                  setShowSearchModal(false);
                  setShowLocationModal(false);
                }}
              />
            </div>

            {showSearchModal && (
              <form className="popup-body" onSubmit={handleSearch}>
                <FaSearch className="popup-icon" />
                <input
                  type="text"
                  className="popup-input"
                  placeholder="Search events..."
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            )}

            {showLocationModal && (
              <div className="popup-body">
                {cities.map((city) => (
                  <div
                    key={city}
                    className={`popup-option ${
                      city === selectedCity ? "selected" : ""
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
      )}
    </>
  );
};

export default Navbar;
