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

  useEffect(() => {
    const savedUser = localStorage.getItem("eventhubUser");
    if (savedUser) navigate("/");
  }, [navigate]);

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^[\w.-]+@gmail\.com$/i.test(email))
      newErrors.email = "Email must end with @gmail.com";

    if (!password) newErrors.password = "Password is required";
    else {
      if (password.length < 7)
        newErrors.password = "Password must be at least 7 characters";
      const hasSpecial = /[!@#$%^&*(),.?\":{}|<>]/.test(password);
      const hasNumbers = (password.match(/\d/g) || []).length >= 2;
      if (!hasSpecial || !hasNumbers)
        newErrors.password =
          "Password must contain at least 1 special character and 2 numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://eventhub-backend-mveb.onrender.com/api/user/login",
        { email, password }
      );
      localStorage.setItem("eventhubUser", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setErrors({ api: error.response?.data?.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Animated background waves */}
      <div className="wave"></div>
      <div className="wave wave2"></div>

      <div className="login-box">
        <FaUserCircle className="login-icon" />
        <h3>Welcome Back 👋</h3>
        <p>
          Login to your <span>EventHub</span> account
        </p>

        <form onSubmit={handleLogin} autoComplete="off">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="new-email"
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <label>Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

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
