import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication state on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      // Logout: remove token and navigate to login page
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      // Not logged in: redirect to login page
      navigate("/login");
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container header-container">
          <h1 className="header-title">PET HAVEN</h1>
          <nav>
            <ul className="header-nav">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/add-pet" className="nav-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/view-pets" className="nav-link">
                  View Pets
                </Link>
              </li>
              <li>
                <Link to="/contact" className="nav-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
          {/* Auth button shows Login if not logged in, Logout if logged in */}
          <button className="auth-btn" onClick={handleAuthButtonClick}>
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Furry Friend Today!</h1>
          <p className="hero-subtitle">
            Helping pets find loving homes, one adoption at a time.
          </p>
          <div className="button-container">
            <Link to="/petdetails" className="btn adopt-btn">
              Adopt a Pet
            </Link>
            <Link to="/add-pet" className="btn add-btn">
              Add a Pet
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="featured">
        <div className="container">
          <h2 className="featured-title">Featured Pets</h2>
          <div className="grid">
            {/* Sample pet cards */}
            <div className="card">
              <img src="https://via.placeholder.com/300x200" alt="Pet 1" />
              <div className="card-content">
                <h3>Buddy</h3>
                <p>Golden Retriever, 2 years old</p>
                <Link to="/view-pets" className="card-link">
                  View Details
                </Link>
              </div>
            </div>

            <div className="card">
              <img src="https://via.placeholder.com/300x200" alt="Pet 2" />
              <div className="card-content">
                <h3>Luna</h3>
                <p>Siberian Husky, 1 year old</p>
                <Link to="/view-pets" className="card-link">
                  View Details
                </Link>
              </div>
            </div>

            <div className="card">
              <img src="https://via.placeholder.com/300x200" alt="Pet 3" />
              <div className="card-content">
                <h3>Max</h3>
                <p>Beagle, 3 years old</p>
                <Link to="/view-pets" className="card-link">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about">
        <div className="container about-container">
          <h2>About Us</h2>
          <p>
            Welcome to Pet Haven, a loving space where abandoned and rescued
            pets find a second chance at happiness. Our mission is to connect
            compassionate pet lovers with animals in need, ensuring they find
            the perfect forever home.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <p>© 2025 Pet Haven. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/#" aria-label="Facebook">Facebook</Link>
            <Link to="/#" aria-label="Twitter">Twitter</Link>
            <Link to="/#" aria-label="Instagram">Instagram</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;