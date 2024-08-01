const { response } = require('express');
const { validationResult } = require('express-validator')

const validarCampos = (req, res = response, next )=>{
    console.log('RESPONSE ------>',req.body);
    
    const errores = validationResult (res);

    if(!errores.isEmpty()){
        return res.status(400).json({
            ok:false,
            error:errores.mapped(),
            msn: 'Error en valida usuario'
        })
    }
    next();
}

module.exports = {
    validarCampos
}