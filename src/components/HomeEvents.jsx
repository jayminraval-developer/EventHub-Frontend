import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/HomeEvents.css";

const fallbackImage = "https://via.placeholder.com/400x220?text=No+Image";

const HomeEvents = () => {
  const [events, setEvents] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(
          "https://eventhub-backend-mveb.onrender.com/api/events"
        );
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  const visibleEvents = showAll ? events : events.slice(0, 3);

  return (
    <section className="home-events-section py-5">
      <div className="container text-center">
        <h2 className="section-title mb-4">
          <span className="highlight">Featured</span> Events
        </h2>

        <div className="row g-4">
          {visibleEvents.map((event) => (
            <div className="col-lg-4 col-md-6" key={event._id}>
              <div className="event-card">
                <div className="event-img-wrapper">
                  <img
                    src={event.image || fallbackImage}
                    alt={event.name}
                    className="event-img"
                    onError={(e) => (e.target.src = fallbackImage)}
                  />
                </div>
                <div className="event-info">
                  <h5>{event.name}</h5>
                  <p className="event-meta">
                    📅 {new Date(event.date).toLocaleDateString()} | 📍{" "}
                    {event.location}
                  </p>
                  <p className="event-desc">{event.description}</p>
                  <button className="btn btn-danger mt-2">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {events.length > 3 && (
          <button
            className="btn btn-outline-danger mt-5 px-4 py-2 view-all-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </section>
  );
};

export default HomeEvents;
