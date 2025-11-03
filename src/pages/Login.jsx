// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if user already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("eventhubUser");
    if (savedUser) navigate("/");
  }, [navigate]);

  // Detect device info
  const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    const browser = ua.match(/(firefox|msie|chrome|safari|trident)/i)?.[0] || "Unknown";
    const os = ua.match(/(Windows|Mac|Linux|Android|iPhone)/i)?.[0] || "Unknown";
    return `${browser}-${os}`;
  };

  // Validate email and password
  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^[\\w.-]+@gmail\\.com$/i.test(email))
      newErrors.email = "Email must end with @gmail.com";

    if (!password) newErrors.password = "Password is required";
    else {
      if (password.length < 7)
        newErrors.password = "Password must be at least 7 characters long";
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const hasNumbers = (password.match(/\\d/g) || []).length >= 2;
      if (!hasSpecial || !hasNumbers)
        newErrors.password = "Password must include 1 special character & 2 numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const deviceInfo = getDeviceInfo();
      const { data } = await axios.post(
        "https://eventhub-backend-mveb.onrender.com/api/user/login",
        { email, password, deviceInfo }
      );

      // Save user & device info
      localStorage.setItem("eventhubUser", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      localStorage.setItem("deviceToken", data.deviceToken);

      // Notify other components
      window.dispatchEvent(new Event("userUpdated"));

      // Redirect
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed. Try again.";

      if (message.includes("already logged in on another device")) {
        alert("⚠️ You are already logged in on another device. Please logout from there first.");
      }

      setErrors({ api: message });
    } finally {
      setLoading(false);
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

        <form onSubmit={handleLogin} autoComplete="off">
          {/* Email */}
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

          {/* Password */}
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-eye"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <span className="error">{errors.password}</span>}
          {errors.api && <span className="error">{errors.api}</span>}

          {/* Login Button */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        {/* Social Login */}
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
    </div>
  );
}

export default Login;
