import { Route, Routes, useLocation } from "react-router-dom";
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
import WeeklyProgress from "./pages/WeeklyProgress/WeeklyProgress";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { loadUser, ...authContext } = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;
  const location = useLocation();

useEffect(()=>{
  loadUser();
},[loadUser, location])
  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    <Routes>
      <Route path="/" element={
        !isLoggedIn ? <Home /> : <Navigate to="/dashboard" />} />
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
      <Route path="/progress"
          element={isLoggedIn ? <Layout /> : <Navigate to="/login" />} >
          <Route index element={<WeeklyProgress/>}/>
      </Route>
     
      
    </Routes>
            </>
  );
}

export default App;
