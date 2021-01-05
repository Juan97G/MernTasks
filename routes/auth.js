// RUTAS PARA AUTENTICAR USUARIOS

/* Importamos Express */
const express = require('express');
const router = express.Router();

/* Para validar los campos digitados por el usuario */
const { check } = require('express-validator');

/* Importar el controller de autenticacion */
const authController = require('../controllers/authController');

// Importar middleware de auth
const auth = require('../middleware/auth')


// INICIAR SESIÓN
/* Endpoint: api/auth */
router.post('/',
        authController.autenticarUsuario
);


/* Obtiene el usuario autenticado */
router.get('/',
    auth,
    authController.usuarioAutenticado
)


module.exports = router;
