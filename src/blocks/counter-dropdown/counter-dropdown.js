$(document).ready(function(){
    let dropdowns = $(".counter-dropdown"),
        collapsed = $(".counter-dropdown.counter-dropdown_collapsed");
    
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

    if(dropdowns){

        dropdowns.each( (index, dropdown) => {

            let field = $(dropdown).find('.counter-dropdown__field'),
                list = $(dropdown).find('.counter-dropdown__list')
                fieldHeight = field.innerHeight(),
                listHeight = list.innerHeight(),
                collapsedHeight = fieldHeight + listHeight,
                fieldButtonApply = $(dropdown).find('.counter-dropdown__button.counter-dropdown__button_apply'),
                fieldButtonClear = $(dropdown).find('.counter-dropdown__button.counter-dropdown__button_clear'),
                fieldCounters = $(dropdown).find('.counter__input'),
                fieldPlaceholder =  field.data('placeholder') ? field.data('placeholder') : '',
                fieldText = fieldPlaceholder,
                fieldValueTemplate = generateTemplateString(field.data('value-format')),
                restrictedValue = field.data('restricted-value') ? parseInt(field.data('restricted-value')) : 0,
                totalCount = 0,
                countersArr = [],
                lastCounter = 0,
                firstAndSecondCounter = 0;

            fieldCounters.each( (index, counter) => {
                
                let counterValue = parseInt($(counter).val());
                totalCount += counterValue;
                countersArr[index] = counterValue;

                if (index < 1){
                    firstAndSecondCounter += counterValue;
                }else if (index == fieldCounters.length){
                    lastCounter = counterValue;
                }

            });

            if(fieldButtonClear && totalCount == 0) fieldButtonClear.addClass('counter-dropdown__button_invisible');

            if(totalCount > 0){
                if(fieldButtonClear) fieldButtonClear.removeClass('counter-dropdown__button_invisible');
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
            field.text(fieldText);

            fieldButtonApply.on('click touch', function (e) {

                e.preventDefault();
                
                totalCount = 0;
                firstAndSecondCounter = 0;
                fieldCounters.each( (index, counter) => {
                    
                    let counterValue = parseInt($(counter).val());

                    totalCount += counterValue;
                    countersArr[index] = counterValue;

                    if (index == 1 || index==0){
                        firstAndSecondCounter += counterValue;
                    }else if (index == fieldCounters.length-1){
                        lastCounter = counterValue;
                    }
                });

                if(totalCount > 0){
                    if(fieldButtonClear) fieldButtonClear.removeClass('counter-dropdown__button_invisible');
                    let textTemplate = fieldValueTemplate({total: totalCount, counters: countersArr, firstAndSecondCounter: firstAndSecondCounter, lastCounter: lastCounter});
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
                                    fieldText[key] = counterNum + " " + regexCheckArray[3];

                                    if(counterNum % 10 == 1 && counterNum % 100 != 1){
                                        fieldText[key] = counterNum + " " + regexCheckArray[1];
                                    }else if(counterNum % 10 >= 2 && counterNum % 10 <= 4 && counterNum % 100 != 1){
                                        fieldText[key] = counterNum + " " + regexCheckArray[2];
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
                field.text(fieldText);
            });

            fieldButtonClear.on('click touch', function (e) {
                e.preventDefault();
                fieldCounters.each( (index, counter) => {
                    $(counter).val(0);
                    $(counter).trigger( "change" );
                    $(field).text(fieldPlaceholder);
                    fieldButtonClear.addClass('counter-dropdown__button_invisible');
                });
            });
            
            field.on('click touch', function (e) {
                
                e.preventDefault();
                if (list) {
                    $(dropdown).toggleClass('counter-dropdown_collapsed');
                    if ($(dropdown).hasClass('counter-dropdown_collapsed')){
                        $(dropdown).height(collapsedHeight);
                    }else{
                        $(dropdown).height(fieldHeight);
                    }
                }
        
            });

            $(dropdown).on('blur', function (e) {
                
                e.preventDefault();
                $(dropdown).removeClass('counter-dropdown_collapsed').height(fieldHeight);
        
            });

            $(document).on('click touch', function(e){
                if(!$(e.target).is(".counter-dropdown *")){
                    $('.counter-dropdown').trigger('blur');
                }
            });
        })
    }

})