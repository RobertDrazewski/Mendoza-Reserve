import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { lang } = useLanguage();

  const t = {
    es: { title: "Lista de Usuarios", loading: "Cargando o base de datos vacía..." },
    en: { title: "User List", loading: "Loading or empty database..." }
  };

  const currentT = t[lang] || t['es'];

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error:", error));
  }, []);

  return (
    <div className="page-container">
      <h3 className="section-title">{currentT.title}</h3>
      {users.length > 0 ? (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              {user.nombre} - <strong>{user.email}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-msg">{currentT.loading}</p>
      )}
    </div>
  );
};

export default UserList;