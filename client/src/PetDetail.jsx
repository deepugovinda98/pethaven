import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import "./PetDetail.css";

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check authentication state
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Fetch pet details from API
    const fetchPetDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3003/user/pet/${id}`);
        setPet(response.data);
      } catch (error) {
        console.error("Error fetching pet details:", error);
        toast({
          title: "Error",
          description: "Failed to load pet details. Please try again.",
          variant: "destructive",
        });
        if (error.response && error.response.status === 404) {
          navigate('/not-found');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id, navigate, toast]);

  const handleAdoptClick = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to adopt a pet",
        variant: "default",
      });
      navigate('/login');
    } else {
      // In a real app, this would initiate the adoption process
      toast({
        title: "Adoption Request Sent",
        description: `Thank you for your interest in adopting ${pet.name}! Our team will contact you soon.`,
        variant: "default",
      });
    }
  };

  if (loading) {
    return (
      <div className="pet-detail-container">
        <header className="header">
          <div className="header-container">
            <h1 className="header-logo">Pet Haven</h1>
            <nav className="header-nav">
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/adopt" className="nav-link">Adopt</Link>
                </li>
              </ul>
            </nav>
            <Link to={isLoggedIn ? "/" : "/login"} className="auth-button">
              {isLoggedIn ? "Logout" : "Login"}
            </Link>
          </div>
        </header>
        <main className="pet-detail-content loading-container">
          <div className="loading-indicator">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p>Loading pet details...</p>
          </div>
        </main>
        <footer className="footer">
          <div className="container footer-container">
            <p className="copyright">© 2025 Pet Haven. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  if (!pet) return null;

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
                <Link to="/adopt" className="nav-link">Adopt</Link>
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
            <img 
              src={pet.photos && pet.photos.length > 0 ? pet.photos[0] : "/default-pet.jpg"} 
              alt={pet.name} 
              className="pet-image" 
            />
          </div>
          <div className="pet-info">
            <h1 className="pet-name">{pet.name}</h1>
            <p className="pet-breed">{pet.breed}, {pet.age} years old</p>
            <p className="pet-description">{pet.description}</p>
            <Button 
              className="adopt-button" 
              onClick={handleAdoptClick}
            >
              Adopt Me
            </Button>
            <Link to="/adopt" className="back-button">Back to Adoptable Pets</Link>
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
