/**const mysql = require('mysql2/promise');

async function dbconexion(){
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            database : 'MandameApp',
            user: 'root',
            password: 'password',
            port: 3306
        });
        console.log('Conexion a MySql establecida.');
        return connection
    } catch (error) {
        console.log('Error al conectar MySql .', error);
        throw error;
    }
}


const { Sequelize } = require("sequelize");

const mysql = new Sequelize('MandameApp', 'root','pasword',{
    host:'localhost',
    dialect:'mysql',
    port: 3306,
    multipleStatements: true
})


const mysql = new Sequelize({
    database:'MandameApp', 
    user:'root', 
    password:'password',
    host: 'localhost',
   dialect: 'mysql',
    port: 3306
});

 


async function testConenection(){
    try {
        await sequelize.authenticate().then(()=>{
             console.log('conexion correta');
        })
       
    } catch (error) {
         console.log('Error---->', error)
    }
}
*/
//Conexion funsional

const mysql = require('mysql');
require("dotenv").config();

const con = mysql.createConnection
    ({
        host: process.env.HOST,
        user: 'root',
        password: 'password',
        database: process.env.DATABASE
    });
try {
    con.connect(function (err) {
        console.log('Conectado');
    })
} catch (error) {
    if (error) throw err;
    console.log('Error en la conexion, ', error);
}


module.exports = {
    con
} 