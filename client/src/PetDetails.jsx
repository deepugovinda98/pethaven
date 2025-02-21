import React from "react";
import { Link } from "react-router-dom";
import "./PetDetails.css";

const PetDetails = () => {
  return (
    <div className="pet-details">
      <header className="pet-details-header">
        <h1>Pet Details</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/view-pets">View Pets</Link>
        </nav>
      </header>
      <main className="pet-details-main">
        <div className="pet-image">
          <img src="https://via.placeholder.com/400x300" alt="Buddy" />
        </div>
        <div className="pet-info">
          <h2>Buddy</h2>
          <p><strong>Breed:</strong> Golden Retriever</p>
          <p><strong>Age:</strong> 2 years old</p>
          <p>
            <strong>Description:</strong> Buddy is a friendly and energetic dog who loves to play.
            He is looking for a loving home.
          </p>
          <button className="btn adopt-btn">Adopt Now</button>
        </div>
      </main>
      <footer className="pet-details-footer">
        <p>© 2025 Pet Adoption. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PetDetails;