import noUiSlider from 'nouislider';

$(document).ready(function(){
    let handlesSliders = document.getElementsByClassName('range-slider__input');
    if(handlesSliders && noUiSlider){
        Array.from(handlesSliders).forEach(element => {
            let parent = $(element).parent(),
                sliderValue = parent.find('.range-slider__value'),
                sliderMin = $(element).data('min') ? parseInt($(element).data('min')) : 0,
                sliderMax = $(element).data('max') ? parseInt($(element).data('max')) : 10,
                sliderStartFrom = $(element).data('start-from') ? parseInt($(element).data('start-from')) : sliderMin,
                sliderStartTo = $(element).data('start-to') ? parseInt($(element).data('start-to')) : sliderMax;
            noUiSlider.create(element, {
                start: [sliderStartFrom, sliderStartTo],
                connect: true,
                range: {
                    'min': [sliderMin],
                    'max': [sliderMax]
                },
                format: {
                    // 'to' the formatted value. Receives a number.
                    to: function (value) {
                        return value.toLocaleString().replace(/,\d*/, '');
                    },
                    // 'from' the formatted value.
                    // Receives a string, should return a number.
                    from: function (value) {
                        return Number(value);
                    }
                }
            });
            if(sliderValue){
                element.noUiSlider.on('update', function (values) {
            
                    $(sliderValue).text(values[0]+' - '+values[1]+'₽');
                    
                });
            }
        });
    }
});