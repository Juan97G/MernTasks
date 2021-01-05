// Import Mongoose
const mongoose = require('mongoose');

// Se define el Schema
const TareaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    }
})


// Exportar el Schema
module.exports = mongoose.model('Tarea', TareaSchema)
