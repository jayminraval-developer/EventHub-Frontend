import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineSort } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { FaTicketAlt } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const cityList = [
    "Ahmedabad", "Surat", "Rajkot", "Vadodara", "Hyderabad",
    "Mumbai", "Pune", "Delhi", "Jaipur", "Bengaluru",
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
  }, []);

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

  const featuredEvents = [
    { title: "Arijit Singh Live", date: "Nov 22", location: "Mumbai", image: "/images/event1.jpg" },
    { title: "Navratri Garba Night", date: "Oct 30", location: "Ahmedabad", image: "/images/event2.jpg" },
    { title: "Startup Summit 2025", date: "Dec 12", location: "Pune", image: "/images/event3.jpg" },
    { title: "Comedy Carnival", date: "Nov 5", location: "Delhi", image: "/images/event4.jpg" },
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
    if (value.trim() === "") setFilteredCities([]);
    else {
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
            Discover <span>Epic Events</span> Near You
          </h1>
          <p className="hero-subtext">
            Book your passes and experience unforgettable moments!
          </p>

          <div className="location-section">
            {!showSearch ? (
              <div className="location-display" onClick={() => setShowSearch(true)}>
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
        <div className="browse-header">
          <h2>Browse By Genre in <span>{selectedCity}</span></h2>
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

      {/* ---- Featured Events ---- */}
      <section className="featured-section px-4 py-5">
        <h2 className="section-title">🔥 Featured Events</h2>
        <div className="event-grid">
          {featuredEvents.map((event, index) => (
            <div className="event-card fade-in" key={index}>
              <img src={event.image} alt={event.title} />
              <div className="event-info">
                <h3>{event.title}</h3>
                <p><IoCalendarOutline /> {event.date}</p>
                <p><FaMapMarkerAlt /> {event.location}</p>
                <button className="book-btn">
                  <FaTicketAlt className="me-2" /> Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Organizer CTA ---- */}
      <section className="organizer-cta py-5">
        <div className="cta-content">
          <h2>Are You an Event Organizer?</h2>
          <p>Host your events with EventsHub and reach thousands of attendees effortlessly.</p>
          <button className="cta-btn">Start Hosting</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
