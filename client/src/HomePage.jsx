import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";
import Navbar from "./navbar";
import Footer from "./Footer";

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

      <Navbar />


      <div className="homepage">


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
              <div className="pet-card" style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "10px"
              }}>
                <div className="pet-image-container">
                  <img
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
                    alt="Buddy"
                    className="pet-image"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "10px"
                    }}
                  />
                </div>

                <div className="pet-details">
                  <h3 className="pet-name">Buddy</h3>
                  <p className="pet-breed">Golden Retriever, 2 years old</p>
                  <Link to="/petdetails/1" className="pet-link">View Details</Link>
                </div>
              </div>

              <div className="pet-card" style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "10px"
              }}>
                <div className="pet-image-container">
                  <img src="https://images.unsplash.com/photo-1568572933382-74d440642117?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="Luna" className="pet-image"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "10px"
                    }}
                  />
                </div>
                <div className="pet-details">
                  <h3 className="pet-name">Luna</h3>
                  <p className="pet-breed">Siberian Husky, 1 year old</p>
                  <Link to="/petdetails/2" className="pet-link">View Details</Link>
                </div>
              </div>

              <div className="pet-card" style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "10px"
              }}>
                <div className="pet-image-container">
                  <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="Max" className="pet-image"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "10px"
                    }}
                  />
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




      </div>

      <Footer />
    </div>
  );
};

export default HomePage;