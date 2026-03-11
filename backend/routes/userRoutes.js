const express = require('express');
const router = express.Router();
// Importamos el controlador con las funciones getAllUsers y getUserById
const userController = require('../controllers/userController');

/**
 * @route   GET /api/users
 * @desc    Obtener lista completa de usuarios
 * @access  Public (se puede proteger luego con middlewares)
 */
router.get('/', userController.getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Obtener un usuario específico por su ID
 * @access  Public
 */
router.get('/:id', userController.getUserById);

module.exports = router;