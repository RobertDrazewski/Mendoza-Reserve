const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

// Usamos async/await ya que tu pool de conexión está configurado para promesas
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM vinos';
        
        // Con la versión de Promesas, se usa await y desestructuración [rows]
        const [results] = await db.query(query);
        
        // Devolvemos los resultados
        res.status(200).json(results);
    } catch (err) {
        console.error("Error en base de datos:", err);
        res.status(500).json({ error: 'Error al obtener vinos de la base de datos' });
    }
});

module.exports = router;