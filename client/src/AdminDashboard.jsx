import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-container">
          <h1 className="admin-title">Admin Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <main className="admin-main">
        <p>Welcome, Admin! Manage the pet adoption platform here.</p>
        {/* Additional admin functionalities can be added here */}
      </main>
      <footer className="admin-footer">
        <p>© 2025 Pet Haven. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;