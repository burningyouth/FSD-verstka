
$(document).ready(function(){
    let dropIcons = $(".dropdown .dropdown__icon"),
        collapsed = $(".dropdown.dropdown_collapsed");
    
    if (collapsed){
            collapsed.height('auto');
    }
    dropIcons.on('click touch', function (e) {

        let dropDown = $(this).parent(),
            list = dropDown.find('.dropdown__list');
        
        e.preventDefault();
        if (list) {
            dropDown.toggleClass('dropdown_collapsed');
            if (dropDown.hasClass('dropdown_collapsed')){
                dropDown.height(list.innerHeight() + $(this).innerHeight());
            }else{
                dropDown.height($(this).innerHeight());
            }
        }

    });
    

})