import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const { user } = useAuth();
  const { lang } = useLanguage();

  const t = {
    es: { title: "Mis Pedidos", empty: "No tienes pedidos registrados.", date: "Fecha", total: "Total", status: "Estado" },
    en: { title: "My Orders", empty: "You have no orders yet.", date: "Date", total: "Total", status: "Status" }
  };

  const currentT = t[lang] || t['es'];

  useEffect(() => {
    if (user?.id) {
      axios.get(`http://localhost:5000/api/orders/usuario/${user.id}`)
        .then(res => setPedidos(res.data))
        .catch(err => console.error("Error:", err));
    }
  }, [user]);

  return (
    <div className="auth-page-wrapper">
      <article className="auth-container">
        <h2 className="section-title">{currentT.title}</h2>
        
        {pedidos.length === 0 ? (
          <p className="bodega-desc">{currentT.empty}</p>
        ) : (
          <div className="orders-list-content">
            {pedidos.map(p => (
              <div key={p.id} className="order-card-item">
                <p><strong>{currentT.date}:</strong> {new Date(p.fecha).toLocaleDateString()}</p>
                <p><strong>{currentT.total}:</strong> ${parseFloat(p.total).toLocaleString('es-AR')}</p>
                <p><strong>{currentT.status}:</strong> 
                  <span className={p.estado === 'Pendiente' ? 'status-pending' : 'status-completed'}> {p.estado}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </article>
    </div>
  );
};

export default MisPedidos;