var globalUserData;

function createUserTable(data) {

    var obj = getColumnsandRows(data)
    // check server users
    convertToUserDtoArray(data)
    data.forEach(x => x.cardNo = x.cardNo.toString());
    console.log("json:", JSON.stringify(data))


    $.ajax({
        type: "POST",
        url: "/userSettings/check",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: (r) => {
            globalUserData = r;
            console.log("Global User Data:", globalUserData)
            let newRows = getServerRows(r)
            console.log(newRows)
            $('#newUserTableCard').show();
            createTable(obj.columns, newRows);
            console.log(r)
        }
    });
}

function createTable(columns, rows) {
    console.log("userTable")
    $('#newUserTable').dataTable({
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

function convertToUserDtoArray(data) {
    data.forEach(obj => renameKey(obj, "Personel Sicil No", "cardNo"));
    data.forEach(obj => renameKey(obj, "Personel İsim", "Name"));
    data.forEach(obj => renameKey(obj, "Personel Soyisim", "Lastname"));
    data.forEach(obj => renameKey(obj, "Departman", "department"));
    data.forEach(obj => renameKey(obj, "Hesap Kodu", "accountCode"));
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

function assignUserChanges() {
    console.log("its works!!!:", globalUserData);
    $.ajax({
        type: "POST",
        url: "/userSettings/assign",
        data: JSON.stringify(globalUserData),
        contentType: "application/json",
        success: (r) => {
            location.reload();
        }
    });
    $('#warningPopUp').fadeOut();
}