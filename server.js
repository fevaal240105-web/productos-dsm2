var express = require('express');
var productos = require('./routes/producto-routes');

var app = express();

//motor de vistas
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.use('/', productos);

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto: ' + port);
})