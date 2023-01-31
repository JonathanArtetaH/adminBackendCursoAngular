/*
'/api/usuarios'
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, crearUsuario, updateUser, dateleUser } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-toke');


const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuario
);

router.put('/:Oid', [
    validarJWT,
    check('nombre', 'El NOMBRE es obligatorio').not().isEmpty(),
    check('role', 'El ROLE es obligatorio').not().isEmpty(),
    check('email', 'El EMAIL es obligatorio').isEmail(),
], updateUser);


router.delete('/:Oid', validarJWT, dateleUser);


module.exports = router;