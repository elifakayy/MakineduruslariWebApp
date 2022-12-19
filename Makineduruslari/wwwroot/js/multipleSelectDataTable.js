$(document).ready(function () {
    var table = $('#dataTable').DataTable();

    $('#dataTable tbody').on('click', 'tr', function () {
        $(this).toggleClass('selected');
        var checkBox = $(this).closest('tr').find('.checkBox');
        console.log("abc:", checkBox);
        checkBox.prop("checked", !checkBox[0].checked);
        setSaveStatus();
    });
    
    $('.checkBox').change(function (e) {
        var row = $(this).closest('tr').first();
        if (row.hasClass('selected')) {
            $(row).removeClass('selected')
        } else {
            $(row).addClass('selected')
        }
        setSaveStatus();
    })
    
    $('input:checkbox').click(function (e) {
        e.stopPropagation();
    })

    function setSaveStatus() {
        var status = $('tr.selected').length > 0
        if (status) {
            $('#popupButton').prop('disabled',false);
        } else {
            $('#popupButton').prop('disabled',true);
        }
    }
});