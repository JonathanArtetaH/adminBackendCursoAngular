const { response } = require('express');
const bcrytjs = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');
const Hospital = require('../models/hospital');

const getHospital = async(req, res = response) => {

    const hospitales = await Hospital
        .find({ "activo": true })
        .populate('usuario', '_id nombre');


    res.json({
        ok: true,
        hospitales
    });
}

const crearHospital = async(req, res = response) => {

    const oid = req.Oid;
    const hospital = new Hospital({
        usuario: oid,
        ...req.body
    });
    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            msj: hospitalDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Error al Registrar'
        });
    }

}

const updateHospital = async(req, res = response) => {
    res.json({
        ok: true,
        msj: 'update Hospitales'
    });
}

const dateleHospital = async(req, res = response) => {
    res.json({
        ok: true,
        msj: 'delete Hospitales'
    });

}

module.exports = {
    getHospital,
    crearHospital,
    updateHospital,
    dateleHospital,

}