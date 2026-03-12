import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const { user } = useAuth();
  const { lang } = useLanguage();

  const t = {
    es: { title: "Mis Pedidos", empty: "No tienes pedidos registrados.", date: "Fecha", wines: "Vinos", total: "Total", status: "Estado" },
    en: { title: "My Orders", empty: "You have no orders yet.", date: "Date", wines: "Wines", total: "Total", status: "Status" }
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
    <div className="page-container">
      <h2 className="section-title">{currentT.title}</h2>
      
      {pedidos.length === 0 ? (
        <p className="empty-msg">{currentT.empty}</p>
      ) : (
        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>{currentT.date}</th>
                <th>{currentT.wines}</th>
                <th>{currentT.total}</th>
                <th>{currentT.status}</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map(p => (
                <tr key={p.id}>
                  <td>{new Date(p.fecha).toLocaleDateString()}</td>
                  <td>{p.vinos_comprados}</td>
                  <td>${parseFloat(p.total).toLocaleString('es-AR')}</td>
                  <td className={p.estado === 'Pendiente' ? 'status-pending' : 'status-completed'}>
                    {p.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MisPedidos;
