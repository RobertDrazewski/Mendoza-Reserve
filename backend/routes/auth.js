const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/db'); // db.promise()

// Registro de usuario
router.post('/register', async (req, res) => {
    const { nombre, email, password } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
        await db.query(sql, [nombre, email, hashedPassword]);
        
        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({ error: "Error al registrar usuario en la base de datos" });
    }
});

// Login de usuario
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [results] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        
        if (results.length === 0) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            // Seguridad: Enviamos solo datos públicos del usuario
            res.json({ 
                message: "Login exitoso", 
                user: { 
                    id: user.id, 
                    nombre: user.nombre, 
                    email: user.email,
                    bodega_id: user.bodega_id // Importante para tu sistema de bodegas
                } 
            });
        } else {
            res.status(401).json({ error: "Credenciales inválidas" });
        }
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;