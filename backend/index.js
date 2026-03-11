const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db'); 

// Importación de rutas
const routes = {
    vinos: require('./routes/wineRoutes'),
    users: require('./routes/userRoutes'),
    auth: require('./routes/auth'),
    orders: require('./routes/orderRoutes'),
    bodegas: require('./routes/bodegaRoutes')
};

const app = express();

app.use(cors());
app.use(express.json());

// --- Diagnóstico de Rutas ---
Object.entries(routes).forEach(([name, router]) => {
    // Si no es una función, es que el archivo no exportó un router correctamente
    if (typeof router !== 'function') {
        console.error(`❌ ERROR CRÍTICO: La ruta '${name}' no es una función (Router). Revisa el module.exports en su archivo.`);
        process.exit(1); // Detiene el servidor para que corrijas el error
    }
});

// --- Rutas de la API ---
app.use('/api/vinos', routes.vinos);
app.use('/api/users', routes.users);
app.use('/api/auth', routes.auth);
app.use('/api/orders', routes.orders);
app.use('/api/bodegas', routes.bodegas); 

app.get('/', (req, res) => res.send('Servidor corriendo correctamente'));

app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

app.use((err, req, res, next) => {
    console.error("Error global:", err.stack);
    res.status(500).json({ error: "Algo salió mal" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor activo en http://localhost:${PORT}`));