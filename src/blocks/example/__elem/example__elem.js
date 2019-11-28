modules.define('example__elem', ['i-bem-dom'], function(provide, bemDom) {

provide(bemDom.declElem('example', 'elem', {
    onSetMod: {
        js: {
            inited: function() {
                
            }
        }
    }
}));

});
