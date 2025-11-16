// src/pages/Profile/ProfilePage.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./Profile.css";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaCalendarAlt,
  FaSave,
  FaUserCircle,
  FaHeart,
  FaTicketAlt,
  FaHistory,
  FaBell,
  FaTag,
  FaListUl,
  FaCogs,
  FaStar,
} from "react-icons/fa";

import { useProfileQuery } from "../../api/queries/useProfileQuery";
import { useUpdateProfileMutation } from "../../api/mutations/useUpdateProfileMutation";

const TABS = [
  { key: "about", label: "About" },
  { key: "stats", label: "Stats" },
  { key: "saved", label: "Saved Events" },
  { key: "booked", label: "Booked Events" },
  { key: "history", label: "Event History" },
  { key: "offers", label: "Offers" },
  { key: "notifications", label: "Notifications" },
  { key: "interests", label: "Interests" },
  { key: "settings", label: "Settings" },
];

// simple dummy data for now (replace later with real API)
const dummySavedEvents = [
  { id: 1, title: "Garba Night 2025", city: "Ahmedabad", date: "25 Oct, 7:00 PM" },
  { id: 2, title: "Startup Pitch Fest", city: "Gandhinagar", date: "30 Oct, 5:00 PM" },
];

const dummyBookedEvents = [
  { id: 3, title: "EDM Music Fest", city: "Surat", date: "Next Week" },
];

const dummyHistoryEvents = [
  { id: 4, title: "Food Carnival", city: "Ahmedabad", date: "Last Week" },
  { id: 5, title: "Tech Expo", city: "Vadodara", date: "2 Weeks Ago" },
];

const dummyOffers = [
  { id: 1, title: "FLAT 20% OFF", description: "On any Garba event this weekend", code: "GARBA20" },
  { id: 2, title: "Buy 1 Get 1", description: "Selected concerts in Ahmedabad", code: "B1G1" },
];

const dummyNotifications = [
  { id: 1, title: "New event near you", message: "Music Fest happening this Sunday in Ahmedabad", time: "2h ago" },
  { id: 2, title: "Booking reminder", message: "Your ticket for Startup Meetup is tomorrow at 6 PM", time: "1d ago" },
];

const defaultInterests = ["Music", "Tech", "Startups", "Food", "Festivals", "Workshops"];

function calculateCompletion(user) {
  if (!user) return { percent: 0, hint: "Add your basic details to complete your profile." };

  let total = 0;
  let filled = 0;

  const fields = [
    { key: "avatar", value: user.avatar },
    { key: "bio", value: user.bio },
    { key: "phone", value: user.phone },
    { key: "location", value: user.location },
    { key: "gender", value: user.gender },
    { key: "dateOfBirth", value: user.dateOfBirth },
    { key: "social.instagram", value: user.social?.instagram },
    { key: "social.linkedin", value: user.social?.linkedin },
    { key: "interests", value: user.interests && user.interests.length > 0 },
  ];

  fields.forEach((f) => {
    total += 1;
    if (f.value) filled += 1;
  });

  const percent = Math.round((filled / total) * 100);
  let hint = "Great! Your profile looks good.";

  if (percent < 40) hint = "Add bio, phone & location to improve your profile.";
  else if (percent < 70) hint = "Connect social links & interests to complete your profile.";
  else if (percent < 100) hint = "Almost there, add one or two more details.";

  return { percent, hint };
}

