var express = require('express');
var router = express();
var unirest = require("unirest");
const db = require('../config/dbcon.js').callback;

router.get('/', function(req, res) {
    var req = unirest("GET", "https://www.eventbriteapi.com/v3/events/76084479727/attendees");
    var lista = "";
    req.headers({
        "cache-control": "no-cache",
        "Connection": "keep-alive",
        "Referer": "https://www.eventbriteapi.com/v3/events/76084479727/attendees",
        "Cookie": "mgrefby=; G=v%3D2%26i%3Dafd7baa5-a916-4c0f-91fd-e68c52c26b7d%26a%3Dbe4%26s%3D9d094d0b7dd047ea2752d9756c15ed143056fe27; eblang=lo%3Den_US%26la%3Den-us; mgref=typeins; SS=AE3DLHTMXVEWCoXhJaZh2vqflr3r9Ik8zg; AS=9392b395-e077-4073-ad76-84f8169d00bf; SP=AGQgbbkFX32SIJhqfxVWC6T4mpf08r0bxQPNYahYCM1jxIWeC-OAdL80KOL0LbBCXS83zWPTicTQRL9lWx2-b8sKR_vyVnO_oKjUx7ACx1sNUREeNTF7hoLaYDYZV6mjhW-C1PxuTTPUoM8mN3cvlOfKctTR7ZGHEumggvF8tDEFaPsNoax-8z8MApMFD3Scw1c0Oqjq0zfnvwhFHiyKOC7JcNLNg4CrUEoZp_cyKWCgzelYXhKw4wA",
        "Accept-Encoding": "gzip, deflate",
        "Postman-Token": "8adcf8f8-9c9e-4d17-865e-c4b2417339c7,3cb3b162-225f-4db5-b6be-1bc476cd9eb2",
        "Cache-Control": "no-cache",
        "Accept": "*/*",
        "User-Agent": "PostmanRuntime/7.16.3",
        "Authorization": "Bearer Q7P2WSWYOAJEM6Y3PNUR"
    });

    req.end(function(result) {
        if (result.error) throw new Error(result.error);
        console.log(result.body);
        lista = result.body;
        res.send(lista);
    });
});
router.post('/', (req, res) => {
    //getLista
    //Yisus
    var lista = req.body.Lista;
    var arreglo = [];
    for (var i = 0; i < lista.length; i++) {
        arreglo.push({
            nombre: lista[i].profile.name,
            correo: lista[i].profile.email,
            tipo_boleto: lista[i].ticket_class_name
        });
    }
    const asistentes = arreglo;
    if (asistentes.length >= 0) {
        for (let i = 0; i < asistentes.length; i++) {
            if (asistentes[i].correo) {
                var valMail = /\S+@\S+\.\S+/;
                if (valMail.test(asistentes[i].correo)) {
                    //getUsuario
                    //Yisus

                    var password = '';
                    for (let j = 0; j < 10; j++) {
                        password += Math.floor((Math.random() * 10) + 0).toString();
                    }
                    asistentes[i].password = password;

                } else {
                    return res.json(JSON.parse('{"err":"El correo es invalido"}'));
                }

            }

        }
        // console.log(asistentes);
        if (asistentes.length === 1) {

            // console.log(values);
            var queryprepare = "INSERT INTO registro_eventos.registros (nombre, correo, tipo_boleto, password) SELECT * from (SELECT '" + asistentes[0].nombre + "' , '" + asistentes[0].correo + "' as registronew, '" + asistentes[0].tipo_boleto + "' ," + asistentes[0].password + ") as A where registronew not in (SELECT correo from registro_eventos.registros);";
            db(queryprepare, values, (err, result, field) => {
                if (err) throw err;

                return res.json(JSON.parse('{"res":"Se ha realizado la accion exitosamente"}'));
            });
        } else {
            var values = [];
            for (let i = 0; i < asistentes.length; i++) {
                var temp = [asistentes[i].nombre,
                    asistentes[i].correo,
                    asistentes[i].tipo_boleto,
                    asistentes[i].password
                ];
                values.push(temp);
            }
            // console.log(values);
            var queryprepare = "INSERT INTO registro_eventos.registros (nombre, correo, tipo_boleto, password) SELECT * from (";
            for (let i = 0; i < values.length - 1; i++) {
                queryprepare += "SELECT '" + asistentes[i].nombre + "' , '" + asistentes[i].correo + "' as registronew, '" + asistentes[i].tipo_boleto + "' ," + asistentes[i].password + " union ";
            }
            queryprepare += "SELECT '" + asistentes[asistentes.length - 1].nombre + "' , '" + asistentes[asistentes.length - 1].correo + "' , '" + asistentes[asistentes.length - 1].tipo_boleto + "' ," + asistentes[asistentes.length - 1].password + ") as A where registronew not in (SELECT correo from registro_eventos.registros);";
            // console.log(queryprepare);
            db(queryprepare, (err, result, field) => {
                if (err) throw err;

                return res.json(JSON.parse('{"res":"Se ha realizado la accion exitosamente"}'));
            });
        }
    } else {
        return res.json(JSON.parse('{"res":"No se ha ingresado ningun usuario a registrar"}'));
    }

});

module.exports = router;