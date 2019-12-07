//Codigo DataTable
$(document).ready(function () {
    $("#tabla").DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "Lo sentimos :( - No se encontraron resgistros",
            "info": "Mostrando _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(Filtrado de _MAX_ registros en total)",
            "sSearch": "Buscar: ",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Procesando"
        },
        "ajax": "http://127.0.0.1:4000/api/usuarios/fix",
        "columns": [
            { "data": "nombre" },
            { "data": "correo" },
            { "data": "tipo_boleto" }
        ]
    });
});