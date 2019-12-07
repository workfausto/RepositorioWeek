var express = require('express');
var router = express();
const db = require('../config/dbcon.js').callback;

router.post('/cargar', (req, res) => {
    var usuario = req.body.usuario;
    var logeo;
    if (usuario) {
        db("SELECT * FROM registros where correo = '" + usuario + "'", function(err, result, fields) {

            if (err) throw err;
            logeo = result[0];
            return res.send([{
                data: logeo
            }]);

        });
        logeo = false;
    } else {
        logeo = false;
    }

});

router.post('/cargaradmin', (req, res) => {
    var usuario = req.body.usuario;
    var logeo;
    if (usuario) {
        db("SELECT * FROM administradores where idusuarios  = '" + usuario + "'", function(err, result, fields) {

            if (err) throw err;
            logeo = result[0];
            return res.send([{
                data: logeo
            }]);

        });
        logeo = false;
    } else {
        logeo = false;
    }

});


router.post('/actualizar', (req, res) => {
    var usuario = req.body.usuario;
    var newusuario = req.body.newusuario;
    var newcontrasenia = req.body.newcontrasenia;
    var logeo;
    if (usuario) {
        db("UPDATE registros  set (`correo`, `password`)  VALUES ('" + newusuario + "','" + newcontrasenia + "') where correo = '" + usuario + "'", function(err, result, fields) {

            if (err) throw err;
            logeo = result[0];
            return res.send([{
                data: logeo
            }]);

        });
        logeo = false;
    } else {
        logeo = false;
    }

});

router.post('/actualizaradmin', (req, res) => {
    var usuario = req.body.usuario;
    var newusuario = req.body.newusuario;
    var newcontrasenia = req.body.newcontrasenia;
    var logeo;
    if (usuario) {
        if (err) throw err;
        db("UPDATE administradores set idusuarios = '" + newusuario + "', password = '" + newcontrasenia + "'  where idusuarios = '" + usuario + "'", function(err, result, fields) {

            if (err) throw err;
            logeo = result[0];
            return res.send([{
                data: logeo
            }]);

        });
        logeo = false;
    } else {
        logeo = false;
    }

});

module.exports = router;