import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AdoptPet.css";
import Navbar from "./navbar";
import Footer from "./Footer";


const AdoptPet = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3003/user/approved-pets")
      .then(res => setPets(res.data))
      .catch(err => console.error("Error fetching adoptable pets:", err));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="adopt-pet-container">
        <h2>Adopt a Pet</h2>
        <div className="pet-list">
          {pets.length > 0 ? (
            pets.map((pet) => (
              <div key={pet._id} className="pet-card">
                <img
                  src={`http://localhost:3003${pet.photos[0]}`}
                  alt={pet.name}
                  className="pet-image"
                />
                <h3>{pet.name}</h3>
                <p>{pet.breed}, {pet.age} years old</p>
                {/* Fixing the Link path */}
                <Link to={`/view/${pet._id}`} className="view-details-btn">View Details</Link>
              </div>
            ))
          ) : (
            <p className="no-pets">No pets available for adoption at the moment.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdoptPet;
