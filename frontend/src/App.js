import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import AuthContext from "./context/authContext";
import "./App.css";
import Layout from "./components/Layout/Layout";


function App() {
  const { loadToken, ...authContext } = useContext(AuthContext);

  const isLoggedIn = authContext.isLoggedIn;

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {isLoggedIn ? (
        <Route path="/dashboard" element={<Layout />} >
          <Route index element={<Dashboard/>}/>
      </Route>

      ) : (
        <Route path="/login" element={<Login />} />
      )}
    </Routes>
  );
}

export default App;
