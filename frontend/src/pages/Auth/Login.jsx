import React, { useState, useContext, useEffect } from "react";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import "./auth.css";
import AuthContext from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {

  const { handleLogin, isLoggedIn, data } = useContext(AuthContext); 
  const [attemptedLogin, setAttemptedLogIn] = useState(false) 

  const formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema:loginSchema,
    onSubmit : async (values) => {
     
      setAttemptedLogIn(true)
      try{
        const response = await login(values);
        const data = response.data;
        await handleLogin(data);
        toast.success('Login successful!Welcome');
      }
      catch(error){
        toast.error("Login failed! Please check your credentials.");
      }
    }
  
  })

  const navigate = useNavigate()

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
        <form onSubmit={formik.handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <MdOutlineMail className="icon" />
            {formik.touched.email && formik.errors.email ? (
              <p className="error-message">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <RiLockPasswordFill className="icon" />
            {formik.touched.password && formik.errors.password ? (
              <p className="error-message">{formik.errors.password}</p>
            ) : null}
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
