import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Contacto = () => {
  const { lang } = useLanguage();

  const t = {
    es: { mendoza: "Mendoza, Argentina", uk: "Reino Unido (UK)" },
    en: { mendoza: "Mendoza, Argentina", uk: "United Kingdom (UK)" }
  };

  const currentT = t[lang] || t['es'];

  return (
    <div className="page-container contact-page">
      {/* Se ha eliminado el h2 con la clase section-title */}
      
      <div className="contact-grid">
        <div className="contact-card">
          <h3 className="card-title">{currentT.mendoza}</h3>
          <p>📞 +54 261 123 4567</p>
          <p>✉️ mendoza@mendozareserve.com</p>
        </div>

        <div className="contact-card">
          <h3 className="card-title">{currentT.uk}</h3>
          <p>📞 +44 20 7946 0958</p>
          <p>✉️ uk@mendozareserve.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contacto;