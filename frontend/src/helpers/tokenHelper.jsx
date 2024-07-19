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
  export const getRawToken = () => {
    const token = window.localStorage.getItem('token');
    console.log(token);
    //const tokenJson = token && JSON.parse(token)?.token;
  
    return token;
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

  export const getId = () => {
    const token = getToken();
  
    return token?.id;
  };
  export const getUsername = () => {
    const token = getToken();
  
    return token?.username;
  };
  export const getEmail = () => {
    const token = getToken();
  
    return token?.email;
  };
  export const getUser = () => {
    const user = {
      username: getUsername(),
      userId: getId(),
      emai:getEmail(),
      rawToken:getRawToken()
    };
  
    return user;
  };
  const tokenHelper ={
    removeToken,
    saveToken,
    isLoggedin,
    isTokenExpired,
    getId,
    getEmail,
    getUsername,
    getUser,
    getToken,
    getRawToken
  };
  export default tokenHelper;