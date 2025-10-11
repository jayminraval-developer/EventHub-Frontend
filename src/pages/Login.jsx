// src/pages/Login.jsx
import React, { useState } from "react";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("User Login", { email, password });
  };

  return (
    <div className="login-container">
    
      <div className="login-box">
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

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />

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
