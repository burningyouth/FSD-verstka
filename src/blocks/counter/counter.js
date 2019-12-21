$(document).ready(function(){
    let buttons = $(".counter__handler"),
        counters = $(".counter__input");

    function refreshClasses(button, max, min, val, needRefreshSecond = true){
        let secondButton;
        if (button.hasClass('counter__handler_minus')){
            secondButton = button.parent().find('.counter__handler.counter__handler_plus');
            if (val == min){
                button.addClass('counter__handler_disabled');
            }else if (val > min){
                button.removeClass('counter__handler_disabled');
            }
        }else if (button.hasClass('counter__handler_plus')){
            secondButton = button.parent().find('.counter__handler.counter__handler_minus');
            if(val == max){
                button.addClass('counter__handler_disabled');
            }else if (val < max){
                button.removeClass('counter__handler_disabled');
            }
        }
        if(secondButton && needRefreshSecond){
            refreshClasses(secondButton, max, min, val, false);
        }
    }

    counters.each(function(key, input){
        let buttonInitial = $(input).parent().find('.counter__handler.counter__handler_minus'),
            max = $(input).attr('max') ? parseInt($(input).attr('max')) : Infinity,
            min = $(input).attr('min') ? parseInt($(input).attr('min')) : -Infinity,
            val = parseInt($(input).val());
        refreshClasses(buttonInitial, max, min, val);

        $(input).data('last-value', val);
    });

    counters.change(function(e){
        let counter = $(this),
            buttonMinus = $(this).parent().find('.counter__handler.counter__handler_minus'),
            max = counter.attr('max') ? parseInt(counter.attr('max')) : Infinity,
            min = counter.attr('min') ? parseInt(counter.attr('min')) : -Infinity,
            val = parseInt(counter.val());
        
        counter.data('last-value', val);

        refreshClasses(buttonMinus, max, min, val);
    });

    buttons.on('click touch', function (e) {

        e.preventDefault();

        let counter = $(this).parent().find('.counter__input'),
            button = $(this),
            max = counter.attr('max') ? parseInt(counter.attr('max')) : Infinity,
            min = counter.attr('min') ? parseInt(counter.attr('min')) : -Infinity,
            step = counter.attr('step') ? parseInt(counter.attr('step')) : 1,
            val = parseInt(counter.val());

        if (counter && button.hasClass('counter__handler_minus')){
            if(val > min){
                counter.val(val - step);
                counter.trigger( "change" );
            }
        }else if(counter && button.hasClass('counter__handler_plus')){
            if(val < max){
                counter.val(val + step);
                counter.trigger( "change" );
            }
        }

        refreshClasses(button, max, min, parseInt(counter.val()));
        

    });


})