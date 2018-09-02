(function () {
    angular
        .module('apiApp')
        .controller('nasaCtrl', nasaCtrl);

    nasaCtrl.$inject = ['nasa', 'apiFactory'];
    function nasaCtrl(nasa, apiFactory) {
        var vm = this;
        var detalle = nasa.getDetalle ();
        vm.cabecera= { 
            titulo: 'Api NASA',
            subtitulo: ''
        };
        vm.formError = "";
        vm.resultado = detalle.resultado;
        vm._id = detalle._id;
        vm.api = detalle.api

        // Para la lista de navigation
        vm.listaApis = apiFactory.getLista();
    }
})();