const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST: Generar una nueva orden asignada a una bodega
router.post('/', (req, res) => {
    // Hemos agregado 'bodega_id' a la desestructuración
    const { usuario_id, total, productos, bodega_id } = req.body;

    // 1. Insertar la orden principal incluyendo el bodega_id
    const sqlOrden = "INSERT INTO ordenes (usuario_id, total, bodega_id) VALUES (?, ?, ?)";
    
    db.query(sqlOrden, [usuario_id, total, bodega_id], (err, result) => {
        if (err) {
            console.error("Error al crear orden:", err);
            return res.status(500).json({ error: "Error al registrar la orden" });
        }

        const ordenId = result.insertId;

        // 2. Insertar cada producto en 'orden_items'
        const values = productos.map(item => [ordenId, item.id, item.precio_unitario || item.precio]);
        const sqlItems = "INSERT INTO orden_items (orden_id, vino_id, precio_unitario) VALUES ?";

        db.query(sqlItems, [values], (errItems) => {
            if (errItems) {
                console.error("Error al guardar items:", errItems);
                return res.status(500).json({ error: "Error al guardar detalles de la orden" });
            }
            res.json({ message: "Orden generada y enviada a bodega con éxito", ordenId });
        });
    });
});

// GET: Historial de pedidos por usuario
router.get('/usuario/:usuario_id', (req, res) => {
    const { usuario_id } = req.params;
    const sql = `
        SELECT o.*, 
               GROUP_CONCAT(v.nombre SEPARATOR ', ') as vinos_comprados 
        FROM ordenes o
        JOIN orden_items oi ON o.id = oi.orden_id
        JOIN vinos v ON oi.vino_id = v.id
        WHERE o.usuario_id = ?
        GROUP BY o.id
        ORDER BY o.fecha DESC
    `;
    db.query(sql, [usuario_id], (err, results) => {
        if (err) return res.status(500).json({ error: "Error al traer pedidos" });
        res.json(results);
    });
});

// GET: Panel de control para la BODEGA (Pedidos pendientes)
router.get('/bodega/:bodega_id', (req, res) => {
    const { bodega_id } = req.params;
    const sql = `
        SELECT o.*, u.nombre as cliente_nombre 
        FROM ordenes o
        JOIN usuarios u ON o.usuario_id = u.id
        WHERE o.bodega_id = ? AND o.estado = 'Pendiente'
        ORDER BY o.fecha ASC
    `;
    db.query(sql, [bodega_id], (err, results) => {
        if (err) return res.status(500).json({ error: "Error al traer pedidos de bodega" });
        res.json(results);
    });
});

module.exports = router;