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

  if (loading) return <div className="loading">Loading...</div>;
  if (!bodega) return <div className="error">Bodega no encontrada</div>;

  return (
    <div className="page-container bodega-detail">
      <div className="image-wrapper">
        <img 
          src={`/images/${bodega.imagen_url}`} 
          alt={bodega.nombre} 
          className="bodega-img"
          onError={(e) => { e.target.src = '/images/default.jpg'; }}
        />
      </div>
      
      <div className="bodega-content">
        <h1 className="section-title">{bodega.nombre}</h1>
        <p><strong>{lang === 'es' ? 'Zona:' : 'Region:'}</strong> {bodega.zona}</p>
        
        <p className="bodega-desc">
          {lang === 'es' ? bodega.descripcion_es : bodega.descripcion_en}
        </p>

        <a href={`mailto:${bodega.contacto_email}`} className="btn-primary">
          {lang === 'es' ? 'Contactar Bodega' : 'Contact Winery'}
        </a>
      </div>
    </div>
  );
};

export default DetalleBodega;