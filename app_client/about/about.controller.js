(function () {
    angular
        .module('apiApp')
        .controller('aboutCtrl', aboutCtrl);

    aboutCtrl.$inject = ['apiFactory'];
    function aboutCtrl(apiFactory) {
        var vm = this;
        vm.cabecera = 'SOBRE LA WEB';
        // Para la lista de navigation
        vm.listaApis = apiFactory.getLista();
    }
})();