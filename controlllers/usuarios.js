const con = require('../database/config');
const bcript = require('bcryptjs');

const getUsuarios = async (req, res) => {
    await con.con.query(`call MandameApp.procedure(@codigo, @mensaje)`, function (err, result, fields) {
        if (err) {
            res.json({
                ok: false,
                statusCode: 400
            });
            console.log('ERRROR----->', err);
            return;
        }else{
            res.json({
            ok: true,
            msn: 'get usuarios',
            uid:req.uid,
            usuario: result
        });
        return;
        }
       
    });
}
/**
 * Para la creacion de usuario.
 * @param {} req 
 * @param {*} res 
 */
const crearUsuarios = async (req, res) => {

    const { idper, usuario, pass, tk, email, rol, intentos } = req.body;
    /**
     * Encriptar contraseña.
     */                 
    const salt = bcript.genSaltSync(10);
    console.log ('Hash de encriptacion de constraseña.. ',salt);
    const passw = bcript.hashSync(pass, salt);
    console.log ('Password encriptado.... ',passw);

    con.con.query(`call MandameApp.insert_usuario(?,?,?,?,?,?,?,@codigo, @mensaje)`, [idper, usuario, passw, tk, email, rol, intentos], function (err, result, fields) {
        if (err) {
            res.status(400).json({
                ok: false,
                msn:'Error al consultar la base de datos.'
            });
            console.log('ERRROR----->', err.sqlMessage);
             return;
        }
        if (result[0][0].codigo === 2) {
            return res.status(400).json({
                ok: false,
                msn:result[0][0]
            });  
        } else {
            res.json({
                ok: true,
                statusCode: 200,
                usuario: result[0][0]
            });
            return;
        }
    }); 
}

const actualizaUsuario = (req, res) => {

    const { idper, usuario, pass, tk, email, rol, intentos } = req.body;

    const id = req.params.id;
    console.log('Actualiza Usuario ID --->', req.params.id);
    console.log('Actualiza Usuario --->', req.body.tk);
    console.log('PASSWORD --->', pass);
    const salt = bcript.genSaltSync(10);
    console.log('Hash de encriptacion de constraseña.. ', salt);
    const passw = bcript.hashSync(pass, salt);
    console.log('Password encriptado.... ', passw);

    try {
        con.con.query(`call MandameApp.update_usuario(?,?,?,?,?,?,?,?,@codigo, @mensaje)`, [id, idper, usuario, passw, tk, email, rol, intentos], function (err, result, fields) {
            if (err) {
                res.status(400).json({
                    ok: false,
                    msn: 'Error al consultar la base de datos.'
                });
                console.log('ERRROR----->', err.sqlMessage);
                return;
            }
            if (result[0][0].codigo === 2) {
                return res.status(400).json({
                    ok: false,
                    msn: result[0][0]
                });
            } else {
                res.json({
                    ok: true,
                    statusCode: 200,
                    usuario: result[0][0]
                });
                return;
            }
        });
    } catch (error) {
        console.log('ERROR -----> ', error);
    }
}

const deleteUsuario = (req, res) =>{
    res.json({
        ok: true,
        statusCode: 200,
        msn: 'PUT'
        
    })
}
module.exports = {

    getUsuarios,
    crearUsuarios,
    actualizaUsuario,
    deleteUsuario
}