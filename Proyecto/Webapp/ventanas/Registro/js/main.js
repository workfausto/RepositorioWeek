$(function() {
    let correo = document.getElementsByClassName("assistant_email");
    let nombre = document.getElementsByClassName("assistant_name");
    let tipo_boleto = document.getElementsByClassName("assistant_ticket");
    let tableRow = document.querySelectorAll("tr");
    let total = 0;
    //email form-control

    $(".capturar").prop('disabled', true);

    $(document).on("click", ".add", function() {
        let html = '';
        html += '<tr>';
        html += '<td><input type="email" name="assistant_email[]" class="form-control assistant_email"/></td>';
        html += '<td><input type="text" name="assistant_name[]" class="form-control assistant_name"/></td>';
        html += '<td><select name="assistant_ticket[]" class="form-control assistant_ticket">' +
            '<option value="">Selecciona Boleto</option>' +
            '<option value="300">Startup</option>' +
            '<option value="400">Deluxe</option>' +
            '<option value="500">Acceso Total</option>' +
            '<option value="600">Golden Pass</option>' +
            '</select></td>';
        html += '<td><button type="button" name="remove" class="btn btn-sm btn-danger remove">Eliminar</button></td></tr>';

        $(".capturar").prop('disabled', true);
        $(".confirmar").prop('disabled', false);
        if (verificarCampos()) {
            return;
        }

        $("#item_table").append(html);
    });

    function verificarCampos() {
        let variable = false;
        for (let index = 0; index < correo.length; index++) {
            if (correo[index].value === '') {
                correo[index].style.border = "1px solid red";
                variable = true;
            } else if (nombre[index].value === '') {
                nombre[index].style.border = "1px solid red";
                variable = true;
            } else if (tipo_boleto[index].value < 1) {
                tipo_boleto[index].style.border = "1px solid red";
                variable = true;
            } else {
                correo[index].style.border = "1px solid #cccccc";
                nombre[index].style.border = "1px solid #cccccc";
                tipo_boleto[index].style.border = "1px solid #cccccc";
            }
        }
        return variable;
    }

    let registroAsistentes = [];

    function capturar() {
        function Asistente(correo, nombre, tipo_boleto) {
            this.correo = correo;
            this.nombre = nombre;
            this.tipo_boleto = tipo_boleto;
        }

        for (let index = 0; index < correo.length; index++) {
            let asistente = new Asistente(correo[index].value, nombre[index].value,
                tipo_boleto[index].value == 300 ? 'Startup' :
                tipo_boleto[index].value == 400 ? 'Deluxe' :
                tipo_boleto[index].value == 500 ? 'Acceso Total' :
                tipo_boleto[index].value == 600 ? 'Golden Pass' : 'Startup');
            agregarAsistentes(asistente);
        }

        $.ajax({
            url: 'http://127.0.0.1:4000/api/usuarios',
            type: 'POST',
            dataType: 'json',
            data: { registroAsistentes },
            success: function(data, textStatus, xhr) {
                alert("Se insertaron los datos!");
                console.log(registroAsistentes.length);
                while (correo.length != 0) {
                    correo[0].classList.remove('assistant_email');
                    nombre[0].classList.remove('assistant_name');
                    tipo_boleto[0].classList.remove('assistant_ticket');
                    document.getElementsByClassName("remove")[0].classList.remove('remove');

                }
                $(".capturar").prop('disabled', true);
                $("#confirmar").html("Confirmar");
                $(".confirmar").prop('disabled', false);
                registroAsistentes = [];
            },
            error: function(xhr, textStatus, errorThrown) {
                alert('Ha ocurrido un error!');
            }
        });

        $(".add").prop('disabled', false);


    }

    function agregarAsistentes(asistente) {
        registroAsistentes.push(asistente);
    }

    //Eliminar Registro
    $(document).on("click", ".remove", function() {
        $(this).closest("tr").remove();
    });

    //Validaciones al confirmar
    $(".confirmar").on('click', function() {
        if (verificarCampos()) {
            alert("Por favor llene todos los campos requeridos!");
        } else {
            $(".add").prop('disabled', ($("#confirmar").html() === 'Confirmar'));

            $(".capturar").prop('disabled', ($("#confirmar").html() !== 'Confirmar'));
            $(".remove").prop('disabled', ($("#confirmar").html() === 'Confirmar'));
            $(".assistant_email").prop('disabled', ($("#confirmar").html() === 'Confirmar'));
            $(".assistant_ticket").prop('disabled', ($("#confirmar").html() === 'Confirmar'));
            $(".assistant_name").prop('disabled', ($("#confirmar").html() === 'Confirmar'));
            if ($("#confirmar").html() == 'Confirmar') {
                total = 0;
                for (let index = 0; index < tipo_boleto.length; index++) {
                    total += parseFloat(tipo_boleto[index].value);
                }
                $("#total").html("<b>Total:</b> $" + total);

                $("#confirmar").html("Cancelar")
            } else {
                $("#confirmar").html("Confirmar");
                $("#total").html("<b>Total</b> ");
            }
        }
        //$("#total").html("<b>Total:</b> $" + total);
        //$(".capturar").prop('disabled', false);
        //$(".remove").prop('disabled', true);
        //$(".assistant_email").prop('disabled', true);
        //$(".assistant_ticket").prop('disabled', true);
        //$(".assistant_name").prop('disabled', true);
        //$(".confirmar").prop('disabled', true);

    });

    //Validaciones para modificar
    //$(".modificar").on("click", function() {
    //    $(".add").prop('disabled', false);
    //    $(".capturar").prop('disabled', true);
    //    $(".remove").prop('disabled', false);
    //    $(".assistant_email").prop('disabled', false);
    //    $(".assistant_ticket").prop('disabled', false);
    //    $(".assistant_name").prop('disabled', false);
    //    $(".confirmar").prop('disabled', false);
    //});

    $(".limpiar").on("click", function() {
        let valres = '<table class="table" id="item_table">\n' +
            '<tr>' +
            '<th>E-mail</th>\n' +
            '<th>Nombre completo</th>\n' +
            '<th>Boleto</th>\n' +
            '<th><button type="button" name="add" class="btn btn-sm btn-success add">Añadir</button></th>\n' +
            '<tr>\n' +
            '<td><input type="email" name="assistant_email[]" class="email form-control assistant_email" /></td>\n' +
            '<td><input type="text" name="assistant_name[]" class="nombre form-control assistant_name" /></td>\n' +
            '<td><select name="assistant_ticket[]" class="ticket form-control assistant_ticket">\n' +
            '<option value="">Selecciona Boleto</option>\n' +
            '<option value="300">Startup</option>\n' +
            '<option value="400">Deluxe</option>\n' +
            '<option value="500">Acceso Total</option>\n' +
            '<option value="600">Golden Pass</option>\n' +
            '</select>\n' +
            '</td>\n' +
            '</tr>\n' +
            '</tr>\n' +
            '</table>';
        $("#rotorno").html(valres);
        $(".capturar").prop('disabled', true);
        $(".confirmar").prop('disabled', false);
        total = 0;
        for (let index = 0; index < tipo_boleto.length; index++) {
            total += parseFloat(tipo_boleto[index].value);
        }
        $("#confirmar").html("Confirmar");
        $("#total").html("<b>Total</b>");
    });



    //Esto debería ser un submit pero use un click para verificar en consola que los datos se alamcenaban en el array
    $(".capturar").on('click', function(event) {
        event.preventDefault();
        for (let index = 0; index < correo.length; index++) {
            if (correo[index].value === '' || nombre[index].value === '' || tipo_boleto[index].value < 1) {
                alert('Error al llenar el formulario');
                return false;
            }
        }
        capturar();
    });
});