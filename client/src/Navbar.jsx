import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import "./Navbar.css";


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleAuthButtonClick = () => {
        if (isLoggedIn) {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            navigate("/login");
        } else {
            navigate("/login");
        }
    };

    return (
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

                                    if (location.pathname !== "/") {
                                        navigate("/", { replace: true }); // Navigate to home page first
                                        setTimeout(() => {
                                            document.getElementById("abouting")?.scrollIntoView({ behavior: "smooth" });
                                        }, 100); // Delay to allow navigation before scrolling
                                    } else {
                                        document.getElementById("abouting")?.scrollIntoView({ behavior: "smooth" });
                                    }

                                    window.history.pushState(null, "", "/#abouting"); // Update URL
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
    );
};

export default Navbar;