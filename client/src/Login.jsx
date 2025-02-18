import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  async function sendData(e) {
    e.preventDefault();

    if (!email || !pwd) {
      alert("Email and Password cannot be empty!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3003/auth/login", {
        email: email,
        pass: pwd,
        role: role, // optional, if you're sending role info from frontend
      });

      alert(`${role.charAt(0).toUpperCase() + role.slice(1)} login successful!`);
      localStorage.setItem("token", response.data.token);
      console.log(response.data);

      // Redirect based on role: use '/admindash' for admin users
      if (response.data.role === "admin") {
        navigate("/admindash");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.response?.data?.error || "Error logging in!");
    }
  }

  return (
    <div className="login-container">
      <div className="login-wrap">
        <h2>Log In</h2>
        <form onSubmit={sendData}>
          <div className="form">
            {/* Role Dropdown */}
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <button type="submit">Sign In</button>
            <p>
              Don't have an account? <Link to="/register">Register Here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;