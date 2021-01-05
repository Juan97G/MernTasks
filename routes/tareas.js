// Importar Express
const express = require('express');
const router = express.Router();

// importar Controlador de Tareas
const tareaController = require('../controllers/TareaController');

// Importar Autentificación del usuario
const auth = require('../middleware/auth');

// Importar check de validation express
const { check } = require('express-validator');


// CREAR UNA TAREA
/* ENDPOINT: api/tareas */
router.post('/',
    auth,
    [
      check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
)

/* Obtener las tareas por proyecto */
router.get('/',
    auth,
    tareaController.obtenerTareas
)

/* Actualizar una tarea mediante su ID */
router.put('/:id',
    auth,
    tareaController.actualizarTarea
)

/* Eliminar una tarea mediante su ID */
router.delete( '/:id',
    auth,
    tareaController.eliminarTarea
)


module.exports = router;
