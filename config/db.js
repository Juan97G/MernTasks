const mongoose = require('mongoose');

// Para poder leer el archivo .env
require('dotenv').config({path: 'variables.env'});

// Crar función para conectar a la DB
const conectarDB = async () => {
    try{
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log("DB Conectada");
    } catch (error) {
        console.log(error);
        process.exit(1); // Detiene la app en caso de que exista un error
    }
}


module.exports = conectarDB;
