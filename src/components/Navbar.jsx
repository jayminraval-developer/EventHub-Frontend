import React, { useState } from "react";
import { FaMapMarkerAlt, FaSearch, FaChevronDown, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Ahmedabad");

  const cities = ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"];

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowLocationModal(false);
    setShowSearchModal(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo">
            <span className="logo-highlight">Event</span>Hub
          </div>

          <div
            className="location"
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
              aria-label="Open location selector"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setShowLocationModal(true);
                  setShowSearchModal(false);
                }
              }}
            />
            <FaSearch
              className="mobile-icon"
              onClick={() => {
                setShowSearchModal(true);
                setShowLocationModal(false);
              }}
              aria-label="Open search"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setShowSearchModal(true);
                  setShowLocationModal(false);
                }
              }}
            />
          </div>

          <button className="login-btn">Login</button>
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
          role="dialog"
          aria-modal="true"
        >
          <div
            className="popup-modal"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <div className="popup-close">
              <FaTimes
                onClick={() => {
                  setShowSearchModal(false);
                  setShowLocationModal(false);
                }}
                aria-label="Close modal"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setShowSearchModal(false);
                    setShowLocationModal(false);
                  }
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
              <div className="popup-body" role="listbox">
                {cities.map((city, idx) => (
                  <div
                    key={idx}
                    className={`popup-option ${city === selectedCity ? "selected" : ""}`}
                    onClick={() => handleCitySelect(city)}
                    role="option"
                    aria-selected={city === selectedCity}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleCitySelect(city);
                      }
                    }}
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
