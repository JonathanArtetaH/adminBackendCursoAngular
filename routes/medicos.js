/*
'/api/Medicoses'
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-toke');
const { getMedicos, updateMedicos, crearMedicos, dateleMedicos } = require('../controllers/Medicos');



const router = Router();

router.get('/', getMedicos);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    check('hospital', ' El hospital debe ser valido').isMongoId(),
], crearMedicos);

router.put('/:Oid', [], updateMedicos);


router.delete('/:Oid', dateleMedicos);


module.exports = router;