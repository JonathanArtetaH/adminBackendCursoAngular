const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = async(req, res = response, next) => {
    const toke = req.header('x-token')

    if (!toke) return res.status(401).json({ ok: false, msj: "Token no existe" });


    try {
        const { Oid } = jwt.verify(toke, process.env.JSON_WT);

        req.Oid = Oid
        next();

    } catch (error) {
        return res.status(401).json({ ok: false, msj: "Token no valido" });
    }

}


module.exports = {
    validarJWT,

}