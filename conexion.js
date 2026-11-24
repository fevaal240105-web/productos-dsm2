var sequelize = require('sequelize');
var productoModelo = require('./models/producto');

//Conexion con la BD 
const conexion = new sequelize('productos', 'root', '', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});

const producto = productoModelo(conexion);

conexion.sync({ force: false })  
.then(() => {
    console.log('Conexion con la BD establecida correctamente');
})
.catch((e) => {
    console.log('Error al conectar con la BD: ' + e);
});

module.exports = {
    producto
}
