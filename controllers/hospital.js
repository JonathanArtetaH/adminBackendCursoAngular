const { response } = require('express');
const bcrytjs = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');
const hospital = require('../models/hospital');

const getHospital = async(req, res = response) => {
    res.json({
        ok: true,
        msj: 'get Hospitales'
    });
}

const crearHospital = async(req, res = response) => {
    res.json({
        ok: true,
        msj: 'Add Hospitales'
    });

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