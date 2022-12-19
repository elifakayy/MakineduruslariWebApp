$(document).ready(function () {
    var table = $('#multiTableItem').DataTable({
        scrollResize: false,
        scrollCollapse: false,
        pageResize: false,
         searching: false,
        "bLengthChange": false,
        pageLength:12
    });
    $('#multiTableItem_info').hide();
    $('#dataTable tbody').on('click', 'tr', function () {
        $(this).toggleClass('selected');
        var checkBox = $(this).closest('tr').find('.checkBox');
        console.log("abc:", checkBox);
        checkBox.prop("checked", !checkBox[0].checked);
        setSaveStatus();
    });
    $('#multiTableItem tbody').on('click', 'tr', function () {
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
            $('#popupButton').prop('disabled', false);
        } else {
            $('#popupButton').prop('disabled', true);
        }
    }

    // table resize
    // table resizing
    var windowsize = $(window).width();
    var windowheight = $(window).height();
    resizeTable(windowsize, windowheight)
    window.addEventListener('resize', function (event) {
        resizeTable($(window).width(), $(window).height())
    }, true);
});

function resizeTable(windowsize, windowheight) {
    console.log("Genişlik:", windowsize)
    console.log("uzunluk:", windowheight)
       if (windowsize < 960 && windowsize > 840 && windowheight > 900) {
        $('#multiTableItem').DataTable().page.len(12).draw();
       } else if (windowsize <= 840 && windowheight > 900) {
        $('#multiTableItem').DataTable().page.len(6).draw();
       }
       else if (windowsize < 960 && windowsize > 840) {
           $('#multiTableItem').DataTable().page.len(8).draw();
       }
       else if (windowsize > 625 && windowsize <= 840) {
           $('#multiTableItem').DataTable().page.len(6).draw();
       } else if (windowsize > 480 && windowsize <= 625 && windowheight>600) {
           $('#multiTableItem').DataTable().page.len(7).draw();
       }
       else if (windowsize > 480 && windowsize <= 625) {
           $('#multiTableItem').DataTable().page.len(3).draw();
       } else if (windowsize <= 480) {
           $('#multiTableItem').DataTable().page.len(2).draw();
       }

}
