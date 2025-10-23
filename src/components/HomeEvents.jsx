import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/HomeEvents.css";

const HomeEvents = () => {
  const [events, setEvents] = useState([]);

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

  return (
    <section className="home-events-section py-5">
      <div className="container text-center">
        <h2 className="section-title mb-4">
          <span className="highlight">Featured</span> Events
        </h2>

        <div className="row g-4">
          {events.map((event) => (
            <div className="col-lg-4 col-md-6" key={event._id}>
              <div className="event-card">
                <div className="event-img-wrapper">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="event-img"
                  />
                </div>
                <div className="event-info">
                  <h5>{event.name}</h5>
                  <p className="event-meta">
                    📅 {new Date(event.date).toLocaleDateString()} | 📍 {event.location}
                  </p>
                  <p className="event-desc">{event.description}</p>
                  <button className="btn btn-danger mt-2">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-outline-danger mt-5 px-4 py-2 view-all-btn">
          View All Events
        </button>
      </div>
    </section>
  );
};

export default HomeEvents;
