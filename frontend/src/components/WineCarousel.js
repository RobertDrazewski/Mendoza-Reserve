import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const WineCarousel = () => {
  const [wines, setWines] = useState([]);
  const { addToCart } = useCart();
  const { lang } = useLanguage();

  useEffect(() => {
    axios.get('http://localhost:5000/api/vinos')
      .then(res => setWines(res.data))
      .catch(err => console.error("Error al cargar vinos:", err));
  }, []);

  return (
    <div className="page-container">
      <div className="wine-grid">
        {wines.map(wine => (
          <div key={wine.id} className="wine-card">
            <img 
              src={`/images/${wine.imagen_url}`} 
              alt={lang === 'es' ? wine.nombre_es : wine.nombre_en}
              onError={(e) => { e.target.src = '/images/placeholder.jpg'; }} 
              className="wine-img"
            />
            
            <div className="wine-info">
              <h3>{lang === 'es' ? wine.nombre_es : wine.nombre_en}</h3>
              <p>{lang === 'es' ? wine.descripcion_es : wine.descripcion_en}</p>
              <span className="price">${parseFloat(wine.precio).toLocaleString('es-AR')}</span>
            </div>
            
            <button className="btn-primary" onClick={() => addToCart(wine)}>
              {lang === 'es' ? 'Agregar al carrito' : 'Add to cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WineCarousel;