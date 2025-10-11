// src/pages/Home.jsx
import React from 'react';
import '../styles/Home.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BsApple, BsGooglePlay } from 'react-icons/bs';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section text-white d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="hero-title">Live. <span>Don't Just Exist.</span></h1>
        <p className="hero-subtext">Discover The Most Happening Events Around You</p>

        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search Events, Categories, Location..."
          />
          <div className="location-btn">
            <FaMapMarkerAlt />
            <span>Ahmedabad</span>
          </div>
        </div>

        <div className="app-buttons mt-4">
          <p>Download the App & Step Into the Moment</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a href="#" className="store-btn google"><BsGooglePlay /> Google Play</a>
            <a href="#" className="store-btn apple"><BsApple /> App Store</a>
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
