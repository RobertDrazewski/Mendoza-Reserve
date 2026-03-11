const db = require('../config/db');

// Obtener todos los vinos
const getAllWines = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM vinos');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los vinos de la base de datos', error });
    }
};

// Si en el futuro necesitas obtener un vino por ID (para el detalle)
const getWineById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM vinos WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Vino no encontrado' });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el vino', error });
    }
};

module.exports = { getAllWines, getWineById };