import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import "./auth.css";
import AuthContext from "../../context/authContext";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggedIn, data } = useContext(AuthContext); 
 

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await login(user);
     
    }
    catch(error){
      alert("Login failed! Please check your credentials.");
      
    }
    // try {
    //   await login(user);
    //   console.log("Login successful");
    //   alert("Login successful!");
    //   navigate('/dashboard'); 
    // } catch (error) {
    //   console.error("Error logging in user:", error);
    //   alert("Login failed! Please check your credentials.");
    // }
  };

  // useEffect(()=>{
  //   if(data.success && isLoggedIn){
  //     navigate("/dashboard");
  //   }else{
  //     navigate("/");
  //   }
  // },[])
  return (
    <div className="wrapper">
      <div className="form-box login">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              required
            />
            <MdOutlineMail className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              required
            />
            <RiLockPasswordFill className="icon" />
          </div>
          <button type="submit">Login</button>
          <div className="register">
            <p>
              Don't have an account? <a href="/register">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
