/*
'/api/hospitales'
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-toke');
const { getHospital, updateHospital, crearHospital, dateleHospital } = require('../controllers/hospital');



const router = Router();

router.get('/', getHospital);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos

    ],
    crearHospital);

router.put('/:Oid', [], updateHospital);


router.delete('/:Oid', dateleHospital);


module.exports = router;