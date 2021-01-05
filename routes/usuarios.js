// RUTAS PARA CREAR USUARIOS

/* Importamos Express */
const express = require('express');
const router = express.Router();

/* Importar el controller para los usuarios */
const usuarioController = require('../controllers/usuarioController');

const { check } = require('express-validator');


// CREAR UN USUARIO
/* Endpoint: api/usuarios */
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser mínimo de 6 caracteres').isLength({min: 6})
    ],

    usuarioController.crearUsuario
);


module.exports = router;
