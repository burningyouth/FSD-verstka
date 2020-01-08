import 'air-datepicker';

$(document).ready(function(){
    let dateInputs = $(".date-dropdown:not(.date-dropdown_no-datepicker) > .date-dropdown__input");
    dateInputs.each((index, dateInput) => {
        let position = $(dateInput).data('position') ? $(dateInput).data('position'): 'bottom center';
        $(dateInput).datepicker({ 
            classes: 'date-dropdown__datepicker',
            position: position,
            navTitles: {
                days: '<h2 class="date-dropdown__title item-title">MM yyyy</h2>',
                months: '<h2 class="date-dropdown__title item-title">MM yyyy</h2>',
                years: '<h2 class="date-dropdown__title item-title">MM yyyy</h2>',
            },
            prevHtml: '<span class="date-dropdown__arrow date-dropdown__arrow_prev">',
            nextHtml: '<span class="date-dropdown__arrow date-dropdown__arrow_next">',
            onSelect: function(formattedDate, date, inst){
                let datepicker = $(inst['$datepicker']);
                if(datepicker){
                    if (date){
                        datepicker.addClass('date-dropdown__datepicker_date_chosen');
                    }else{
                        datepicker.removeClass('date-dropdown__datepicker_date_chosen');
                    }
                }
            }
        })
    });
    let dateFilterInputs = $(".date-dropdown.date-dropdown_filter:not(.date-dropdown_no-datepicker) > .date-dropdown__input");
    dateFilterInputs.each((index, dateInput) => {
        let position = $(dateInput).data('position') ? $(dateInput).data('position'): 'bottom center';
        $(dateInput).datepicker({ 
            range: true,
            dateFormat: 'd M',
            multipleDatesSeparator: ' - ',
            position: position,
            classes: 'date-dropdown__datepicker',
            navTitles: {
                days: '<h2 class="date-dropdown__title item-title">MM yyyy</h2>',
                months: '<h2 class="date-dropdown__title item-title">MM yyyy</h2>',
                years: '<h2 class="date-dropdown__title item-title">MM yyyy</h2>',
            },
            prevHtml: '<span class="date-dropdown__arrow date-dropdown__arrow_prev">',
            nextHtml: '<span class="date-dropdown__arrow date-dropdown__arrow_next">',
            onSelect: function(formattedDate, date, inst){
                let datepicker = $(inst['$datepicker']);
                if(datepicker){
                    if (date[1]){
                        datepicker.addClass('date-dropdown__datepicker_date_chosen');
                    }else{
                        datepicker.removeClass('date-dropdown__datepicker_date_chosen');
                    }
                }
            }
        })
    });
    let dateFilterDoubleInputs = $(".date-dropdown.date-dropdown_filter-double:not(.date-dropdown_no-datepicker) > .date-dropdown__input");
    dateFilterDoubleInputs.each((index, dateInput) => {
        let position = $(dateInput).data('position') ? $(dateInput).data('position'): 'bottom center';
        $(dateInput).datepicker({ 
            range: true,
            position: position,
            classes: 'date-dropdown__datepicker',
            navTitles: {
                days: '<h2 class="date-dropdown__title item-title">MM yyyy</h2>',
                months: '<h2 class="date-dropdown__title item-title">MM yyyy</h2>',
                years: '<h2 class="date-dropdown__title item-title">MM yyyy</h2>',
            },
            prevHtml: '<span class="date-dropdown__arrow date-dropdown__arrow_prev">',
            nextHtml: '<span class="date-dropdown__arrow date-dropdown__arrow_next">',
            onSelect: function(formattedDate, date, inst){
                let datepicker = $(inst['$datepicker']),
                    el = $(inst['$el']),
                    fakeDatepickers = el.parent().find('.date-dropdown.date-dropdown_no-datepicker > .date-dropdown__input');
                fakeDatepickers.each((index, fakeDatepicker)=>{
                    let dateIndex = parseInt($(fakeDatepicker).data('date-index'));
                    if (Number.isInteger(dateIndex)){
                        let dateSplitted = formattedDate.split(',');
                        if (dateSplitted[dateIndex]){
                            $(fakeDatepicker).val(dateSplitted[dateIndex]);
                        }
                    }
                })
                if(datepicker){
                    if (date[1]){
                        datepicker.addClass('date-dropdown__datepicker_date_chosen');
                    }else{
                        datepicker.removeClass('date-dropdown__datepicker_date_chosen');
                    }
                }
                
            }
        })
    });
})