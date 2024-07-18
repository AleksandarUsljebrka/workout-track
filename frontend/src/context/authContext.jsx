// AuthContext.js
import { createContext, useCallback, useState } from "react";
import tokenHelper from "../helpers/tokenHelper";
import { login, register } from "../services/api"; 
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
  data: {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [data, setData] = useState({});

  const navigate = useNavigate();

  const handleLogin = async (userData) => {
    try {
      const response = await login(userData);
      const data = response.data;

      tokenHelper.saveToken(data.token);

      setData(data);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in user:", error);
      alert("Login failed! CONTEXT.");
      navigate("/login");
    }
  };
  const handleRegister = async (userData) => {
    try {
        const data = await register(userData);
        console.log(data);
        navigate("/login")

    } catch (error) {
        console.error('Error registering:', error);
    }
};
  const handleLogout = useCallback(() => {
    tokenHelper.removeToken();

    setIsLoggedIn(false);
    navigate("/login");
  }, []);

  const loadToken = useCallback(() => {
    if (!tokenHelper.isLoggedin()) {
      return;
    }

    if (tokenHelper.isTokenExpired()) {
        tokenHelper.removeToken();
         navigate("/login");

      return;
    }

    setIsLoggedIn(tokenHelper.isLoggedin());
   
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login: handleLogin,
        logout: handleLogout,
        loadToken:loadToken,
        register:handleRegister,
        isLoggedIn,
        data: data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
