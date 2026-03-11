import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Intentamos cargar el carrito desde el almacenamiento local al iniciar
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('mendoza_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Cada vez que el carrito cambie, lo guardamos en localStorage
  useEffect(() => {
    localStorage.setItem('mendoza_cart', JSON.stringify(cart));
  }, [cart]);

  // Función para agregar al carrito
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Función para eliminar un item específico por su índice
  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  // Función para vaciar el carrito (usar al finalizar la compra)
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);