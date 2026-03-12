import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

const Banner = () => {
  const [bodegas, setBodegas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const text = {
    es: 'Bienvenidos a Mendoza Reserve',
    en: 'Where the sky meets the vine'
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/bodegas')
      .then(res => {
        setBodegas(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando bodegas:", err);
        setLoading(false);
      });
  }, []);

  return (
    /* Este div es el que ahora llevará la imagen de fondo */
    <div className="home-background">
      <div className="banner-container">
        <h1 className="banner-title">{text[lang]}</h1>

        <div className="bodegas-scroll">
          {loading ? (
            <p style={{ color: '#fff' }}>{lang === 'es' ? 'Cargando...' : 'Loading...'}</p>
          ) : (
            bodegas.map((bodega) => (
              <button 
                key={bodega.id} 
                onClick={() => navigate(`/bodega/${bodega.id}`)}
                className="bodega-btn"
              >
                {bodega.nombre}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;