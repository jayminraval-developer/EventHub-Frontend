// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineSort } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    }, 5000); // every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // --- Genre data ---
  const genres = [
    { name: "Navratri", icon: "🪔" },
    { name: "Music", icon: "🎵" },
    { name: "Educational", icon: "🎓" },
    { name: "Devotional", icon: "🙏" },
    { name: "Exhibitions", icon: "🏛️" },
    { name: "Diwali", icon: "✨" },
    { name: "Christmas", icon: "🎄" },
    { name: "New Year", icon: "🎆" },
    { name: "Food Fest", icon: "🍔" },
    { name: "Garba", icon: "🥁" },
    { name: "Theatre", icon: "🎭" },
  ];

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
      <section className="browse-section my-5 px-4">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <h2 className="fw-bold">
            Browse By Genre{" "}
            <span className="text-danger city-name">{selectedCity}</span>
          </h2>
          <button className="sort-btn">
            <MdOutlineSort className="me-2" /> Sort By
          </button>
        </div>

        <Slider {...sliderSettings}>
          {genres.map((genre) => (
            <div key={genre.name} className="genre-item text-center p-3">
              <div className="genre-icon fs-1">{genre.icon}</div>
              <p className="mt-2 fw-semibold">{genre.name}</p>
            </div>
          ))}
        </Slider>

        <div className="text-center mt-3">
          <button className="show-more-btn">Show More</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
