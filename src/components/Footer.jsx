import React from 'react';
import '../styles/Footer.css';
import {
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn
} from 'react-icons/fa';

const companyLinks = ['About', 'Careers', 'Blog'];
const supportLinks = ['Help Center', 'Terms', 'Privacy'];
const socialLinks = [
  { name: 'Instagram', icon: <FaInstagram />, href: '#' },
  { name: 'Twitter', icon: <FaTwitter />, href: '#' },
  { name: 'Facebook', icon: <FaFacebookF />, href: '#' },
  { name: 'YouTube', icon: <FaYoutube />, href: '#' },
  { name: 'LinkedIn', icon: <FaLinkedinIn />, href: '#' },
  { name: 'Email', icon: <FaEnvelope />, href: 'mailto:support@eventhub.com' }
];

const Footer = () => {
  return (
    <footer className="eventhub-footer" role="contentinfo">
      {/* Glowing bulbs */}
      <div className="footer-bulbs">
        <span className="bulb bulb-1"></span>
        <span className="bulb bulb-2"></span>
        <span className="bulb bulb-3"></span>
        <span className="bulb bulb-4"></span>
      </div>

      {/* Background light effect */}
      <div className="lights-overlay" aria-hidden="true"></div>

      <div className="container">
        <div className="row g-5 justify-content-between align-items-start">
          <div className="col-md-4 text-md-start text-center animate-fade">
            <h1 className="footer-title neon-glow" aria-label="EventHub">EventHub</h1>
            <p className="footer-tagline">Feel the Beat. Join the Party.</p>
          </div>

          <nav className="col-md-2 col-6 animate-fade delay-1" aria-label="Company Links">
            <h2 className="footer-heading">Company</h2>
            <ul className="footer-links-list">
              {companyLinks.map((link) => (
                <li key={link}><a href="#">{link}</a></li>
              ))}
            </ul>
          </nav>

          <nav className="col-md-2 col-6 animate-fade delay-2" aria-label="Support Links">
            <h2 className="footer-heading">Support</h2>
            <ul className="footer-links-list">
              {supportLinks.map((link) => (
                <li key={link}><a href="#">{link}</a></li>
              ))}
            </ul>
          </nav>

          <nav className="col-md-3 col-12 animate-fade delay-3" aria-label="Connect on Social Media">
            <h2 className="footer-heading">Connect</h2>
            <ul className="footer-links-list social-icons">
              {socialLinks.map(({ name, icon, href }) => (
                <li key={name}>
                  <a href={href} aria-label={name}>{icon} {name}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-bottom text-center pt-4 mt-5">
          <p>&copy; {new Date().getFullYear()} EventHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
