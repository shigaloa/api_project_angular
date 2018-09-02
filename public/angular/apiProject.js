var apiListCtrl = function ($scope, apiData) {
    $scope.mensaje = "Buscando APIs disponibles";
        
    apiData
        .then(function (data) {
            $scope.mensaje = data.data.length > 0 ? "" : "No se encontraron APIs";
            $scope.data = { listaApis: data.data };
        })
        , function error(e) {
            $scope.mensaje = "Lo siento, algo fue mal";
        };
};

var estrellas = function () {
    return {
        scope: {
            estaPuntuacion: '=puntuacion'
        },
        //template: "{{estaPuntuacion}}"
        templateUrl: '/angular/estrellas.html'
    };
};

var apiData = function ($http) {
    return $http.get('/api/rest_apis');
};

var apiCtrl = function ($scope, apiData) {
    $scope.mensaje = "Accediendo a API";
        
    apiData
        .then(function (data) {
            var apiData = data.data;
            switch (apiData.api) {
                case 'INE':
                    apiIneInfo(req, res, apiData);
                    break;
                case 'ARAGON':
                    apiAragonInfo(req, res, apiData);
                    break;
                case 'NASA':
                    apiNasaInfo(req, res, apiData);
                    break;
            }
            //$scope.mensaje = data.data.length > 0 ? "" : "No se encontraron APIs";
            //$scope.data = { listaApis: data.data };
        })
        , function error(e) {
            $scope.mensaje = "Lo siento, algo fue mal";
    };
};


/*              INE
*/


var ineDataComunidades = function ($http) {
    servidor = 'http://servicios.ine.es/wstempus/js/ES';
    // Obtener valores variable Comunidad Autónoma
    path = '/VALORES_VARIABLEOPERACION/70/CP';
    return $http.get(servidor + path);
    //return $http.get('/api/rest_apis');
};

var ineDataSexos = function ($http) {
    servidor = 'http://servicios.ine.es/wstempus/js/ES';
    // Obtener valores variable Sexos
    path = '/VALORES_VARIABLEOPERACION/18/CP';
    return $http.get(servidor + path);
};

var apiIneCtrl = function ($scope, ineDataComunidades, ineDataSexos) {
    $scope.mensaje = "Cargando controles API INE";
        
    ineDataComunidades
        .then(function (dataComunidades) {
            ineDataSexos
                .then (function (dataSexos){
                    $scope.sexos = dataSexos.data;
                })
            , function error (e) {
                $scope.mensaje = "Lo siento, algo fue mal cargando variable Sexos en INE";
            };
            //console.log('comunidades', dataComunidades.data);
            $scope.comunidades = dataComunidades.data;
            //$scope.mensaje = data.data.length > 0 ? "" : "No se encontraron APIs";
            //$scope.data = { listaApis: data.data };
        })
        , function error(e) {
            $scope.mensaje = "Lo siento, algo fue mal cargando variable Comunidades en INE";
        };
};


/*          ARAGON
*/

var apiAragonCtrl = function ($scope) {
    $scope.mensaje = "";
    $scope.tipos = [
        'event',
        'text', 
        'wiki', 
        'video', 
        'picture', 
        'venue', 
        'code', 
        'media'
    ];
    $scope.fuentes = [
        'spain_info',
        'facebook_events',
        'twitter',
        'youtube',
        'instagram',
        'facebook',
        'wikipedia',
        'blogger',
        'wordpress',
        'blogia',
        'vimeo',
        'flickr',
        'foursquare',
        'pinterest',
        'google_plus',
        'github',
        'heraldodearagon',
        'periodicodearagon',
        'diariodelaltoaragon',
        'diariodeteruel'
    ];
    $scope.opciones = [
        {
            etiqueta: 'Tipo de contenido',
            valor: 'type'
        },
        {
            etiqueta: 'Fuente de datos',
            valor: 'source'
        },
        {
            etiqueta: 'Datos cercanos al usuario',
            valor: 'center'
        }
    ];  
};


/*              NASA
*/


var apiNasaCtrl = function ($scope, apiData) {
    $scope.mensaje = "";
    $scope.rovers = [
        {nombre: 'Curiosity', camaras: [0, 1, 2, 3, 4, 5, 6]},
        {nombre: 'Opportunity', camaras: [0, 1, 6, 7, 8]},
        {nombre: 'Spirit', camaras: [0, 1, 6, 7, 8]}
    ];
    $scope.camara_set1 = [
        {abreviatura: 'FHAZ', nombre: 'Front Hazard Avoidance Camera'},
        {abreviatura: 'RHAZ', nombre: 'Rear Hazard Avoidance Camera'},
        {abreviatura: 'MAST', nombre: 'Mast Camera'},
        {abreviatura: 'CHEMCAM', nombre: 'Chemistry and Camera Complex'},
        {abreviatura: 'MAHLI', nombre: 'Mars Hand Lens Imager'},
        {abreviatura: 'MARDI', nombre: 'Mars Descent Imager'},
        {abreviatura: 'NAVCAM', nombre: 'Navigation Camera'}
    ];
    $scope.camara_set2 = [
        {abreviatura: 'FHAZ', nombre: 'Front Hazard Avoidance Camera'},
        {abreviatura: 'RHAZ', nombre: 'Rear Hazard Avoidance Camera'},
        {abreviatura: 'NAVCAM', nombre: 'Navigation Camera'},
        {abreviatura: 'PANCAM', nombre: 'Panoramic Camera'},
        {abreviatura: 'MINITES', nombre: 'Miniature Thermal Emission Spectrometer'}
    ];
};

angular
    .module('apiProject', [])
    .controller('apiListCtrl', apiListCtrl)
    .controller('apiCtrl', apiCtrl)
    .controller('apiIneCtrl', apiIneCtrl)
    .controller('apiAragonCtrl', apiAragonCtrl)
    .controller('apiNasaCtrl', apiNasaCtrl)
    .directive('estrellas', estrellas)
    .service('apiData', apiData)
    .service('ineDataComunidades', ineDataComunidades)
    .service('ineDataSexos', ineDataSexos);

