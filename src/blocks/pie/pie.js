$(document).ready(function(){
    let pieCharts = $('.pie__chart'),
        valueColors = ['#919191','#BC9CFF', '#6FCF97', '#FFE39C'];
    pieCharts.each((index, chart)=>{
        let totalValue = parseInt($(chart).data('total')),
            degPerValue = 0,
            degsUsed = 0,
            pieValues = $(chart).find('.pie__value'),
            circleLength = 2*parseInt(60)*Math.PI;
        if (totalValue > 0){
            degPerValue = 360/totalValue;
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