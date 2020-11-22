var express = require('express');
var user = require("./components/user");
var apartado = require("./components/apartado");
var inventario = require("./components/inventario");

const app = express();

app.use(user);
app.use(apartado);
app.use(inventario);

var server = app.listen(8080, function () {
	var port = server.address().port;

	console.log("Escuchando en el puerto:", port);
});
