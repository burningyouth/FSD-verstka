import 'air-datepicker';

$(document).ready(function(){
    let datesFilter = $(".date-dropdown.date-dropdown_filter .date-dropdown__input");
    datesFilter.datepicker({ 
        range: true,
        dateFormat: 'd M',
        multipleDatesSeparator: ' - ',
        classes: 'date-dropdown__datepicker',
        navTitles: {
            days: '<h2 class="date-dropdown__title">MM yyyy</h2>',
            months: '<h2 class="date-dropdown__title">MM yyyy</h2>',
            years: '<h2 class="date-dropdown__title">MM yyyy</h2>',
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