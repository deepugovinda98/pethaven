import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Fetch all pets (both approved, rejected, & not approved)
  useEffect(() => {
    axios
      .get("http://localhost:3003/admin/pets")
      .then((res) => {
        const allPets = res.data;

        // Filter and count rejected pets
        const rejectedPets = allPets.filter((pet) => pet.rejected);
        setRejectedCount(rejectedPets.length);

        // Show only non-rejected pets in the main list
        setPets(allPets.filter((pet) => !pet.rejected)); // Hide rejected pets
      })
      .catch((err) => console.error("Error fetching pets:", err));
  }, []);





  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Approve Pet
  const handleApprove = (id) => {
    axios
      .patch(`http://localhost:3003/admin/approve/${id}`)
      .then((res) => {
        alert("Pet approved!");
        setPets(
          pets.map((pet) =>
            pet._id === id ? { ...pet, approved: true, rejected: false } : pet
          )
        );
      })
      .catch((err) => console.error("Error approving pet:", err));
  };

  // Reject Pet (DELETE request to remove pet)
  // Corrected handleReject function
  // Reject Pet (PATCH request to update rejection status)
  // Correct handleReject function
  const handleReject = (id) => {
    axios
      .patch(`http://localhost:3003/admin/reject/${id}`)
      .then((res) => {
        alert("Pet rejected!");

        // Remove rejected pet from the main list
        setPets((prevPets) => prevPets.filter((pet) => pet._id !== id));

        // Increase rejected count
        setRejectedCount((prev) => prev + 1);
      })
      .catch((err) => console.error("Error rejecting pet:", err));
  };




  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div
        className={`sidebar ${sidebarCollapsed ? "sidebar-collapsed" : "sidebar-expanded"
          }`}
      >
        <div className="sidebar-header">
          <div className={sidebarCollapsed ? "" : "sidebar-title"}>
            {!sidebarCollapsed && "Pet Haven"}
          </div>
          <div className="sidebar-toggle" onClick={toggleSidebar}>
            {sidebarCollapsed ? "→" : "←"}
          </div>
        </div>

        <div className="sidebar-nav">
          <ul className="sidebar-nav-list">
            <li>
              <a href="#" className="sidebar-link active">
                <span className="sidebar-icon">📊</span>
                {!sidebarCollapsed && (
                  <span className="sidebar-link-text">Dashboard</span>
                )}
              </a>
            </li>
            <li>
              <a href="#" className="sidebar-link">
                <span className="sidebar-icon">🐾</span>
                {!sidebarCollapsed && (
                  <span className="sidebar-link-text">Pets</span>
                )}
              </a>
            </li>
            <li>
              <a href="#" className="sidebar-link">
                <span className="sidebar-icon">👥</span>
                {!sidebarCollapsed && (
                  <span className="sidebar-link-text">Users</span>
                )}
              </a>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">A</div>
            {!sidebarCollapsed && (
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">Admin</div>
                <div className="sidebar-user-email">admin@pethaven.com</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <div className="dashboard-content">
          <h1 className="dashboard-title">Admin Dashboard</h1>

          <div className="dashboard-grid">
            <div className="stat-card-wrapper">
              <div className="stat-card">
                <div className="stat-info">
                  <div className="stat-title">Total Pets</div>
                  <div className="stat-value">{pets.length}</div>
                  <div className="stat-description">Registered pets</div>
                </div>
                <div className="stat-icon">🐾</div>
              </div>
            </div>

            <div className="stat-card-wrapper">
              <div className="stat-card">
                <div className="stat-info">
                  <div className="stat-title">Approved</div>
                  <div className="stat-value">
                    {pets.filter((pet) => pet.approved && !pet.rejected).length}
                  </div>
                  <div className="stat-description">Published pets</div>
                </div>
                <div className="stat-icon">✅</div>
              </div>
            </div>

            {/* Rejected Card */}
            <div className="stat-card-wrapper">
              <div className="stat-card">
                <div className="stat-info">
                  <div className="stat-title">Rejected</div>
                  <div className="stat-value">{rejectedCount}</div>
                  <div className="stat-description">Rejected pets</div>
                </div>
                <div className="stat-icon">❌</div>
              </div>
            </div>

            {/* Pending Card */}
            <div className="stat-card-wrapper">
              <div className="stat-card">
                <div className="stat-info">
                  <div className="stat-title">Pending</div>
                  <div className="stat-value">
                    {pets.filter((pet) => !pet.approved && !pet.rejected).length}
                  </div>
                  <div className="stat-description">Awaiting approval</div>
                </div>
                <div className="stat-icon">⏳</div>
              </div>
            </div>
          </div>

          <div className="pet-management-section">
            <div className="table-container">
              <h2>Manage Pets</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Breed</th>
                    <th>Age</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pets.length > 0 ? (
                    pets.map((pet) => (
                      <tr key={pet._id}>
                        <td>{pet.name}</td>
                        <td>{pet.breed}</td>
                        <td>{pet.age}</td>
                        <td>
                          {pet.approved
                            ? "Approved"
                            : pet.rejected
                              ? "Rejected"
                              : "Pending"}
                        </td>
                        <td>
                          {!pet.approved && !pet.rejected && (
                            <>
                              <button
                                className="approve-btn"
                                onClick={() => handleApprove(pet._id)}
                              >
                                Approve
                              </button>
                              <button
                                className="reject-btn"
                                onClick={() => handleReject(pet._id)}
                              >
                                Reject
                              </button>
                            </>
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
            </div>

            {/* <div className="rejected-pets-section">
              <h2>Rejected Pets</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Breed</th>
                    <th>Age</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pets.filter((pet) => pet.rejected).length > 0 ? (
                    pets
                      .filter((pet) => pet.rejected)
                      .map((pet) => (
                        <tr key={pet._id}>
                          <td>{pet.name}</td>
                          <td>{pet.breed}</td>
                          <td>{pet.age}</td>
                          <td>Rejected</td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="4">No rejected pets.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div> */}


          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

          <div className="admin-footer">
            <p>© 2025 Pet Haven. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
