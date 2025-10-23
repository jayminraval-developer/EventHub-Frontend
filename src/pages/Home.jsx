// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import HomeEvents from "../components/HomeEvents";

const Home = () => {
  const cityList = [
    "Ahmedabad",
    "Surat",
    "Rajkot",
    "Vadodara",
    "Hyderabad",
    "Mumbai",
    "Pune",
    "Delhi",
    "Jaipur",
    "Bengaluru",
  ];

  const [selectedCity, setSelectedCity] = useState("Ahmedabad");
  const [searchInput, setSearchInput] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  // --- Auto background banner rotation ---
  const banners = [
    "/images/EBanner1.jpg",
    "/images/EBanner2.jpg",
    "/images/EBanner3.jpg",
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value.trim() === "") {
      setFilteredCities([]);
    } else {
      const results = cityList.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(results);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowSearch(false);
    setSearchInput("");
    setFilteredCities([]);
  };

  return (
    <div className="home-container">
      {/* ---- Hero Section ---- */}
      <section
        className="hero-section fade-bg"
        style={{ backgroundImage: `url(${banners[currentBanner]})` }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-content text-white">
          <h1 className="hero-title">
            Live & Discover <span>Events</span>
          </h1>
          <p className="hero-subtext">
            Find the best events happening around you.
          </p>

          {/* ---- Location + Search ---- */}
          <div className="location-section">
            {!showSearch ? (
              <div
                className="location-display"
                onClick={() => setShowSearch(true)}
              >
                <FaMapMarkerAlt /> {selectedCity}
              </div>
            ) : (
              <div className="search-box">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search city (e.g. Surat, Vadodara...)"
                  value={searchInput}
                  onChange={handleSearch}
                  autoFocus
                />
                {filteredCities.length > 0 && (
                  <ul className="suggestion-list fade-in">
                    {filteredCities.map((city) => (
                      <li key={city} onClick={() => handleCitySelect(city)}>
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---- Featured Events (if you want to render events) ---- */}
      <HomeEvents selectedCity={selectedCity} />
    </div>
  );
};

export default Home;
