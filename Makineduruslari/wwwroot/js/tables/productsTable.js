$(document).ready(function () {
    // creating table
    var ordersTable = $('#productsTable').dataTable({
        lengthMenu: [10, 20, 30, 40, 50],
        responsive: true,
        "processing": true,
        "serverSide": true,
        ajax: {
            "url": "/products/items",
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
            { "data": "no", "name": "Stok No", "autoWidth": true },
            { "data": "name", "name": "İsim", "autoWidth": true },
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