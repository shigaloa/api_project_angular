(function () {

    angular
        .module('apiApp')
        .service('nasa', nasa);

    nasa.$inject = ['$http'];

    function nasa($http) {

        var respuestaNasa = function (postdata) {

            var camara;
            const api_key = 'OQFS2VMIAbziDemptL3TohOB5FHghLo6pyGou5K7'; // Proporcionada por NASA

            if (postdata.rover == 'Curiosity') {
                camara = postdata.camara_set1;
            } else if (postdata.rover == 'Opportunity' || postdata.rover == 'Spirit') {
                camara = postdata.camara_set2;
            } else {
                camara = '';
            };

            servidor = 'https://api.nasa.gov/mars-photos/api/v1';
            path = '/rovers/' +
                postdata.rover + 
                '/photos?' +
                'sol=' + postdata.sol +
                '&camera=' + camara +
                '&api_key=' + api_key;
            console.log('path: ',path);
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
            console.log('detalle: ', detalle);
            return detalle;
        };

        return {
            respuestaNasa: respuestaNasa,
            setDetalle: setDetalle,
            getDetalle: getDetalle
        };
    }
})();
