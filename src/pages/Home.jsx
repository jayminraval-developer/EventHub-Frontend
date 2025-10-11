// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from "react";
import "../styles/Home.css";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { BsApple, BsGooglePlay } from "react-icons/bs";

import EBanner1 from "../assets/EBanner1.jpg";
import EBanner2 from "../assets/EBanner2.jpg";
import EBanner3 from "../assets/EBanner3.jpg";
import EBanner4 from "../assets/EBanner4.jpg";

const banners = [EBanner1, EBanner2, EBanner3, EBanner4];

const genres = [
  { name: "Navratri", icon: "https://cdn-icons-png.flaticon.com/128/9715/9715804.png" },
  { name: "Diwali", icon: "https://cdn-icons-png.flaticon.com/128/9715/9715862.png" },
  { name: "Music", icon: "https://cdn-icons-png.flaticon.com/128/726/726496.png" },
  { name: "Educational", icon: "https://cdn-icons-png.flaticon.com/128/3135/3135755.png" },
  { name: "Christmas", icon: "https://cdn-icons-png.flaticon.com/128/2387/2387635.png" },
  { name: "New Year", icon: "https://cdn-icons-png.flaticon.com/128/7859/7859314.png" },
  { name: "Devotional", icon: "https://cdn-icons-png.flaticon.com/128/686/686589.png" },
  { name: "Tech Fest", icon: "https://cdn-icons-png.flaticon.com/128/2721/2721226.png" },
  { name: "Workshops", icon: "https://cdn-icons-png.flaticon.com/128/2995/2995645.png" },
  { name: "Food Festival", icon: "https://cdn-icons-png.flaticon.com/128/857/857681.png" },
  { name: "Exhibitions", icon: "https://cdn-icons-png.flaticon.com/128/2706/2706977.png" },
];

const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll for genre section
  useEffect(() => {
    const slider = sliderRef.current;
    let scrollAmount = 0;
    const scrollStep = 1;

    const autoScroll = setInterval(() => {
      if (slider) {
        scrollAmount += scrollStep;
        if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
          scrollAmount = 0;
        }
        slider.scrollLeft = scrollAmount;
      }
    }, 40);

    return () => clearInterval(autoScroll);
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`banner-slide ${index === currentBanner ? "active" : ""}`}
            style={{ backgroundImage: `url(${banner})` }}
          ></div>
        ))}
        <div className="hero-overlay"></div>

        <div className="hero-content text-white text-center">
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

      {/* Browse By Genre Section */}
      <section className="genre-section">
        <div className="genre-header">
          <h2>Browse By Genre Ahmedabad</h2>
          <button className="sort-btn">
            <i className="bi bi-filter"></i> Sort By
          </button>
        </div>

        <div className="genre-slider" ref={sliderRef}>
          {genres.map((genre, idx) => (
            <div key={idx} className="genre-card">
              <img src={genre.icon} alt={genre.name} />
              <p>{genre.name}</p>
            </div>
          ))}
        </div>

        <div className="show-more">
          <a href="#">Show More</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
