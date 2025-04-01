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
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <h1 className="header-logo">
            <Link to="/" className="logo-link">Pet Haven</Link>
          </h1>
          <nav className="header-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/#abouting"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("abouting")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  About Us
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/adopt" className="nav-link">View Pets</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact Us</Link>
              </li>
            </ul>
          </nav>
          <button className="auth-button" onClick={handleAuthButtonClick}>
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Companion</h1>
          <p className="hero-subtitle">Helping pets find loving homes, one adoption at a time.</p>
          <div className="hero-buttons">
            <Link to="/adopt" className="button button-primary">Adopt a Pet</Link>
            <Link to="/add-pet" className="button button-secondary">Add a Pet</Link>
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="featured-pets">
        <div className="container">
          <h2 className="section-title">Featured Pets</h2>
          <div className="pet-grid">
            <div className="pet-card">
              <div className="pet-image-container">
                <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="Buddy" className="pet-image" />
              </div>
              <div className="pet-details">
                <h3 className="pet-name">Buddy</h3>
                <p className="pet-breed">Golden Retriever, 2 years old</p>
                <Link to="/petdetails/1" className="pet-link">View Details</Link>
              </div>
            </div>

            <div className="pet-card">
              <div className="pet-image-container">
                <img src="https://images.unsplash.com/photo-1568572933382-74d440642117?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="Luna" className="pet-image" />
              </div>
              <div className="pet-details">
                <h3 className="pet-name">Luna</h3>
                <p className="pet-breed">Siberian Husky, 1 year old</p>
                <Link to="/petdetails/2" className="pet-link">View Details</Link>
              </div>
            </div>

            <div className="pet-card">
              <div className="pet-image-container">
                <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="Max" className="pet-image" />
              </div>
              <div className="pet-details">
                <h3 className="pet-name">Max</h3>
                <p className="pet-breed">Beagle, 3 years old</p>
                <Link to="/petdetails/3" className="pet-link">View Details</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="abouting">
        <section className="about-section">
          <div className="container">
            <h2 className="section-title">About Us</h2>
            <div className="about-content">
              <p className="about-text">
                Welcome to Pet Haven, a loving space where abandoned and rescued
                pets find a second chance at happiness. Our mission is to connect
                compassionate pet lovers with animals in need, ensuring they find
                the perfect forever home.
              </p>
            </div>
          </div>
        </section>
      </section>

      <footer className="footer">
  <div className="container footer-container">
    {/* Left Section - Logo & Tagline */}
    <div className="footer-logo">
      <h2>Pet Haven</h2>
      <p>Connecting pets with loving homes</p>
    </div>

    {/* Quick Links */}
    <div className="footer-links">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Adopt</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>

    {/* Contact Info */}
    <div className="footer-contact">
      <h4>Contact Us</h4>
      <p>123 Pet Street, Pawville</p>
      <p>Email: info@pethaven.com</p>
      <p>Phone: (123) 456-7890</p>
    </div>

    {/* Social Links */}
    <div className="footer-social">
      <h4>Follow Us</h4>
      <div className="social-links">
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
      </div>
    </div>
  </div>

  {/* Bottom Section - Copyright */}
  <div className="footer-bottom">
    <p>© 2025 Pet Haven. All rights reserved.</p>
  </div>
</footer>


    </div>
  );
};

export default HomePage;