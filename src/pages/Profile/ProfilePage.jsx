import React, { useState, useEffect } from "react";
import api from "../../api/apiClient"; // import axios client

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/user/profile");
        setUser(data);
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="profile-loading">Loading profile...</div>;
  if (!user) return <div className="profile-error">Failed to load profile.</div>;

  return (
    <div className="profile-container">
      {/* HERO SECTION */}
      ...
      {/* Replace all static data with: user.name, user.bio, user.phone, etc. */}
    </div>
  );
}
