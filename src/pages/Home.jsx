// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { BsApple, BsGooglePlay } from "react-icons/bs";

import EBanner1 from "../assets/EBanner1.jpg";
import EBanner2 from "../assets/EBanner2.jpg";
import EBanner3 from "../assets/EBanner3.jpg";

const banners = [EBanner1, EBanner2, EBanner3];

const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section
        className="hero-section text-white d-flex flex-column justify-content-center align-items-center text-center"
        style={{ backgroundImage: `url(${banners[currentBanner]})` }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">
            Live. <span>Don't Just Exist.</span>
          </h1>
          <p className="hero-subtext">
            Discover The Most Happening Events Around You
          </p>

          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Search Events, Categories..."
            />

            {/* Future date picker */}
            {/* <input type="date" className="date-input" /> */}

            <div className="location-btn">
              <FaMapMarkerAlt />
              <span>Ahmedabad</span>
            </div>

            <button className="search-btn">
              <FaSearch />
            </button>
          </div>

          <div className="app-buttons mt-4">
            <p>Download the App & Step Into the Moment</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <a href="#" className="store-btn google">
                <BsGooglePlay /> Google Play
              </a>
              <a href="#" className="store-btn apple">
                <BsApple /> App Store
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="cities-section text-center">
        <h2>Explore Cities near you</h2>
        <div className="cities-grid">
          {[
            { name: "Ahmedabad", events: "488+" },
            { name: "Surat", events: "78+" },
            { name: "Vadodara", events: "101+" },
            { name: "Gandhinagar", events: "42+" },
            { name: "Search City", events: "30,000+" },
          ].map((city, idx) => (
            <div key={idx} className="city-card">
              <FaMapMarkerAlt className="city-icon" />
              <h5>{city.name}</h5>
              <p>{city.events} Events</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
