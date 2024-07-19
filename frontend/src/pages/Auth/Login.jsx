import React, { useState, useContext, useEffect } from "react";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import "./auth.css";
import AuthContext from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const { handleLogin, isLoggedIn, data } = useContext(AuthContext); 
  const [attemptedLogin, setAttemptedLogIn] = useState(false) 

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAttemptedLogIn(true)
    try{
      const response = await login(user);
      const data = response.data;
      await handleLogin(data);

    }
    catch(error){
      alert("Login failed! Please check your credentials.");
    }
  };

  useEffect(()=>{

    if (!attemptedLogin)
    {
      return
    }

    if(isLoggedIn){
      navigate("/dashboard");
    }else{
      navigate("/");
    }
  },[data, isLoggedIn])

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
