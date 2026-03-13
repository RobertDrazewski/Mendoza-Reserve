import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaWhatsapp, FaInstagram, FaTwitter } from 'react-icons/fa'; // Importamos los iconos

const Footer = () => {
  const { lang } = useLanguage();

  const t = {
    es: { copyright: "© 2026 Mendoza Reserve. Todos los derechos reservados.", privacy: "Privacidad", terms: "Términos" },
    en: { copyright: "© 2026 Mendoza Reserve. All rights reserved.", privacy: "Privacy", terms: "Terms" }
  };

  const currentT = t[lang] || t['es'];

  return (
    <footer className="footer-main">
      <div className="footer-copyright">
        {currentT.copyright}
      </div>

      <div className="footer-legal">
        <span>{currentT.privacy}</span> | <span>{currentT.terms}</span>
      </div>

      <div className="footer-social">
        <a href="https://wa.me/5492611234567" target="_blank" rel="noreferrer" className="social-icon">
          <FaWhatsapp size={20} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">
          <FaInstagram size={20} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">
          <FaTwitter size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;