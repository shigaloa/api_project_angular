(function () {
    angular
        .module('apiApp')
        .controller('aragonCtrl', aragonCtrl);

    aragonCtrl.$inject = ['aragon', 'apiFactory'];
    function aragonCtrl(aragon, apiFactory) {
        var detalle = aragon.getDetalle ();
        var vm = this;
        vm.cabecera= { 
            titulo: 'Api Aragón Open Data',
            subtitulo: ''
        };
        if (detalle.resultado.data.status == 'NOK') {
            vm.formError = "Aragon Open Data no tiene datos para las opciones propuestas, intenta de nuevo";
            /* cambiar lo siguiente para volver a la api */
            vm._id = detalle._id;
            vm.api = detalle.api
        } else {
            vm.formError = "";
            vm.resultado = detalle.resultado;
            vm._id = detalle._id;
            vm.api = detalle.api
        };

        // Para la lista de navigation
        vm.listaApis = apiFactory.getLista();
        
    }
})();
