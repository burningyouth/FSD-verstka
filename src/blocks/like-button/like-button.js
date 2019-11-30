$(document).ready(function(){
    let buttons = $(".like-button");
    buttons.on('click touch', function (e) {

        let counter = $(this).find('.like-button__counter'),
            button = $(this);

        e.preventDefault();
        button.toggleClass('like-button_liked');
        if (counter && button.hasClass('like-button_liked')){
            counter.text(parseInt(counter.text(), 10) + 1);
        }else if(counter){
            counter.text(parseInt(counter.text(), 10) - 1);
        }

    });

})