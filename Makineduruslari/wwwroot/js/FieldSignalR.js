$(document).ready(function () {
    // setting signalr
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/hub/benchs")
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connection.on("Production.Stopped", function (data) {
        location.reload();
    });

    connection.start()
        .catch(error => {
            console.error(error.message)
            console.error(error)
        });

    const connection2 = new signalR.HubConnectionBuilder()
        .withUrl("/hub/orders")
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connection2.on("Created", function (data) {
        location.reload();
    });
    connection2.start()
        .catch(error => {
            console.error(error.message)
            console.error(error)
        });
});