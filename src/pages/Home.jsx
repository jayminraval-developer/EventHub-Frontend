// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineSort } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import homeIcon from "../assets/icons/Home.svg";
import navratriIcon from "../assets/icons/navratri.svg";
import musicIcon from "../assets/icons/music.svg";
import educationalIcon from "../assets/icons/educational.svg";
import devotionalIcon from "../assets/icons/devotional.svg";
import exhibitionsIcon from "../assets/icons/exhibitions.svg";
import christmasIcon from "../assets/icons/default.svg"; // No christmas.svg found, fallback
import foodFestIcon from "../assets/icons/default.svg";  // No food.svg found, fallback
import newYearIcon from "../assets/icons/new-year.svg";
import theatreIcon from "../assets/icons/plays.svg";     // Using plays.svg for theatre
import diwaliIcon from "../assets/icons/default.svg";    // No diwali.svg found, fallback
import adventureIcon from "../assets/icons/adventure.svg"; // No adventure.svg found, fallback
import adventureTravelIcon from "../assets/icons/adventure-travel.svg"; // No adventure-travel.svg found, fallback
import awardShowIcon from "../assets/icons/award-show.svg"; // No award-show.svg found, fallback
import comedyIcon from "../assets/icons/comedy.svg"; // No comedy.svg found, fallback
import defaultIcon from "../assets/icons/default.svg"; // Default icon
import holiIcon from "../assets/icons/holi.svg"; // No holi.svg found, fallback
import musicFestivalIcon from "../assets/icons/music-festival.svg"; // No music-festival.svg found, fallback
import playsIcon from "../assets/icons/plays.svg"; // No plays.svg found, fallback
import technoIcon from "../assets/icons/techno.svg"; // No techno.svg found, fallback
import workShopIcon from "../assets/icons/work-shop.svg"; // No workshop.svg found, fallback


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
  const [showAllGenres, setShowAllGenres] = useState(false);

  // --- Genre data ---
const genres = [
  { name: "Home", icon: homeIcon },
  { name: "Navratri", icon: navratriIcon },
  { name: "Music", icon: musicIcon },
  { name: "Educational", icon: educationalIcon },
  { name: "Devotional", icon: devotionalIcon },
  { name: "Exhibitions", icon: exhibitionsIcon },
  { name: "Christmas", icon: christmasIcon },
  { name: "Food Fest", icon: foodFestIcon },
  { name: "New Year", icon: newYearIcon },
  { name: "Theatre", icon: theatreIcon },
  { name: "Diwali", icon: diwaliIcon },
  { name: "Adventure", icon: adventureIcon },
  { name: "Adventure Travel", icon: adventureTravelIcon },
  { name: "Award Show", icon: awardShowIcon },
  { name: "Comedy", icon: comedyIcon },
  { name: "Holi", icon: holiIcon },
  { name: "Music Festival", icon: musicFestivalIcon },
  { name: "Plays", icon: playsIcon },
  { name: "Techno", icon: technoIcon },
  { name: "Workshop", icon: workShopIcon },
  { name: "Others", icon: defaultIcon },

];


  const visibleGenres = showAllGenres ? genres : genres.slice(0, 6);

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
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "ease-in-out",
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

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

      {/* ---- Browse By Genre Section ---- */}
      <section className="browse-section my-5 px-5">
        <div className="genre-scroll-container">
          {visibleGenres.map((genre) => (
            <div key={genre.name} className="genre-item text-center">
              <img src={genre.icon} alt={genre.name} className="genre-img" />
              <p className="mt-3 fw-semibold">{genre.name}</p>
            </div>
          ))}
        </div>

        <div className="text-start mt-4 px-5">
          <button
            className="show-more-btn"
            onClick={() => setShowAllGenres(!showAllGenres)}
          >
            {showAllGenres ? "Show Less" : "Show More"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
