$(document).ready(function () {
    // create table
    var productionTable = $('#ProductionTable').dataTable({
        lengthMenu: [10, 20, 30, 40, 50],
        responsive: true,
        "processing": true,
        "serverSide": true,
        ajax: {
            "url": "/QualityControlEvents/items",
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
            { "data": "order.product.no", "Ürün İsmi": "Order", "autoWidth": true },
            {
                "data": "order.user",
                "name": "Sorumlu",
                "autoWidth": true,
                "render": function (data, type, row) {
                    return data.name + " " + data.lastname
                }
            },
            {
                "data": "order.startDate",
                "name": "Tarih",
                "render": function (data, row) {
                    return new Date(data).toLocaleString("sv-SE");
                }
            },
            {
                "data": "events",
                "name": "Durum",
                "render": function (data, type, row) {
                    let item = "";
                    data.sort(function (a, b) { return b.status - a.status });
                    let lastEvent = data.find((evnt) => {
                        return evnt.isActive == true
                    });
                    if (lastEvent.status == 0) {
                        item = '<a class="text-primary">Ürün sahadan alındı</a>';
                    } else if (lastEvent.status == 1) {
                        item = '<a class="text-secondary">Ürün kalite dışa bırakıldı</a>';
                    } else if (lastEvent.status == 2) {
                        item = '<a class="text-warning">Ürün kalite içe alındı</a>';
                    } else if (lastEvent.status == 3) {
                        item = "<a>Ürün kalite kontrolü tamamlandı</a>";
                    } else if (lastEvent.status == 4) {
                        item = '<a style="color:darkgreen">Üretime Devam Edildi</a>';
                    } else if (lastEvent.status == 5) {
                        item = '<a style="color:red">Üretim Durduruldu</a>';
                    }
                    else if (lastEvent.status == 6) {
                        item = '<a style="color:#876445">Üretime Devam Etme Kararı Alındı</a>';
                    }
                    return item;
                }
            },
            {
                "data": "id",
                "name": "İncele",
                "render": function (data, type, row) {
                    return `<a class="reportinfopopup" href="#" onclick="eventItemsPopup('${ data }')"><span class="material-icons" >auto_stories</span ></a>`;
                }
            },
        ]
    });


    // setting signalr
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/hub/qualityControlEvents")
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connection.on("Created", function (data) {
        $('#ProductionTable').dataTable().api().ajax.reload(null,false);
    });
    connection.on("Updated", function (data) {
        $('#ProductionTable').dataTable().api().ajax.reload(null, false);
    });
    connection.on("Deleted", function (data) {
        $('#ProductionTable').dataTable().api().ajax.reload(null, false);
    });

    connection.start()
        .catch(error => {
            console.error(error.message)
        });

})