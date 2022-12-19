$(document).ready(function () {
    // setting signalr
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/hub/qualityControlEvents")
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connection.on("InternalScreenRefresh", function (data) {
        console.log("Burdayım")
        console.log("Burdayım:",data)
        location.reload();
    });
    connection.on("*", function (data) {
        console.log("Burdayım")
        console.log("*Burdayım:", data)
        //location.reload();
    });
    connection.on("updated", function (data) {
        console.log("Burdayım")
        console.log("burdayım:", data)
        //location.reload();
    });
    connection.start()
        .catch(error => {
            console.error(error.message)
            console.error(error)
        });
});