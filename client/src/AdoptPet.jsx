import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AdoptPet.css";

const AdoptPet = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3003/user/approved-pets")
      .then(res => setPets(res.data))
      .catch(err => console.error("Error fetching adoptable pets:", err));
  }, []);

  return (
    <div className="adopt-pet-container">
      <h2>Adopt a Pet</h2>
      <div className="pet-list">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div key={pet._id} className="pet-card">
              <img src={pet.photos[0] || "/default-pet.jpg"} alt={pet.name} className="pet-image" />
              <h3>{pet.name}</h3>
              <p>{pet.breed}, {pet.age} years old</p>
              <Link to={`/petdetails/${pet._id}`} className="view-details-btn">View Details</Link>
            </div>
          ))
        ) : (
          <p className="no-pets">No pets available for adoption at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default AdoptPet;