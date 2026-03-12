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
    // Usamos las clases maestras de tu página de contacto
    <div className="page-container contact-page">
      <h2 className="section-title">{bodega.nombre}</h2>
      
      {/* Esta clase 'contact-card' aplicada aquí tomará el estilo de las tarjetas de contacto */}
      <article className="contact-card">
        <img 
          src={`/images/${bodega.imagen_url}`} 
          alt={bodega.nombre} 
          style={{ maxWidth: '100%', marginBottom: '1rem' }}
          onError={(e) => { e.target.src = '/images/default.jpg'; }}
        />
        
        <h3 className="card-title">{bodega.zona}</h3>
        
        <p className="bodega-desc">
          {lang === 'es' ? bodega.descripcion_es : bodega.descripcion_en}
        </p>

        <a href={`mailto:${bodega.contacto_email}`} className="btn-primary">
          {lang === 'es' ? 'Contactar Bodega' : 'Contact Winery'}
        </a>
      </article>
    </div>
  );
};

export default DetalleBodega;