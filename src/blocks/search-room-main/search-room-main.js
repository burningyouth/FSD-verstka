$(document).ready(function(){
    let main = $('.search-room-main'),
        aside = main.find('.search-room-main__aside'),
        asideElement,
        asideNavbarContainer = $('.navbar .navbar__search');
    if (aside && asideNavbarContainer){
        let screenWidth = $(window).width();
        if(screenWidth <= 992){
            asideElement = aside.detach();
            asideElement.children('*').prependTo(asideNavbarContainer);
            console.debug('aside attached to navbar');
        }
        $(window).resize(function () { 
            screenWidth = $(window).width();
            if(screenWidth <= 992){
                if (asideNavbarContainer.is(':empty')){
                    asideElement = main.find('.search-room-main__aside').detach();
                }
                asideElement.children().prependTo(asideNavbarContainer);
                console.debug('aside attached to navbar');
            }else if(!asideNavbarContainer.is(':empty')){
                asideElement.prependTo(main);
                asideNavbarContainer.children().prependTo(asideElement);
                asideNavbarContainer.empty();
                console.debug('aside attached to main');
            }
        });
    }
});