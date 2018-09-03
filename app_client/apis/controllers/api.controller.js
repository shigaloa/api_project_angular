(function () {
    angular
        .module('apiApp')
        .controller('apiCtrl', apiCtrl);

    apiCtrl.$inject = ['$routeParams', '$modal','apiData', 'ine', 'aragon', 'nasa', 'apiFactory'];
    function apiCtrl($routeParams, $modal, apiData, ine, aragon, nasa, apiFactory) {
        var vm = this;
        vm.rest_apiid = $routeParams.rest_apiid;

        apiData.apiById(vm.rest_apiid)
            .then(function (data) {
                vm.mensaje = data.data.length > 0 ? "" : "No se encontraron APIs";
                switch (data.data.api) {
                    case 'INE':
                        vm.titulo = 'Api INE';
                        vm.imagen = {
                            cabecera: data.data.nombre,
                            descripcion: {
                                linea1: '',
                                linea2: '',
                            },
                            pie: '',
                            puntuacion: data.data.puntuacion
                        };
                        vm.formulario = {
                            cabecera: 'Población por sexo y comunidad',
                            descripcion: {
                                linea1: data.data.imagen,
                                linea2: data.data.linea2
                            },
                            pie: ''
                        };
                        vm.recomendaciones = data.data.recomendaciones;
                        //vm.url= req.originalUrl;
                        vm.rest_api = data.data._id
                        vm.formError = "Cargando controles API INE";

                        // Para la lista de navigation
                        vm.listaApis = apiFactory.getLista();

                        /*ine.comunidades()
                            .then(function (dataComunidades) {
                                ine.sexos()
                                    .then(function (dataSexos) {
                                        console.log ('datasexos: ', dataSexos);
                                        vm.formError = "";
                                        vm.sexos = dataSexos.data;
                                    })
                                    , function error(e) {
                                        vm.mensaje = "Lo siento, algo fue mal cargando variable Sexos en INE";
                                    };
                                vm.comunidades = dataComunidades.data;
                            })
                            , function error(e) {
                                vm.mensaje = "Lo siento, algo fue mal cargando variable Comunidades en INE";
                            };*/

                        ine.comunidades()
                            .then(function (dataComunidades) {
                                
                                vm.comunidades = dataComunidades.data;
                            })
                            , function error(e) {
                                vm.mensaje = "Lo siento, algo fue mal cargando variable Comunidades en INE";
                            };

                        ine.sexos()
                            .then(function (dataSexos) {
                                console.log ('datasexos: ', dataSexos);
                                vm.formError = "";
                                vm.sexos = dataSexos.data;
                            })
                            , function error(e) {
                                vm.mensaje = "Lo siento, algo fue mal cargando variable Sexos en INE";
                            };

                        vm.onSubmit = function () {
                            vm.formError = "";
                            if (!vm.formData.comunidad) {
                                vm.formError = "Se requiere rellenar el campo Comunidad Autónoma";
                                return false;
                            } else {
                                vm.formError = "Accediendo a INE";
                                consultaIne(vm.formData);
                                return false;
                            }
                        };

                        /*var consultaIne = function (formData) {
                            ine.respuestaIne(formData)
                                .success(function (respuesta) {
                                    ine.setDetalle (respuesta);
                                    window.location = '/#ine'
                                })
                                .error(function (data) {
                                    vm.formError = "Error al llamar al Servidor INE";
                            });
                            return false;
                        };*/

                        /* FUNCION ANTERIOR CON PROMISES (Funcionan las dos) */

                        var consultaIne = function (formData) {
                            
                            ine.respuestaIne(formData)
                                .then(function (respuesta) {
                                    formData._id = data.data._id;
                                    formData.api = data.data.api;
                                    ine.setDetalle (respuesta, formData._id, formData.api);
                                    window.location = '/#ine'
                                })
                                , function error(e) {
                                    vm.formError = "Error al llamar al Servidor INE";
                            };
                            return false;
                        };
                        
                        break;
                    case 'ARAGON':
                        vm.titulo = 'Api Aragón Open Data';
                        vm.imagen = {
                            cabecera: data.data.nombre,
                            descripcion: {
                                linea1: '',
                                linea2: '',
                            },
                            pie: '',
                            puntuacion: data.data.puntuacion
                        };
                        vm.formulario= {
                            cabecera: 'Datos de redes sociales',
                            descripcion: {
                                linea1: data.data.imagen,
                                linea2: data.data.linea2
                            },
                            pie: ''
                        };
                        vm.recomendaciones= data.data.recomendaciones;
                        //vm.url= req.originalUrl;

                        // Para la lista de navigation
                        vm.listaApis = apiFactory.getLista();
                        vm.mensaje = "";
                        vm.tipos = [
                            'event',
                            'text',
                            'wiki',
                            'video',
                            'picture',
                            'venue',
                            'code',
                            'media'
                        ];
                        vm.fuentes = [
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
                        vm.opciones = [
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
                        
                        vm.onSubmit = function () {
                            vm.formError = "";
                            if (!vm.formData.opcion) {
                                vm.formError = "Se requiere rellenar el campo Seleccionar";
                                return false;
                            } else {
                                vm.formError = "Accediendo a Aragón Open Data";

                                consultaAragon(vm.formData);
                                return false;
                            }
                        };

                        var consultaAragon = function (formData) {
                            aragon.respuestaAragon(formData)
                                .then(function (respuesta) {
                                    formData._id = data.data._id;
                                    formData.api = data.data.api;
                                    aragon.setDetalle (respuesta, formData._id, formData.api);
                                    window.location = '/#aragon'
                                })
                                , function error(e) {
                                    vm.formError = "Error al llamar al Servidor Aragón Open Data";
                            };
                            return false;
                        };

                        break;
                    case 'NASA':
                        vm.titulo = 'Api NASA';
                        vm.imagen = {
                            cabecera: data.data.nombre,
                            descripcion: {
                                linea1: '',
                                linea2: '',
                            },
                            pie: '',
                            puntuacion: data.data.puntuacion
                        };
                        vm.formulario= {
                            cabecera: 'Fotos por Rover, cámara y día',
                            descripcion: {
                                linea1: data.data.imagen,
                                linea2: data.data.linea2
                            },
                            pie: ''
                        };
                        vm.recomendaciones= data.data.recomendaciones;
                        //vm.url= req.originalUrl;
                        vm.rest_api= data.data._id 
                        vm.mensaje = "";
                        vm.mensaje = "";
                        vm.rovers = [
                            { nombre: 'Curiosity', camaras: [0, 1, 2, 3, 4, 5, 6] },
                            { nombre: 'Opportunity', camaras: [0, 1, 6, 7, 8] },
                            { nombre: 'Spirit', camaras: [0, 1, 6, 7, 8] }
                        ];
                        vm.camara_set1 = [
                            { abreviatura: 'FHAZ', nombre: 'Front Hazard Avoidance Camera' },
                            { abreviatura: 'RHAZ', nombre: 'Rear Hazard Avoidance Camera' },
                            { abreviatura: 'MAST', nombre: 'Mast Camera' },
                            { abreviatura: 'CHEMCAM', nombre: 'Chemistry and Camera Complex' },
                            { abreviatura: 'MAHLI', nombre: 'Mars Hand Lens Imager' },
                            { abreviatura: 'MARDI', nombre: 'Mars Descent Imager' },
                            { abreviatura: 'NAVCAM', nombre: 'Navigation Camera' }
                        ];
                        vm.camara_set2 = [
                            { abreviatura: 'FHAZ', nombre: 'Front Hazard Avoidance Camera' },
                            { abreviatura: 'RHAZ', nombre: 'Rear Hazard Avoidance Camera' },
                            { abreviatura: 'NAVCAM', nombre: 'Navigation Camera' },
                            { abreviatura: 'PANCAM', nombre: 'Panoramic Camera' },
                            { abreviatura: 'MINITES', nombre: 'Miniature Thermal Emission Spectrometer' }
                        ];

                        // Para la lista de navigation
                        vm.listaApis = apiFactory.getLista();

                        vm.onSubmit = function () {
                            vm.formError = "";
                            if (!vm.formData.rover || !vm.formData.camara_set1 && !vm.formData.camara_set2) {
                                vm.formError = "Se requiere rellenar todos los campos";
                                return false;
                            } else {
                                vm.formError = "Accediendo a NASA";
                                consultaNasa(vm.formData);
                                return false;
                            }
                        };

                        var consultaNasa = function (formData) {
                            nasa.respuestaNasa(formData)
                                .then(function (respuesta) {
                                    console.log('respuesta: ', respuesta.data);
                                    if (respuesta.data.photos.length == 0) {
                                        console.log('no datos nasa');
                                        vm.formError = "NO HAY DATOS para esa combinación, prueba de nuevo";
                                    } else {
                                        formData._id = data.data._id;
                                        formData.api = data.data.api;
                                        nasa.setDetalle (respuesta, formData._id, formData.api);
                                        window.location = '/#nasa'
                                    };
                                    
                                })
                                , function error(e) {
                                    vm.formError = "Error al llamar al Servidor de NASA";
                            };
                            return false;
                        };

                        break;
                };
                vm.data = { api: data.data };
            })
            , function error(e) {
                vm.mensaje = "Lo siento, algo fue mal";
            };

        vm.pageHeader = {
            title: vm.rest_apiid
        };

        // Método al llamar a Recomendar
        vm.popupRecomendacionForm = function () {
            var modalInstance = $modal.open({
            templateUrl: '/recomendacionModal/recomendacionModal.view.html',
            controller: 'recomendacionModalCtrl as vm',
                resolve: {
                    apiDatos: function () {
                        return {
                            rest_apiid: vm.rest_api,
                            rest_apiNombre: vm.titulo
                        };
                    }
                }
            });
            modalInstance.result.then(function (data) {
                vm.recomendaciones.push(data);
            });
        };
}
})();