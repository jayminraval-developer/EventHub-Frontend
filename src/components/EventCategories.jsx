import React, { useState } from "react";
import "../styles/EventCategories.css";

// Import icons from assets folder
import homeIcon from "../assets/icons/Home.svg";
import navratriIcon from "../assets/icons/navratri.svg";
import musicIcon from "../assets/icons/music.svg";
import educationalIcon from "../assets/icons/educational.svg";
import devotionalIcon from "../assets/icons/devotional.svg";
import exhibitionsIcon from "../assets/icons/exhibitions.svg";
import comedyIcon from "../assets/icons/comedy.svg";
import holiIcon from "../assets/icons/holi.svg";
import awardShowIcon from "../assets/icons/award-show.svg";
import technoIcon from "../assets/icons/techno.svg";

const categories = [
  { id: 1, name: "Home", icon: homeIcon },
  { id: 2, name: "Navratri", icon: navratriIcon },
  { id: 3, name: "Music", icon: musicIcon },
  { id: 4, name: "Educational", icon: educationalIcon },
  { id: 5, name: "Devotional", icon: devotionalIcon },
  { id: 6, name: "Exhibitions", icon: exhibitionsIcon },
  { id: 7, name: "Comedy", icon: comedyIcon },
  { id: 8, name: "Holi", icon: holiIcon },
  { id: 9, name: "Award Show", icon: awardShowIcon },
  { id: 10, name: "Techno", icon: technoIcon },
];

const VISIBLE_COUNT = 6; // Show first 6, rest on clicking "Show More"

const EventCategories = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedCategories = showAll ? categories : categories.slice(0, VISIBLE_COUNT);

  return (
    <section className="event-categories">
      <h2 className="section-title">Browse By</h2>
      <div className="categories-container">
        {displayedCategories.map(({ id, name, icon }) => (
          <div className="category-item" key={id}>
            <img src={icon} alt={name} className="category-icon" />
            <span className="category-name">{name}</span>
          </div>
        ))}
      </div>
      {categories.length > VISIBLE_COUNT && (
        <button className="show-more-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </section>
  );
};

export default EventCategories;
