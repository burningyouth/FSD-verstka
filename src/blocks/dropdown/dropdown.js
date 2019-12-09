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

        dropFields.each( (index, field) => {

            let dropdown = $(field).parent(),
                fieldButtonApply = dropdown.find('.dropdown__button.dropdown__button_apply'),
                fieldButtonClear = dropdown.find('.dropdown__button.dropdown__button_clear'),
                fieldCounters = dropdown.find('.counter__input'),
                fieldPlaceholder =  $(field).data('placeholder') ? $(field).data('placeholder') : '',
                fieldText = fieldPlaceholder,
                fieldValueTemplate = generateTemplateString($(field).data('value-format')),
                restrictedValue = $(field).data('restricted-value') ? parseInt($(field).data('restricted-value')) : 0,
                totalCount = 0,
                countersArr = []

            fieldCounters.each( (index, counter) => {
                
                let counterValue = parseInt($(counter).val());
                totalCount += counterValue;
                countersArr[index] = counterValue;

            });

            if(fieldButtonClear && totalCount == 0) fieldButtonClear.addClass('dropdown__button_invisible');

            if(totalCount > 0){
                if(fieldButtonClear) fieldButtonClear.removeClass('dropdown__button_invisible');
                let textTemplate = fieldValueTemplate({total: totalCount, counters: countersArr});
                if (restrictedValue != null){
                    let key = 0;
                    fieldText = []; 
                    textSplitted = textTemplate.split(', ');
                    textSplitted.forEach((splitted) => {
                        let counterNum = parseInt(splitted.match(/\d+/));
                        if (counterNum != restrictedValue){
                            let regexCheckArray = /\[(.+)\s*\;\s*(.+)\s*\;\s*(.+)\]/g;
                            regexCheckArray = regexCheckArray.exec(splitted);
                            if(regexCheckArray === null){
                                fieldText[key] = splitted; 
                            }else{
                                if(counterNum >= 5){
                                    fieldText[key] = counterNum + " " + regexCheckArray[3];
                                }else if(counterNum >= 2 && counterNum < 5){
                                    fieldText[key] = counterNum + " " + regexCheckArray[2];
                                }else{
                                    fieldText[key] = counterNum + " " + regexCheckArray[1];
                                }
                            }
                            key++;
                        }
                    });
                    fieldText = fieldText.join(', ');
                }else{
                    fieldText = textTemplate;
                }
            }
            $(field).text(fieldText);

            fieldButtonApply.on('click touch', function (e) {

                e.preventDefault();
                
                totalCount = 0;
                fieldCounters.each( (index, counter) => {
                    
                    let counterValue = parseInt($(counter).val());

                    totalCount += counterValue;
                    countersArr[index] = counterValue;
                });

                if(totalCount > 0){
                    if(fieldButtonClear) fieldButtonClear.removeClass('dropdown__button_invisible');
                    let textTemplate = fieldValueTemplate({total: totalCount, counters: countersArr});
                    if (restrictedValue != null){
                        let key = 0;
                        fieldText = []; 
                        textSplitted = textTemplate.split(', ');
                        textSplitted.forEach((splitted) => {
                            let counterNum = parseInt(splitted.match(/\d+/));
                            if (counterNum != restrictedValue){
                                let regexCheckArray = /\[(.+)\s*\;\s*(.+)\s*\;\s*(.+)\]/g;
                                regexCheckArray = regexCheckArray.exec(splitted);
                                if(regexCheckArray === null){
                                    fieldText[key] = splitted; 
                                }else{
                                    if(counterNum >= 5){
                                        fieldText[key] = counterNum + " " + regexCheckArray[3];
                                    }else if(counterNum >= 2 && counterNum < 5){
                                        fieldText[key] = counterNum + " " + regexCheckArray[2];
                                    }else{
                                        fieldText[key] = counterNum + " " + regexCheckArray[1];
                                    }
                                }
                                key++;
                            }
                        });
                        fieldText = fieldText.join(', ');
                    }else{
                        fieldText = textTemplate;
                    }
                }
                $(field).text(fieldText);
            });

            fieldButtonClear.on('click touch', function (e) {
                e.preventDefault();
                fieldCounters.each( (index, counter) => {
                    $(counter).val(0);
                    $(counter).trigger( "change" );
                    $(field).text(fieldPlaceholder);
                    fieldButtonClear.addClass('dropdown__button_invisible');
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