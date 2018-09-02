(function () {
    angular
        .module('apiApp')
        .controller('cvCtrl', cvCtrl);

    cvCtrl.$inject = ['apiFactory'];    
    function cvCtrl(apiFactory) {
        var vm = this;
        // Para la lista de navigation
        vm.listaApis = apiFactory.getLista();
    }
})();