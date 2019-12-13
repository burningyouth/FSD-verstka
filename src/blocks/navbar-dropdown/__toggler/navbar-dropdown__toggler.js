$(document).ready(function(){
    $('.navbar-dropdown__toggler').on('click touch', function(e){
        e.preventDefault();
        let target = $(this).attr('href');
        $(target).toggleClass('navbar-dropdown__list_collapsed');
        $(this).toggleClass('navbar-dropdown__toggler_collapsed');
    });
    $('.navbar-dropdown__list').on('blur', function(e){
        e.preventDefault();
        let toggler = $(this).data('toggler');
        $(this).removeClass('navbar-dropdown__list_collapsed');
        $(toggler).removeClass('navbar-dropdown__toggler_collapsed');
    });
    $(document).on('click touch', function(e){
        if(!$(e.target).is(".navbar-dropdown__toggler")){
            $('.navbar-dropdown__list').trigger('blur');
        }
    });
});