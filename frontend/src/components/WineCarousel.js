import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const WineCarousel = ({ lang }) => {
  const [wines, setWines] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('http://localhost:5000/api/vinos')
      .then(res => setWines(res.data))
      .catch(err => console.error("Error al cargar vinos:", err));
  }, []);

  const buttonStyle = {
    backgroundColor: '#722f37',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '12px 20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    width: '100%',
    transition: 'background 0.3s'
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px' 
      }}>
        {wines.map(wine => (
          <div key={wine.id} style={{ 
            border: '1px solid #eee', 
            padding: '20px', 
            borderRadius: '25px', 
            textAlign: 'center',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {/* Construcción de la ruta: asume que la imagen está en public/images/ */}
            <img 
              src={`/images/${wine.imagen_url}`} 
              alt={lang === 'es' ? wine.nombre_es : wine.nombre_en}
              onError={(e) => { e.target.src = '/images/placeholder.jpg'; }} 
              style={{ 
                width: '100%', 
                height: '250px', 
                objectFit: 'cover', 
                borderRadius: '15px', 
                marginBottom: '15px' 
              }} 
            />
            
            <div style={{ flexGrow: 1 }}>
              <h3 style={{ color: '#722f37', margin: '10px 0' }}>
                {lang === 'es' ? wine.nombre_es : wine.nombre_en}
              </h3>
              <p style={{ color: '#555', fontSize: '14px', marginBottom: '10px' }}>
                {lang === 'es' ? wine.descripcion_es : wine.descripcion_en}
              </p>
              <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#333' }}>
                {wine.precio} USD
              </p>
            </div>
            
            <button 
              style={buttonStyle}
              onClick={() => addToCart(wine)}
              onMouseOver={(e) => e.target.style.backgroundColor = '#5a242a'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#722f37'}
            >
              {lang === 'es' ? 'Agregar al carrito' : 'Add to cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WineCarousel;