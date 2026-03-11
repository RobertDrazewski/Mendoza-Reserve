import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Solo hacemos la petición si el usuario está autenticado
    if (user && user.id) {
      axios.get(`http://localhost:5000/api/orders/usuario/${user.id}`)
        .then(res => {
          setPedidos(res.data);
        })
        .catch(err => {
          console.error("Error al cargar el historial:", err);
        });
    }
  }, [user]);

  return (
    <div style={{ padding: '50px', maxWidth: '1000px', margin: 'auto' }}>
      <h2 style={{ color: '#722f37', marginBottom: '30px' }}>Mis Pedidos</h2>
      
      {pedidos.length === 0 ? (
        <p>No tienes pedidos registrados aún.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr style={{ background: '#722f37', color: 'white' }}>
              <th style={tableHeaderStyle}>Fecha</th>
              <th style={tableHeaderStyle}>Vinos</th>
              <th style={tableHeaderStyle}>Total</th>
              <th style={tableHeaderStyle}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tableCellStyle}>{new Date(p.fecha).toLocaleDateString()}</td>
                <td style={tableCellStyle}>{p.vinos_comprados}</td>
                <td style={tableCellStyle}>${parseFloat(p.total).toLocaleString('es-AR')}</td>
                <td style={{ ...tableCellStyle, fontWeight: 'bold', color: p.estado === 'Pendiente' ? '#d9534f' : '#5cb85c' }}>
                  {p.estado}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Estilos para la tabla
const tableHeaderStyle = { padding: '15px', textAlign: 'left' };
const tableCellStyle = { padding: '15px', borderBottom: '1px solid #eee' };

export default MisPedidos;