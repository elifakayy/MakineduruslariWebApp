$(document).ready(function () {

    var table = $('#PersonelTable').dataTable({
        dom: "<'row mb-3'<'col-md-4 mb-3 mb-md-0'l><'col-md-8 text-right'<'d-flex justify-content-end'fB>>>t<'row align-items-center'<'mr-auto col-md-6 mb-3 mb-md-0 mt-n2 'i><'mb-0 col-md-6'p>>",
        lengthMenu: [10, 20, 30, 40, 50],
        responsive: true,
        buttons: [{
            customize: function (win) {
                $(win.document.body).find('h1').text(tableHeader);
            }
        },
        ],
        "processing": true,
        "serverSide": true,
        ajax: {
            "url": "/Users/items",
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
            { "data": "cardNo", "name": "Sicl No", "autoWidth": true },
            { "data": "name", "name": "İsim", "autoWidth": true },
            { "data": "lastname", "name": "Soyisim", "autoWidth": true },
            { "data": "role", "name": "Role", "autoWidth": true },
            { "data": "department", "name": "Departman", "autoWidth": true },
            { "data": "accountCode", "name": "Hesap Kodu", "autoWidth": true },
        ]
    });

    // setting signalr
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/hub/users")
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connection.on("Created", function (data) {
        $('#PersonelTable').dataTable().api().ajax.reload(null, false);
    });
    connection.on("Updated", function (data) {
        $('#PersonelTable').dataTable().api().ajax.reload(null, false);
    });
    connection.on("Deleted", function (data) {
        $('#PersonelTable').dataTable().api().ajax.reload(null, false);
    });

    connection.start()
        .catch(error => {
            console.error(error.message)
        });
})