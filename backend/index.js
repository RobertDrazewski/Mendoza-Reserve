const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Configuración de CORS permitiendo acceso global
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Importación de rutas
const routes = {
    vinos: require('./routes/wineRoutes'),
    users: require('./routes/userRoutes'),
    auth: require('./routes/auth'),
    orders: require('./routes/orderRoutes'),
    bodegas: require('./routes/bodegaRoutes')
};

// 1. RUTAS DE LA API (Deben ir siempre antes del frontend)
app.use('/api/vinos', routes.vinos);
app.use('/api/users', routes.users);
app.use('/api/auth', routes.auth);
app.use('/api/orders', routes.orders);
app.use('/api/bodegas', routes.bodegas); 

// 2. CONFIGURACIÓN DE FRONTEND
// Asegúrate de que este nombre coincida con tu carpeta en GitHub: 'frontend'
const buildPath = path.join(__dirname, 'frontend', 'build');
const indexPath = path.join(buildPath, 'index.html');

app.use(express.static(buildPath));

// 3. MIDDLEWARE DE SPA: Redirige todo lo que no sea /api al index.html
app.use((req, res, next) => {
    if (!req.path.startsWith('/api')) {
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
    console.log(`🔗 API escuchando en: http://localhost:${PORT}/api/`);
});