$(document).ready(function(){
    $('.toggle-class-button').on('click touch', function(e){
        e.preventDefault();
        let target = $(this).data('target'),
            classMod = $(this).data('class-mod'),
            selfClassMod = $(this).data('self-class-mod') ? $(this).data('self-class-mod') : null;
        $(target).toggleClass(classMod);
        if (selfClassMod){
            $(this).toggleClass(selfClassMod)
        }
    });
});