var router = require('express').Router();
var { producto } = require('../conexion');

//ruta raiz
router.get('/', (req, res) => {
    res.render('pages/index')
})

//ruta para la pagina de insertar
router.get('/insertarProducto', (req, res) => {
    res.render('pages/insertarProducto')
})

//ruta o peticion para insertar un registro (un producto nuevo)
router.post('/guardarProducto', (req, res) => {
    producto.create(req.body)
        .then(() => {
            console.log('Se inserto correctamente');
            res.redirect('/listarProductos');
        })
        .catch((e) => {
            console.log('Error al insertar: ' + e);
        })
})

//ruta para obtener todos los productos
router.get('/listarProductos', (req, res) => {
    producto.findAll()
        .then((data) => {
            res.render('pages/listarProductos', { productos: data })
        })
        .catch((e) => {
            console.log('Error en la consulta: ' + e);
        })
})

//ruta o peticion para obtener un producto por su id (CORREGIDO: / inicial y {producto: data})
router.get('/buscarProducto/:idProducto', (req, res) => {
    producto.findAll({
        where: {
            idProducto: req.params.idProducto
        }
    })
        .then((data) => {
            res.render('pages/modificarProducto', { producto: data })
        })
        .catch((e) => {
            console.log('Error en la consulta: ' + e);
        })
})

//ruta o peticion para modificar un producto existente
router.post('/modificarProducto', (req, res) => {
    var idProducto = req.body.idProducto;
    const productoModificado = {
        nombreProducto: req.body.nombreProducto,
        marcaProducto: req.body.marcaProducto,
        precioProducto: req.body.precioProducto
    }
    producto.update(productoModificado, {
        where: {
            idProducto: idProducto
        }
    })
        .then(() => {
            console.log('Se modifico correctamente');
            res.redirect('/listarProductos');
        })
        .catch((e) => {
            console.log('Error al modificar: ' + e);
        })
})

//ruta o peticion para eliminar un producto (CORREGIDO: redirect a /listarProductos)
router.get('/eliminarProducto/:idProducto', (req, res) => {
    producto.destroy({
        where: {
            idProducto: req.params.idProducto
        }
    })
        .then(() => {
            console.log('Se elimino correctamente el producto');
            res.redirect('/listarProductos');
        })
        .catch((e) => {
            console.log('Error al eliminar: ' + e);
        })
})

module.exports = router;