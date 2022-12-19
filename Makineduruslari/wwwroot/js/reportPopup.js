
  function reportPopup (id) {
        console.log('tıklandım')
      let reportId = id;
        $.ajax({
            url: "/Dashboard/ReportPopup?documentId=" + reportId,
            type: 'GET',
            success: function (res) {
                $('body').append(res);
                $('#reportPopup-' + reportId).modal();
                $('.ReportCheck').on('click', function () {
                    let table = $(this).closest(".reportTable")
                    let reportId = $(table).data('id');
                    let status = false;
                    $(table).find('input').each((k, v) => {
                        let val = $(v).is(':checked');
                        if (val == false)
                            status = true;
                    })

                    if (status == false) {
                        $('.continueButton').each((k, v) => {
                            if ($(v).data("id") === reportId) {
                                $(v).prop('disabled', false);
                            }
                        })
                        $('.stopButton').each((k, v) => {
                            if ($(v).data("id") === reportId) {
                                $(v).prop('disabled', true);
                            }
                        })
                    } else {
                        $('.stopButton').each((k, v) => {
                            if ($(v).data("id") === reportId) {
                                $(v).prop('disabled', false);
                            }
                        })
                        $('.continueButton').each((k, v) => {
                            if ($(v).data("id") === reportId) {
                                $(v).prop('disabled', true);
                            }
                        })
                    }
                });
            }
        });
    };