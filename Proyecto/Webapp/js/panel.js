$(document).ready(function() {
    llenarUsuario();
    checkmodal();
});

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

function eliminarcookies() {
    document.cookie = "usuario= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "tipousuario= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    location.reload();
}

function checkCookie() {
    var user = getCookie("usuario");
    var tipo = getCookie("tipousuario");

    if (user != "" && tipo != "") {
        if (tipo === "Startup" || tipo === "Deluxe" || tipo === "Acceso Total" || tipo === "Golden Pass") {
            visibleUsuario();
        }
        if (tipo === "Administrador") {
            visibleAdmin();
        }
    } else {
        window.location.href = "/login.html";
    }
}

function listaevent() {
    cargarIframe("/ventanas/ListaEventbride/Listaevent.html");
    $("#barra")[0].scrollIntoView(true);
}

function Registro() {
    cargarIframe("/ventanas/Registro/asistentes.html");
    $("#barra")[0].scrollIntoView(true);
}


function RegistroAsistencia() {
    cargarIframe("/ventanas/Registro/registrados.html");
    $("#barra")[0].scrollIntoView(true);
}



function visibleUsuario() {
    espacio();
    var constancia = '<div class="card br-light text-center" id="constancia"  >' +
        '<img class="card-img-top w-50 " src="images/constacia.png" alt="Card image cap"> <div class="card-body">' +
        ' <h5 class="card-title">Constancias</h5>' +
        '<p class="card-text">Generador de constancias</p>' +
        '<button  class="btn btn-light" style="background: #c850c0 !important;">ir a las constacias</button >' +
        '</div>' +
        '</div>';
    var Horarios = '<div class="card bg-light text-center" id="Horarios">' +
        ' <img class="card-img-top w-50 " src="images/horario.jpg" alt="Card image cap"><div class="card-body">' +
        '<h5 class="card-title">Horarios</h5>' +
        '<p class="card-text">Horario de los eventos</p>' +
        '<button   class="btn btn-light"  style="background: #c850c0 !important;">ir al Horario</button >' +
        '</div>' +
        '</div>';
    var usuario = '<div class="card bg-light text-center" id="usuario" style=" background: #c850c0;">' +
        ' <img class="card-img-top w-50 " src="images/usuario.png" alt="Card image cap"> <div class="card-body">' +
        '<h5 class="card-title">usuario</h5>' +
        '<p class="card-text">Administrar usuario</p>' +
        '<button  class="btn btn-light" data-toggle="modal" data-target="#exampleModal" style="background: #c850c0 !important;">ACCEDER</button>' +
        '</div>' +
        '</div>';
    $("#chargeCards").append(constancia + Horarios + usuario);

}

function espacio() {
    $("#espacio").empty();
    $("#espacio").append('<br><br><br><br>');
}

function visibleAdmin() {
    espacio();
    var Registro = '<div class="card text-black bg-light text-center" id="registro" >' +
        ' <img class="card-img-top w-50" src="images/registrar.png" alt="Card image cap"> <div class="card-body">' +
        ' <h5 class="card-title">Registro</h5>' +
        '<p class="card-text">Registro para el evento</p>' +
        '<button onclick="Registro()" class="btn btn btn-light "  style="background: #c850c0 !important;">ACCEDER</button>' +
        '</div>' +
        '</div>';
    var RegistroAsistencia = '<div class="card text-white bg-primary text-center" id="registroAsistencia" >' +
        '<img class="card-img-top" src="images/lista.png" alt="Card image cap"><div class="card-body">' +
        ' <h5 class="card-title">Asistencia</h5>' +
        '<p class="card-text">Asistencia para el evento</p>' +
        '<button onclick="RegistroAsistencia()" class="btn  btn-light" style="background: #c850c0 !important;">ACCEDER</button>' +
        '</div>' +
        '</div>';
    var Event = '<div class="card text-black bg-light text-center" id="eventbride">' +
        '<img class="card-img-top" src="images/event.png" alt="Card image cap"><div class="card-body">' +
        '<h5 class="card-title">Lista eventbride</h5>' +
        '<p class="card-text">Lista de los Registrados por Eventbride</p>' +
        '<button onclick="listaevent()" class="btn btn-light" style="background: #c850c0 !important;">ir a la Lista</button>' +
        '</div>' +
        '</div>';
    $("#chargeCards").append(Registro + RegistroAsistencia + Event);
    visibleUsuario();
}

function createIframe() {
    var iframe = '<iframe id="cargado" width="100%" height="100%" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    $("#iframeform").append(iframe);
}

function cargarIframe(url) {
    createIframe();
    eliminado();
    RegresoCards();
    $('#cargado').attr('src', url);

}

function eliminado() {
    $("#chargeCards").empty();
    $("#espacio").empty();
}

function RegresoCards() {
    var bread = '<nav aria-label="breadcrumb"><ol class="breadcrumb col-2" style="position: absolute;top: 100px; left: 20px; right: 10px; min-width:118px"><li class="breadcrumb-item  btn btn-success col-12" aria-current="page" onclick="location.reload();">Regresar</li></ol></nav>';
    $("#espacio").append(bread);
}

function llenarUsuario() {
    var user = getCookie("usuario");
    $("#navbarDropdown").append(user);
}


function actualizacion() {
    var tipo = getCookie("tipousuario");
    var user = getCookie("usuario");
    if (tipo === "Administrador") {
        $.ajax({
            url: 'http://127.0.0.14000/api/user/actualizaradmin',
            type: 'POST',
            dataType: 'json',
            data: {
                usuario: user,
                newcontrasenia: $('#newpass').val(),
                newusuario: $('#usernamemodal').val()
            },
            success: function(data, textStatus, xhr) {
                alert("se a actualizado el usuario");
                eliminarcookies();
            },
            error: function(xhr, textStatus, errorThrown) {
                notificacion('Ha ocurrido un error!', "", "error");
            }
        });
    } else {

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
                alert("se a actualizado el usuario");
                eliminarcookies();
            },
            error: function(xhr, textStatus, errorThrown) {
                notificacion('Ha ocurrido un error!', "", "error");
            }
        });
    }
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
                $('#usernamemodal').val(data[0].data.idusuarios);
            },
            error: function(xhr, textStatus, errorThrown) {
                notificacion('Ha ocurrido un error!', "", "error");
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
                $('#emailmodal').val(data[0].data.correo);
            },
            error: function(xhr, textStatus, errorThrown) {
                notificacion('Ha ocurrido un error!', "", "error");
            }
        });
    }
}


function checkmodal() {
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


function notificacion(titulo, texto, typo) {
    Swal.fire(
        titulo,
        texto,
        typo
    )
}