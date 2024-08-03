const con = require('../database/config');
const { response } = require('express');
const bcript = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response)=>{

    //const { r_usuario, r_password } = req.body;

    const r_usuario = req.body.usuario;
    const r_password = req.body.password;

    console.log('RESPONSE ---->', r_usuario, ' ', r_password);
    try {
        //await con.con.query('SELECT usuario, password FROM MandameApp.usuario where usuario = "r_usuario" and password = "r_password"',[r_usuario, r_password], function (err, result) {
        con.con.query('SELECT id, usuario, password FROM MandameApp.usuario where usuario = ? ', [r_usuario], async function (err, result) {

            if (err) {
                res.json({
                    ok: false,
                    statusCode: 400
                });
                console.log('ERROR --->', err.message);
                return;
            } else {
                console.log('RESULT---->', result[0]);
                if (!result) {
                    res.status(200).json({
                        ok: true,
                        msg: 'Usuario o pasword existe.'
                    });
                    return;
                } else {
                    const validaPassword = bcript.compareSync(r_password, result[0].password);
                    console.log('Validacion PASWORD ---> ', validaPassword);
                    if (!validaPassword) {
                        res.status(200).json({
                            ok: true,
                            msg: 'Contraseña invalida.'
                        });
                        return;
                    } else {
                        console.log('Validacion PASWORD ---> ', validaPassword);
                        console.log('RETORNO ---> ', result[0].usuario, ' ', result[0].password);
                        const uid = result[0].id;
                        const token = await generarJWT(uid);
                        console.log('TOKEN ---->', token);
                        res.status(200).json({
                            ok: true,
                            tk: token,
                            msg: 'Bienvenido al sistema.'
                        });
                        return;
                    }

                }
            }
        })

    } catch (error) {
        console.log('ERROR --->',error);
        res.status(500).json({
            ok:false,
            msg:'Conctacte al administrador'
        })
    }
}

module.exports={
    login
}