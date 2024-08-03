require('dotenv').config();

const express = require('express');
const { dbconexion, testConenection } = require('./database/config');
const cors = require('cors');


/**
 * Crear servidor de express
 */
const app = express();
/**
 * CORS
 */
app.use(cors());
/**
 * Permite objetos json
 */
app.use( express.json() );
/**
 * Base de Datos
 
dbconexion();
*/

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen( 8080, ()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT );
} )