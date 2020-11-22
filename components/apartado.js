var express = require('express');
var firebase = require('firebase');
var bodyParser = require('body-parser');
var cors = require('cors');
var apartado = express();

require("./conectionFirebase");

apartado.use(cors())
apartado.use(bodyParser.json()); 

//Fetch instances
apartado.get('/apartado', function (req, res) {

    console.log("HTTP Get Request");
    var apartadoReference = firebase.database().ref("/apartados/");

    //Attach an asynchronous callback to read the data
    apartadoReference.once("value",
        function (snapshot) {
            let result = [];
            snapshot.forEach(function (child) {
                result.push(child.val());
            });
            console.log(result);
            res.json(result);
            apartadoReference.off("value");
        },
        function (errorObject) {
            console.log("The read failed: " + errorObject.code);
            res.send("The read failed: " + errorObject.code);
        });
});

//Create new instance
apartado.put('/apartado', function (req, res) {

    console.log("HTTP Put Request");

    var id = req.body.id;
    var nombre = req.body.nombre;
    var mt2 = req.body.mt2;

    console.log(req.body);

    var newId = id.replace("@", "").replace(".", "").replace("-", "");

    var referencePath = '/apartados/' + newId + "/";

    var apartadoReference = firebase.database().ref(referencePath);
    apartadoReference.set({ id: id,nombre:nombre,mt2:mt2 },
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
apartado.post('/apartado', function (req, res) {

    console.log("HTTP POST Request");

    var id = req.body.id;
    var nombre = req.body.nombre;
    var mt2 = req.body.mt2;

    console.log(req.body);

    var newId = id.replace("@", "").replace(".", "").replace("-", "");

    var referencePath = '/apartados/' + newId + '/';
    var apartadoReference = firebase.database().ref(referencePath);

 
    apartadoReference.once("value",
        function (snapshot) {
            console.log(snapshot.val());

            if (snapshot.val() != null){
                res.send("The apartado already existed.");
            }else{
                apartadoReference.update({ id: id, nombre: nombre, mt2:mt2 },
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
apartado.delete('/apartado', function (req, res) {

    console.log("HTTP DELETE Request");

    var id = req.body.id;

    console.log(req.body);

    var newId = id.replace("@", "").replace(".", "").replace("-", "");

    var referencePath = '/apartados/' + newId + '/';
    var apartadoReference = firebase.database().ref(referencePath);
    apartadoReference.remove()
        .then(function () {
            console.log("Remove succeeded.");
            res.send("Remove");
        })
        .catch(function (error) {
            console.log("Remove failed: " + error.message);
            res.send("not Remove");
        });

});

module.exports = apartado;