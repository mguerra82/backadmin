/**
 * 
 * Ruta: /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { getUsuarios, crearUsuarios,actualizaUsuario, deleteUsuario } = require('../controlllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.get('/',validarJWT, getUsuarios);

router.post('/',[
    check('usuario','El usuario es obligatorio.').not().isEmpty(),
    check('pass','El password es obligatorio.').not().isEmpty(),
    check('rol','El rol es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
],crearUsuarios);

router.put('/:id', actualizaUsuario);

router.delete('/',deleteUsuario);


module.exports = router;