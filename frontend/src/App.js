import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import AuthContext from "./context/authContext";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { Navigate } from 'react-router-dom';
import AddWorkout from "./pages/AddWorkout/AddWorkout";


function App() {
  const { loadToken, ...authContext } = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;
useEffect(()=>{
  loadToken();
},[loadToken])
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />} >
      </Route>
      <Route path="/register" element={<Register />} />
      
      <Route path="/dashboard"
          element={isLoggedIn ? <Layout /> : <Navigate to="/login" />} >
          <Route index element={<Dashboard/>}/>
      </Route>
      <Route path="/new-workout"
          element={isLoggedIn ? <Layout /> : <Navigate to="/login" />} >
          <Route index element={<AddWorkout/>}/>
      </Route>
      
    </Routes>
  );
}

export default App;