export default function ProfilePage() {
  const { data: user, isLoading } = useProfileQuery();
  const updateProfile = useUpdateProfileMutation();

  const [activeTab, setActiveTab] = useState("about");
  const [editOpen, setEditOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    bio: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    website: "",
    interests: [],
  });

  // sync form values from API user
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
        instagram: user.social?.instagram || "",
        twitter: user.social?.twitter || "",
        linkedin: user.social?.linkedin || "",
        website: user.social?.website || "",
        interests: user.interests || [],
      });
    }
  }, [user]);

  const completion = useMemo(() => calculateCompletion(user), [user]);

  const handleChange = (e) =>
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const toggleInterest = (interest) => {
    setForm((prev) => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      };
    });
  };

  const handleSave = () => {
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("phone", form.phone);
    fd.append("location", form.location);
    fd.append("bio", form.bio);
    fd.append(
      "social",
      JSON.stringify({
        instagram: form.instagram,
        twitter: form.twitter,
        linkedin: form.linkedin,
        website: form.website,
      })
    );
    fd.append("interests", JSON.stringify(form.interests));
    if (avatarFile) fd.append("avatar", avatarFile);

    updateProfile.mutate(fd, {
      onSuccess: () => {
        setEditOpen(false);
        setAvatarFile(null);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="profile-page">
        <div className="profile-cover">
          <div className="cover-gradient" />
          <div className="profile-hero-inner">
            <div className="hero-main">
              <div className="hero-avatar-wrapper">
                <div className="hero-avatar default-avatar" />
              </div>
              <div className="hero-text">
                <div className="skeleton" style={{ width: 140, height: 20 }} />
                <div className="skeleton" style={{ width: 100, height: 14, marginTop: 8 }} />
              </div>
            </div>
          </div>
        </div>
        <div className="profile-layout">
          <div className="profile-content">
            <div className="profile-card">
              <div className="skeleton" style={{ width: "100%", height: 120 }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div className="profile-page">Profile not found</div>;
  }

  const stats = {
    saved: dummySavedEvents.length,
    booked: dummyBookedEvents.length,
    history: dummyHistoryEvents.length,
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
                <img src={user.avatar} alt="Avatar" className="hero-avatar" />
              ) : (
                <FaUserCircle className="hero-avatar default-avatar" />
              )}
            </div>
            <div className="hero-text">
              <h1>{user.name}</h1>
              <p>
                <FaMapMarkerAlt />
                {user.location || "Add your location"}
              </p>
            </div>
          </div>

          <button className="edit-btn" onClick={() => setEditOpen(true)}>
            <FaEdit /> Edit Profile
          </button>
        </div>
      </div>

      {/* LAYOUT */}
      <div className="profile-layout">
        {/* SIDEBAR (DESKTOP) */}
        <aside className="profile-sidebar desktop-nav">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`sidebar-tab ${activeTab === t.key ? "active" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </aside>

        {/* CONTENT */}
        <main className="profile-content">
          {/* MOBILE TABS */}
          <div className="profile-tabs mobile-nav">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`tab-chip ${activeTab === t.key ? "active" : ""}`}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* SECTIONS */}
          <div className="profile-sections">
            {activeTab === "about" && (
              <>
                <section className="profile-card">
                  <h2 className="section-title">About</h2>
                  <div className="detail-row">
                    <FaEnvelope />
                    <span>{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="detail-row">
                      <FaPhone />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <FaCalendarAlt />
                    <span>Joined: {new Date(user.createdAt).toDateString()}</span>
                  </div>
                  {user.bio && <p className="profile-bio">{user.bio}</p>}

                  <div className="completion-wrapper">
                    <div className="completion-header">
                      <span>Profile completeness</span>
                      <span>{completion.percent}%</span>
                    </div>
                    <div className="completion-bar">
                      <div
                        className="completion-fill"
                        style={{ width: `${completion.percent}%` }}
                      />
                    </div>
                    <p className="completion-hint">{completion.hint}</p>
                  </div>
                </section>
              </>
            )}

            {activeTab === "stats" && (
              <section className="profile-card">
                <h2 className="section-title">Your Stats</h2>
                <div className="profile-stats-row">
                  <div className="stat-box">
                    <FaHeart className="stat-icon" />
                    <h3>{stats.saved}</h3>
                    <p>Saved Events</p>
                  </div>
                  <div className="stat-box">
                    <FaTicketAlt className="stat-icon" />
                    <h3>{stats.booked}</h3>
                    <p>Active Bookings</p>
                  </div>
                  <div className="stat-box">
                    <FaHistory className="stat-icon" />
                    <h3>{stats.history}</h3>
                    <p>Event History</p>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "saved" && (
              <section className="profile-card">
                <h2 className="section-title">Saved Events</h2>
                {dummySavedEvents.length === 0 ? (
                  <p className="muted-text">No saved events yet.</p>
                ) : (
                  <div className="event-grid">
                    {dummySavedEvents.map((e) => (
                      <div key={e.id} className="event-card">
                        <strong>{e.title}</strong>
                        <p className="muted-text">
                          {e.city} • {e.date}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeTab === "booked" && (
              <section className="profile-card">
                <h2 className="section-title">Booked Events</h2>
                {dummyBookedEvents.length === 0 ? (
                  <p className="muted-text">No upcoming bookings.</p>
                ) : (
                  <div className="event-grid">
                    {dummyBookedEvents.map((e) => (
                      <div key={e.id} className="event-card">
                        <strong>{e.title}</strong>
                        <p className="muted-text">
                          {e.city} • {e.date}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeTab === "history" && (
              <section className="profile-card">
                <h2 className="section-title">Event History</h2>
                {dummyHistoryEvents.length === 0 ? (
                  <p className="muted-text">No past events yet.</p>
                ) : (
                  <ul className="timeline">
                    {dummyHistoryEvents.map((e) => (
                      <li key={e.id}>
                        <strong>{e.title}</strong> — {e.city} ({e.date})
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {activeTab === "offers" && (
              <section className="profile-card">
                <h2 className="section-title">Offers & Rewards</h2>
                {dummyOffers.length === 0 ? (
                  <p className="muted-text">No active offers right now.</p>
                ) : (
                  <div className="event-grid">
                    {dummyOffers.map((o) => (
                      <div key={o.id} className="event-card">
                        <span className="badge-chip">
                          <FaTag /> {o.title}
                        </span>
                        <p className="muted-text" style={{ marginTop: 8 }}>
                          {o.description}
                        </p>
                        <p style={{ fontSize: 12, marginTop: 4 }}>
                          Use code: <strong>{o.code}</strong>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeTab === "notifications" && (
              <section className="profile-card">
                <h2 className="section-title">Notifications</h2>
                {dummyNotifications.length === 0 ? (
                  <p className="muted-text">No notifications yet.</p>
                ) : (
                  <div className="event-grid">
                    {dummyNotifications.map((n) => (
                      <div key={n.id} className="event-card">
                        <div className="detail-row">
                          <FaBell />
                          <strong>{n.title}</strong>
                        </div>
                        <p className="muted-text">{n.message}</p>
                        <p className="muted-text" style={{ fontSize: 12 }}>
                          {n.time}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeTab === "interests" && (
              <section className="profile-card">
                <h2 className="section-title">Your Interests</h2>
                <p className="muted-text" style={{ marginBottom: 10 }}>
                  Select categories to get better event recommendations.
                </p>
                <div className="chip-row">
                  {defaultInterests.map((interest) => {
                    const active = form.interests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        className={`chip ${active ? "badge-chip" : ""}`}
                        onClick={() => toggleInterest(interest)}
                      >
                        {active && <FaStar style={{ fontSize: 10 }} />}
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {activeTab === "settings" && (
              <section className="profile-card">
                <h2 className="section-title">Account Settings</h2>

                <div className="settings-row">
                  <div>
                    <h4>Password</h4>
                    <p>Change your account password regularly for security.</p>
                  </div>
                  <button className="settings-btn">Change</button>
                </div>

                <div className="settings-row">
                  <div>
                    <h4>Notifications</h4>
                    <p>Manage email & SMS notifications for events.</p>
                  </div>
                  <button className="settings-btn">Manage</button>
                </div>

                <div className="settings-row danger">
                  <div>
                    <h4>Logout from all devices</h4>
                    <p>Force sign out from every logged-in device.</p>
                  </div>
                  <button className="settings-btn danger-btn">
                    Logout All
                  </button>
                </div>

                <div className="settings-row danger">
                  <div>
                    <h4>Delete Account</h4>
                    <p>This is permanent and cannot be undone.</p>
                  </div>
                  <button className="settings-btn danger-btn">Delete</button>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>

      {/* EDIT MODAL */}
      {editOpen && (
        <div className="modal-backdrop" onClick={() => setEditOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Profile</h3>

            <label style={{ fontSize: 13 }}>Profile Picture</label>
            <input
              type="file"
              onChange={(e) => setAvatarFile(e.target.files[0])}
            />

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
            />
            <textarea
              name="bio"
              placeholder="Bio"
              rows={3}
              value={form.bio}
              onChange={handleChange}
            />

            <input
              type="text"
              name="instagram"
              placeholder="Instagram URL"
              value={form.instagram}
              onChange={handleChange}
            />
            <input
              type="text"
              name="twitter"
              placeholder="Twitter URL"
              value={form.twitter}
              onChange={handleChange}
            />
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn URL"
              value={form.linkedin}
              onChange={handleChange}
            />
            <input
              type="text"
              name="website"
              placeholder="Website URL"
              value={form.website}
              onChange={handleChange}
            />

            <button className="save-btn" onClick={handleSave} disabled={updateProfile.isPending}>
              <FaSave />
              {updateProfile.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
