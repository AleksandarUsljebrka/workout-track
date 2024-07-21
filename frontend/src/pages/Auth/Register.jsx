import React, { useEffect, useState } from "react";
import { register } from "../../services/api";
import { FaUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import "./auth.css";
import { useNavigate } from "react-router-dom";

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [successfullyRegister, setSuccessfullyRegister] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(user);
      if(response.data.successfull){
        setSuccessfullyRegister(true);
      toast.success('Successfully registered');

      }
    } catch (error) {
      setSuccessfullyRegister(false);
      toast.error("Register failed! Please check your credentials.");
    }
  };

  useEffect(()=>{
    if (!successfullyRegister)
    {
      return
    }

    if(successfullyRegister){
      navigate("/login");
    }else{
      navigate("/");
    }
  },[ successfullyRegister])

  return (
    <div className="wrapper-register">
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <FaUser className="icon" />
          </div>
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

          <button type="submit">Register</button>
          <div className="register">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
