const db = require('../config/db');

const getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, nombre, email, rol, fecha_registro FROM usuarios');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error en getAllUsers:", error);
        res.status(500).json({ message: 'Error en la base de datos' });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT id, nombre, email, rol, fecha_registro FROM usuarios WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error en getUserById:", error);
        res.status(500).json({ message: 'Error al buscar usuario' });
    }
};

module.exports = { getAllUsers, getUserById };