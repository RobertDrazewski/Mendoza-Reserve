import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Importaciones corregidas (asegúrate de que estas rutas existan)
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import WineCarousel from './components/WineCarousel';
import Register from './components/Register';
import Login from './components/Login';
import Contacto from './components/Contacto';
import CartPage from './components/CartPage';
import MisPedidos from './components/MisPedidos';
import DetalleBodega from './components/DetalleBodega';
import Historia from './components/Historia';

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  return (
    <AuthProvider>
      <CartProvider>
        <LanguageProvider>
          <div className={isHome ? "home-full-bg" : "app-wrapper"}>
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Banner />} />
                <Route path="/historia" element={<Historia />} />
                <Route path="/catalogo" element={<WineCarousel />} />
                <Route path="/bodega/:id" element={<DetalleBodega />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/carrito" element={<CartPage />} />
                <Route path="/mis-pedidos" element={<MisPedidos />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;