(function () {
    angular
        .module('apiApp')
        .controller('recomendacionModalCtrl', recomendacionModalCtrl);
    
    recomendacionModalCtrl.$inject = ['$modalInstance', 'apiData', 'apiDatos'];
    function recomendacionModalCtrl($modalInstance, apiData, apiDatos) {
        var vm = this;
        vm.apiDatos = apiDatos;
        vm.modal = {
            close : function (result) {
                $modalInstance.close(result);
            },
            cancel: function () {
                $modalInstance.dismiss('cancel');
            }
        };

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.nombre || !vm.formData.puntuacion || !vm.formData.comentario) {
                vm.formError = "Se requieren todos los campos, inténtalo de nuevo";
                return false;
            } else {
                vm.doAddRecomendacion(vm.apiDatos.rest_apiid, vm.formData);
            }
        };

        vm.doAddRecomendacion = function (rest_apiid, formData) {
            apiData.addRecomendacionId(rest_apiid, {
                autor: formData.nombre,
                puntuacion: formData.puntuacion,
                comentario: formData.comentario
            })
                .success(function (data) {
                    vm.modal.close(data);
                })
                .error(function (data) {
                    vm.formError = "Tu recomendación no ha sido guardada, inténtalo de nuevo";
                });
            return false;
        };
    }
})();