// Importar Mongoose
const mongoose = require('mongoose');

/* CREAR SCHEMA DE USUARIOS */
const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    registro: {
        type: Date,
        default: Date.now()
    }
});


// Exportamos el modelo de usuario
module.exports = mongoose.model('Usuario', UsuariosSchema);
