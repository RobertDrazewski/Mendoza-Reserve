import React from 'react';

const Contacto = ({ lang }) => {
  const t = {
    es: {
      title: "Contacto",
      mendoza: "Mendoza, Argentina",
      uk: "Reino Unido (UK)",
      tel: "Teléfono:",
      email: "Email:"
    },
    en: {
      title: "Contact",
      mendoza: "Mendoza, Argentina",
      uk: "United Kingdom (UK)",
      tel: "Phone:",
      email: "Email:"
    }
  };

  const currentT = t[lang] || t['es'];

  return (
    <div style={{ padding: '50px 20px', textAlign: 'center' }}>
      <h2 style={{ color: '#722f37', marginBottom: '40px' }}>{currentT.title}</h2>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '50px', 
        flexWrap: 'wrap' // Esto asegura que en móviles se vea uno debajo del otro
      }}>
        
        {/* Columna Mendoza */}
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', width: '300px' }}>
          <h3 style={{ color: '#722f37' }}>{currentT.mendoza}</h3>
          <p>{currentT.tel} +54 261 123 4567</p>
          <p>{currentT.email} mendoza@mendozareserve.com</p>
        </div>

        {/* Columna UK */}
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', width: '300px' }}>
          <h3 style={{ color: '#722f37' }}>{currentT.uk}</h3>
          <p>{currentT.tel} +44 20 7946 0958</p>
          <p>{currentT.email} uk@mendozareserve.com</p>
        </div>
        
      </div>
    </div>
  );
};

export default Contacto;