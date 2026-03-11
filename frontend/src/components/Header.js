import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = ({ lang, setLang }) => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  
  // Estilo forzado para que los botones siempre tengan visibilidad
  const btnStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 12px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontSize: '11px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#722f37',
    border: 'none',
    cursor: 'pointer',
    minWidth: '70px' // Aseguramos un ancho mínimo
  };

  return (
    <header className="header-mobile" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
      
      {/* FILA SUPERIOR: Logo y Carrito */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}>
        <h1 style={{ margin: 0, fontSize: '18px', color: '#722f37' }}>MENDOZA RESERVE</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link to="/carrito" style={{ textDecoration: 'none', fontSize: '18px' }}>🛒 {cart?.length || 0}</Link>
          <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} style={{ background: 'none', border: 'none' }}>
            {lang === 'es' ? '🇦🇷' : '🇬🇧'}
          </button>
        </div>
      </div>

      {/* FILA DE NAVEGACIÓN */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
        <Link to="/" style={btnStyle}>Inicio</Link>
        <Link to="/historia" style={btnStyle}>Historia</Link>
        <Link to="/catalogo" style={btnStyle}>Vinos</Link>
      </nav>

      {/* FILA DE LOGIN/REGISTRO (Forzada para que siempre se vea) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', width: '100%' }}>
        {user ? (
          <button onClick={logout} style={{...btnStyle, backgroundColor: '#5a242a'}}>Salir</button>
        ) : (
          <>
            <Link to="/login" style={{...btnStyle, backgroundColor: '#4a4a4a'}}>Login</Link>
            <Link to="/register" style={{...btnStyle, backgroundColor: '#4a4a4a'}}>Registro</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;