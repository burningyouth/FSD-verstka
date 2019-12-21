$(document).ready(function(){
    let navbar = $(".navbar"),
        navbarExpanders = navbar.find('button[data-toggle-type="navbar-expand"]');

    navbarExpanders.each((index, navbarExpander) =>{
        let expander = $(navbarExpander),
            expanderTarget = expander.data('target') ? navbar.find(expander.data('target')) : navbar.find('.navbar__items'),
            expanderCollapsed = expander.data('collapsed') === 'true' ? true : false,
            expanderClassMod = expander.data('self-modifier-class') ? expander.data('self-modifier-class') : null;
        if (expanderCollapsed){
            expanderTarget.css("display", "block");  
            expander.addClass(expanderClassMod);
        }
        if(expanderTarget){
            expander.on('click touch', function (e) {
                expanderCollapsed = expander.data('collapsed') === 'true' ? true : false;
                if (!expanderCollapsed) {
                    expander.data('collapsed', 'true');
                    expanderTarget.slideDown(200);
                    expander.addClass(expanderClassMod);
                    navbarExpanders.each((i, v) =>{
                        if(index != i){
                            if($(v).data('collapsed','true')) $(v).trigger('click');
                        }
                    });
                }else{
                    expander.data('collapsed', 'false');
                    expanderTarget.slideUp(200);
                    expander.removeClass(expanderClassMod);
                }
            });
        }
    })
});