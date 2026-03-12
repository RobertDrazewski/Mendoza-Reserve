import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Contextos (Providers) - El orden es correcto: Auth -> Cart -> Language
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';

// Componentes
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
  return (
    <AuthProvider>
      <CartProvider>
        <LanguageProvider>
          {/* Quitamos la clase app-wrapper de aquí para que no afecte a todo el sitio */}
          <div className="main-layout">
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