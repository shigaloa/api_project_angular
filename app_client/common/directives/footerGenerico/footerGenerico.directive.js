(function () {
    angular
        .module('apiApp')
        .directive('footerGenerico', footerGenerico);
    function footerGenerico() {
        return {
            restrict: 'EA',
            templateUrl: '/common/directives/footerGenerico/footerGenerico.template.html'
        };
    }
})();