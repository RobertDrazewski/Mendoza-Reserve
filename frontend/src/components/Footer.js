import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { lang } = useLanguage();

  const t = {
    es: { 
      copyright: "Selecciones de Vinos Boutique Premium | © 2026", 
      privacy: "Política de Privacidad", 
      terms: "Términos de Servicio" 
    },
    en: { 
      copyright: "Premium Boutique Wine Selections | © 2026", 
      privacy: "Privacy Policy", 
      terms: "Terms of Service" 
    }
  };

  const currentT = t[lang] || t['es'];

  return (
    <footer className="footer-main">
      <div className="footer-content">
        <h3 className="footer-logo">MENDOZA RESERVE</h3>
        <p className="footer-text">{currentT.copyright}</p>
        
        <div className="footer-links">
          <span>{currentT.privacy}</span>
          <span className="separator">•</span>
          <span>{currentT.terms}</span>
        </div>

        <div className="footer-social">
          <a href="https://wa.me/5492611234567" target="_blank" rel="noreferrer" className="social-icon">WhatsApp</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;