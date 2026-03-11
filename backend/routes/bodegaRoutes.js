const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

// GET: Obtener todas las bodegas
router.get('/', async (req, res) => {
    try {
        // Obtenemos todas las bodegas
        const [rows] = await db.query("SELECT * FROM bodegas");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener bodegas:", error);
        res.status(500).json({ error: "Error al recuperar la lista de bodegas" });
    }
});

// GET: Obtener detalle de una sola bodega por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Consulta específica para el ID recibido
        const [rows] = await db.query("SELECT * FROM bodegas WHERE id = ?", [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: "Bodega no encontrada" });
        }
        
        // Retornamos el objeto con todos sus campos (nombre, zona, descripcion, historia, etc.)
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error al buscar bodega por ID:", error);
        res.status(500).json({ error: "Error al procesar la solicitud" });
    }
});

module.exports = router;