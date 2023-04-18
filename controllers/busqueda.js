const { response } = require('express');
const bcrytjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const Medicos = require('../models/medicos');
const Hospital = require('../models/hospital');



const getBusqueda = async(req, res = response) => {

    const param = req.params.param;
    const regX = new RegExp(param, 'i')

    const [usuario, hospitales, medicos] = await Promise.all([
        Usuario.find({ nombre: regX }),
        Hospital.find({ nombre: regX }),
        Medicos.find({ nombre: regX })
    ])

    res.json({
        ok: true,
        param: param,
        users: usuario,
        hospitales: hospitales,
        medicos: medicos

    });
}
const getBusquedaSeccion = async(req, res = response) => {

    const param = req.params.param;
    const seccion = req.params.tabla;

    const regX = new RegExp(param, 'i')
    let data = [];


    console.log(seccion, data)
    switch (seccion) {
        case 'usuario':
            data = await Usuario.find({ nombre: regX, "activo": true });
            break;
        case 'hospital':
            data = await Hospital.find({ nombre: regX, "activo": true })
                .populate('usuario', '_id nombre');
            break;
        case 'medico':
            data = await Medicos.find({ nombre: regX, "activo": true })
                .populate('usuario', '_id nombre img')
                .populate('hospital', '_id nombre img');
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'No se encontro la seccion'
            });
    }

    console.log(data)

    res.json({
        ok: true,
        param: param,
        data: data
    });
}



module.exports = {
    getBusqueda,
    getBusquedaSeccion

}