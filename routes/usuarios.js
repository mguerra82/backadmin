/**
 * 
 * Ruta: /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { getUsuarios, crearUsuarios } = require('../controlllers/usuarios');
const router = Router();


router.get('/', getUsuarios);
router.post('/',[
    check('usuario','El usuario es obligatorio.').not().isEmpty(),
    validarCampos
],crearUsuarios);


module.exports = router;