import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);

  // Fetch all pets (both approved & not approved)
  useEffect(() => {
    axios.get("http://localhost:3003/admin/pets")
      .then(res => setPets(res.data))
      .catch(err => console.error("Error fetching pets:", err));
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Approve Pet
  const handleApprove = (id) => {
    axios.patch(`http://localhost:3003/admin/approve/${id}`)
      .then(res => {
        alert("Pet approved!");
        setPets(pets.map(pet => pet._id === id ? { ...pet, approved: true } : pet));
      })
      .catch(err => console.error("Error approving pet:", err));
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-container">
          <h1 className="admin-title">Admin Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <main className="admin-main">
        <h2>Manage Pets</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Breed</th>
              <th>Age</th>
              <th>Status</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            {pets.length > 0 ? (
              pets.map((pet) => (
                <tr key={pet._id}>
                  <td>{pet.name}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.age}</td>
                  <td>{pet.approved ? "Approved" : "Pending"}</td>
                  <td>
                    {!pet.approved && (
                      <button onClick={() => handleApprove(pet._id)}>Approve</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No pets available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
      <footer className="admin-footer">
        <p>© 2025 Pet Haven. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;