
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import "./navbar.css";
import AuthContext from "../../context/authContext";


const Navbar = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
  
    const handleLogout = () => {
      logout();
      // Dodatne akcije nakon odjave (npr. preusmeravanje korisnika)
    };
  
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            Fitness App
          </Link>
        </div>
        <div className="navbar-menu">
          <ul className="navbar-nav">
            {isLoggedIn&& (
              <>
                <li className="nav-item">
                  <Link to="/progress" className="nav-link">
                    Progress
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/new-workout" className="nav-link">
                    New Workout
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    );
  };
  
  export default Navbar;