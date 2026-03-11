const mysql = require('mysql2');
require('dotenv').config();

// Usamos createPool en lugar de createConnection
// Esto permite manejar múltiples peticiones simultáneas y reconexiones automáticas
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Máximo 10 conexiones simultáneas
  queueLimit: 0
});

// Verificamos la conexión inicial
pool.getConnection((err, connection) => {
  if (err) {
    console.error('--- ERROR DE CONEXIÓN A LA BASE DE DATOS ---');
    console.error(err.message);
    return;
  }
  console.log('✅ Conexión al pool de MySQL establecida correctamente');
  connection.release(); // Liberamos la conexión de prueba al pool
});

// Exportamos el pool con promesas para poder usar async/await en tus rutas
module.exports = pool.promise();