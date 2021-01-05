// IMPORTAR EXPRESS
const express = require('express');
const router = express.Router();

// Importar el controller de proyectos
const proyectoController = require('../controllers/proyectoController');

// Importar middleware de auth
const auth = require('../middleware/auth')

// Importar Check de Express Validator
const { check } = require('express-validator');


// CREAR UN PROYECTO
/* Endpoint: api/proyectos */
router.post('/',
    auth,
    [
      check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
)

/* Obtener todos los proyectos */
router.get('/',
    auth,
    proyectoController.obtenerProyectos
)

/* Actualizar un proyecto mediante el ID */
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
)

/* Eliminar un proyecto */
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
)



module.exports = router;
