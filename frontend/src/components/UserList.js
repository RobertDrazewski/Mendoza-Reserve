import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("No se pudo conectar al backend:", error);
      });
  }, []);

  return (
    <div>
      <h3>Lista de Usuarios desde MySQL</h3>
      {users.length > 0 ? (
        <ul>
          {/* Aquí mapeamos tanto el nombre como el email */}
          {users.map((user) => (
            <li key={user.id}>
              {user.nombre} - <strong>{user.email}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>Cargando o base de datos vacía...</p>
      )}
    </div>
  );
};

export default UserList;