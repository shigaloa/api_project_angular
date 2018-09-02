(function () {
    angular
        .module('apiApp')
        .directive('navigation', navigation);
    function navigation() {
        return {
            restrict: 'EA',
            scope: {
                listaApis : '=content'        // Para tener acceso a la lista de Apis desde el menu
                },
            templateUrl: '/common/directives/navigation/navigation.template.html'
        };
    }
})();