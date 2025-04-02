import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Left Section - Logo & Tagline */}
        <div className="footer-logo">
          <h2>Pet Haven</h2>
          <p>Connecting pets with loving homes</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/adopt">Adopt</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>123 Pet Street, Pawville</p>
          <p>Email: info@pethaven.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>

        {/* Social Links */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="footer-bottom">
        <p>&copy; 2025 Pet Haven. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
