$(document).ready(function(){
    let pieCounter = $('.pie__counter'),
        pieCharts = $('.pie__chart'),
        valueColors = ['#919191','#BC9CFF', '#6FCF97', '#FFE39C'],
        words = ['голос', 'голоса', 'голосов'];
    pieCharts.each((index, chart)=>{
        let totalValue = parseInt($(chart).data('total')),
            degPerValue = 0,
            degsUsed = 0,
            pieValues = $(chart).find('.pie__value'),
            circleLength = 2*parseInt(58)*Math.PI;
        if (totalValue > 0){
            let word = words[2];

            if(totalValue % 10 == 1 && parseInt(totalValue / 10)%10 != 1){
                word = words[0];
            }else if(totalValue % 10 >= 2 && totalValue % 10 < 5 && parseInt(totalValue / 10)%10 != 1){
                word = words[1];
            }
            degPerValue = 360/totalValue;
            pieCounter.html(totalValue+'<br><div class="cta-text">'+word+'<div>');
        }
        pieValues.each((index, value) =>{
            let val = parseInt($(value).data('value'));
            if(val > 0){
                let thisCircleLength = circleLength*(val/totalValue);
                $(value).css({
                    'stroke' : valueColors[index],
                    'stroke-dasharray': thisCircleLength+' '+(circleLength-thisCircleLength),
                    'transform': 'rotate('+degsUsed+'deg)'
                })
                degsUsed += degPerValue*val;
            }else{
                $(value).css({
                    'display': 'none'
                })
            }
        });
    })
});