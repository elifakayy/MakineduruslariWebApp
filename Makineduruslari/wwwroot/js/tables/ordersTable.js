$(document).ready(function () {
    // creating table
    var ordersTable = $('#ordersTable').dataTable({
        lengthMenu: [10, 20, 30, 40, 50],
        responsive: true,
        "processing": true,
        "serverSide": true,
        ajax: {
            "url": "/Orders/items",
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
            { "data": "product.no", "name": "Part No", "autoWidth": true },
            { "data": "bench.code", "name": "Bench", "autoWidth": true },
            {
                "data": "user",
                "name": "Personel",
                "autoWidth": true,
                "render": function (data, type, row) {
                    return data.name+" "+ data.lastname;
                }
            },
            {
                "data": "startDate",
                "name": "Başlangıç Tarihi",
                "autoWidth": true,
                "render": function (data, row) {
                    return new Date(data).toLocaleString("sv-SE");
                }
            },
            {
                "data": "endDate",
                "name": "Bitiş Tarihi",
                "autoWidth": true,
                "render": function (data, row) {
                    return new Date(data).toLocaleString("sv-SE");
                }
            }
        ]
    });

    // setting signalr
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/hub/orders")
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connection.on("Created", function (data) {
        $('#ordersTable').dataTable().api().ajax.reload(null, false);
    });
    connection.on("Updated", function (data) {
        $('#ordersTable').dataTable().api().ajax.reload(null, false);
    });
    connection.on("Deleted", function (data) {
        $('#ordersTable').dataTable().api().ajax.reload(null, false);
    });

    connection.start()
        .catch(error => {
            console.error(error.message)
        });

})