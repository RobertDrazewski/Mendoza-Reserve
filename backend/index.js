const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2'); // Asegúrate de usar mysql2
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// --- CONFIGURACIÓN DE CONEXIÓN A BASE DE DATOS ---
// Exportamos esta conexión para usarla en tus archivos de rutas
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false // NECESARIO para Aiven en Render
    }
});

db.connect((err) => {
    if (err) {
        console.error("❌ ERROR DE CONEXIÓN A LA BASE DE DATOS:", err.message);
    } else {
        console.log("✅ Conectado exitosamente a la base de datos en Aiven");
    }
});

// Importación de rutas (Asegúrate de pasarles el objeto 'db' si lo necesitan)
const routes = {
    vinos: require('./routes/wineRoutes'),
    users: require('./routes/userRoutes'),
    auth: require('./routes/auth'),
    orders: require('./routes/orderRoutes'),
    bodegas: require('./routes/bodegaRoutes')
};

// 1. RUTAS DE LA API
app.use('/api/vinos', routes.vinos);
app.use('/api/users', routes.users);
app.use('/api/auth', routes.auth);
app.use('/api/orders', routes.orders);
app.use('/api/bodegas', routes.bodegas); 

// 2. CONFIGURACIÓN DE FRONTEND
const buildPath = path.join(__dirname, 'frontend', 'build');
app.use(express.static(buildPath));

// 3. MIDDLEWARE DE SPA
app.use((req, res, next) => {
    if (!req.path.startsWith('/api') && !req.path.includes('.')) {
        const indexPath = path.join(buildPath, 'index.html');
        if (fs.existsSync(indexPath)) {
            return res.sendFile(indexPath);
        }
    }
    next();
});

// 4. MANEJO DE ERRORES GLOBAL
app.use((err, req, res, next) => {
    console.error("❌ Error detectado:", err.message);
    res.status(500).json({ error: "Error interno del servidor" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor activo en puerto ${PORT}`);
});