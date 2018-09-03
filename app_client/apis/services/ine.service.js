(function () {

    angular
        .module('apiApp')
        .service('ine', ine);

    ine.$inject = ['$http'];

    function ine($http) {

        var detalle;

        var respuestaIne = function (postdata) {
            var servidor = 'http://servicios.ine.es/wstempus/js/ES';
            var path = '/DATOS_METADATAOPERACION/CP?' +
                'g1=' + '70:' + postdata.comunidad +
                '&g2=' + '18:' + postdata.sexo +
                '&g3=356:15668' +                   // Todas las edades
                '&g4=141:16420' +                   // Todas las nacionalidades
                '&p=12' +
                '&nult=' + postdata.periodo;
            return $http.get(servidor + path);
        };

        // Obtener valores variable Comunidad Autónoma
        var comunidades = function () {
            var servidor = 'http://servicios.ine.es/wstempus/js/ES';
            var path = '/VALORES_VARIABLEOPERACION/70/CP';
            return $http.get(servidor + path);
        };

        // Obtener valores variable Sexos
        var sexos = function() {
                servidor = 'http://servicios.ine.es/wstempus/js/ES';
                path = '/VALORES_VARIABLEOPERACION/18/CP';
                return $http.get(servidor + path);
        };
        
        // Para compartir  el resultado con la página de idem
        var setDetalle = function (value, id, api) {
            detalle = {
                resultado: value,
                _id: id,
                api: api
            };
        };

        var getDetalle = function(){
            return detalle;
        };

        return {
            respuestaIne: respuestaIne,
            comunidades: comunidades,
            sexos: sexos,
            setDetalle: setDetalle,
            getDetalle: getDetalle,
        };
    }
})();

