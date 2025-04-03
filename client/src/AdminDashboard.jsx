import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [rejectedPets, setRejectedPets] = useState([]);
  const [users, setUsers] = useState([]);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Fetch all pets (both approved, rejected, & not approved)
  useEffect(() => {
    // Fetch pets
    axios
      .get("http://localhost:3003/admin/pets")
      .then((res) => {
        const allPets = res.data;

        // Filter rejected pets
        const rejected = allPets.filter((pet) => pet.rejected);
        setRejectedPets(rejected);
        setRejectedCount(rejected.length);

        // Show only non-rejected pets in the main list
        setPets(allPets.filter((pet) => !pet.rejected));
      })
      .catch((err) => console.error("Error fetching pets:", err));

    // Fetch users
    axios
    .get("http://localhost:3003/admin/users")
    .then((res) => {
      console.log("Fetched Users Data:", res.data); // Debugging log
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        console.error("Unexpected user data format:", res.data);
      }
    })
    .catch((err) => console.error("Error fetching users:", err));
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

  // Reject Pet (PATCH request to update rejection status)
  const handleReject = (id) => {
    axios
      .patch(`http://localhost:3003/admin/reject/${id}`)
      .then((res) => {
        alert("Pet rejected!");

        // Get the rejected pet
        const rejectedPet = pets.find((pet) => pet._id === id);
        
        // Add to rejected pets
        if (rejectedPet) {
          setRejectedPets([...rejectedPets, {...rejectedPet, rejected: true}]);
        }

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
        className={`sidebar ${sidebarCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}
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
              <a 
                href="#" 
                className={`sidebar-link ${activeTab === "dashboard" ? "active" : ""}`}
                onClick={() => setActiveTab("dashboard")}
              >
                <span className="sidebar-icon">📊</span>
                {!sidebarCollapsed && (
                  <span className="sidebar-link-text">Dashboard</span>
                )}
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={`sidebar-link ${activeTab === "pets" ? "active" : ""}`}
                onClick={() => setActiveTab("pets")}
              >
                <span className="sidebar-icon">🐾</span>
                {!sidebarCollapsed && (
                  <span className="sidebar-link-text">Pets</span>
                )}
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={`sidebar-link ${activeTab === "users" ? "active" : ""}`}
                onClick={() => setActiveTab("users")}
              >
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

          {/* Content based on active tab */}
          {activeTab === "dashboard" && (
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
            </div>
          )}

          {activeTab === "pets" && (
            <div className="pet-management-section">
              <div className="table-container">
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
                    {rejectedPets.length > 0 ? (
                      rejectedPets.map((pet) => (
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
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="pet-management-section">
              <div className="table-container">
                <h2>User Management</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role || "User"}</td>
                          <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No users found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

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
