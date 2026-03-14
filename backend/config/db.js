const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // Ahora apunta a 'mendoza_reserve_db'
  port: parseInt(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verificación de salud
pool.getConnection()
  .then(conn => {
    console.log("✅ CONECTADO EXITOSAMENTE A:", process.env.DB_NAME);
    conn.release();
  })
  .catch(err => {
    console.error("❌ ERROR DE CONEXIÓN:", err.message);
  });

module.exports = pool;