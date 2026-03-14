const db = require('../config/db');

const getAllWines = async (req, res) => {
    try {
        // Realizamos un LEFT JOIN para traer el nombre de la bodega asociada
        // v es el alias para vinos, b es el alias para bodegas
        const query = `
            SELECT v.*, b.nombre AS nombre_bodega 
            FROM vinos v
            LEFT JOIN bodegas b ON v.bodega_id = b.id
        `;
        
        const [rows] = await db.query(query);
        
        // Log para depuración en tu consola de servidor
        console.log(`✅ Se recuperaron ${rows.length} vinos correctamente.`);
        
        res.status(200).json(rows);
    } catch (error) {
        console.error("❌ Error en getAllWines:", error.message);
        res.status(500).json({ 
            message: 'Error al obtener los vinos de la base de datos', 
            error: error.message 
        });
    }
};

module.exports = { getAllWines };