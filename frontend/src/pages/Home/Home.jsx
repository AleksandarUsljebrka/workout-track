import React from 'react';
import { Link } from 'react-router-dom'; 
import './home.css'
const Home = () => {
  return (
    <div className="container">
      <div className="content">
        <h1>Welcome to our app!</h1>
        <p>Please login or register to countinue.</p>
        <div className="buttons">
          <Link to="/login" className="button">Login</Link>
          <Link to="/register" className="button">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
