const mysql = require('mysql2/promise'); // Usamos la versión nativa de promesas
require('dotenv').config();

// Creamos el Pool con la configuración SSL requerida por Aiven
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 23050, // Puerto de Aiven
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // ESTA ES LA PARTE CRÍTICA PARA RENDER Y AIVEN:
  ssl: {
    rejectUnauthorized: false 
  }
});

// Verificación asíncrona de la conexión al iniciar
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión al pool de MySQL establecida correctamente');
    connection.release();
  } catch (err) {
    console.error('--- ERROR DE CONEXIÓN A LA BASE DE DATOS ---');
    console.error(err.message);
  }
})();

module.exports = pool;