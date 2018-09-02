(function () {

    angular
        .module('apiApp')
        .filter('limitaCadena', limitaCadena);

    var _isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    function limitaCadena() {
        return function (cadena) {
            if (cadena) {
                return cadena.substr(0,40); 
            } else {
                return '';
            }
        };
    }

})();