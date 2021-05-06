
import React, { useState, useContext, createContext } from 'react';

const authContext = createContext();

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
};

const useAuth = () => {
  return useContext(authContext);
};

const getToken = () => {
  return localStorage.getItem('accessToken');
}

const useProvideAuth = () => {
  const [token, setToken] = useState(getToken());

  const login = (accessToken) => {
    setToken(accessToken);
    localStorage.setItem("accessToken", accessToken);
  }

  const logout = () => {
    setToken(null);
    localStorage.removeItem("accessToken");
  }

  return { login, logout, token };
};

export { useAuth, ProvideAuth };