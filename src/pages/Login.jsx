// src/pages/Login.jsx
import React, { useState } from "react";
import "../styles/Login.css";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation function
  const validate = () => {
    const newErrors = {};

    // Email must end with @gmail.com
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w.-]+@gmail\.com$/i.test(email)) {
      newErrors.email = "Email must end with @gmail.com";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else {
      if (password.length < 7) {
        newErrors.password = "Password must be at least 7 characters";
      }
      const specialCharMatch = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const numberMatch = (password.match(/\d/g) || []).length >= 2;

      if (!specialCharMatch || !numberMatch) {
        newErrors.password =
          "Password must contain at least 1 special character and 2 numbers";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const { data } = await axios.post(
        "https://eventhub-backend-mveb.onrender.com/api/user/login",
        { email, password }
      );

      // Save user token to localStorage
      localStorage.setItem("eventhubUser", JSON.stringify(data));

      // Redirect to home page
      navigate("/");

    } catch (error) {
      setErrors({ api: error.response?.data?.message || "Login failed" });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h3>Welcome Back 👋</h3>
        <p>
          Login to your <span>EventHub</span> account
        </p>

        <form onSubmit={handleLogin} autoComplete="off">
          {/* Email */}
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="new-email"
          />
          {errors.email && <span className="error">{errors.email}</span>}

          {/* Password */}
          <label>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#00b4d8",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <span className="error">{errors.password}</span>}

          {/* API error */}
          {errors.api && <span className="error">{errors.api}</span>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="signup">
          Don’t have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
