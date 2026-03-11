import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Inicializamos el usuario buscando en localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('mendoza_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Cada vez que 'user' cambie, actualizamos localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('mendoza_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mendoza_user');
    }
  }, [user]);

  const login = (userData) => {
    // userData debe contener al menos: { id, nombre, email, bodega_id (opcional) }
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);