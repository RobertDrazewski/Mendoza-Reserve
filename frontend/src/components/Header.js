import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = ({ lang, setLang }) => {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const t = {
    es: { home: "Inicio", story: "Historia", vinos: "Vinos", contact: "Contacto", login: "Login", reg: "Registro", logout: "Salir" },
    en: { home: "Home", story: "Story", vinos: "Wines", contact: "Contact", login: "Login", reg: "Register", logout: "Logout" }
  };

  const currentT = t[lang] || t['es'];

  const linkStyle = {
    backgroundColor: '#722f37',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '25px', // Coherente con tu estética redondeada
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background 0.3s'
  };

  return (
    <header style={{ 
      backgroundColor: 'white', 
      padding: '15px 50px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderBottom: '2px solid #722f37',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* 1. Logo con subtítulo cursivo */}
      <div style={{ color: '#722f37', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ margin: 0, fontSize: '22px', letterSpacing: '2px' }}>MENDOZA RESERVE</h1>
        <span style={{ fontSize: '12px', fontStyle: 'italic', opacity: 0.7 }}>Premium Boutique Wine Selections</span>
      </div>

      {/* 2. Navegación */}
      <nav style={{ display: 'flex', gap: '10px' }}>
        <Link to="/" style={linkStyle}>{currentT.home}</Link>
        <Link to="/historia" style={linkStyle}>{currentT.story}</Link>
        <Link to="/catalogo" style={linkStyle}>{currentT.vinos}</Link>
        <Link to="/contacto" style={linkStyle}>{currentT.contact}</Link>
      </nav>

      {/* 3. Acciones */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {user ? (
          <>
            <span style={{ color: '#722f37', fontWeight: 'bold' }}>{user.nombre || 'User'}</span>
            <button onClick={logout} style={{...linkStyle, backgroundColor: '#5a242a', cursor: 'pointer', border: 'none'}}>
              {currentT.logout}
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>{currentT.login}</Link>
            <Link to="/register" style={linkStyle}>{currentT.reg}</Link>
          </>
        )}

        <Link to="/carrito" style={{ textDecoration: 'none', fontSize: '20px' }}>
          🛒 {cart ? cart.length : 0}
        </Link>

        <div>
          <button onClick={() => setLang('es')} style={{ cursor: 'pointer', border: 'none', background: 'none' }}>🇦🇷</button>
          <button onClick={() => setLang('en')} style={{ cursor: 'pointer', border: 'none', background: 'none' }}>🇬🇧</button>
        </div>
      </div>
    </header>
  );
};

export default Header;