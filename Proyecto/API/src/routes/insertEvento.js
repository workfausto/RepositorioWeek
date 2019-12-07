const { Router } = require('express');
const router = new Router();
const db = require('../config/dbcon.js').callback;


router.get('/', (req, res) => {
    var Tipo = req.query.Tipo;
    if (Tipo) {
        var queryprepare = "SELECT * FROM registro_eventos.eventos WHERE Tipo = " + Tipo;
    } else { var queryprepare = "SELECT * FROM registro_eventos.eventos"; }
    db(queryprepare, (err, results, fields) => {
        if (err) throw err;

        return res.status(200).send(results);
    });
});

router.post('/', (req, res) => {
    var Tipo = req.body.Tipo;
    var Nombre = req.body.Nombre;
    var Lugar = req.body.Lugar;
    var Expositor = req.body.Expositor;
    var Fecha = req.body.Fecha;
    var Descripcion = req.body.Descripcion;
    var Asistentes = req.body.Asistentes;
    var Categoria = req.body.Categoria;

    switch (Tipo) {
        case 0:
            if (Nombre && Lugar && Expositor && Fecha && Descripcion) {
                if (Asistentes) {

                } else {
                    Asistentes = 0;
                }
                //doInsertTaller
                //Yisus
                var queryprepare = "INSERT INTO registro_eventos.eventos (tipo,nombre,lugar,idExpositor,fecha,descripcion,asistentes,categoria) VALUES(?,?,?,?,?,?,?,?)";
                var values = [Tipo,
                    Nombre,
                    Lugar,
                    Expositor,
                    Fecha,
                    Descripcion,
                    Asistentes,
                    Categoria
                ];
                console.log(queryprepare);
                db(queryprepare, values, (err, result, field) => {
                    if (err) throw err;

                    return res.json(JSON.parse('{"res":"Se ha realizado la accion exitosamente"}'));
                });
            } else {
                res.json(JSON.parse('{"err":"Uno o mas parametros no fueron suministrados"}'));
            }
            break;
        case 1:
            if (Nombre && Lugar && Expositor && Fecha) {
                //doInsertConferencia
                //Yisus
                var queryprepare = "INSERT INTO registro_eventos.eventos (tipo,nombre,lugar,idExpositor,fecha,descripcion,asistentes,categoria) VALUES(?,?,?,?,?,?,?,?)";
                var values = [Tipo,
                    Nombre,
                    Lugar,
                    Expositor,
                    Fecha,
                    Descripcion,
                    Asistentes,
                    Categoria
                ];
                console.log(queryprepare);
                db(queryprepare, values, (err, result, field) => {
                    if (err) throw err;
                    return res.json(JSON.parse('{"res":"Se ha realizado la accion exitosamente"}'));
                });
            } else {
                res.json(JSON.parse('{"err":"Uno o mas parametros no fueron suministrados"}'));
            }
            break;
        default:
            res.json(JSON.parse('{"err":"Tipo invalido"}'));
            break;
    }
});

router.put('/', (req, res) => {
    var idEvento = req.body.idEvento;
    var Tipo = req.body.Tipo;
    var Nombre = req.body.Nombre;
    var Lugar = req.body.Lugar;
    var Expositor = req.body.Expositor;
    var Fecha = req.body.Fecha;
    var Descripcion = req.body.Descripcion;
    var Asistentes = req.body.Asistentes;
    var Categoria = req.body.Categoria;
    if (idEvento) {
        if (Asistentes) {

        } else {
            Asistentes = 0;
        }
        var queryprepare = "UPDATE `registro_eventos`.`eventos` SET `tipo` = ?,`nombre` = ?,`lugar` = ?,`idExpositor` = ?,`fecha` = ?,`descripcion` = ?,`asistentes` = ?,`categoria` = ? WHERE `idevento` = ?;";
        var values = [
            Tipo,
            Nombre,
            Lugar,
            Expositor,
            Fecha,
            Descripcion,
            Asistentes,
            Categoria,
            idEvento
        ];
        db(queryprepare, values, (err, results, fields) => {
            if (err) throw err;
            return res.json(JSON.parse('{"res":"Se ha realizado la accion exitosamente"}'));
        });
    } else {
        return res.json(JSON.parse('{"res":"No se ha proporcionado todos los datos del evento especifico"}'));
    }
});

router.delete('/', (req, res) => {

    var idEvento = req.body.idEvento;
    if (idEvento) {
        var queryprepare = "SELECT idEvento from registro_eventos.eventos WHERE idEvento = ?";
        db(queryprepare, [idEvento], (err, results, fields) => {
            if (err) throw (err);
            if (results) {
                queryprepare = "DELETE from registro_eventos.eventos WHERE idEvento = ?"
                db(queryprepare, [idEvento], (err, results, fields) => {
                    if (err) throw (err);
                    return res.json(JSON.parse('{"res":"Se ha realizado la accion exitosamente"}'));
                });
            } else {
                return res.json(JSON.parse('{"res":"El evento no existe"}'));
            }
        });
    } else {
        return res.json(JSON.parse('{"res":"No se proporciono el identificador del evento"}'));
    }
});

module.exports = router;