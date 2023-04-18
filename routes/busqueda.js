/*
'/api/usuarios'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getBusqueda, getBusquedaSeccion } = require('../controllers/busqueda');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-toke');

const router = Router();

router.get('/:param', [
    validarJWT
], getBusqueda);

router.get('/coleccion/:tabla/:param', [
    validarJWT
], getBusquedaSeccion);



module.exports = router;