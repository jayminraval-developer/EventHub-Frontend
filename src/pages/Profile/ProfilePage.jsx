// src/pages/Profile/ProfilePage.jsx
import React, { useState } from "react";
import "../../styles/Profile.css";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaCalendarAlt,
  FaSave,
  FaHistory,
  FaUserCircle,
  FaRegBookmark,
  FaTwitter,
  FaLinkedin,
  FaGlobe,
  FaCheckCircle,
  FaBell,
  FaLock,
  FaTrash,
} from "react-icons/fa";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "saved", label: "Saved" },
  { id: "upcoming", label: "Upcoming" },
  { id: "history", label: "History" },
  { id: "settings", label: "Settings" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);

  // Static UI data (mock)
  const user = {
    name: "Jaymin",
    email: "jaymin@example.com",
    phone: "+91 98765 43210",
    location: "Ahmedabad, India",
    bio: "Passionate about events, technology, and creativity.",
    joined: "March 2024",
    avatar: "",
  };

  const interests = ["Music", "Tech", "Business", "Comedy", "Food", "Startups"];
  const badges = ["Event Enthusiast", "Early Bird", "Top Reviewer"];
  const profileCompletion = 72; // % (UI only)

  const socialLinks = {
    twitter: "@jaymin_dev",
    linkedin: "linkedin.com/in/jaymin",
    website: "jaymin.dev",
  };

  const savedEvents = [
    { title: "Design Conference 2024", meta: "Online • 23 March" },
    { title: "Standup Comedy Night", meta: "Ahmedabad • Friday" },
  ];

  const upcomingEvents = [
    { title: "Startup Meetup", meta: "Tomorrow • Ahmedabad" },
    { title: "Indie Music Fest", meta: "In 3 days • Surat" },
  ];

  const historyEvents = [
    { title: "Tech Expo", meta: "Completed • 2 weeks ago" },
    { title: "Food Carnival", meta: "Completed • Last month" },
    { title: "Marketing Summit", meta: "Completed • 3 months ago" },
  ];

  const activityTimeline = [
    "Saved “Standup Comedy Night”",
    "Booked “Startup Meetup”",
    "Attended “Tech Expo”",
  ];

  const recommendations = [
    { title: "Comedy Open Mic", meta: "Tonight • Nearby" },
    { title: "Business Networking Mixer", meta: "This Weekend • Gandhinagar" },
  ];

  const renderOverview = () => (
    <>
      {/* About + Stats */}
      <section className="profile-card">
        <h2 className="section-title">About</h2>

        <div className="detail-row">
          <FaEnvelope />
          <span>{user.email}</span>
        </div>
        <div className="detail-row">
          <FaPhone />
          <span>{user.phone}</span>
        </div>
        <div className="detail-row">
          <FaCalendarAlt />
          <span>Joined • {user.joined}</span>
        </div>

        <p className="profile-bio">{user.bio}</p>

        {/* Profile completion */}
        <div className="completion-wrapper">
          <div className="completion-header">
            <span>Profile completion</span>
            <span>{profileCompletion}%</span>
          </div>
          <div className="completion-bar">
            <div
              className="completion-fill"
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
          <p className="completion-hint">
            Complete your profile to get better event recommendations.
          </p>
        </div>
      </section>

      {/* Stats row */}
      <section className="profile-stats-row">
        <div className="stat-box">
          <FaRegBookmark className="stat-icon" />
          <h3>12</h3>
          <p>Saved Events</p>
        </div>
        <div className="stat-box">
          <FaCalendarAlt className="stat-icon" />
          <h3>5</h3>
          <p>Upcoming</p>
        </div>
        <div className="stat-box">
          <FaHistory className="stat-icon" />
          <h3>20</h3>
          <p>History</p>
        </div>
      </section>

      {/* Interests + Badges + Social */}
      <section className="profile-grid-2">
        <div className="profile-card">
          <h2 className="section-title">Interests</h2>
          <div className="chip-row">
            {interests.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="profile-card">
          <h2 className="section-title">Badges</h2>
          <div className="chip-row">
            {badges.map((badge) => (
              <span key={badge} className="chip badge-chip">
                <FaCheckCircle /> {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="profile-card full-width-card">
          <h2 className="section-title">Social Links</h2>
          <div className="social-row">
            <div className="social-item">
              <FaTwitter />
              <span>{socialLinks.twitter}</span>
            </div>
            <div className="social-item">
              <FaLinkedin />
              <span>{socialLinks.linkedin}</span>
            </div>
            <div className="social-item">
              <FaGlobe />
              <span>{socialLinks.website}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Activity + Recommendations */}
      <section className="profile-grid-2">
        <div className="profile-card">
          <h2 className="section-title">Recent Activity</h2>
          <ul className="timeline">
            {activityTimeline.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="profile-card">
          <h2 className="section-title">Recommended for you</h2>
          <div className="event-grid">
            {recommendations.map((ev) => (
              <div key={ev.title} className="event-card">
                <h4>{ev.title}</h4>
                <p>{ev.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderSaved = () => (
    <section className="profile-card">
      <h2 className="section-title">Saved Events</h2>
      {savedEvents.length === 0 ? (
        <p className="muted-text">You have no saved events yet.</p>
      ) : (
        <div className="event-grid">
          {savedEvents.map((ev) => (
            <div key={ev.title} className="event-card">
              <h4>{ev.title}</h4>
              <p>{ev.meta}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  const renderUpcoming = () => (
    <section className="profile-card">
      <h2 className="section-title">Upcoming Events</h2>
      {upcomingEvents.length === 0 ? (
        <p className="muted-text">No upcoming events booked.</p>
      ) : (
        <div className="event-grid">
          {upcomingEvents.map((ev) => (
            <div key={ev.title} className="event-card">
              <h4>{ev.title}</h4>
              <p>{ev.meta}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  const renderHistory = () => (
    <section className="profile-card">
      <h2 className="section-title">Event History</h2>
      {historyEvents.length === 0 ? (
        <p className="muted-text">No past events yet.</p>
      ) : (
        <div className="event-grid">
          {historyEvents.map((ev) => (
            <div key={ev.title} className="event-card">
              <h4>{ev.title}</h4>
              <p>{ev.meta}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  const renderSettings = () => (
    <section className="profile-card">
      <h2 className="section-title">Account Settings</h2>

      <div className="settings-row">
        <FaLock />
        <div>
          <h4>Change password</h4>
          <p className="muted-text">Update your account password.</p>
        </div>
        <button className="settings-btn">Change</button>
      </div>

      <div className="settings-row">
        <FaBell />
        <div>
          <h4>Notifications</h4>
          <p className="muted-text">
            Control email & SMS notifications for events.
          </p>
        </div>
        <button className="settings-btn">Manage</button>
      </div>

      <div className="settings-row danger">
        <FaTrash />
        <div>
          <h4>Delete account</h4>
          <p className="muted-text">
            Permanently delete your account and event history.
          </p>
        </div>
        <button className="settings-btn danger-btn">Delete</button>
      </div>
    </section>
  );

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "saved":
        return renderSaved();
      case "upcoming":
        return renderUpcoming();
      case "history":
        return renderHistory();
      case "settings":
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="profile-page">
      {/* COVER + HERO */}
      <div className="profile-cover">
        <div className="cover-gradient" />
        <div className="profile-hero-inner">
          <div className="hero-main">
            <div className="hero-avatar-wrapper">
              {user.avatar ? (
                <img src={user.avatar} alt="avatar" className="hero-avatar" />
              ) : (
                <FaUserCircle className="hero-avatar default-avatar" />
              )}
            </div>
            <div className="hero-text">
              <h1>{user.name}</h1>
              <p>
                <FaMapMarkerAlt /> {user.location}
              </p>
            </div>
          </div>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            <FaEdit /> Edit profile
          </button>
        </div>
      </div>

      <div className="profile-layout">
        {/* DESKTOP SIDEBAR NAV */}
        <aside className="profile-sidebar desktop-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`sidebar-tab ${
                activeTab === tab.id ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </aside>

        <main className="profile-content">
          {/* MOBILE TABS */}
          <div className="profile-tabs mobile-nav">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`tab-chip ${
                  activeTab === tab.id ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div className="profile-sections">{renderActiveTabContent()}</div>
        </main>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditing && (
        <div className="modal-backdrop" onClick={() => setIsEditing(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Profile</h2>

            <input type="text" defaultValue={user.name} />
            <input type="email" defaultValue={user.email} />
            <input type="text" defaultValue={user.phone} />
            <textarea defaultValue={user.bio}></textarea>

            <button className="save-btn">
              <FaSave /> Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
