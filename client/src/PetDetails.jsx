import React from "react";
import { Link } from "react-router-dom";
import "./PetDetails.css";

const PetDetails = () => {
  return (
    <div className="pet-details-page">
      <header className="pet-details-header">
        <div className="container header-container">
          <h1>Pet Details</h1>
          <nav>
            <Link to="/" className="header-link">
              Home
            </Link>
            <Link to="/view-pets" className="header-link">
              View Pets
            </Link>
          </nav>
        </div>
      </header>
      <main className="pet-details-main">
        <div className="container">
          <div className="pet-details-content">
            <div className="pet-image">
              <img src="https://via.placeholder.com/400x300" alt="Buddy" />
            </div>
            <div className="pet-info">
              <h2>Buddy</h2>
              <p>
                <strong>Breed:</strong> Golden Retriever
              </p>
              <p>
                <strong>Age:</strong> 2 years old
              </p>
              <p>
                <strong>Description:</strong> Buddy is a friendly and energetic
                dog who loves to play. He is looking for a loving home.
              </p>
              <button className="btn adopt-btn">Adopt Now</button>
            </div>
          </div>
        </div>
      </main>
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
    </div>
  );
};

export default PetDetails;