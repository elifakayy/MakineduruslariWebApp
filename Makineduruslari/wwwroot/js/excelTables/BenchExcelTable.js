var globalBenchData;

function createBenchTable(data) {

    var obj = getColumnsandRows(data)
    // check server benchs
    convertToBenchDtoArray(data)
    data.forEach(x => x.serialNumber = x.serialNumber.toString());
    console.log("json:", JSON.stringify(data))


    $.ajax({
        type: "POST",
        url: "/benchSettings/check",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: (r) => {
            globalBenchData = r;
            let newRows = getServerRows(r)
            console.log(newRows)
            $('#newBenchTableCard').show();
            createTable(obj.columns, newRows);
            console.log(r)
        }
    });
}

function createTable(columns, rows) {
    $('#newBenchTable').dataTable({
        data: rows,
        columns: columns,
        searching: false,
        "columnDefs": [
            {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function (data, type, row) {
                    if (data == 0)
                        return `<a class="text-primary">Güncellenecek.</a>`;
                    else if (data == 1)
                        return`<a class="text-danger">Silinecek.</a>`;
                    else if (data == 2)
                        return`<a style="color:#28b983">Eklenecek.</a>`;
                    else if (data == 3)
                       return `<a style="text-secondary">Değişiklik yapılmayacak</a>`;
                    else
                        return`<a style="color:#28b983">Not Implemented.</a>`;
                    return `<a style="color:#28b983">${data}</a>`;
                },
                "targets": 5
            }
        ]
    });
}

function getColumnsandRows(data) {
    let columns = [];
    Object.keys(data['0']).forEach((e, a) => {
        let newColumn = { title: e };
        columns.push(newColumn)
    })
    columns.push({ title: "İşlem" })

    let rows = [];
    data.map(function (item) {
        let newItem = Object.values(item)
        newItem.push("Eklenecek")
        rows.push(newItem);
    })

    return {
        columns: columns,
        rows: rows
    }
}

function convertToBenchDtoArray(data) {
    data.forEach(obj => renameKey(obj, "Tezgah Kodu", "code"));
    data.forEach(obj => renameKey(obj, "Tezgah Adı", "name"));
    data.forEach(obj => renameKey(obj, "Tezgah Tipi", "type"));
    data.forEach(obj => renameKey(obj, "Markası", "brand"));
    data.forEach(obj => renameKey(obj, "Seri No", "serialNumber"));
}
function renameKey(obj, oldKey, newKey) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
}

function getServerRows(data) {
    let rows = [];

    data.map(function (item) {
        delete item.data.status;
        let newItem = Object.values(item.data)
        newItem.push(item.state);
       
        rows.push(newItem);
    })
    return rows;
}

function assignBenchChanges() {
    console.log("its works!!!:", globalBenchData);
    $.ajax({
        type: "POST",
        url: "/benchSettings/assign",
        data: JSON.stringify(globalBenchData),
        contentType: "application/json",
        success: (r) => {
            location.reload();
        }
    });
    $('#warningPopUp').fadeOut();
}