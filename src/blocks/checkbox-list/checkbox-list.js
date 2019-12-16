$(document).ready(function(){
    let checkboxLists = $(".checkbox-list");
    if(checkboxLists){
        checkboxLists.each((index, list) => {
            let listLabel = $(list).find('.checkbox-list__label'),
                content = $(list).find('.checkbox-list__content'),
                dropdownIcon = $(list).find('.dropdown-icon'),
                labelHeight = listLabel.innerHeight(),
                collapsedHeight = content.innerHeight() + labelHeight;

            listLabel.on('click touch', function (e) {
                
                e.preventDefault();
                if (content) {

                    if (dropdownIcon) dropdownIcon.toggleClass('dropdown-icon_collapsed');

                    if ($(list).data('collapsed') == 'true'){
                        $(list).data('collapsed', 'false');
                        $(list).height(labelHeight);
                    }else{
                        $(list).data('collapsed', 'true');
                        $(list).height(collapsedHeight);
                    }
                }
        
            });
        });
    }
    

})