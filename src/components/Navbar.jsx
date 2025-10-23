import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaChevronDown,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Ahmedabad");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState(null);

  const cities = ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"];

  useEffect(() => {
  if (showSearchModal || showLocationModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [showSearchModal, showLocationModal]);


  // ✅ Load user immediately on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("eventhubUser");
    if (savedUser) setUser(JSON.parse(savedUser));

    // 👇 Keep in sync across tabs / refreshes
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("eventhubUser");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowLocationModal(false);
    setShowSearchModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("eventhubUser");
    setUser(null);
    setShowProfileDropdown(false);
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <div
            className="logo"
            onClick={() => (window.location.href = "/")}
            style={{ cursor: "pointer" }}
          >
            <span className="logo-highlight">Event</span>Hub
          </div>

          <div
            className="location desktop-only"
            onClick={() => {
              setShowLocationModal(true);
              setShowSearchModal(false);
            }}
            aria-haspopup="dialog"
            aria-expanded={showLocationModal}
          >
            <FaMapMarkerAlt className="location-icon" />
            <span className="location-text">{selectedCity}</span>
            <FaChevronDown className="chevron-icon" />
          </div>
        </div>

        <div className="navbar-right">
          <div className="search-bar desktop-only">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search events..."
              className="search-input"
            />
          </div>

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
          </div>

          {/* === Login / Profile Button === */}
          {!user ? (
            <button
              className="login-btn"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>
          ) : (
            <div className="profile-container" style={{ position: "relative" }}>
              <button
                className="login-btn profile-btn"
                onClick={() => setShowProfileDropdown((prev) => !prev)}
              >
                <FaUserCircle style={{ marginRight: "0.5rem" }} />
                <span className="profile-name">{user.name || "User"}</span>
              </button>
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* === Popup Modal for Search / Location === */}
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
              <div className="popup-body">
                <FaSearch className="popup-icon" />
                <input
                  type="text"
                  className="popup-input"
                  placeholder="Search events..."
                  autoFocus
                />
              </div>
            )}

            {showLocationModal && (
              <div className="popup-body">
                {cities.map((city, idx) => (
                  <div
                    key={idx}
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
