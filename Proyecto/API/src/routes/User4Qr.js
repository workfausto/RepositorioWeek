var QRCode = require('qrcode');
const { Router } = require('express');
const router = new Router();

router.get('/', (req, res) => {

    var correo = req.query.correo;
    if (correo) {
        var valMail = /\S+@\S+\.\S+/;
        if (valMail.test(correo)) {
            QRCode.toDataURL(correo)
                .then(url => {
                    res.json(JSON.parse('{"Qrcode":"' + url.toString() + '"}'));
                })
                .catch(err => {
                    res.json(JSON.parse('{"err":"No se pudo convertir en QRCode el correo enviado"}'));
                });
        } else {
            res.json(JSON.parse('{"err":"El correo enviado no contiene el formato adecuado"}'));
        }

    } else {
        res.json(JSON.parse('{"err":"No se recibió ningun correo"}'));
    }

});

router.post('/', (req, res) => {
    var correo = req.body.correo;
    if (correo) {
        var valMail = /\S+@\S+\.\S+/;
        if (valMail.test(correo)) {
            QRCode.toDataURL(correo)
                .then(url => {
                    res.json(JSON.parse('{"Qrcode":"' + url.toString() + '"}'));
                })
                .catch(err => {
                    res.json(JSON.parse('{"err":"No se pudo convertir en QRCode el correo enviado"}'));
                });
        } else {
            res.json(JSON.parse('{"err":"El correo enviado no contiene el formato adecuado"}'));
        }

    } else {
        res.json(JSON.parse('{"err":"No se recibió ningun correo"}'));
    }

});

module.exports = router;