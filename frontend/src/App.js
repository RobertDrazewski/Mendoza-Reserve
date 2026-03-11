import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

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
  const [lang, setLang] = useState('es');

  return (
    <AuthProvider>
      <CartProvider>
        {/* El Header suele tener sus propios estilos, asegúrate que no tenga anchos fijos */}
        <Header lang={lang} setLang={setLang} />
        
        {/* La clase .page-container centraliza el contenido y limita el ancho máximo */}
        <main className="page-container">
          <Routes>
            <Route path="/" element={<Banner lang={lang} />} />
            <Route path="/historia" element={<Historia lang={lang} />} />
            
            <Route path="/catalogo" element={
              <div className="section-padding">
                <h2 className="section-title">
                  {lang === 'es' ? 'Nuestros Vinos' : 'Our wines'}
                </h2>
                <WineCarousel lang={lang} />
              </div>
            } />
            
            <Route path="/bodega/:id" element={<DetalleBodega lang={lang} />} />
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