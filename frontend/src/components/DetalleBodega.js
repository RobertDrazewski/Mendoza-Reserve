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
        setBodega(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar detalle:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  if (!bodega) return <div style={{ textAlign: 'center' }}>Bodega no encontrada</div>;

  return (
    // Usamos 'page-container' de tu CSS global para el centrado
    <div className="page-container" style={styles.container}>
      <img 
        src={`/images/${bodega.imagen_url}`} 
        alt={bodega.nombre} 
        style={styles.image}
        onError={(e) => { e.target.src = '/images/default.jpg'; }}
      />
      
      <div style={styles.content}>
        <h1 style={styles.title}>{bodega.nombre}</h1>
        <p><strong>{lang === 'es' ? 'Zona' : 'Region'}:</strong> {bodega.zona}</p>
        
        <p style={styles.description}>
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
    padding: '15px', // Menos padding en móvil
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    margin: '20px auto'
  },
  image: {
    width: '100%',
    height: 'auto', // Clave: permite que la altura sea proporcional al ancho
    maxHeight: '300px', // Limitamos para móvil
    objectFit: 'cover',
    borderRadius: '10px'
  },
  title: {
    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', // El título se ajusta según el tamaño de pantalla
    color: '#722f37',
    margin: '15px 0'
  },
  content: {
    padding: '10px 0',
    color: '#333'
  },
  description: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#555',
    marginTop: '15px'
  },
  button: {
    display: 'block', // Botón de ancho completo en móvil
    textAlign: 'center',
    marginTop: '25px',
    padding: '12px',
    backgroundColor: '#722f37',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '25px',
    fontWeight: 'bold'
  }
};

export default DetalleBodega;