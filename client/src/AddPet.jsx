import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./AddPet.css";

const AddPet = () => {
  const navigate = useNavigate();
  const [petData, setPetData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    pet_details: "",
    photos: "",
    health_status: "",
    vaccinated: false,
    documents_link: "",
    owner_id: "1234" // Replace with the logged-in user ID when authentication is implemented
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPetData({
      ...petData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post("http://localhost:3003/user/add-pet", { 
      ...petData, 
      photos: [petData.photos] // Convert string to array
    })
      .then((res) => {
        alert("Pet added successfully! Pending admin approval.");
        navigate("/home");
      })
      .catch((err) => {
        console.error("Error adding pet:", err);
        alert("Failed to add pet. Please try again.");
      });
  };

  return (
    <div className="add-pet-container">
      <h2>Add a Pet</h2>
      <form onSubmit={handleSubmit} className="add-pet-form">
        <input type="text" name="name" placeholder="Pet Name" value={petData.name} onChange={handleChange} required />
        <input type="text" name="species" placeholder="Species (e.g., Dog, Cat)" value={petData.species} onChange={handleChange} required />
        <input type="text" name="breed" placeholder="Breed" value={petData.breed} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age in years" value={petData.age} onChange={handleChange} required />
        
        <select name="gender" value={petData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <textarea name="pet_details" placeholder="Short Description" value={petData.pet_details} onChange={handleChange} required></textarea>
        
        <input type="text" name="photos" placeholder="Photo URL" value={petData.photos} onChange={handleChange} required />
        <input type="text" name="health_status" placeholder="Health Status" value={petData.health_status} onChange={handleChange} required />
        
        <label>
          <input type="checkbox" name="vaccinated" checked={petData.vaccinated} onChange={handleChange} />
          Vaccinated
        </label>
        
        <input type="text" name="documents_link" placeholder="Documents Link (if any)" value={petData.documents_link} onChange={handleChange} />
        
        <button type="submit">Add Pet</button>

        <Link to="/home" className="home-link">Return to Home</Link>
      </form>
    </div>
  );
};

export default AddPet;