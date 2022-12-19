$('#1stScreenBench').selectpicker();
$('#1stScreenBenchDiv .form-control').on('keyup', function (event) {
    if (event.which == 37 || event.which == 38 || event.which == 39 || event.which == 40)
        return;
    $.ajax({
        type: "Get",
        url: "/Benchs/search?search=" + this.value,
        success: (data) => {
            $('#1stScreenBench').html('');
            data.data.forEach((bench) => {
                console.log(bench)
                $('#1stScreenBench').append($('<option>', {
                    value: bench.id,
                    text: bench.code
                }));
            });
            $('#1stScreenBench').selectpicker('refresh');
        },
    })
});


$('#2ndScreenBench').selectpicker();
$('#2ndScreenBenchDiv .form-control').on('keyup', function (event) {
    if (event.which == 37 || event.which == 38 || event.which == 39 || event.which == 40)
        return;
    $.ajax({
        type: "Get",
        url: "/Benchs/search?search=" + this.value,
        success: (data) => {
            $('#2ndScreenBench').html('');
            data.data.forEach((bench) => {
                console.log(bench)
                $('#2ndScreenBench').append($('<option>', {
                    value: bench.id,
                    text: bench.code
                }));
            });
            $('#2ndScreenBench').selectpicker('refresh');
        },
    })
});

$('#3rdScreenBench').selectpicker();
$('#3rdScreenBenchDiv .form-control').on('keyup', function (event) {
    if (event.which == 37 || event.which == 38 || event.which == 39 || event.which == 40)
        return;
    $.ajax({
        type: "Get",
        url: "/Benchs/search?search=" + this.value,
        success: (data) => {
            $('#3rdScreenBench').html('');
            data.data.forEach((bench) => {
                console.log(bench)
                $('#3rdScreenBench').append($('<option>', {
                    value: bench.id,
                    text: bench.code
                }));
            });
            $('#3rdScreenBench').selectpicker('refresh');
        },
    })
});

$('#4thScreenBench').selectpicker();
$('#4thScreenBenchDiv .form-control').on('keyup', function (event) {
    if (event.which == 37 || event.which == 38 || event.which == 39 || event.which == 40)
        return;
    $.ajax({
        type: "Get",
        url: "/Benchs/search?search=" + this.value,
        success: (data) => {
            $('#4thScreenBench').html('');
            data.data.forEach((bench) => {
                console.log(bench)
                $('#4thScreenBench').append($('<option>', {
                    value: bench.id,
                    text: bench.code
                }));
            });
            $('#4thScreenBench').selectpicker('refresh');
        },
    })
});