import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img
            src="http://www.quiztory.com/web/wp-content/uploads/2015/07/Game_Complete_Quiztory_Logo-300x249.png"
            alt="Quiztory Logo"
            className="nav-logo-image"
          />
          <span className="nav-logo-text">Quiztory</span>
        </Link>

        <div className="nav-actions">
          {!isAuthenticated ? (
            <>
              <Link
                to="/signin"
                className={`nav-link ${
                  location.pathname === "/signin" ? "active" : ""
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className={`nav-link ${
                  location.pathname === "/signup" ? "active" : ""
                }`}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className={`nav-link ${
                  location.pathname === "/dashboard" ? "active" : ""
                }`}
              >
                Dashboard
              </Link>
              <button
                onClick={onLogout}
                className="nav-button nav-button-secondary"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
