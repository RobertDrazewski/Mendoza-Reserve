import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Creamos el contexto
const CartContext = createContext();

// 2. Creamos el Provider (asegúrate de que tenga el 'export' al principio)
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('mendoza_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('mendoza_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Creamos el hook personalizado (también debe llevar 'export')
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};