import "inputmask/lib/jquery.inputmask.js";
import "inputmask/lib/extensions/inputmask.date.extensions.js";

$(document).ready(function(){
    let maskedDateInputs = $(".date-mask");
    maskedDateInputs.inputmask({
        alias: 'datetime',
        inputFormat: 'dd.mm.yyyy',
        placeholder: 'ДД.ММ.ГГГГ'
    });
})