import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import "./PetDetails.css";

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock pet data - in a real app, this would come from an API
  const pets = {
    '1': {
      name: 'Buddy',
      breed: 'Golden Retriever',
      age: '2 years old',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
      description: 'Buddy is a friendly, energetic Golden Retriever who loves to play fetch and go for long walks. He is great with children and other pets, making him the perfect family companion.'
    },
    '2': {
      name: 'Luna',
      breed: 'Siberian Husky',
      age: '1 year old',
      image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
      description: 'Luna is a beautiful and playful Siberian Husky. She has striking blue eyes and loves to run and play in open spaces. Luna is very intelligent and would thrive in an active home.'
    },
    '3': {
      name: 'Max',
      breed: 'Beagle',
      age: '3 years old',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
      description: 'Max is a curious and friendly Beagle with a great sense of smell. He loves exploring and going on adventures. Max is very affectionate and gets along well with everyone he meets.'
    }
  };

  useEffect(() => {
    // Check if pet exists in our data
    if (!pets[id]) {
      navigate('/not-found');
      return;
    }

    setPet(pets[id]);
    
    // Check authentication state
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [id, navigate]);

  if (!pet) return null;

  const handleAdoptClick = () => {
    if (!isLoggedIn) {
      alert('Please log in to adopt a pet');
      navigate('/login');
    } else {
      // In a real app, this would initiate the adoption process
      alert(`Thank you for your interest in adopting ${pet.name}! Our team will contact you soon.`);
    }
  };

  return (
    <div className="pet-detail-container">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <h1 className="header-logo">Pet Haven</h1>
          <nav className="header-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About Us</Link>
              </li>
              <li className="nav-item">
                <Link to="/pets" className="nav-link">View Pets</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact Us</Link>
              </li>
            </ul>
          </nav>
          <Link to={isLoggedIn ? "/" : "/login"} className="auth-button">
            {isLoggedIn ? "Logout" : "Login"}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pet-detail-content">
        <div className="pet-profile">
          <div className="pet-image-container">
            <img src={pet.image} alt={pet.name} className="pet-image" />
          </div>
          <div className="pet-info">
            <h1 className="pet-name">{pet.name}</h1>
            <p className="pet-breed">{pet.breed}, {pet.age}</p>
            <p className="pet-description">{pet.description}</p>
            <button className="adopt-button" onClick={handleAdoptClick}>Adopt Me</button>
            <Link to="/" className="back-button">Back to Home</Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <p className="copyright">© 2025 Pet Haven. All rights reserved.</p>
          <div className="social-links">
            <Link to="/#" className="social-link" aria-label="Facebook">Facebook</Link>
            <Link to="/#" className="social-link" aria-label="Twitter">Twitter</Link>
            <Link to="/#" className="social-link" aria-label="Instagram">Instagram</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PetDetails;
