const express = require('express');
const router = express.Router();
// Si usas el pool de conexiones aquí, impórtalo:
const pool = require('../config/db');

// --- TUS RUTAS ---
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT v.*, b.nombre AS nombre_bodega 
            FROM vinos v
            LEFT JOIN bodegas b ON v.bodega_id = b.id
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- ESTO ES LO QUE TE FALTA O ESTÁ MAL ---
module.exports = router;