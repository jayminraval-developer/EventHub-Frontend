import React from 'react';
import '../styles/Footer.css';
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaHome,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaBus,
  FaQuestionCircle,
  FaUserShield,
  FaFileContract,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-main">
        {/* Logo & Description */}
        <div className="footer-column logo-col">
          <h2 className="footer-logo">
            <span className="logo-red">Event</span><span className="logo-white">Hub</span>
          </h2>
          <p className="footer-description">
            <strong>
              Discover events, book tickets, and travel smart – all from one hub built for your experience.
            </strong>
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-list">
            <li><a href="/"><FaHome /> Home</a></li>
            <li><a href="/"><FaMapMarkerAlt /> Events Near Me</a></li>
            <li><a href="/"><FaTicketAlt /> Book Tickets</a></li>
            <li><a href="/"><FaBus /> Travel Info</a></li>
          </ul>
        </div>

        {/* Support / Contact */}
        <div className="footer-column">
          <h3 className="footer-heading">Support & Contact</h3>
          <ul className="footer-list">
            <li><a href="/"><FaQuestionCircle /> Help Center</a></li>
            <li><a href="/"><FaUserShield /> Privacy Policy</a></li>
            <li><a href="/"><FaFileContract /> Terms of Service</a></li>
          </ul>
          <div className="footer-contact">
            <p><FaEnvelope /> support@eventhub.com</p>
            <p><FaPhoneAlt /> +91 7046957063</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="footer-column">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="footer-socials">
            <a href="https://www.instagram.com/jaymin_raval___hindu/" target="_blank" rel="noreferrer" title="Instagram"><FaInstagram /></a>
            <a href="#" title="Twitter"><FaTwitter /></a>
            <a href="#" title="Facebook"><FaFacebookF /></a>
            <a href="https://www.linkedin.com/in/jayminraval7046/" target="_blank" rel="noreferrer" title="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} <strong>EventHub</strong>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
