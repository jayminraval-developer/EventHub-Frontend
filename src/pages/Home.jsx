// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import HomeEvents from "../components/HomeEvents";
import EventCategories from "../components/EventCategories";

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

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowSearch(false);
    setSearchInput("");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value.trim().length > 0) {
      const filtered = cityList.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowSearch(true);
    } else {
      setShowSearch(false);
      setFilteredCities([]);
    }
  };

  return (
    <>
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${banners[currentBanner]})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content fade-in">
          <h1 className="hero-title">
            Welcome to <span>EventHub</span>
          </h1>
          <p className="hero-subtext">
            Discover the best events around you. Book tickets hassle-free and
            enjoy unforgettable experiences!
          </p>
          <div className="location-section">
            <button
              className="location-display"
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Select your city"
              aria-expanded={showSearch}
              aria-haspopup="listbox"
            >
              <FaMapMarkerAlt /> {selectedCity}
            </button>
          </div>

          {showSearch && (
            <div className="search-box">
              <input
                className="search-input"
                type="text"
                placeholder="Search city..."
                value={searchInput}
                onChange={handleSearchChange}
                aria-autocomplete="list"
                aria-controls="city-listbox"
                aria-activedescendant=""
                role="combobox"
                aria-expanded={showSearch}
              />
              {filteredCities.length > 0 && (
                <ul
                  id="city-listbox"
                  className="suggestion-list"
                  role="listbox"
                  tabIndex={-1}
                >
                  {filteredCities.map((city) => (
                    <li
                      key={city}
                      role="option"
                      onClick={() => handleCitySelect(city)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleCitySelect(city);
                        }
                      }}
                      tabIndex={0}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Event Categories */}
      <EventCategories />

      {/* Featured Events */}
      <section className="featured-section">
        {/* <h2 className="section-title">Featured Events</h2> */}
        <HomeEvents city={selectedCity} />
      </section>

      

      {/* Organizer Call to Action */}
      <section className="organizer-cta">
  <div className="cta-content flex-layout">
    <div className="cta-text">
      <h2>
        Hosting a show, event, or exhibition? <br />
        Partner with <span>EventHub</span> and get featured!
      </h2>
    </div>
    <div className="cta-button">
      <button className="cta-btn">Join as an Organizer</button>
    </div>
  </div>
</section>

    </>
  );
};

export default Home;
