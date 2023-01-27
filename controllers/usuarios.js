const { response } = require('express');
const bcrytjs = require('bcryptjs');
const Usuario = require('../models/usuario');



const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async(req, res = response) => {
    const { nombre, password, email } = req.body;
    try {

        const existeUser = await Usuario.findOne({ email });

        if (existeUser) {
            return res.status(400).json({
                ok: true,
                mgs: 'El email ya existe'
            });
        }
        const usuario = new Usuario(req.body)

        //--->> Encriptar contraseña
        const salt = bcrytjs.genSaltSync();
        usuario.password = bcrytjs.hashSync(password, salt);

        await usuario.save();
        res.json({
            ok: true,
            msg: usuario
        });

    } catch (error) {
        console.log('Error ->', error)
        res.status(500).json({
            ok: true,
            mgs: 'Error Inesperado...'
        });
    }


}



module.exports = {
    getUsuarios,
    crearUsuario
}