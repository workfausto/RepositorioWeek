$(document).ready(function() {


    /*var tabla = " <table>";*/
    $('#button').click(function() {
        $.ajax({
            url: 'http://127.0.0.1:4000/api/listaEventos',
            type: 'GET',
            dataType: 'json',
            success: function(data, textStatus, xhr) {
                datoslistar = data.attendees;
                generar_abla2(data);


            },
            error: function(xhr, textStatus, errorThrown) {
                alert('Ha ocurrido un error!');
            }
        });
        /* $.get('http://localhost:80/request', function(list) {
             console.log(list);
             console.log("hola");
         });*/
    });

    $('#buttonpost').click(function() {
        if (datoslistar.length > 0) {
            $.ajax({
                url: 'http://127.0.0.1:4000/api/listaEventos',
                type: 'post',
                dataType: 'json',
                data: {
                    Lista: datoslistar
                },
                success: function(data, textStatus, xhr) {
                    console.log(data);
                },
                error: function(xhr, textStatus, errorThrown) {
                    alert('Ha ocurrido un error!');
                }
            });

        }
        /* $.get('http://localhost:80/request', function(list) {
             console.log(list);
             console.log("hola");
         });*/
    });

    /*function generar_abla(data) {
        document.getElementById("response").innerHTML = "";
        var body = document.getElementById("response");

        // Crea un elemento <table> y un elemento <tbody>
        var tabla = document.createElement("table");
        var tblBody = document.createElement("tbody");
        //crea los titulos
        var titulos = document.createElement("tr");
        for (var i = 0; i < 3; i++) {
            var celdas = document.createElement("th");
            if (i === 0) {
                celdas.appendChild(document.createTextNode("Nombre Completo"));
            } else if (i === 1) {
                celdas.appendChild(document.createTextNode("Email"));
            } else {
                celdas.appendChild(document.createTextNode("Tipo Boleto"));
            }
            titulos.appendChild(celdas);

        }
        tblBody.appendChild(titulos);

        // Crea las celdas
        for (var i = 0; i < data.attendees.length; i++) {
            // Crea las hileras de la tabla
            var hilera = document.createElement("tr");

            for (var j = 0; j < 3; j++) {
                // Crea un elemento <td> y un nodo de texto, haz que el nodo de
                // texto sea el contenido de <td>, ubica el elemento <td> al final
                // de la hilera de la tabla
                var celda = document.createElement("td");
                var textoCelda;
                if (j === 0) {
                    textoCelda = document.createTextNode(data.attendees[i].profile.name);
                } else if (j === 1) {
                    textoCelda = document.createTextNode(data.attendees[i].profile.email);
                } else {
                    textoCelda = document.createTextNode(data.attendees[i].ticket_class_name);
                }
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            }
            // agrega la hilera al final de la tabla (al final del elemento tblbody)
            tblBody.appendChild(hilera);
        }
        // posiciona el <tbody> debajo del elemento <table>
        tabla.appendChild(tblBody);
        // appends <table> into <body>
        body.appendChild(tabla);


    }
*/
});

function generar_abla2(data) {
    $('#response').empty();
    var titulos = '<thead><tr class="table100-head"><th class="column3">Nombre Completo</th><th class="column3">Email</th><th class="column2">Tipo Boleto</th></tr></thead>';
    var body = '<tbody>';
    // Crea las celdas
    for (var i = 0; i < data.attendees.length; i++) {
        // Crea las hileras de la tabla
        body += '<tr>';

        for (var j = 0; j < 3; j++) {
            // Crea un elemento <td> y un nodo de texto, haz que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            if (j === 0) {
                body += '<td class="column3">';
                body += data.attendees[i].profile.name;
                body += '</td>';
            } else if (j === 1) {
                body += '<td class="column3">';
                body += data.attendees[i].profile.email;
                body += '</td>';
            } else {
                body += '<td class="column2">';
                body += data.attendees[i].ticket_class_name;
                body += '</td>';
            }
        }
        body += '</tr>';
    }
    body += '</tbody>';
    $('#response').append(titulos + body);
}

var datoslistar = "";