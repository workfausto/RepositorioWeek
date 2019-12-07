$(document).ready(function() {
    ifCheck();
});

function ifCheck() {
    creado();
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
    if (user != "" && tipo != "") {
        window.location.href = "/panel.html";
    }
}

function validado(usuario, pass) {
    if (usuario.length == 0 || pass.length == 0) {
        alert("ingrese los datos necesarios");
        return false;
    }
    return true;
}

function login() {
    console.log('login');
    if ($('#CheckAdmin').prop("checked") == true) {
        if (validado($('#txtUsuario').val(), $('#txtPassWord').val()) == false) {
            return;
        }
        $.ajax({
            url: 'http://127.0.0.1:4000/api/login/admin',
            type: 'POST',
            dataType: 'json',
            data: {
                usuario: $('#txtUsuario').val(),
                contrasenia: $('#txtPassWord').val()
            },
            success: function(data, textStatus, xhr) {
                console.log(data);
                var now = new Date();
                now.setTime(now.getTime() + 1 * 3600 * 1000);
                document.cookie = "usuario = " + data[0].data.idusuarios + " ; expires=" + now.toUTCString() + "; path=/";
                document.cookie = "tipousuario =" + "Administrador" + " ; expires=" + now.toUTCString() + "; path=/";
                window.location.href = "/panel.html";
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log(errorThrown);
                alert('Ha ocurrido un error!');
            }
        });
    } else {
        if (validado($('#txtUsuarioCorreo').val(), $('#txtPassWord').val()) == false) {
            return;
        }
        $.ajax({
            url: 'http://127.0.0.1:4000/api/login',
            type: 'POST',
            dataType: 'json',
            data: {
                usuario: $('#txtUsuarioCorreo').val(),
                contrasenia: $('#txtPassWord').val()
            },
            success: function(data, textStatus, xhr) {
                console.log(data);
                var now = new Date();
                now.setTime(now.getTime() + 1 * 3600 * 1000);
                document.cookie = "usuario =" + data[0].data.correo + " ; expires=" + now.toUTCString() + "; path=/";
                document.cookie = "tipousuario = " + data[0].data.tipo_boleto + " ; expires=" + now.toUTCString() + "; path=/";
                window.location.href = "/panel.html";
            },
            error: function(xhr, textStatus, errorThrown) {
                alert('Ha ocurrido un error!');
            }
        });
    }
}

function eliminado() {
    $("#username").empty();
}

function creado() {
    eliminado();
    if ($('#CheckAdmin').prop("checked") == true) {
        var adm = '<div  data-validate="el Usuario es necesaria" id="idusuario">' +
            '<span class="label-input100">Usuario</span>' +
            '<input id="txtUsuario" class="input100 " type="text" placeholder="Ingresar Usuario">' +
            '<span class="focus-input100"></span>' +
            '</div>';
        $("#username").append(adm);
    } else {
        var correo = '<div  data-validate="el Correo es necesaria" id="Correo">' +
            '<span class="label-input100">Correo</span>' +
            '<input id="txtUsuarioCorreo" type="email" class="input100 w-100" type="text" placeholder="Ingresar Correo">' +
            '<span class="focus-input100"></span>' +
            '</div>';
        $("#username").append(correo);
    }



}
