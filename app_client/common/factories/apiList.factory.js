(function () {
    angular
        .module('apiApp')
        .factory('apiFactory', apiFactory);

    function apiFactory() {

        var listaApis = [];

        return {
            getLista: function () {
                return listaApis;
            },
            setLista: function (apis) {
                listaApis = apis;
            }
        };
    };
})();