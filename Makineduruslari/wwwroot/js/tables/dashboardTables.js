$.extend(true, $.fn.dataTable.defaults, {
    "searching": true,
});

$(document).ready(function () {
    let notAnsweredTable = $('#WaitingReportsTable').dataTable({
        lengthMenu: [10, 20, 30, 40, 50],
        responsive: true,
        "processing": true,
        "serverSide": true,
        ajax: {
            "url": "/waitingDocuments",
            "type": "POST",
            "datatype":"json"
        },
        "columns": [
            { "data": "partName", "name": "Part No", "autoWidth": true },
            { "data": "order", "name": "Order", "autoWidth": true },
            { "data": "drawingNo", "name": "Drawing No", "autoWidth": true },
            { "data": "cmm", "name": "CMM", "autoWidth": true },
            {
                "data": "dateAndTime",
                "name": "Date",
                "render": function (data, row) {
                   // let date = new Date(data);
                    return new Date(data).toLocaleString("sv-SE");

                }
            },
            {
                "data": "id",
                "name": "İncele",
                "render": function (data, row) {
                    let date = new Date(data);
                    return `<a class="reportpopup" href="#" onclick="reportPopup('${data}')"><span class="material-icons" >auto_stories</span ></a>`
                }
            },


           
        ]


    });
    let ManuelReportsTable = $('#ManuelReportsTable').dataTable({
        lengthMenu: [10, 20, 30, 40, 50],
        responsive: true,
        "processing": true,
        "serverSide": true,
        ajax: {
            "url": "/ManuelDocuments",
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
            { "data": "partName", "name": "Part No", "autoWidth": true },
            { "data": "order", "name": "Order", "autoWidth": true },
            { "data": "drawingNo", "name": "Drawing No", "autoWidth": true },
            { "data": "cmm", "name": "CMM", "autoWidth": true },
            {
                "data": "dateAndTime",
                "name": "Date",
                "render": function (data, row) {
                    // let date = new Date(data);
                    return new Date(data).toLocaleString("sv-SE");
                }
            },
            {
                "data": "id",
                "name": "İncele",
                "render": function (data, row) {
                    let date = new Date(data);
                    return `<a class="reportpopup" href="#" onclick="answeredReportPopup('${data}')"><span class="material-icons" >auto_stories</span ></a>`

                }
            },



        ]


    });
    
    let stopAnsweredTable = $('#RejectedReportsTable').dataTable({
        lengthMenu: [10, 20, 30, 40, 50],
        responsive: true,
        "processing": true,
        "serverSide": true,
        ajax: {
            "url": "/RejectedDocuments",
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
            { "data": "partName", "name": "Part No", "autoWidth": true },
            { "data": "order", "name": "Order", "autoWidth": true },
            { "data": "drawingNo", "name": "Drawing No", "autoWidth": true },
            { "data": "cmm", "name": "CMM", "autoWidth": true },
            {
                "data": "dateAndTime",
                "name": "Date",
                "render": function (data, row) {
                    // let date = new Date(data);
                    return new Date(data).toLocaleString("sv-SE");

                }
            },
            {
                "data": "confirmingUser",
                "name": "Reddeten",
                "render": function (data, row) {
                    let retdata;
                    if (data) {
                        retdata = data.name +" "+ data.lastname;
                    } else {
                        retdata = "Sistem";
                    }
                    return retdata;

                }
            },
            {
                "data": "id",
                "name": "İncele",
                "render": function (data, row) {
                    let date = new Date(data);
                    return `<a class="reportpopup" href="#" onclick="answeredReportPopup('${data}')"><span class="material-icons" >auto_stories</span ></a>`

                }
            },




        ]




    });
    let ContinueAnsweredTable = $('#ConfirmedReportsTable').dataTable({
        lengthMenu: [10, 20, 30, 40, 50],
        responsive: true,
         "processing": true,
        "serverSide": true,
        ajax: {
            "url": "/ConfirmedDocuments",
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
            { "data": "partName", "name": "Part No", "autoWidth": true },
            { "data": "order", "name": "Order", "autoWidth": true },
            { "data": "drawingNo", "name": "Drawing No", "autoWidth": true },
            { "data": "cmm", "name": "CMM", "autoWidth": true },
            {
                "data": "dateAndTime",
                "name": "Date",
                "render": function (data, row) {
                    // let date = new Date(data);
                    return new Date(data).toLocaleString("sv-SE");

                }
            },
            {
                "data": "confirmingUser",
                "name": "Onaylayan",
                "render": function (data, row) {;
                    let retdata;
                    if (data) {
                        retdata = data.name + " " + data.lastname;
                    } else {
                        retdata = "Sistem";
                    }
                    return retdata;

                }
            },
            {
                "data": "id",
                "name": "İncele",
                "render": function (data, row) {
                    return `<a class="reportpopup" href="#" onclick="answeredReportPopup('${data}')"><span class="material-icons" >auto_stories</span ></a>`

                }
            },
            



        ]



    });

    function gfg_Run(data) {
        let date = new Date(data);
        var str =
            ("00" + (date.getMonth() + 1)).slice(-2)
            + "/" + ("00" + date.getDate()).slice(-2)
            + "/" + date.getFullYear() + " "
            + ("00" + date.getHours()).slice(-2) + ":"
            + ("00" + date.getMinutes()).slice(-2)
            + ":" + ("00" + date.getSeconds()).slice(-2);
        return str;
    }


    // setting signalr
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/hub/documents")
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connection.on("Created", function (data) {
        $('#WaitingReportsTable').dataTable().api().ajax.reload(null, false);
        $('#ManuelReportsTable').dataTable().api().ajax.reload(null, false);
        $('#RejectedReportsTable').dataTable().api().ajax.reload(null, false);
        $('#ConfirmedReportsTable').dataTable().api().ajax.reload(null, false);
    });
    connection.on("Updated", function (data) {
        $('#WaitingReportsTable').dataTable().api().ajax.reload(null, false);
        $('#ManuelReportsTable').dataTable().api().ajax.reload(null, false);
        $('#RejectedReportsTable').dataTable().api().ajax.reload(null, false);
        $('#ConfirmedReportsTable').dataTable().api().ajax.reload(null, false);
    });
    connection.on("Deleted", function (data) {
        $('#WaitingReportsTable').dataTable().api().ajax.reload(null, false);
        $('#ManuelReportsTable').dataTable().api().ajax.reload(null, false);
        $('#RejectedReportsTable').dataTable().api().ajax.reload(null, false);
        $('#ConfirmedReportsTable').dataTable().api().ajax.reload(null, false);
    });

    connection.start()
        .catch(error => {
            console.error(error.message)
        });
})