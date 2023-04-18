/*
'/api/upload'
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const expressfileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-toke');
const { fileUpload } = require('../controllers/upload');


const router = Router();

router.use(expressfileUpload());

router.put('/:tipo/:oid', validarJWT, fileUpload);

module.exports = router;