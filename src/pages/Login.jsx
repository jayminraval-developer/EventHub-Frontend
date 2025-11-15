// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import crypto from "crypto-js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showConflictPopup, setShowConflictPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("eventhubUser");
    if (savedUser) navigate("/");
  }, [navigate]);

  // Generate consistent deviceToken
  const getDeviceToken = () => {
    let token = localStorage.getItem("deviceToken");
    if (!token) {
      token = crypto.lib.WordArray.random(16).toString();
      localStorage.setItem("deviceToken", token);
    }
    return token;
  };

  // Collect device info (KEEP your original logic)
  const collectDeviceInfo = async () => {
    const device = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
      },
      deviceMemory: navigator.deviceMemory || null,
      hardwareConcurrency: navigator.hardwareConcurrency || null,
    };

    try {
      const { data } = await axios.get("https://api.ipify.org?format=json");
      device.ip = data.ip;
    } catch {
      device.ip = "Unavailable";
    }

    device.deviceToken = getDeviceToken();
    return device;
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    else if (!/^[A-Za-z0-9._%+-]+@gmail\.com$/i.test(email))
      newErrors.email = "Email must end with @gmail.com";

    if (!password) newErrors.password = "Password is required";
    else {
      if (password.length < 7)
        newErrors.password = "Password must be at least 7 characters long";
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const hasNumbers = (password.match(/\d/g) || []).length >= 2;
      if (!hasSpecial || !hasNumbers)
        newErrors.password =
          "Password must include 1 special character & 2 numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // LOGIN HANDLER — FIXED
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const deviceInfo = await collectDeviceInfo();
      const deviceToken = deviceInfo.deviceToken; // Backend expects only token

      const { data } = await axios.post(
        "https://eventhub-backend-mveb.onrender.com/api/user/login",
        { email, password, deviceToken }
      );

      // SAVE full deviceInfo (OPTIONAL)
      localStorage.setItem("deviceInfo", JSON.stringify(deviceInfo));

      // SAVE login data
      localStorage.setItem("eventhubUser", JSON.stringify(data));
      window.dispatchEvent(new Event("userUpdated"));
      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Try again.";
      setErrors({ api: message });

      if (message.includes("already logged in")) {
        setShowConflictPopup(true);
      }
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT ALL DEVICES
  const handleLogoutAllDevices = async () => {
    try {
      const saved = JSON.parse(localStorage.getItem("eventhubUser"));

      await axios.post(
        "https://eventhub-backend-mveb.onrender.com/api/user/logout-all",
        { email: saved?.email || email }
      );

      localStorage.removeItem("eventhubUser");
      alert("Logged out from all devices. Please login again.");
      setShowConflictPopup(false);
    } catch {
      alert("Failed to logout from all devices.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">

        <div className="login-icon">
          <FaUserCircle />
        </div>

        <h3>Welcome back 👋</h3>
        <p>
          Please sign in to continue to <span>EventHub</span>
        </p>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} autoComplete="off">
          <div className="input-group">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="new-email"
            />
          </div>
          {errors.email && <span className="error">{errors.email}</span>}

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <span
              className="toggle-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <span className="error">{errors.password}</span>}
          {errors.api && <span className="error">{errors.api}</span>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        {/* SOCIAL LOGIN UI (KEPT 100%) */}
        <div className="social-login">
          <p className="or">OR CONTINUE WITH</p>
          <div className="social-icons">
            <button title="Google">G</button>
            <button title="GitHub">🐙</button>
            <button title="Twitter">🐦</button>
          </div>
        </div>

        <p className="signup">
          Don’t have an account?{" "}
          <a href="#" className="signup-link">
            Sign up
          </a>
        </p>
      </div>

      {/* MULTI-DEVICE LOGIN POPUP */}
      {showConflictPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h4>⚠️ Already Logged In</h4>
            <p>
              You are already logged in on another device.
              Would you like to logout from all devices?
            </p>
            <div className="popup-buttons">
              <button className="logout-all" onClick={handleLogoutAllDevices}>
                Logout All Devices
              </button>
              <button
                className="cancel"
                onClick={() => setShowConflictPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Login;
