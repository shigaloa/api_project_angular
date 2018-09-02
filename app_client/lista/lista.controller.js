(function () {

angular
    .module('apiApp')
    .controller('apiListCtrl', apiListCtrl);

apiListCtrl.$inject = ['apiData', 'apiFactory'];
function apiListCtrl(apiData, apiFactory) {
    var vm = this;
    vm.mensaje = "Buscando APIs disponibles";
    vm.titulo = 'Lista de APIs';
    vm.cabecera =  {
            titulo: 'APIs disponibles',
            subtitulo: 'Escoge la API'
    };    
    
    apiData.apis()
        .then(function (data) {
            vm.mensaje = data.data.length > 0 ? "" : "No se encontraron APIs";
            vm.data = { listaApis: data.data };
            apiFactory.setLista (vm.data);
        })
        , function error(e) {
            vm.mensaje = "Lo siento, algo fue mal";
        };
};

})();