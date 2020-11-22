var express = require('express');
var firebase = require('firebase');
var bodyParser = require('body-parser');
var cors = require('cors');
var inventario = express();

require("./conectionFirebase");

inventario.use(cors())
inventario.use(bodyParser.json()); 

//Fetch instances
inventario.get('/inventario', function (req, res) {

    console.log("HTTP Get Request");
    var inventarioReference = firebase.database().ref("/inventarios/");

    //Attach an asynchronous callback to read the data
    inventarioReference.once("value",
        function (snapshot) {
            let result = [];
            snapshot.forEach(function (child) {
                result.push(child.val());
            });
            console.log(result);
            res.json(result);
            inventarioReference.off("value");
        },
        function (errorObject) {
            console.log("The read failed: " + errorObject.code);
            res.send("The read failed: " + errorObject.code);
        });
});

//Create new instance
inventario.put('/inventario', function (req, res) {

    console.log("HTTP Put Request");

    var id = req.body.id;
    var raza = req.body.raza;
    var edad = req.body.edad;
    var numero = req.body.numero;
    var apartado = req.body.apartado;
    var url = req.body.url;
    var estado = req.body.estado;

    console.log(req.body);

    var newId = id.replace("@", "").replace(".", "").replace("-", "");

    var referencePath = '/inventarios/' + newId + "/";

    var inventarioReference = firebase.database().ref(referencePath);
    inventarioReference.set({ id: id,raza:raza,edad:edad,numero:numero,apartado:apartado,url:url, estado: estado },
        function (error) {
            if (error) {
                res.send("Data could not be saved." + error);
            }
            else {
                res.send("Data saved successfully.");
            }
        });
});

//Update existing instance
inventario.post('/inventario', function (req, res) {

    console.log("HTTP POST Request");

    var id = req.body.id;
    var raza = req.body.raza;
    var edad = req.body.edad;
    var numero = req.body.numero;
    var apartado = req.body.apartado;
    var url = req.body.url;
    var estado = "en_Finca";

    console.log(req.body);

    var newId = id.replace("@", "").replace(".", "").replace("-", "");

    var referencePath = '/inventarios/' + newId + '/';
    var inventarioReference = firebase.database().ref(referencePath);

 
    inventarioReference.once("value",
        function (snapshot) {
            console.log(snapshot.val());

            if (snapshot.val() != null){
                res.send("The inventario already existed.");
            }else{
                inventarioReference.update({ id: id, raza: raza, edad: edad, numero: numero, apartado: apartado, url: url, estado:estado },
                    function (error) {
                        if (error) {
                            res.send("Data could not be updated." + error);
                        }
                        else {
                            res.send("Data updated successfully.");
                        }
                    });
            }
        });


});

//Delete an instance
inventario.delete('/inventario', function (req, res) {

    console.log("HTTP DELETE Request");

    var id = req.body.id;

    console.log(req.body);

    var newId = id.replace("@", "").replace(".", "").replace("-", "");

    var referencePath = '/inventarios/' + newId + '/';
    var inventarioReference = firebase.database().ref(referencePath);
    inventarioReference.remove()
        .then(function () {
            console.log("Remove succeeded.");
            res.send("Remove");
        })
        .catch(function (error) {
            console.log("Remove failed: " + error.message);
            res.send("not Remove");
        });

});

module.exports = inventario;