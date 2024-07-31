
const {Sequelize, DataTypes, Model, INTEGER } = require('sequelize');
//const sequelize = new Sequelize('mysql::memory:');
const sequelize = require('../database/config')


//class Usuario extends Model {}
class Usuario extends Sequelize.Model { }


//Usuario.init({
Usuario.init(
    {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        unique:true
    },
    idCodPer:{
        type:INTEGER,
        require:true
    },
    usuario:{
        type:String,
        required:true
    }, 
    password:{
        type:String,
        required:true
    },
    toke:{
        type:String,
        require:false
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:Sequelize.INTEGER,
        required:true,
        defaul:'1'
    },
    intentos:{
        type:INTEGER,
        require:false
    },
},{
    sequelize,
    modelName: 'Usuario',
    
},
);
module.exports = Usuario; 