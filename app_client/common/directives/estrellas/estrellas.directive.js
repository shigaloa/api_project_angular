(function () {

angular
    .module('apiApp')
    .directive('estrellas', estrellas);
    
function estrellas() {
    return {
        scope: {
            //restrict: 'EA',
            estaPuntuacion: '=puntuacion'
        },
        templateUrl: '/common/directives/estrellas/estrellas.template.html'
    };
};

})();
