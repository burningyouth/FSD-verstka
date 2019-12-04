$(document).ready(function(){
    let listLabels = $(".checkbox-list .checkbox-list__label"),
        collapsed = $(".checkbox-list.checkbox-list_collapsed");
    
    if (collapsed){
        collapsed.height('auto');
    }
    if(listLabels){
        listLabels.on('click touch', function (e) {

            let checkboxList = $(this).parent(),
                list = checkboxList.find('.checkbox-list__list');
            
            e.preventDefault();
            if (list && checkboxList) {
                checkboxList.toggleClass('checkbox-list_collapsed');
                if (checkboxList.hasClass('checkbox-list_collapsed')){
                    checkboxList.height(list.innerHeight() + $(this).innerHeight());
                }else{
                    checkboxList.height($(this).innerHeight());
                }
            }
    
        });
    }
    

})