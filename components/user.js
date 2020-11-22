var express = require('express');
var firebase = require('firebase');
var bodyParser = require('body-parser');
var cors = require('cors');
var user = express();
require("./conectionFirebase");

user.use(cors())

user.use(bodyParser.json());

//Fetch instances
user.get('/user', function (req, res) {

    console.log("HTTP Get Request");
    var userReference = firebase.database().ref("/Users/");

    //Attach an asynchronous callback to read the data
    userReference.once("value",
        function (snapshot) {
            console.log(snapshot.val());
            res.json(snapshot.val());
            userReference.off("value");
        },
        function (errorObject) {
            console.log("The read failed: " + errorObject.code);
            res.send("The read failed: " + errorObject.code);
        });
});

//Its Admin
user.post('/user/itsAdmin', function (req, res) {

    console.log("HTTP POST Request");

    var email = req.body.email;

    var newEmail = email.replace("@", "").replace(".", "");

    var referencePath = '/Users/' + newEmail + '/';
    var userReference = firebase.database().ref(referencePath);


    userReference.once("value",
        function (snapshot) {
            console.log(snapshot.val());
            if (snapshot.val() != null) {
                if (snapshot.val().role != 0){
                    res.json({"itsAdmin": true});
                }else{
                    res.json({ "itsAdmin": false });
                }
            } else {
                res.send("The user no existed.");
            }
        });
});

//Create new instance
user.put('/user', function (req, res) {

    console.log("HTTP Put Request");

    var email = req.body.email;
    var role = req.body.role;
    console.log(req.body);

    var newEmail = email.replace("@", "").replace(".", "");

    var referencePath = '/Users/' + newEmail + "/";
    var userReference = firebase.database().ref(referencePath);
    userReference.set({ role: role },
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
user.post('/user', function (req, res) {

    console.log("HTTP POST Request");

    var email = req.body.email;
    var role = req.body.role;

    var newEmail = email.replace("@", "").replace(".", "");

    var referencePath = '/Users/' + newEmail + '/';
    var userReference = firebase.database().ref(referencePath);

 
    userReference.once("value",
        function (snapshot) {
            console.log(snapshot.val());

            if (snapshot.val() != null){
                res.send("The user already existed.");
            }else{
                userReference.update({ email: email, role: role },
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
user.delete('/user', function (req, res) {

    console.log("HTTP DELETE Request");
    var email = req.body.email;
    var newEmail = email.replace("@", "").replace(".", "");

    var referencePath = '/Users/' + newEmail + '/';
    var userReference = firebase.database().ref(referencePath);
    userReference.remove()
        .then(function () {
            console.log("Remove succeeded.");
            res.send("Remove");
        })
        .catch(function (error) {
            console.log("Remove failed: " + error.message);
            res.send("Not Remove");
        });

});

module.exports = user;