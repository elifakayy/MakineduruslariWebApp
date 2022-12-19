(function ($) {

    $('#confirm-submit').on('shown.bs.modal', function () {
        $('#CardNo').focus();
    })

    $('#confirm-submit').on('click', function () {
        $('#CardNo').focus();
    })

    $('#CardNo').keypress(function (e) {
        if (e.keyCode == 13) {
            console.log("1");
            input = document.getElementById('CardNo').value;
            console.log("input:" + input);
            //event.preventDefault(); //to make sure form doesn't submit on enter
           // if (input.length == 9)
           // {
                $('#selectForm').submit();
           // }
           // else
           /* {
                console.log(document.getElementById('instructionText').innerHTML);
                document.getElementById('instructionText').innerHTML = '<a class="text-danger">Lütfen geçerli bir kart okutunuz</a>';

                $('#CardNo').val('');
                $('#CardNo').focus();  
            }*/
        }
        else {
            $('#confirm-submit').on('shown.bs.modal', function () {
                $('#CardNo').focus();
            })
        }
    });


})(jQuery)