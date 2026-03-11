import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetalleBodega = ({ lang }) => {
  const { id } = useParams();
  const [bodega, setBodega] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bodegas/${id}`)
      .then(res => {
        // console.log("Datos recibidos:", res.data); // Descomenta esto para ver qué llega
        setBodega(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar detalle:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  if (!bodega) return <div style={{ color: '#fff', textAlign: 'center' }}>Bodega no encontrada</div>;

  return (
    <div style={styles.container}>
      {/* Usamos la columna 'imagen_url' que viene de tu DB */}
      <img 
        src={`/images/${bodega.imagen_url}`} 
        alt={bodega.nombre} 
        style={styles.image}
        onError={(e) => { e.target.src = '/images/default.jpg'; }} // Imagen de respaldo por si falla
      />
      
      <div style={styles.content}>
        <h1>{bodega.nombre}</h1>
        <p><strong>Zona:</strong> {bodega.zona}</p>
        
        <p style={styles.description}>
          {/* Usamos las columnas correspondientes a los idiomas */}
          {lang === 'es' ? bodega.descripcion_es : bodega.descripcion_en}
        </p>

        <a href={`mailto:${bodega.contacto_email}`} style={styles.button}>
          {lang === 'es' ? 'Contactar Bodega' : 'Contact Winery'}
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },
  image: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '10px'
  },
  content: {
    padding: '20px 0',
    color: '#333'
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#555',
    marginTop: '20px'
  },
  button: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#722f37',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px'
  }
};

export default DetalleBodega;