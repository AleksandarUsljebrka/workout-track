
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import "./navbar.css";
import AuthContext from "../../context/authContext";
// import { ToastContainer } from "react-toastify";
// import toasterStyle from "../../utils/toaster/ToasterStyle.module.css"


const Navbar = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
  
    const handleLogout = () => {
      logout();

    };
  
    return (
      <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            Workout Track
          </Link>
        </div>
        <div className="navbar-menu">
          <ul className="navbar-nav">
            {isLoggedIn&& (
              <>
              <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                 All Workouts
              </Link>
              </li>
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
      {/* <ToastContainer
        autoClose={3000}
        toastClassName={`${toasterStyle['toaster-customization']}`}
      /> */}
      </>
    );
  };
  
  export default Navbar;