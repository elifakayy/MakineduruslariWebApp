var globalProductData;

function createProductTable(data) {

    var obj = getColumnsandRows(data)
    // check server Products
    convertToProductDtoArray(data)
    console.log("json:", JSON.stringify(data))


    $.ajax({
        type: "POST",
        url: "/ProductSettings/check",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: (r) => {
            globalProductData = r;
            console.log("Global Product Data:", globalProductData)
            let newRows = getServerRows(r)
            console.log(newRows)
            $('#newProductTableCard').show();
            createTable(obj.columns, newRows);
            console.log(r)
        }
    });
}

function createTable(columns, rows) {
    console.log("ProductTable")
    $('#newProductTable').dataTable({
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
                        return `<a class="text-danger">Silinecek.</a>`;
                    else if (data == 2)
                        return `<a style="color:#28b983">Eklenecek.</a>`;
                    else if (data == 3)
                        return `<a style="text-secondary">Değişiklik yapılmayacak</a>`;
                    else
                        return `<a style="color:#28b983">Not Implemented.</a>`;
                    return `<a style="color:#28b983">${data}</a>`;
                },
                "targets": 2
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

function convertToProductDtoArray(data) {
    data.forEach(obj => renameKey(obj, "Stok Kodu", "no"));
    data.forEach(obj => renameKey(obj, "Stok Adı", "name"));

}
function renameKey(obj, oldKey, newKey) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
}

function getServerRows(data) {
    let rows = [];
    var cloneData = JSON.parse(JSON.stringify(data))
    cloneData.map(function (item) {
        let newItem = Object.values(item.data)
        newItem.push(item.state);

        rows.push(newItem);
    })
    return rows;
}

function assignProductChanges() {
    console.log("its works!!!:", globalProductData);
    $.ajax({
        type: "POST",
        url: "/ProductSettings/assign",
        data: JSON.stringify(globalProductData),
        contentType: "application/json",
        success: (r) => {
            location.reload();
        }
    });
    $('#warningPopUp').fadeOut();
}