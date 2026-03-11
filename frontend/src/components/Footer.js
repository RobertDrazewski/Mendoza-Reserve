import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      background: '#222', 
      color: '#fff', 
      padding: '40px 20px', 
      marginTop: 'auto',
      textAlign: 'center' 
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '15px' 
      }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', letterSpacing: '2px', color: '#722f37' }}>
          MENDOZA RESERVE
        </h3>
        
        <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>
          Premium Boutique Wine Selections | © 2026
        </p>
        
        {/* Espaciado para redes sociales o links legales */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
          <span style={{ fontSize: '0.8rem', cursor: 'pointer' }}>Privacy Policy</span>
          <span style={{ fontSize: '0.8rem', cursor: 'pointer' }}>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;