(function () {

    angular
        .module('apiApp')
        .service('apiData', apiData);

    apiData.$inject = ['$http'];
    function apiData($http) {

        var apis = function (){
            return $http.get('/api/rest_apis');
        };
        var apiById = function (rest_apiid) {
            return $http.get('/api/rest_apis/' + rest_apiid);
        };
        var addRecomendacionId = function (rest_apiid, data) {
            return $http.post('/api/rest_apis/' + rest_apiid + '/recomendaciones', data);
        };

        return {
            apis: apis,
            apiById: apiById,
            addRecomendacionId: addRecomendacionId
        };
    };

})();