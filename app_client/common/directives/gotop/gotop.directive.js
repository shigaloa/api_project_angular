(function () {
    angular
        .module('apiApp')
        .directive('gotop', gotop);

    gotop.$inject = ['$anchorScroll', '$location'];
    function gotop($anchorScroll, $location) {
    
        return {
            restrict:'EA',
            link:function(scope, element, attributes){
                    
                $location.hash(attributes.id);
                $anchorScroll();
            }
        }  
    }
        
        
})();