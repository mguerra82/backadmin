//const Usuario = require('../models/usuario');
const con = require('../database/config');

//const Musuario = require('../models/usuario')


const getUsuarios = async (req, res) => {
    //const result = [];
    // await con.con.query('SELECT id, idCodPer, usuario, password, token, email, rol, intentos FROM MandameApp.usuario', function (err, result, fields) {
    await con.con.query(`call MandameApp.procedure(@codigo, @mensaje)`, function (err, result, fields) {
        if (err) {
            con.con.end();
            res.json({
                ok: false,
                statusCode: 400
            });
            console.log('ERRROR----->', err.message);
            return;
            
        }else{
             res.json({
            ok: true,
            msn: 'get usuarios',
            statusCode: 200,
            usuario: result
        });
        console.log('consulta zatisfactoria')

        con.con.end();
        return;
        }
       
    });

}

const crearUsuarios = async (req, res) => {

    const { idper, usuario, pass, tk, email, rol, intentos } = req.body;

    con.con.query(`call MandameApp.insert_usuario(?,?,?,?,?,?,?,@codigo, @mensaje)`, [idper, usuario, pass, tk, email, rol, intentos], function (err, result, fields) {
        if (err) {
            con.con.end();
            res.status(400).json({
                ok: false,
                msn:'Error al consultar la base de datos.'
            });
            con.con.release();
            console.log('ERRROR----->', err.message);
             return;
        }
        //console.log('RESULT --->', result[0][0].codigo);
        
        if (result[0][0].codigo === 2) {
            return res.status(400).json({
                ok: false,
                msn:result[0][0]
            });
            con.con.release();
        } else {
            res.json({
                ok: true,
                statusCode: 200,
                usuario: result[0][0]
            });
            con.con.release();
            return;
        }
    });
}
module.exports = {

    getUsuarios,
    crearUsuarios
}