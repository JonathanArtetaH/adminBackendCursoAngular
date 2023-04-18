const { response } = require('express');
const bcrytjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helper/jwt');

const getUsuarios = async(req, res) => {

    const paginas = Number(req.query.pag) || 0;

    const [usuarios, total] = await Promise.all([

        Usuario
        .find({ "activo": true }, 'nombre email role google')
        .skip(paginas)
        .limit(paginas + 5),

        Usuario.countDocuments(),
    ])


    res.json({
        ok: true,
        Oid: req.Oid,
        TotalRegistros: total,
        usuarios,
    });
}

const crearUsuario = async(req, res = response) => {
    const { nombre, password, email, activo } = req.body;
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


        //TODO: Generer JsonWebToken
        const token = await generarJWT(usuario.id)


        await usuario.save();
        res.json({
            ok: true,
            msg: token,
            usuario: usuario

        });

    } catch (error) {
        console.log('Error ->', error)
        res.status(500).json({
            ok: true,
            mgs: 'Error Inesperado...'
        });
    }


}

const updateUser = async(req, res = response) => {
    //TODO: validar si el token es del usuario correcto

    const Oid = req.params.Oid;
    try {

        const usuarioDB = await Usuario.findById(Oid)

        if (!usuarioDB) {

            return res.status(404).json({ ok: false, msj: "No se encontro el Usuario" });
        }
        const { paswword, google, email, activo, ...camposUser } = req.body;

        if (usuarioDB.email != email) {

            const existeEmail = await Usuario.findOne({ email });

            if (existeEmail) return res.status(400).json({ ok: false, msj: "Ya existe un email" });

        }

        camposUser.email = email;
        //Actualizacion
        const usuarioActualizado = await Usuario.findByIdAndUpdate(Oid, camposUser, { new: true })
        res.json({ ok: true, msj: usuarioActualizado })

    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msj: "Error inesperado" })
    }
}

const dateleUser = async(req, res = response) => {
    const Oid = req.params.Oid;
    const camposUser2 = {};
    try {
        const usuarioDB = await Usuario.findById(Oid)

        if (!usuarioDB) {

            return res.status(404).json({ ok: false, msj: "No se encontro el Usuario" });
        }

        // DESCOMENTAR LINEA PARA ELEMINAR USUARIO
        // await Usuario.findByIdAndDelete(Oid) 
        // Y comentalar las dos siguientes
        camposUser2.activo = false;
        await Usuario.findByIdAndUpdate(Oid, camposUser2)

        res.json({ ok: true, msj: "Usuario Eliminado" });

    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msj: "Error inesperado" })
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    updateUser,
    dateleUser,

}