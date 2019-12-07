function actualizacion() {
    var tipo = getCookie("tipousuario");
    var user = getCookie("usuario");
    if (tipo === "Administrador") {
        eliminarcookies();
        $.ajax({
            url: 'http://127.0.0.1:4000/api/user/actualizaradmin',
            type: 'POST',
            dataType: 'json',
            data: {
                usuario: user,
                newcontrasenia: $('#newpass').val(),
                newusuario: $('#username').val()
            },
            success: function(data, textStatus, xhr) {

            },
            error: function(xhr, textStatus, errorThrown) {
                alert('Ha ocurrido un error!');
            }
        });
    } else {
        eliminarcookies();
        $.ajax({
            url: 'http://127.0.0.1:4000/api/user/actualizar',
            type: 'POST',
            dataType: 'json',
            data: {
                usuario: user,
                newcontrasenia: $('#newpass').val(),
                newusuario: $('#email').val()
            },
            success: function(data, textStatus, xhr) {
                eliminarcookies();
            },
            error: function(xhr, textStatus, errorThrown) {
                alert('Ha ocurrido un error!');
            }
        });
    }
}

function eliminarcookies() {
    document.cookie = "usuario= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "tipousuario= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    location.reload();
}


function cargadatos() {
    var tipo = getCookie("tipousuario");
    var user = getCookie("usuario");
    if (tipo === "Administrador") {

        $.ajax({
            url: 'http://127.0.0.1:4000/api/user/cargaradmin',
            type: 'POST',
            dataType: 'json',
            data: {
                usuario: user,
            },

            success: function(data, textStatus, xhr) {
                $('#username').val(data[0].data.idusuarios);
            },
            error: function(xhr, textStatus, errorThrown) {
                alert('Ha ocurrido un error!');
            }
        });
    } else {
        $.ajax({
            url: 'http://127.0.0.1:4000/api/user/cargar',
            type: 'POST',
            dataType: 'json',
            data: {
                usuario: user,
            },
            success: function(data, textStatus, xhr) {
                $('#email').val(data[0].data.correo);
            },
            error: function(xhr, textStatus, errorThrown) {
                alert('Ha ocurrido un error!');
            }
        });
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function checkCookie() {
    var user = getCookie("usuario");
    var tipo = getCookie("tipousuario");
    console.log(user + tipo);
    if (user != "" && tipo != "") {
        if (tipo === "Startup" || tipo === "Deluxe" || tipo === "Acceso Total" || tipo === "Golden Pass") {
            $("#usuario").empty();
            cargadatos();
        }
        if (tipo === "Administrador") {
            $("#correo").empty();
            cargadatos();
        }
    } else {
        window.location.href = "../../login.html";
    }
}