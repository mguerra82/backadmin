const con = require('../database/config');
const bcript = require('bcryptjs');

const getUsuarios = async (req, res) => {
    //const result = [];
    // await con.con.query('SELECT id, idCodPer, usuario, password, token, email, rol, intentos FROM MandameApp.usuario', function (err, result, fields) {
    await con.con.query(`call MandameApp.procedure(@codigo, @mensaje)`, function (err, result, fields) {
        if (err) {
            
            res.json({
                ok: false,
                statusCode: 400
            });
            console.log('ERRROR----->', err);
            //con.con.end();
            return;
            
        }else{
             res.json({
            ok: true,
            msn: 'get usuarios',
            statusCode: 200,
            usuario: result
        });
        console.log('consulta zatisfactoria')

        //con.con.end(); 
        return;
        }
       
    });

}

const crearUsuarios = async (req, res) => {
    
    const { idper, usuario, pass, tk, email, rol, intentos } = req.body;
    console.log ('constraseña..----> ' ,{ idper, usuario, pass, tk, email, rol, intentos });
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
        
    });/*
    res.json({
        ok: true,
        statusCode: 200,
        msn: 'POST'});*/
}
module.exports = {

    getUsuarios,
    crearUsuarios
}