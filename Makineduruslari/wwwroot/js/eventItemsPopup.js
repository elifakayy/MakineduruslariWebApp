
function eventItemsPopup(id) {
    console.log('tıklandım')
    $.ajax({
        url: "/QualityControlEvents/EventItemsPopup?eventId=" + id,
        type: 'GET',
        success: function (res) {
            $('body').append(res);
            $('#eventItemsPopup-'+id).modal();
        }
    });
};