import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navLinksRef = useRef(null);
  const hamburgerRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Check login state from stored token
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Listen for changes in login/logout (from other tabs or same tab updates)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("adminToken");
      setIsLoggedIn(!!token);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Toggle menu
  const toggleMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
  }, [isMobileMenuOpen]);

  // Close menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Trap focus (accessibility)
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const focusableElementsSelector = `
      a[href], button:not([disabled]), textarea, input[type="text"],
      input[type="radio"], input[type="checkbox"], select
    `;
    const focusableElements = navLinksRef.current.querySelectorAll(
      focusableElementsSelector
    );
    if (focusableElements.length === 0) return;

    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    function trapFocus(e) {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }

    document.addEventListener("keydown", trapFocus);
    firstEl.focus();

    return () => document.removeEventListener("keydown", trapFocus);
  }, [isMobileMenuOpen]);

  // Handle active link
  const handleLinkClick = (link) => {
    setActiveLink(link);
    closeMenu();
  };

  // ✅ Handle Login / Logout
  const handleAuthAction = () => {
    if (isLoggedIn) {
      // Logout
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminDeviceToken");
      localStorage.removeItem("adminName");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      // Login
      navigate("/login");
    }
    closeMenu();
  };

  return (
    <nav className="custom-navbar" aria-label="Primary navigation">
      {/* Logo */}
      <div className="navbar-logo">
        <Link
          to="/"
          onClick={() => handleLinkClick("home")}
          style={{ textDecoration: "none" }} // Remove underline
        >
          <h2>EventHub</h2>
        </Link>
      </div>
      <div
        className="hamburger"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        role="button"
        tabIndex={0}
        aria-expanded={isMobileMenuOpen}
        aria-controls="primary-navigation"
        ref={hamburgerRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") toggleMenu();
        }}
      >
        <div className={isMobileMenuOpen ? "bar active" : "bar"}></div>
        <div className={isMobileMenuOpen ? "bar active" : "bar"}></div>
        <div className={isMobileMenuOpen ? "bar active" : "bar"}></div>
      </div>

      {/* Nav Links */}
      <ul
        id="primary-navigation"
        className={`navbar-links ${isMobileMenuOpen ? "open" : ""}`}
        ref={navLinksRef}
      >
        <li>
          <a
            href="/ "
            className={activeLink === "home" ? "active" : ""}
            onClick={() => handleLinkClick("home")}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#events"
            className={activeLink === "events" ? "active" : ""}
            onClick={() => handleLinkClick("events")}
          >
            Events
          </a>
        </li>
        <li>
          <a
            href="#about"
            className={activeLink === "about" ? "active" : ""}
            onClick={() => handleLinkClick("about")}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className={activeLink === "contact" ? "active" : ""}
            onClick={() => handleLinkClick("contact")}
          >
            Contact
          </a>
        </li>
        <li>
          <a
            href="#book"
            className={activeLink === "book" ? "active" : ""}
            onClick={() => handleLinkClick("book")}
          >
            Book a Demo
          </a>
        </li>

        {/* Mobile Auth Button */}
        <li className="mobile-login-btn">
          <button className="auth-btn" onClick={handleAuthAction}>
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </li>
      </ul>

      {/* Desktop Auth Button */}
      <div className="navbar-auth">
        <button className="auth-btn" onClick={handleAuthAction}>
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
