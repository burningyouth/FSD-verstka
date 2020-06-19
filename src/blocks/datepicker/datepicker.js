import 'air-datepicker';

$(document).ready(function(){
    let dateDropdowns= $(".date-dropdown");

    dateDropdowns.each((index, dateDropdown) => {
        let position = $(dateDropdown).data('position') ? $(dateDropdown).data('position'): 'bottom center',
            datepicker,
            dates,
            inputHidden = $(dateDropdown).find('.date-dropdown__hidden'),
            inlineDatepicker = $(dateDropdown).find('.date-dropdown__inline-datepicker'),
            triggerInputs = $(dateDropdown).find('.date-dropdown__input'),
            options = {
                position: position,
                range: true,
                dateFormat: 'd M',
                multipleDatesSeparator: ' - ',
                offset: 5,
                navTitles: {
                    days: '<h2 class="datepicker__title item-title">MM yyyy</h2>',
                    months: '<h2 class="datepicker__title item-title">MM yyyy</h2>',
                    years: '<h2 class="datepicker__title item-title">MM yyyy</h2>',
                },
                prevHtml: '<span class="datepicker__arrow datepicker__arrow_prev">',
                nextHtml: '<span class="datepicker__arrow datepicker__arrow_next">',
                onSelect: function(formattedDate, date, inst){
                    let datepicker = $(inst['$datepicker']);
                    dates = date;
                    if(datepicker){
                        if (date[1]){
                            datepicker.addClass('datepicker_selected');
                        }else{
                            datepicker.removeClass('datepicker_selected');
                        }
                    }
                }
            };
        
        if (inlineDatepicker.length == 0){
            datepicker = $(inputHidden).datepicker(options).data('datepicker');

        }else{
            datepicker = $(inlineDatepicker).datepicker(options).data('datepicker');
        }

        let clearButton = $('<button class="simple-button simple-button_secondary cta-text">Очистить</button>');
        let applyButton = $('<button class="simple-button cta-text">Применить</button></div>');
        let btnContainer = $('<div class="datepicker__btn-container">').append(clearButton).append(applyButton);
        
        $(datepicker.$datepicker).append(btnContainer);

        clearButton.on('click touch', function(e){
            e.preventDefault();

            triggerInputs.each((i, el) => {
                $(el).val('');
            });
    
            datepicker.clear();
        });
    
        applyButton.on('click touch', function(e){
            e.preventDefault();

            if (dates.length > 1){
                if (triggerInputs.length > 1){
                    triggerInputs.each((i, el) => {
                        $(el).val(dates[i].toLocaleDateString());
                    });
                }else{
                    triggerInputs.val(inputHidden.val());
                }
            }
            
            datepicker.hide();
            $(dateDropdown).data('datepicker-hidden', 'true');
        });

        triggerInputs.on('click touch', function(){
            if ($(dateDropdown).data('datepicker-hidden') == 'true' || $(dateDropdown).data('datepicker-hidden') == undefined){
                datepicker.show();
                $(dateDropdown).data('datepicker-hidden', 'false');
            }else if ($(dateDropdown).data('datepicker-hidden') == 'false'){
                datepicker.hide();
                $(dateDropdown).data('datepicker-hidden', 'true');
            }
        })
    });
})