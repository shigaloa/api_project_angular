(function () {

    angular
        .module('apiApp')
        .service('aragon', aragon);

    aragon.$inject = ['$http'];

    function aragon($http) {

        var respuestaAragon = function (postdata) {
            var valor;

            if (postdata.opcion == 'type') {
                valor = postdata.tipo;
            } else if (postdata.opcion == 'source') {
                valor = postdata.fuente;
            } else if (postdata.opcion == 'center') {
                valor = postdata.latitud + ',' + postdata.longitud + '&distance=' + postdata.centrar;
            };

            servidor = 'https://opendata.aragon.es/socialdata/data';
            path = '?' +
                postdata.opcion +
                '=' +
                valor;
            return $http.get(servidor + path);
        }
        
        // Para compartir  el resultado con la página de idem
        var setDetalle = function (value, id, api) {
            detalle = {
                resultado: value,
                _id: id,
                api: api
            };
        };

        var getDetalle = function () {
            return detalle;
        };

        return {
        respuestaAragon: respuestaAragon,
        setDetalle: setDetalle,
        getDetalle: getDetalle
        };
    };
  
})();
