import jwtDecode from 'jwt-decode';

export const saveToken = (token) => {
    if (!token) {
      return;
    }
    window.localStorage.setItem('token', token);
  };
  
  export const removeToken = () => {
    window.localStorage.removeItem('token');
  };

  export const getToken = () => {
    const token = window.localStorage.getItem('token');
  
    if (!token) {
      return null;
    }
  
    try {
      const decoded = jwtDecode(token);
  
      return decoded;
    } catch (exception) {
      
    }
  };

  const isTokenExpired = () => {
    const token = getToken();
  
    const expirationTime = token.exp;
    const currentTime = Math.floor(Date.now() / 1000);
  
    return expirationTime < currentTime;
  };
  
  export const isLoggedin = () => {
    const token = window.localStorage.getItem('token');
  
    if (!token) {
      return false;
    }
  
    const decoded = getToken();
  
    if (!decoded) {
      return false;
    }
  
    return true;
  };

  const tokenHelper ={
    removeToken,
    saveToken,
    isLoggedin,
    isTokenExpired
  };
  export default tokenHelper;