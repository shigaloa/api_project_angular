(function () {

//angular.module('apiApp', ['ngRoute']);
angular.module('apiApp', ['ngRoute', 'ui.bootstrap', 'nvd3']);

//function config ($routeProvider, $httpProvider) {
function config ($routeProvider) {

    //$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

    $routeProvider
        .when('/', {
            templateUrl: 'lista/lista.view.html',
            controller: 'apiListCtrl',
            controllerAs: 'vm'
        })
        .when('/about', {
            templateUrl: '/about/about.view.html',
            controller: 'aboutCtrl',
            controllerAs: 'vm'
        })
        .when('/cv', {
            templateUrl: '/cv/cv.view.html',
            controller: 'cvCtrl',
            controllerAs: 'vm'
        })
        .when('/contacto', {
            templateUrl: '/contacto/contacto.view.html',
            controller: 'contactoCtrl',
            controllerAs: 'vm'
        })
        .when('/rest_api/nombre/:rest_apinombre/id/:rest_apiid', {
            templateUrl: function (parametros){
                var template;
                switch (parametros.rest_apinombre) {
                    case 'INE':
                        template = '/apis/views/ine.view.html';
                        break;
                    case 'ARAGON':
                        template = '/apis/views/aragon.view.html';
                        break;
                    case 'NASA':
                        template = '/apis/views/nasa.view.html';
                        break;
                }
                return template;
            },
            controller: 'apiCtrl',
            controllerAs: 'vm'
        })
        .when('/ine', {
            templateUrl: '/apis/views/resultadoIne.view.html',
            controller: 'ineCtrl',
            controllerAs: 'vm'
        })
        .when('/aragon', {
            templateUrl: '/apis/views/resultadoAragon.view.html',
            controller: 'aragonCtrl',
            controllerAs: 'vm'
        })
        .when('/nasa', {
            templateUrl: '/apis/views/resultadoNasa.view.html',
            controller: 'nasaCtrl',
            controllerAs: 'vm'
        })
        .otherwise({ redirectTo: '/' });
};

angular
    .module('apiApp')
    //.config(['$routeProvider', '$httpProvider', config])
    .config(['$routeProvider', config])
    
})();