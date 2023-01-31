const { response } = require('express');
const Usuario = require('../models/usuario');

const bcrytjs = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');


const loginUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioAuth = await Usuario.findOne({ email })

        if (!usuarioAuth) return res.status(404).json({ ok: false, msj: "No se encontro el Usuario (Email)" });

        const valiPass = bcrytjs.compareSync(password, usuarioAuth.password);

        if (!valiPass) return res.status(404).json({ ok: false, msj: "No se encontro el Usuario (Password)" });

        //TODO: Generer JsonWebToken
        const token = await generarJWT(usuarioAuth._id)
        res.json({ ok: true, msj: token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msj: "Error inesperado" })
    }
}



module.exports = {
    loginUser,

}