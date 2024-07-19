
import { createContext, useCallback, useState } from "react";
import tokenHelper from "../helpers/tokenHelper";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
  data: {},
  username:'',
  userId:'',
  token:'',
  email:''
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({
    username:'',
    userId:'',
    email:'',
    rawToken:''
  });

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      
      tokenHelper.saveToken(data.token);

      const user = tokenHelper.getUser();

      setUser(user);
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

  const loadUser = useCallback(() => {
    if (!tokenHelper.isLoggedin()) {
      return;
    }

    if (tokenHelper.isTokenExpired()) {
      tokenHelper.removeToken();
      return;
    }

    setIsLoggedIn(tokenHelper.isLoggedin());
    const user = tokenHelper.getUser();
    setUser(user);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        handleLogin: handleLogin,
        logout: handleLogout,
        loadUser:loadUser,
        isLoggedIn,
        username:user.username,
        userId:user.userId,
        email:user.email,
        token:user.rawToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
