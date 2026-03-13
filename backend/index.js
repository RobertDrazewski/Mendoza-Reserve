const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Importación de rutas
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

// 3. MIDDLEWARE DE SPA (Intercepta peticiones manualmente sin rutas de Express)
app.use((req, res, next) => {
    // Si la ruta no empieza con /api y no es un archivo estático
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