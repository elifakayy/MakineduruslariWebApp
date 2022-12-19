$(document).ready(function () {

    var table = $('#BenchsTable').dataTable({
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
            "url": "/Benchs/items",
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
            { "data": "code", "name": "Kod", "autoWidth": true },
            { "data": "name", "name": "Adı", "autoWidth": true },
            { "data": "type", "name": "Tezgah Tipi", "autoWidth": true },
            { "data": "brand", "name": "Markası", "autoWidth": true },
            { "data": "serialNumber", "name": "Seri No", "autoWidth": true },
            {
                "data": "status",
                "name": "Durum",
                "autoWidth": true,
                "render": function (data, type, row) {
                    if (data == true) {
                        return 'Çalışıyor'
                    } else if (data == false) {
                        return 'Durdu'
                    } else {
                        return 'Bilinmiyor'
                    }
                }
            },
        ]
    });

    // setting signalr
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/hub/benchs")
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connection.on("Created", function (data) {
        $('#BenchsTable').dataTable().api().ajax.reload(null, false);
    });
    connection.on("Updated", function (data) {
        $('#BenchsTable').dataTable().api().ajax.reload(null, false);
    });
    connection.on("Deleted", function (data) {
        $('#BenchsTable').dataTable().api().ajax.reload(null, false);
    });

    connection.start()
        .catch(error => {
            console.error(error.message)
        });
})