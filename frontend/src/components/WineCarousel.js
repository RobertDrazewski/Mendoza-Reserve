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

  return (
    // Usamos 'page-container' para mantener la alineación global
    <div className="page-container">
      <div style={{ 
        display: 'grid', 
        /* En móvil: 1 columna, en tablet/PC: 2 o 3 columnas automáticas */
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '20px',
        justifyItems: 'center'
      }}>
        {wines.map(wine => (
          <div key={wine.id} style={{ 
            width: '100%',
            maxWidth: '350px', // Evita que en pantallas grandes la tarjeta se estire demasiado
            border: '1px solid #eee', 
            padding: '15px', 
            borderRadius: '20px', 
            textAlign: 'center',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <img 
              src={`/images/${wine.imagen_url}`} 
              alt={lang === 'es' ? wine.nombre_es : wine.nombre_en}
              onError={(e) => { e.target.src = '/images/placeholder.jpg'; }} 
              style={{ 
                width: '100%', 
                height: '200px', // Un poco más bajo para móvil
                objectFit: 'cover', 
                borderRadius: '15px', 
                marginBottom: '10px' 
              }} 
            />
            
            <div style={{ flexGrow: 1 }}>
              <h3 style={{ color: '#722f37', margin: '10px 0', fontSize: '1.2rem' }}>
                {lang === 'es' ? wine.nombre_es : wine.nombre_en}
              </h3>
              <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '10px', lineHeight: '1.4' }}>
                {lang === 'es' ? wine.descripcion_es : wine.descripcion_en}
              </p>
              <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>
                {wine.precio} USD
              </p>
            </div>
            
            <button 
              style={{
                backgroundColor: '#722f37',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '10px 15px',
                marginTop: '15px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                width: '100%'
              }}
              onClick={() => addToCart(wine)}
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