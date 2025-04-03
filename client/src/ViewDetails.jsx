import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com";
import "./ViewDetails.css";
import Navbar from "./navbar";
import Footer from "./Footer";

const ViewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3003/user/pet/${id}`)
      .then(res => setPet(res.data))
      .catch(err => {
        console.error("Error fetching pet details:", err);
        navigate("/not-found");
      });
  }, [id, navigate]);

  const handleAdopt = () => {
    if (!pet) return;

    const templateParams = {
      pet_name: pet.name,
      pet_species: pet.species,
      pet_breed: pet.breed,
      pet_age: pet.age,
      pet_gender: pet.gender,
      pet_health_status: pet.health_status,
      pet_vaccinated: pet.vaccinated ? "Yes" : "No",
      user_name: "Interested Adopter",
      user_email: "user@example.com",
      user_phone: "123-456-7890",
    };

    emailjs.send("service_ulfegrj", "template_fikpdw7", templateParams, "9HlwFosI1V8KIvjCz")
      .then(() => alert("Adoption request sent successfully!"))
      .catch(error => {
        alert("Failed to send adoption request. Please try again.");
        console.error("EmailJS Error:", error);
      });
  };

  if (!pet) return <p>Loading pet details...</p>;

  return (
    <div>
      <Navbar />
      <div className="view-details-container">
        <div className="pet-details-wrapper">
          <img src={pet.photos?.[0] || "/default-pet.jpg"} alt={pet.name} className="pet-image" />

          <div className="pet-details">
            <h2>{pet.name}</h2>
            <p><strong>Species:</strong> {pet.species}</p>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p><strong>Age:</strong> {pet.age} years old</p>
            <p><strong>Gender:</strong> {pet.gender}</p>
            <p><strong>Health Status:</strong> {pet.health_status}</p>
            <p><strong>Vaccinated:</strong> {pet.vaccinated ? "Yes" : "No"}</p>
          </div>
        </div>

        <div className="button-container">
          <button className="adopt-button" onClick={handleAdopt}>Adopt Me</button>
          <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewDetails;
