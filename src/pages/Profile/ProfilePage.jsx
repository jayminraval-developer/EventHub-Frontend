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
} from "react-icons/fa";

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);

  // Dummy data (static for UI)
  const user = {
    name: "Jaymin",
    email: "jaymin@example.com",
    phone: "+91 98765 43210",
    location: "Ahmedabad, India",
    bio: "Passionate about events, technology, and creativity.",
    joined: "March 2024",
    avatar: "",
  };

  return (
    <div className="profile-wrapper">

      {/* HERO */}
      <div className="profile-hero-card">
        <div className="hero-left">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="profile-avatar" />
          ) : (
            <FaUserCircle className="profile-avatar default-avatar" />
          )}

          <div>
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-location">
              <FaMapMarkerAlt /> {user.location}
            </p>
          </div>
        </div>

        <button className="edit-btn" onClick={() => setEditMode(true)}>
          <FaEdit /> Edit Profile
        </button>
      </div>

      {/* ABOUT CARD */}
      <div className="profile-card">
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
      </div>

      {/* STATS */}
      <div className="profile-stats-row">
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
      </div>

      {/* UPCOMING EVENTS */}
      <div className="profile-section">
        <h2 className="section-title">Upcoming Events</h2>

        <div className="event-grid">
          <div className="event-card">
            <h4>Startup Meetup</h4>
            <p>Tomorrow • Ahmedabad</p>
          </div>

          <div className="event-card">
            <h4>Music Fest</h4>
            <p>3 Days Left • Surat</p>
          </div>
        </div>
      </div>

      {/* HISTORY */}
      <div className="profile-section">
        <h2 className="section-title">Event History</h2>

        <div className="event-grid">
          <div className="event-card">
            <h4>Food Carnival</h4>
            <p>Completed • Last Week</p>
          </div>

          <div className="event-card">
            <h4>Tech Expo</h4>
            <p>Completed • 2 Weeks Ago</p>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editMode && (
        <div className="modal-backdrop" onClick={() => setEditMode(false)}>
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
