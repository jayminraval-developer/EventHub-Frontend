import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/HomeEvents.css";

const HomeEvents = () => {
  const events = [
    {
      id: 1,
      title: "TechFest 2025",
      date: "Dec 10, 2025",
      location: "Ahmedabad",
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=60",
      description: "Join the largest student tech festival in Gujarat!",
    },
    {
      id: 2,
      title: "Startup Expo",
      date: "Jan 5, 2026",
      location: "Surat",
      image:
        "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=900&q=60",
      description: "Meet investors, founders, and innovators in one place.",
    },
    {
      id: 3,
      title: "Music Mania",
      date: "Nov 30, 2025",
      location: "Vadodara",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=60",
      description: "An unforgettable night with live bands and DJs.",
    },
  ];

  return (
    <section className="home-events-section py-5">
      <div className="container text-center">
        <h2 className="section-title mb-4">
          <span className="highlight">Featured</span> Events
        </h2>

        <div className="row g-4">
          {events.map((event) => (
            <div className="col-lg-4 col-md-6" key={event.id}>
              <div className="event-card">
                <div className="event-img-wrapper">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="event-img"
                  />
                </div>
                <div className="event-info">
                  <h5>{event.title}</h5>
                  <p className="event-meta">
                    📅 {event.date} | 📍 {event.location}
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
    