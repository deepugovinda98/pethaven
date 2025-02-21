import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <p>© 2025 Pet Haven. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/#" aria-label="Facebook">
            Facebook
          </Link>
          <Link to="/#" aria-label="Twitter">
            Twitter
          </Link>
          <Link to="/#" aria-label="Instagram">
            Instagram
          </Link>
          
        </div>
      </div>
    </footer>
  );
};
export default Footer;