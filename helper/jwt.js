const jwt = require('jsonwebtoken');

const generarJWT = (Oid) => {
    return new Promise((resolvet, reject) => {
        const paylod = {
            Oid: Oid
        }

        jwt.sign(paylod, process.env.JSON_WT, {
            expiresIn: '12h'
        }, (error, token) => {

            if (error) {
                console.log(error)
                reject('No se pudo generar JSON_WT');
            } else {
                resolvet(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}