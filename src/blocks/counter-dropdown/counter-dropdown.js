$(document).ready(function(){
    let dropdowns = $(".counter-dropdown"),
        collapsed = $(".counter-dropdown.counter-dropdown_collapsed");
    
    if (collapsed){
        collapsed.height('auto');
        let dropdownIcon = collapsed.find('.dropdown-icon');
        dropdownIcon.toggleClass('dropdown-icon_collapsed');
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

        let totalCount = [],
            countersArr = [[]],
            lastCounter = [],
            firstAndSecondCounter = [];

        dropdowns.each( (index, dropdown) => {

            let field = $(dropdown).find('.counter-dropdown__field'),
                fieldPlaceholder =  field.data('placeholder') ? field.data('placeholder') : '',
                fieldHeight = field.innerHeight(),
                fieldText = fieldPlaceholder,
                fieldValueTemplate = generateTemplateString(field.data('value-format')),
                fieldRestrictedValue = field.data('restricted-value') ? parseInt(field.data('restricted-value')) : 0,

                list = $(dropdown).find('.counter-dropdown__list')
                listHeight = list.innerHeight(),
                collapsedHeight = fieldHeight + listHeight,
                
                dropdownButtonApply = $(dropdown).find('.counter-dropdown__button.counter-dropdown__button_apply'),
                dropdownButtonClear = $(dropdown).find('.counter-dropdown__button.counter-dropdown__button_clear'),
                dropdownCounters = $(dropdown).find('.counter__input'),
                dropdownIcon = $(dropdown).find('.dropdown-icon');
                
                $(dropdown).data("index",index);
                thisDropdownIndex = index;
                totalCount[thisDropdownIndex] = 0,
                countersArr[thisDropdownIndex] = [],
                lastCounter[thisDropdownIndex] = 0,
                firstAndSecondCounter[thisDropdownIndex] = 0;


            dropdownCounters.each( (index, counter) => {
                
                let counterValue = parseInt($(counter).val());
                totalCount[thisDropdownIndex] += counterValue;
                countersArr[thisDropdownIndex][index] = counterValue;

                if (index < 1){
                    firstAndSecondCounter[thisDropdownIndex] += counterValue;
                }else if (index == dropdownCounters.length){
                    lastCounter[thisDropdownIndex] = counterValue;
                }

            });

            if(dropdownButtonClear && totalCount[thisDropdownIndex] == 0) dropdownButtonClear.addClass('counter-dropdown__button_invisible');

            if(totalCount[thisDropdownIndex] > 0){
                if(dropdownButtonClear) dropdownButtonClear.removeClass('counter-dropdown__button_invisible');

                let textTemplate = fieldValueTemplate({total: totalCount[thisDropdownIndex], counters: countersArr[thisDropdownIndex], firstAndSecondCounter: firstAndSecondCounter[thisDropdownIndex], lastCounter: lastCounter[thisDropdownIndex]});                
                if (fieldRestrictedValue != null){
                    let key = 0;
                    fieldText = []; 
                    textSplitted = textTemplate.split(', ');
                    textSplitted.forEach((splitted) => {
                        let counterNum = parseInt(splitted.match(/\d+/));
                        if (counterNum != fieldRestrictedValue){
                            let regexCheckArray = /\[(.+)\s*\;\s*(.+)\s*\;\s*(.+)\]/g;
                            regexCheckArray = regexCheckArray.exec(splitted);
                            if(regexCheckArray === null){
                                fieldText[key] = splitted; 
                            }else{
                                fieldText[key] = counterNum + " " + regexCheckArray[3];

                                if(counterNum % 10 == 1 && parseInt(counterNum / 10)%10 != 1){
                                    fieldText[key] = counterNum + " " + regexCheckArray[1];
                                }else if(counterNum % 10 >= 2 && counterNum % 10 < 5 && parseInt(counterNum / 10)%10 != 1){
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

            dropdownButtonApply.on('click touch', function (e) {

                e.preventDefault();

                let dropdown = $(this).parents('.counter-dropdown'),
                    dropdownIndex = parseInt(dropdown.data('index'));
                
                dropdownCounters = dropdown.find('.counter__input');
                dropdownButtonClear = dropdown.find('.counter-dropdown__button.counter-dropdown__button_clear');
                
                totalCount[dropdownIndex] = 0;
                firstAndSecondCounter[dropdownIndex] = 0;

                dropdownCounters.each( (index, counter) => {
                    
                    let counterValue = parseInt($(counter).val());
                    totalCount[dropdownIndex] += counterValue;
                    countersArr[dropdownIndex][index] = counterValue;

                    if (index == 1 || index==0){
                        firstAndSecondCounter[dropdownIndex] += counterValue;
                    }else if (index == dropdownCounters.length-1){
                        lastCounter[dropdownIndex] = counterValue;
                    }
                });

                if(totalCount[dropdownIndex] > 0){
                    if(dropdownButtonClear) dropdownButtonClear.removeClass('counter-dropdown__button_invisible');
                    let textTemplate = fieldValueTemplate({total: totalCount[dropdownIndex], counters: countersArr[dropdownIndex], firstAndSecondCounter: firstAndSecondCounter[dropdownIndex], lastCounter: lastCounter[dropdownIndex]});
                    if (fieldRestrictedValue != null){
                        let key = 0;
                        fieldText = []; 
                        textSplitted = textTemplate.split(', ');
                        textSplitted.forEach((splitted) => {
                            let counterNum = parseInt(splitted.match(/\d+/));
                            if (counterNum != fieldRestrictedValue){
                                let regexCheckArray = /\[(.+)\s*\;\s*(.+)\s*\;\s*(.+)\]/g;
                                regexCheckArray = regexCheckArray.exec(splitted);
                                if(regexCheckArray === null){
                                    fieldText[key] = splitted; 
                                }else{
                                    fieldText[key] = counterNum + " " + regexCheckArray[3];

                                    if(counterNum % 10 == 1 && parseInt(counterNum / 10)%10 != 1){
                                        fieldText[key] = counterNum + " " + regexCheckArray[1];
                                    }else if(counterNum % 10 >= 2 && counterNum % 10 < 5 && parseInt(counterNum / 10)%10 != 1){
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
                $(dropdown).trigger('blur');
            });

            dropdownButtonClear.on('click touch', function (e) {
                e.preventDefault();
                dropdownCounters.each( (index, counter) => {
                    $(counter).val(0).trigger( "change" );
                    $(field).text(fieldPlaceholder);
                    dropdownButtonClear.addClass('counter-dropdown__button_invisible');
                });
            });
            
            field.on('click touch', function (e) {
                
                e.preventDefault();
                if (list) {
                    if (dropdownIcon) dropdownIcon.toggleClass('dropdown-icon_collapsed');
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
                dropdownIcon.removeClass('dropdown-icon_collapsed');
        
            });

            $(document).on('click touch', function(e){
                if(!$(e.target).is(".counter-dropdown *")){
                    $('.counter-dropdown').trigger('blur');
                }
            });
        })
    }

})