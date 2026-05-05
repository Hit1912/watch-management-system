import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('watch_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    // Dummy validation
    const userData = { email, name: email.split('@')[0], role: 'user' };
    setUser(userData);
    localStorage.setItem('watch_user', JSON.stringify(userData));
    return true;
  };

  const signup = (userData) => {
    const newUser = { ...userData, role: 'user' };
    setUser(newUser);
    localStorage.setItem('watch_user', JSON.stringify(newUser));
    return true;
  };

  const updateProfile = (updatedData) => {
    setUser(prev => {
      const newUser = { ...prev, ...updatedData };
      localStorage.setItem('watch_user', JSON.stringify(newUser));
      return newUser;
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('watch_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
