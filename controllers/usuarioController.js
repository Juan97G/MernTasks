// Importamos el model Schema de usuario
const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {
    //Revisamos si hay errores
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() });
    }

    // Destructuring
    const {email, password} = req.body;

    try {
        //Revisar que el usuario ingresado sea unico mediante el email
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Crea el nuevo usuario
        usuario = new Usuario(req.body);

        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        // Guardar nuevo usuario
        await usuario.save();

        // Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        }

        // Firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            // Mensaje de confirmación
            res.json({ token });
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).send("Hubo un error");
    }
}
