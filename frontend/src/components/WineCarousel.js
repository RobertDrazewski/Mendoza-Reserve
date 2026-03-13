import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const WineCarousel = () => {
  const [wines, setWines] = useState([]);
  const { addToCart } = useCart();
  const { lang } = useLanguage();

  useEffect(() => {
    // Definimos la URL de la API: 
    // Si estamos en producción, usamos una ruta relativa '/api/...'
    // Si estamos en desarrollo, usamos la dirección de nuestro servidor local.
    const apiBaseUrl = process.env.NODE_ENV === 'production' 
      ? '' // En producción, se busca en el mismo dominio
      : 'http://localhost:5000';

    axios.get(`${apiBaseUrl}/api/vinos`)
      .then(res => setWines(res.data))
      .catch(err => console.error("Error al cargar vinos:", err));
  }, []);

  return (
    <div className="page-container">
      {/* Grid que se ajusta a una columna en móviles gracias al CSS que agregamos antes */}
      <div className="wine-grid">
        {wines.length > 0 ? (
          wines.map(wine => (
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
                <span className="price">
                  ${parseFloat(wine.precio || 0).toLocaleString('es-AR')}
                </span>
              </div>
              
              <button className="btn-primary" onClick={() => addToCart(wine)}>
                {lang === 'es' ? 'Agregar al carrito' : 'Add to cart'}
              </button>
            </div>
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </div>
  );
};

export default WineCarousel;