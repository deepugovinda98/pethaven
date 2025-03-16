import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !pwd) {
      alert("Email and Password cannot be empty!");
      return;
    }

    // Simulate successful login for demo purposes
    console.log("Login successful for:", email, "as", role);
    
    // Set token in localStorage (in a real app, this would come from a server)
    localStorage.setItem("token", "demo-token-12345");
    
    // Redirect based on role
    if (role === "admin") {
      navigate("/admindash");
    } else {
      navigate("/");
    }
  }

  return (
    <div className="login-container">
      <div className="login-wrap">
        <h2>Welcome to Pet Haven</h2>
        <p className="login-subtitle">Sign in to continue</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">I am a:</label>
            <select 
              id="role"
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="select-input"
            >
              <option value="user">Pet Adopter</option>
              <option value="admin">Shelter Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-button">Sign In</button>
          
          <div className="form-footer">
            <p>
              Don't have an account? <Link to="/register" className="register-link">Register Here</Link>
            </p>
            <Link to="/" className="home-link">Return to Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
