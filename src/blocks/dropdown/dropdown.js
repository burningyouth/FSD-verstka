$(document).ready(function(){
    let dropdowns = $(".dropdown");

    function randomString(len){
        let alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890',
            word = '';
        for(let i = 0; i < len; i++){
            word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
        }
        return word;
    }

    dropdowns.each((index, dropdown) => {
        let togglersContainer = $(dropdown).data('togglers-container') ? $($(dropdown).find($(dropdown).data('togglers-container'))) : null,
            togglers,
            dropdownId;
        if (togglersContainer){
            togglers = togglersContainer.children('.dropdown__toggler')
        }else{
            togglers = $(dropdown).children('.dropdown__toggler')
        }

        if($(dropdown).attr('id')){
            dropdownId = '#'+$(dropdown).attr('id');
        }else{
            dropdownId = 'dropdown-'+randomString(6);
            $(dropdown).attr('id', dropdownId);
            dropdownId = '#' + dropdownId;
        }

        togglers.each((i, el) =>{
            let dropdownModClass = $(el).data("dropdown-modifier-class") ? $(el).data("dropdown-modifier-class"): 'dropdown_collapsed',
                target = $(el).data("target") ? $(el).data("target") : null,
                content;
            if (target){
                content = $(dropdown).find('.dropdown__content'+target);
            }else{
                content = $(dropdown).find('.dropdown__content');
            }

            if ($(dropdown).hasClass(dropdownModClass)){
                content.show();
            }
        })

        togglers.on('click touch', function (e) {
            let toggler = $(this),
                togglerModClass = toggler.data("self-modifier-class") ? toggler.data("self-modifier-class"): null,
                dropdownModClass = toggler.data("dropdown-modifier-class") ? toggler.data("dropdown-modifier-class"): null,
                contentModClass = toggler.data("content-modifier-class") ? toggler.data("content-modifier-class"): null,
                target = toggler.data("target") ? toggler.data("target") : null,
                content;

            if (target){
                content = $(dropdown).find('.dropdown__content'+target);
            }else{
                content = $(dropdown).find('.dropdown__content');
            }

            e.preventDefault();
            if (content) {
                $(dropdown).toggleClass('dropdown_collapsed');
                if ($(dropdown).hasClass('dropdown_collapsed') && (!content.is(':visible'))){
                    content.slideDown(200);
                    if (togglerModClass) {
                        $(this).addClass(togglerModClass);
                    }
                    if (dropdownModClass) {
                        $(dropdown).addClass(dropdownModClass);
                    }
                    if (contentModClass) {
                        content.addClass(contentModClass);
                    }
                }else{
                    content.slideUp(200);
                    if (togglerModClass) {
                        $(this).removeClass(togglerModClass);
                    }
                    if (dropdownModClass) {
                        $(dropdown).removeClass(dropdownModClass);
                    }
                    if (contentModClass) {
                        content.removeClass(contentModClass);
                    }
                }
            }
    
        });

        $(dropdown).on('blur', function (e) {

            togglers.each((index, toggler) => {
                let togglerModClass = $(toggler).data("self-modifier-class") ? $(toggler).data("self-modifier-class"): null,
                    dropdownModClass = $(toggler).data("dropdown-modifier-class") ? $(toggler).data("dropdown-modifier-class"): null,
                    contentModClass = $(toggler).data("content-modifier-class") ? $(toggler).data("content-modifier-class"): null,
                    target = $(toggler).data("target") ? $(toggler).data("target") : null,
                    content;

                if (target){
                    content = $(dropdown).find('.dropdown__content'+target);
                }else{
                    content = $(dropdown).find('.dropdown__content');
                }
                
                e.preventDefault();
                $(dropdown).removeClass('dropdown_collapsed');
                content.slideUp('fast');
                

                if (togglerModClass) {
                    $(toggler).removeClass(togglerModClass);
                }
                if (dropdownModClass) {
                    $(this).removeClass(dropdownModClass);
                }
                if (contentModClass) {
                    content.removeClass(contentModClass);
                }
                
            })
    
        });

        $(document).on('click touch', function(e){
            if(!$(e.target).is(dropdownId+".dropdown *")){
                $(dropdownId+'.dropdown.dropdown_collapsed').trigger('blur');
            }
        });

    });
});