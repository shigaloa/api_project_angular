(function () {
    angular
        .module('apiApp')
        .controller('contactoCtrl', contactoCtrl);
        
    contactoCtrl.$inject = ['apiFactory', 'contacto'];    
    function contactoCtrl(apiFactory, contacto) {
        
        var vm = this;
        vm.formError = "";
        // Para la lista de navigation
        vm.listaApis = apiFactory.getLista();

        var enviaCorreo = function (formData) {

            postdata = {
                nombre: formData.nombre,
                email : formData.email,
                comentario: formData.comentario
            };
           
            contacto.enviar (postdata)
                    .success(function (data) {
                        vm.formError = "Tu email ha sido enviado con éxito";
                    })
                    .error(function (data) {
                        vm.formError = "Tu email no ha sido enviado";
                    });
            return false;
        };

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.nombre || !vm.formData.email || !vm.formData.comentario) {
                vm.formError = "Se requiere rellenar todos los campos";
                return false;
            } else {
                vm.formError = "Mandando mensaje";

                enviaCorreo(vm.formData);
                return false;
            }
        };

        /* No funciona en Angular, utilizo la siguiente como en añadir recomendación con express
        /*var enviaCorreo = function (formData) {
            contacto.send(formData);*/
                /*.then(function (respuesta) {
                    formData._id = data.data._id;
                    formData.api = data.data.api;
                    aragon.setDetalle (respuesta, formData._id, formData.api);
                    window.location = '/#aragon'
                    return false
                })
                , function error(e) {
                    vm.formError = "Error al mandar correo";
                };*/
                /*.success(function (data) {
                    vm.formError = "Tu email";
                })
                .error(function (data) {
                    vm.formError = "Tu email no ha sido guardada, inténtalo de nuevo";
                });*/
            return false;
        /*}*/
        
    }
})();