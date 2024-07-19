
import { createContext, useCallback, useState } from "react";
import tokenHelper from "../helpers/tokenHelper";
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

  const handleLogin = async (data) => {
    try {
      
      tokenHelper.saveToken(data.token);

      setData(data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error logging in user:", error);
      alert("Login failed! CONTEXT.");
      
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
        handleLogin: handleLogin,
        logout: handleLogout,
        loadToken:loadToken,
        isLoggedIn,
        data: data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
