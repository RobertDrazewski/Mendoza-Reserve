import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

// Importas la imagen desde la carpeta assets
import logoImage from '../assets/logo.jpg'; 

const Header = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { lang, setLang } = useLanguage();

  const t = {
    es: { nav: ["Inicio", "Historia", "Vinos", "Contacto"], auth: { login: "Login", register: "Registro", logout: "Salir" } },
    en: { nav: ["Home", "History", "Wines", "Contact"], auth: { login: "Login", register: "Register", logout: "Logout" } }
  };
  const current = t[lang] || t['es'];

  return (
    <header className="header-main">
      <div className="header-left">
        <Link to="/">
          {/* Aumentado a 80px para mayor visibilidad */}
          <img 
            src={logoImage} 
            alt="Logo Mendoza Reserve" 
            className="logo-img"
            style={{ 
              height: '80px', 
              width: 'auto', 
              display: 'block', 
              cursor: 'pointer',
              transition: 'height 0.3s ease' // Suaviza el cambio si lo animas después
            }} 
          />
        </Link>
      </div>

      <nav className="header-nav">
        <Link to="/" className="nav-btn">{current.nav[0]}</Link>
        <Link to="/historia" className="nav-btn">{current.nav[1]}</Link>
        <Link to="/catalogo" className="nav-btn">{current.nav[2]}</Link>
        <Link to="/contacto" className="nav-btn">{current.nav[3]}</Link>
      </nav>

      <div className="header-right-container">
        <div className="auth-area">
          {user ? (
            <button onClick={logout} className="nav-btn">{current.auth.logout}</button>
          ) : (
            <>
              <Link to="/login" className="nav-btn">{current.auth.login}</Link>
              <Link to="/register" className="nav-btn">{current.auth.register}</Link>
            </>
          )}
        </div>
        
        <div className="cart-lang-area">
          <Link to="/carrito" className="cart-link">🛒 ({cart?.length || 0})</Link>
          <div className="flags">
            <button onClick={() => setLang('es')} className="flag-btn">🇦🇷</button>
            <button onClick={() => setLang('en')} className="flag-btn">🇬🇧</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;