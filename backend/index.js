const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- CONFIGURACIÓN DE CONEXIÓN (POOL) ---
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Verificación de salud inicial
pool.getConnection()
    .then(connection => {
        console.log(`✅ Conectado a la DB: ${process.env.DB_NAME}`);
        connection.release();
    })
    .catch(err => {
        console.error("❌ ERROR CRÍTICO DE CONEXIÓN:", err.message);
    });

// --- RUTAS CON SEGURIDAD ---
const registerRoute = (endpoint, routePath) => {
    try {
        const router = require(routePath);
        if (typeof router !== 'function') {
            throw new Error(`El archivo ${routePath} no exporta un Router (module.exports = router;).`);
        }
        app.use(endpoint, router);
        console.log(`✅ Ruta cargada: ${endpoint}`);
    } catch (err) {
        console.error(`❌ ERROR CARGANDO RUTA [${endpoint}]:`, err.message);
    }
};

registerRoute('/api/vinos', './routes/wineRoutes');
registerRoute('/api/users', './routes/userRoutes');
registerRoute('/api/auth', './routes/auth');
registerRoute('/api/orders', './routes/orderRoutes');
registerRoute('/api/bodegas', './routes/bodegaRoutes');

// --- CONFIGURACIÓN FRONTEND SPA ---
const buildPath = path.join(__dirname, 'frontend', 'build');
app.use(express.static(buildPath));

app.use((req, res, next) => {
    if (!req.path.startsWith('/api')) {
        const indexPath = path.join(buildPath, 'index.html');
        if (fs.existsSync(indexPath)) {
            return res.sendFile(indexPath);
        }
    }
    next();
});

// --- MANEJO DE ERRORES GLOBAL ---
app.use((err, req, res, next) => {
    console.error("❌ Error interno:", err.stack);
    res.status(500).json({ error: "Error interno del servidor" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor activo en http://localhost:${PORT}`);
});