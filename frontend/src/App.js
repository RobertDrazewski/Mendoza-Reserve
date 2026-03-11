import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Componentes
import Header from './components/Header';
import Banner from './components/Banner';
import WineCarousel from './components/WineCarousel';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Contacto from './components/Contacto';
import CartPage from './components/CartPage';
import MisPedidos from './components/MisPedidos';
import DetalleBodega from './components/DetalleBodega';
// AGREGADO: Importación de tu nueva página
import Historia from './components/Historia';

function App() {
  const [lang, setLang] = useState('es');

  return (
    <AuthProvider>
      <CartProvider>
        <Header lang={lang} setLang={setLang} />
        
        <main style={{ minHeight: '80vh' }}>
          <Routes>
            {/* Ruta Principal */}
            <Route path="/" element={<Banner lang={lang} />} />
            
            {/* Ruta de Historia */}
            <Route path="/historia" element={<Historia lang={lang} />} />
            
            {/* Ruta del Catálogo */}
            <Route path="/catalogo" element={
              <div style={{ padding: '50px' }}>
                <h2 style={{ color: '#722f37', textAlign: 'center' }}>
                  {lang === 'es' ? 'Nuestro Vinos' : 'Our wines'}
                </h2>
                <WineCarousel lang={lang} />
              </div>
            } />
            
            {/* Ruta dinámica */}
            <Route path="/bodega/:id" element={<DetalleBodega lang={lang} />} />
            
            {/* Otras rutas */}
            <Route path="/contacto" element={<Contacto lang={lang} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/mis-pedidos" element={<MisPedidos />} />
          </Routes>
        </main>

        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;