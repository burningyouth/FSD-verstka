$(document).ready(function(){
    let dropFields = $(".dropdown .dropdown__field"),
        collapsed = $(".dropdown.dropdown_collapsed");
    
    if (collapsed){
        collapsed.height('auto');
    }
    var generateTemplateString = (function(){
        var cache = {};
    
        function generateTemplate(template){
            var fn = cache[template];
    
            if (!fn){
                // Replace ${expressions} (etc) with ${map.expressions}.
    
                var sanitized = template
                    .replace(/\$\{([\s]*[^;\s\{]+[\s]*)\}/g, function(_, match){
                        return `\$\{map.${match.trim()}\}`;
                        })
                    // Afterwards, replace anything that not ${map.expressions}' (etc) with a blank string.
                    .replace(/(\$\{(?!map\.)[^}]+\})/g, '');
    
                fn = Function('map', `return \`${sanitized}\``);
            }
    
            return fn;
        }
    
        return generateTemplate;
    })();
    if(dropFields){
        Array.from(dropFields).forEach( (field, index) => {
            let fieldCounters = $(field).parent().find('.counter__input'),
                value = generateTemplateString($(field).data('value-format')),
                placeholder = $(field).data('placeholder'),
                totalCount = 0,
                countersArr = [];
            Array.from(fieldCounters).forEach( (counter, index) => {

                let counterValue = parseInt($(counter).val());
                totalCount += counterValue;
                countersArr[index] = counterValue;

                $(counter).on('change', function () {
                    let text = placeholder;
                    countersArr[index] = parseInt($(counter).val());
                    totalCount = 0;
                    countersArr.forEach((value) => {
                        totalCount += value;
                    })
                    if(totalCount > 0){
                        text = value({total: totalCount, counters: countersArr});
                    }
                    $(field).text(text);
                });

            });
            $(field).on('click touch', function (e) {

                let dropDown = $(this).parent(),
                    list = dropDown.find('.dropdown__list');
                
                e.preventDefault();
                if (list && dropDown) {
                    dropDown.toggleClass('dropdown_collapsed');
                    if (dropDown.hasClass('dropdown_collapsed')){
                        dropDown.height(list.innerHeight() + $(this).innerHeight());
                    }else{
                        dropDown.height($(this).innerHeight());
                    }
                }
        
            });
        })
    }

})