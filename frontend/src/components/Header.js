import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = ({ lang, setLang }) => {
  const { cart } = useCart();
  // Nota: si no usas logout en esta versión, puedes dejarlo así:
  const { user } = useAuth();
  
  // Estilo base para los links
  const linkStyle = {
    backgroundColor: '#722f37',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontSize: '12px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap'
  };

  return (
    <header className="header-mobile">
      {/* 1. Logo */}
      <div className="logo-section">
        <h1 style={{ margin: 0, fontSize: '18px', letterSpacing: '1px' }}>MENDOZA RESERVE</h1>
      </div>

      {/* 2. Navegación */}
      <nav className="nav-links">
        <Link to="/" style={linkStyle}>{lang === 'es' ? 'Inicio' : 'Home'}</Link>
        <Link to="/historia" style={linkStyle}>{lang === 'es' ? 'Historia' : 'Story'}</Link>
        <Link to="/catalogo" style={linkStyle}>{lang === 'es' ? 'Vinos' : 'Wines'}</Link>
      </nav>

      {/* 3. Acciones (Carrito y Idioma) */}
      <div className="actions-section">
        <Link to="/carrito" style={{ textDecoration: 'none', fontSize: '18px' }}>
          🛒 {cart?.length || 0}
        </Link>
        <button 
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
        >
          {lang === 'es' ? '🇦🇷' : '🇬🇧'}
        </button>
      </div>
    </header>
  );
};

export default Header;