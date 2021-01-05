// EXPRESS
const express = require('express');
const conectarDB = require('./config/db');

// Crear el servidor
const app = express();

// Importar CORS
const cors = require('cors');

// Conectar a la base de datos
conectarDB();

// Habilitar express.json para poder leer los datos que el usuario escriba
app.use(express.json({extended: true}));

// Habilitar CORS
app.use(cors());

// Crear el puerto de la app
const PORT = process.env.PORT || 4000;

// IMPORTAR RUTAS
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));


// Arrancar la App
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
})
