import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./AddPet.css";
import Navbar from "./navbar";
import Footer from "./Footer";

const AddPet = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [petData, setPetData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    pet_details: "",
    photos: null,
    health_status: "",
    vaccinated: false,
    documents_link: "",
    owner_id: ""
  });

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("You must be logged in to add a pet.");
      navigate("/login");  // Redirect to login page
    } else {
      setIsLoggedIn(true);
      setPetData((prev) => ({ ...prev, owner_id: userId }));
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setPetData({ ...petData, [name]: files[0] });
    } else {
      setPetData({ ...petData, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    Object.keys(petData).forEach((key) => {
      formData.append(key, petData[key]);
    });
  
    axios.post("http://localhost:3003/user/add-pet", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
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
  



  return isLoggedIn ? (

    <div>
      <Navbar />

      <div className="add-pet-container">
        <h2>Add a Pet</h2>
        <form onSubmit={handleSubmit} className="add-pet-form">
          <input type="text" name="name" placeholder="Pet Name" value={petData.name} onChange={handleChange} required />
          <input type="text" name="species" placeholder="Species" value={petData.species} onChange={handleChange} required />
          <input type="text" name="breed" placeholder="Breed" value={petData.breed} onChange={handleChange} required />
          <input type="number" name="age" placeholder="Age in years" value={petData.age} onChange={handleChange} required />

          <select name="gender" value={petData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <textarea name="pet_details" placeholder="Short Description" value={petData.pet_details} onChange={handleChange} required></textarea>

          <input type="file" name="photos" onChange={handleChange} required />

          <input type="text" name="health_status" placeholder="Health Status" value={petData.health_status} onChange={handleChange} required />

          <div className="checkbox-container">
            <label htmlFor="vaccinated">Vaccinated</label>
            <input type="checkbox" id="vaccinated" name="vaccinated" checked={petData.vaccinated} onChange={handleChange} />
          </div>


          {/* <label>
          <input type="checkbox" name="vaccinated" checked={petData.vaccinated} onChange={handleChange} />
          Vaccinated
        </label> */}

          <input type="text" name="documents_link" placeholder="Documents Link (if any)" value={petData.documents_link} onChange={handleChange} />

          <button type="submit">Add Pet</button>

          <Link to="/home" className="home-link">Return to home</Link>
        </form>

      </div>

      <Footer />
    </div >
  ) : null;
};

export default AddPet;