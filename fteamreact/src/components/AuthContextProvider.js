import React, { useState } from 'react';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthContextProvider = ({ children }) => {
  const unAuthState = {
    auth: false,
    token: '',
    change: '',
  };
  const token = localStorage.getItem('user_token');
  const info = JSON.parse(localStorage.getItem('user_info'));
  let localAuth = { ...unAuthState };
  if (token) {
    try {
      localAuth.auth = true;
      localAuth.token = token;
    } catch (ex) {}
  }
  const [auths, setAuths] = useState(localAuth);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setAuths({ ...unAuthState });
    navigate('/', { replace: true });
  };
  return (
    <AuthContext.Provider
      value={{ ...auths, ...info, auths, setAuths, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
