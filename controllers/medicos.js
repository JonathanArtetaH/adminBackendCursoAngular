const { response } = require('express');
const bcrytjs = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');
const Medicos = require('../models/medicos');

const getMedicos = async(req, res = response) => {

    const medicos = await Medicos.find({})
        .find({ "activo": true })
        .populate('usuario', '_id nombre img')
        .populate('hospital', '_id nombre img');

    res.json({
        ok: true,
        medicos
    });
}

const crearMedicos = async(req, res = response) => {

    const oid = req.Oid;
    const medicos = new Medicos({
        usuario: oid,
        ...req.body
    });
    try {
        const medicosDB = await medicos.save();
        res.json({
            ok: true,
            msj: medicosDB
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msj: 'Error al Registrar'
        });
    }

}

const updateMedicos = async(req, res = response) => {
    res.json({
        ok: true,
        msj: 'update Medicos'
    });
}

const dateleMedicos = async(req, res = response) => {
    res.json({
        ok: true,
        msj: 'delete Medicos'
    });

}

module.exports = {
    getMedicos,
    crearMedicos,
    updateMedicos,
    dateleMedicos,

}