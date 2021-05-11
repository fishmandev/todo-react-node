
import React, { useContext, createContext } from 'react';

const authContext = createContext();

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
};

const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {

  const login = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  const getAccessToken = () => localStorage.getItem('accessToken');
  const getRefreshToken = () => localStorage.getItem('refreshToken');

  return { login, logout, getAccessToken, getRefreshToken };
};

export { useAuth, ProvideAuth };