import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Banner = ({ lang }) => {
  const [bodegas, setBodegas] = useState([]);
  const navigate = useNavigate();

  const text = {
    es: 'Bienvenidos a Mendoza Reserve',
    en: 'Where the sky meets the vine'
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/bodegas')
      .then(res => setBodegas(res.data))
      .catch(err => console.error("Error cargando bodegas:", err));
  }, []);

  const bodegaButtonStyle = {
    padding: '10px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    backdropFilter: 'blur(12px)',
    transition: 'all 0.3s ease',
    margin: '0 8px',
    whiteSpace: 'nowrap',
    flexShrink: 0 // Asegura que no se deformen los botones
  };

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 150px)', 
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/images/fondo.jpeg)', 
      backgroundSize: 'cover',             
      backgroundPosition: 'center',        
      color: '#fff', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      
      <h1 style={{ fontSize: '3rem', marginBottom: '40px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        {text[lang]}
      </h1>

      {/* CONTENEDOR AJUSTADO PARA CENTRAR */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', // Centra los elementos internos
        overflowX: 'auto',
        width: 'fit-content',     // Se ajusta al ancho del contenido
        maxWidth: '900px',        // Pero no excede el máximo permitido
        margin: '0 auto',         // Centra el bloque mismo en la pantalla
        paddingBottom: '20px',
        scrollbarWidth: 'none',
      }}>
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

        {bodegas.map((bodega) => (
          <button 
            key={bodega.id} 
            onClick={() => navigate(`/bodega/${bodega.id}`)}
            style={bodegaButtonStyle}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            {bodega.nombre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Banner;