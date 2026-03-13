import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

const DetalleBodega = () => {
  const { id } = useParams();
  const { lang } = useLanguage();
  const [bodega, setBodega] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bodegas/${id}`)
      .then(res => { setBodega(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, [id]);

  if (loading) return <div className="loading">Cargando...</div>;
  if (!bodega) return <div className="error">Bodega no encontrada</div>;

  return (
    <div className="page-container contact-page">
      {/* Movimos el artículo aquí para que sea el contenedor principal de la tarjeta */}
      <article className="contact-card">
        
        {/* Nombre de la bodega DENTRO y arriba de la imagen */}
        <h2 className="section-title" style={{ marginBottom: '15px' }}>
          {bodega.nombre}
        </h2>
        
        <img 
          src={`/images/${bodega.imagen_url}`} 
          alt={bodega.nombre} 
          style={{ maxWidth: '100%', marginBottom: '1rem', borderRadius: '10px' }}
          onError={(e) => { e.target.src = '/images/default.jpg'; }}
        />
        
        <h3 className="card-title" style={{ marginBottom: '15px' }}>{bodega.zona}</h3>
        
        <p className="bodega-desc">
          {lang === 'es' ? bodega.descripcion_es : bodega.descripcion_en}
        </p>
        
      </article>
    </div>
  );
};

export default DetalleBodega;