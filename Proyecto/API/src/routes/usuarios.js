const { Router } = require('express');
const router = new Router();
const db = require('../config/dbcon.js').callback;
const mailsend = require("../config/mailSender.js").sender;
var QRCode = require('qrcode');

router.get('/', (req, res) => {

    var correo = req.query.correo;
    if (correo) {
        var valMail = /\S+@\S+\.\S+/;
        if (valMail.test(correo)) {
            //getUsuario
            //Yisus
            var queryprepare = "SELECT nombre,correo,tipo_boleto FROM registro_eventos.registros WHERE correo = '" + correo + "'";
            db(queryprepare, (err, result, field) => {
                if (err) throw err;

                return res.send({ data: result });
            });
        } else {
            res.json(JSON.parse('{"err":"El correo es invalido"}'));
        }

    } else {
        //getLista
        //Yisus
        var queryprepare = "SELECT nombre,correo,tipo_boleto FROM registro_eventos.registros";
        db(queryprepare, (err, result, field) => {
            if (err) throw err;

            return res.send([{
                data: result
            }]);
        });
    }
});

router.post('/', (req, res) => {

    const asistentes = req.body;
    console.log(asistentes);
    if (asistentes.registroAsistentes.length >= 0) {

        for (let i = 0; i < asistentes.registroAsistentes.length; i++) {

            if (asistentes.registroAsistentes[i].correo) {
                var valMail = /\S+@\S+\.\S+/;
                if (valMail.test(asistentes.registroAsistentes[i].correo)) {
                    //getUsuario
                    //Yisus

                    var password = '';
                    for (let j = 0; j < 10; j++) {
                        password += Math.floor((Math.random() * 10) + 0).toString();
                    }
                    asistentes.registroAsistentes[i].password = password;

                } else {
                    return res.json(JSON.parse('{"err":"El correo es invalido"}'));
                }

            }

        }
        console.log(asistentes);
        if (asistentes.registroAsistentes.length === 1) {
            var values = [asistentes.registroAsistentes[0].nombre,
                asistentes.registroAsistentes[0].correo,
                asistentes.registroAsistentes[0].tipo_boleto,
                asistentes.registroAsistentes[0].password
            ];
            console.log(values);
            var queryprepare = "INSERT INTO registro_eventos.registros (nombre, correo, tipo_boleto, password) VALUES (?,?,?,?)"
            db(queryprepare, values, (err, result, field) => {
                if (err) {
                    throw err
                } else {
                    QRCode.toDataURL(asistentes.registroAsistentes[0].correo) //here
                        .then(url => {
                            mailsend(asistentes.registroAsistentes[0].correo, asistentes.registroAsistentes[0].password, asistentes.registroAsistentes[0].nombre, url.toString(), function(err) {
                                if (err) {
                                    console.log('error on send');
                                    //here
                                    //El correo no se pudo enviar, revisar? reintentar?
                                } else {
                                    var queryprepare = "UPDATE `registro_eventos`.`registros` SET enviado = 1 WHERE correo = ?";
                                    db(queryprepare, [asistentes.registroAsistentes[0].correo], function(err, result, fields) {
                                        if (err) throw err;
                                    });
                                }
                            });
                        })
                        .catch(err => {
                            //No se pudo convertir la imagen en QR
                        });
                }

                return res.json(JSON.parse('{"res":"Se ha realizado la accion exitosamente"}'));
            });
        } else {
            var values = [];
            for (let i = 0; i < asistentes.registroAsistentes.length; i++) {
                var temp = [asistentes.registroAsistentes[i].nombre,
                    asistentes.registroAsistentes[i].correo,
                    asistentes.registroAsistentes[i].tipo_boleto,
                    asistentes.registroAsistentes[i].password
                ];
                values.push(temp);
            }
            var queryprepare = "INSERT INTO registro_eventos.registros (nombre, correo, tipo_boleto, password) VALUES ?"
            db(queryprepare, [values], (err, result, field) => {
                if (err) {
                    throw err
                } else {
                    QRCode.toDataURL(asistentes.registroAsistentes[i].correo) //here
                        .then(url => {
                            mailsend(asistentes.registroAsistentes[i].correo, asistentes.registroAsistentes[i].password, asistentes.registroAsistentes[i].nombre, url.toString(), function(err) {
                                if (err) {
                                    console.log('error on send');
                                    //here
                                    //El correo no se pudo enviar, revisar? reintentar?
                                } else {
                                    var queryprepare = "UPDATE `registro_eventos`.`registros` SET enviado = 1 WHERE correo = ?";
                                    db(queryprepare, [asistentes.registroAsistentes[i].correo], function(err, result, fields) {
                                        if (err) throw err;
                                    });
                                }
                            });
                        })
                        .catch(err => {
                            //No se pudo convertir la imagen en QR
                        });

                }

                return res.json(JSON.parse('{"res":"Se ha realizado la accion exitosamente"}'));
            });
        }
    } else {
        return res.json(JSON.parse('{"res":"No se ha ingresado ningun usuario a registrar"}'));
    }


});

module.exports = router;