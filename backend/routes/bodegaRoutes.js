const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET: Obtener todas las bodegas
router.get('/', async (req, res) => {
    try {
        console.log("🔍 Consultando tabla 'bodegas'...");
        
        // Ajustamos la consulta a los nombres reales de tus columnas
        const [rows] = await db.query("SELECT id, nombre, zona, contacto_email, imagen_url, descripcion_es FROM bodegas");
        
        console.log(`✅ Bodegas encontradas: ${rows.length}`);
        res.status(200).json(rows);
    } catch (error) {
        console.error("❌ ERROR EN RUTA DE BODEGAS (GET /):", error.message);
        res.status(500).json({ 
            error: "Error al recuperar la lista de bodegas",
            details: error.message 
        });
    }
});

// GET: Obtener detalle de una sola bodega por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM bodegas WHERE id = ?", [id]);
        
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: "Bodega no encontrada" });
        }
        
        res.json(rows[0]);
    } catch (error) {
        console.error("❌ ERROR EN RUTA DE BODEGAS (GET /:id):", error.message);
        res.status(500).json({ error: "Error al procesar la solicitud" });
    }
});

module.exports = router;