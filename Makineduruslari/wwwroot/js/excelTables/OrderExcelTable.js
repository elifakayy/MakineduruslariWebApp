var globalOrderData;

function createOrderTable(data) {
    console.log("asdas",data)
    var obj = getColumnsandRows(data)
    // check server Orders
    //convertToOrderDtoArray(obj.rows)
    console.log("json:", obj.rows)


    $.ajax({
        type: "POST",
        url: "/OrderSettings/check",
        data: JSON.stringify(obj.rows),
        contentType: "application/json",
        success: (r) => {
            globalOrderData = r;
            console.log("Global Order Data:", globalOrderData)
            let newRows = getServerRows(r)
            console.log(newRows)
            $('#newOrderTableCard').show();
            createTable(obj.columns, newRows);
            console.log(r)
        }
    });
}

function createTable(columns, rows) {
    console.log("OrderTable")
    $('#newOrderTable').dataTable({
        data: rows,
        columns: columns,
        searching: false,
        order: [[5, "desc"]],
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
                        return `<a class="text-success">Eklenecek.</a>`;
                    else if (data == 3)
                        return `<a class="text-secondary">Değişiklik yapılmayacak</a>`;
                    else if (data == 4)
                        return `<a class="text-secondary">Bilgiler doğru değil</a>`;
                    else if (data == 5)
                        return `<a class="text-danger">Kullanıcı bulunamadı</a>`;
                    else if (data == 6)
                        return `<a style="text-danger">Ürün bulunamadı</a>`;
                    else if (data == 7)
                        return `<a style="text-secondary">Tezgah bulunamadı</a>`;
                    else
                        return `<a style="color:#28b983">Not Implemented.</a>`;
                },
                "targets": 6
            }
        ]
    });
}

function getColumnsandRows(data) {
    let columns = [];
    Object.keys(data['0']).forEach((e, a) => {
        if (e === "Stok Kodu" || e === "Stok Adı" || e === "Makina Adı" || e === "Personel" || e === "Tarih" || e === "PersonelId") {
            let newColumn = { title: e };
            columns.push(newColumn)
        }
        
    })
    columns.push({ title: "İşlem" })

    let rows = [];
    data.map(function (item) {
        if (item['Stok Kodu'] != null) {
            renameKey(item, "Stok Kodu", "ProductPartNo")
            renameKey(item, "Stok Adı", "ProductPartName");
            renameKey(item, "Makina Adı", "BenchName");
            renameKey(item, "Personel", "UserNameAndSurname");
            renameKey(item, "Personel Id", "PersonelId");
            renameKey(item, "Tarih", "Date");
            rows.push(item);
        }
        
    })

    return {
        columns: columns,
        rows: rows
    }
}

function convertToOrderDtoArray(data) {
    data.forEach(obj => renameKey(obj, "Stok Kodu", "ProductPartNo"));
    data.forEach(obj => renameKey(obj, "Stok Adı", "ProductPartName"));
    data.forEach(obj => renameKey(obj, "Makina Adı", "BenchName"));
    data.forEach(obj => renameKey(obj, "Personel", "UserNameAndSurname"));
    data.forEach(obj => renameKey(obj, "Tarih", "Date"));
}
function renameKey(obj, oldKey, newKey) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
}

function getServerRows(data) {
    let rows = [];
    var cloneData = JSON.parse(JSON.stringify(data))
    cloneData.map(function (item) {
        delete item.data.status;
        delete item.data.userName;
        delete item.data.password;
        delete item.data.role;
        let newItem = Object.values(item.data)
        newItem.push(item.state);

        rows.push(newItem);
    })
    return rows;
}

function assignOrderChanges() {
    console.log("its works!!!:", globalOrderData);
    $.ajax({
        type: "POST",
        url: "/OrderSettings/assign",
        data: JSON.stringify(globalOrderData),
        contentType: "application/json",
        success: (r) => {
            location.reload();
        }
    });
    $('#warningPopUp').fadeOut();
}