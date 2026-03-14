import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const WineCarousel = () => {
  const [wines, setWines] = useState([]);
  const [error, setError] = useState(null); // Nuevo estado para depurar
  const { addToCart } = useCart();
  const { lang } = useLanguage();

  useEffect(() => {
    // Definimos la base URL de forma más limpia
    const apiBaseUrl = process.env.NODE_ENV === 'production' 
      ? '' 
      : 'http://localhost:5000';

    axios.get(`${apiBaseUrl}/api/vinos`)
      .then(res => {
        console.log("Vinos cargados:", res.data); // MIRA LA CONSOLA DEL NAVEGADOR
        setWines(res.data);
      })
      .catch(err => {
        console.error("Error al cargar vinos:", err);
        setError("No se pudieron cargar los vinos. Revisa la consola.");
      });
  }, []);

  if (error) return <div className="error-msg">{error}</div>;

  return (
    <div className="page-container">
      <div className="wine-grid">
        {wines.length > 0 ? (
          wines.map(wine => (
            <div key={wine.id || wine.nombre_es} className="wine-card">
              <img 
                // Asegúrate de que las rutas a las imágenes sean correctas
                src={wine.imagen_url ? `/images/${wine.imagen_url}` : '/images/placeholder.jpg'} 
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