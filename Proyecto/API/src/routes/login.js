var express = require('express');
var router = express();
const db = require('../config/dbcon.js').callback;

router.get('/', (req, res) => {
    // res.send(lista);
});

router.post('/', (req, res) => {
    console.log("normal");
    var usuario = req.body.usuario;
    var contrasenia = req.body.contrasenia;
    var logeo;
    if (usuario && contrasenia) {


        db("SELECT * FROM registros where correo = '" + usuario + "' and password = '" + contrasenia + "'", function(err, result, fields) {

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


router.post('/admin', (req, res) => {
    var usuario = req.body.usuario;
    var contrasenia = req.body.contrasenia;
    var logeo;
    if (usuario && contrasenia) {


        db("SELECT * FROM administradores where idusuarios = '" + usuario + "' and password = '" + contrasenia + "'", function(err, result, fields) {

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

/*
router.post('/', async(req, res) => {
    var usuario = req.body.usuario;
    var contrasenia = req.body.contrasenia;
    var logeo = await ReemplazarLoggeo(usuario, contrasenia);
    console.log(logeo);
    res.send(logeo);
});

function ReemplazarLoggeo(usuario, contrasenia) {

    if (usuario && contrasenia) {
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query("SELECT * FROM evento.usuarios where idusuarios = '" + usuario + "' and password = '" + contrasenia + "'", function(err, result, fields) {
                console.log(result[0].idusuarios);
                if (err) throw err;
                logeo = result[0].idusuarios;
                connection.release();
            });
        });
        logeo = false;
    } else {
        logeo = false;
    }
}
*/
module.exports = router;