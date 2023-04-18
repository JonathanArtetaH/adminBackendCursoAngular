const { response } = require('express');
const bcrytjs = require('bcryptjs');


const fileUpload = async(req, res = response) => {
    const Oid = req.params.oid;
    const tipo = req.params.tipo;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios']

    if (!tiposValidos.includes(tipo)) {
        res.status(400).json({
            ok: false,
            msg: `-> ${tipo} no esta dentro de los tipos validos`,
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: `No se encontro ningun archivo`,
        })
    }

    res.json({
        ok: true,
        Oid: Oid,
        seccion: tipo,
    });
}



module.exports = {
    fileUpload,

}