import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

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
      {/* 1. IZQUIERDA: Logo */}
      <div className="header-left">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="logo">MENDOZA RESERVE</h1>
        </Link>
      </div>

      {/* 2. CENTRO: Navegación */}
      <nav className="header-nav">
        <Link to="/" className="nav-btn">{current.nav[0]}</Link>
        <Link to="/historia" className="nav-btn">{current.nav[1]}</Link>
        <Link to="/catalogo" className="nav-btn">{current.nav[2]}</Link>
        <Link to="/contacto" className="nav-btn">{current.nav[3]}</Link>
      </nav>

      {/* 3. DERECHA: Columna organizada */}
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