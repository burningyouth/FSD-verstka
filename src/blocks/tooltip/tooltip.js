import 'tooltipster';

$(document).ready(function(){
    $('.tooltip').tooltipster({
        animation: 'fade',
        delay: 200,
        theme: ['tooltipster-default', 'tooltip__content'],
        trigger: 'click'
    });
});
