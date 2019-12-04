import noUiSlider from 'nouislider';

$(document).ready(function(){
    let handlesSliders = document.getElementsByClassName('range-slider__input');
    if(handlesSliders && noUiSlider){
        Array.from(handlesSliders).forEach(element => {
            let sliderValue = element.parentNode.getElementsByClassName('range-slider__value');
            noUiSlider.create(element, {
                start: [500, 30000],
                connect: true,
                range: {
                    'min': [500],
                    'max': [30000]
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