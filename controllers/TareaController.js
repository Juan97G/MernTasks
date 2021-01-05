// Importar el modelo de tarea
const Tarea = require('../models/Tarea');

// Como las tareas pertenecen a proyectos tambien se debe importar ese modelo
const Proyecto = require('../models/Proyecto');

const { validationResult } = require('express-validator');


// CREAR UNA NUEVA TAREA
exports.crearTarea = async (req, res) => {

    //Validar si existen errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    // Extraer el proyecto y comrpobar si existe
    const { proyecto } = req.body;

    try {
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        // Se crea la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();

        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// OBTENER LAS TAREAS POR PROYECTO
exports.obtenerTareas = async (req, res) => {

    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.query;

        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        // Obtener las tareas por proyecto
        const tareas = await Tarea.find({proyecto});
        res.json({tareas});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// ACTUALIZAR TAREAS MEDIANTE SU ID
exports.actualizarTarea = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto, nombre, estado } = req.body;

        let tarea = await Tarea.findById(req.params.id);

        if(!tarea){
            return res.status(401).json({msg: 'No existe la tarea'});
        }

        // Extraer el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        // crear un objeto con la nueva información
        const nuevaTarea = {};

        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;

        // Guardar la tarea
        tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true});

        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// ELIMINAR UNA TAREA MEDIANTE SU ID
exports.eliminarTarea = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.query;

        let tarea = await Tarea.findById(req.params.id);

        if(!tarea){
            return res.status(401).json({msg: 'No existe la tarea'});
        }

        // Extraer el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        // Eliminar la tarea
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea Eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
