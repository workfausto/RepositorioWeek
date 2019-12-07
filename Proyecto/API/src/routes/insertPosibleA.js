const { Router } = require('express');
const router = new Router();
const db = require('../config/dbcon.js').callback;

router.get('/', (req, res) => {

    var idAsistente = req.query.idAsistente;
    if (idAsistente) {
        //doInsertAsistencia
        //Yisus
        var queryprepare = "SELECT idAsistente FROM registro_eventos.posibleasistencia WHERE idAsistente = '" + idAsistente + "'";
        db(queryprepare, (err, result, field) => {
            if (err) throw err;

            return res.send(result);
        });
    } else {
        res.json(JSON.parse('{"err":"Uno o mas parametros no fueron suministrados"}'));
    }
});

router.post('/', (req, res) => {

    var idEvento = req.body.idEvento;
    var idAsistente = req.body.idAsistente;
    if (idEvento && idAsistente) {
        //doInsertAsistencia
        //Yisus
        var queryprepare = "INSERT INTO registro_eventos.posibleasistencia (idEvento, idAsistente) VALUES(?,?)";
        var values = [idEvento,
            idAsistente
        ];
        console.log(queryprepare);
        db(queryprepare, values, (err, result, field) => {
            if (err) throw err;

            return res.json(JSON.parse('{"res":"Se ha realizado la accion exitosamente"}'));
        });
    } else {
        res.json(JSON.parse('{"err":"Uno o mas parametros no fueron suministrados"}'));
    }
});

module.exports = router;