import React from 'react';
import '../styles/Footer.css';
import { FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="eventhub-footer">
      {/* Bulbs / lights at top center */}
      <div className="footer-bulbs">
        <span className="bulb bulb‑1"></span>
        <span className="bulb bulb‑2"></span>
        <span className="bulb bulb‑3"></span>
      </div>

      <div className="lights-overlay"></div>

      <div className="container">
        <div className="row g-5 justify-content-between align-items-start">

          {/* Logo / Title */}
          <div className="col-md-4 text-md-start text-center animate-fade">
            <h2 className="footer-title">EventHub</h2>
            <p className="footer-tagline">Where every event shines!</p>
          </div>

          {/* Company */}
          <div className="col-md-2 col-6 animate-fade delay-1">
            <h5 className="footer-heading">Company</h5>
            <ul className="footer-links-list">
              <li><a href="#" className="glow-link">About</a></li>
              <li><a href="#" className="glow-link">Careers</a></li>
              <li><a href="#" className="glow-link">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-2 col-6 animate-fade delay-2">
            <h5 className="footer-heading">Support</h5>
            <ul className="footer-links-list">
              <li><a href="#" className="glow-link">Help Center</a></li>
              <li><a href="#" className="glow-link">Terms</a></li>
              <li><a href="#" className="glow-link">Privacy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-2 col-6 animate-fade delay-3">
            <h5 className="footer-heading">Contact</h5>
            <ul className="footer-links-list">
              <li><a href="mailto:support@eventhub.com" className="glow-link"><FaEnvelope /> Email Us</a></li>
              <li><a href="#" className="glow-link"><FaInstagram /> Instagram</a></li>
              <li><a href="#" className="glow-link"><FaTwitter /> Twitter</a></li>
            </ul>
          </div>

          {/* Newsletter / Subscribe */}
          <div className="col-md-4 col-12 animate-fade delay-4">
            <h5 className="footer-heading">Get Event Updates</h5>
            <form className="newsletter-form mt-3">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
                <button className="btn btn-glow-subscribe" type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>

        <div className="footer-bottom text-center pt-4 mt-5">
          <p>&copy; {new Date().getFullYear()} EventHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
