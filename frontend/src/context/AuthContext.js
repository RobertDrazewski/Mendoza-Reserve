import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null); // Valor inicial null

export const AuthProvider = ({ children }) => {
  // Inicialización segura para evitar errores si el JSON está corrupto
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('mendoza_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error("Error al cargar usuario de localStorage", e);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('mendoza_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mendoza_user');
    }
  }, [user]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};