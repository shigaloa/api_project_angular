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
            /*return
            [{ "Id": 8995, "Fk_Variable": 70, "Nombre": "Melilla", "Codigo": "19" }

                ,

            { "Id": 8997, "Fk_Variable": 70, "Nombre": "Andalucía", "Codigo": "01" }

                ,

            { "Id": 8998, "Fk_Variable": 70, "Nombre": "Aragón", "Codigo": "02" }

                ,

            { "Id": 8999, "Fk_Variable": 70, "Nombre": "Asturias, Principado de", "Codigo": "03" }

                ,

            { "Id": 9000, "Fk_Variable": 70, "Nombre": "Balears, Illes", "Codigo": "04" }

                ,

            { "Id": 9001, "Fk_Variable": 70, "Nombre": "Canarias", "Codigo": "05" }

                ,

            { "Id": 9002, "Fk_Variable": 70, "Nombre": "Cantabria", "Codigo": "06" }

                ,

            { "Id": 9003, "Fk_Variable": 70, "Nombre": "Castilla y León", "Codigo": "07" }

                ,

            { "Id": 9004, "Fk_Variable": 70, "Nombre": "Castilla - La Mancha", "Codigo": "08" }

                ,

            { "Id": 9005, "Fk_Variable": 70, "Nombre": "Cataluña", "Codigo": "09" }

                ,

            { "Id": 9006, "Fk_Variable": 70, "Nombre": "Comunitat Valenciana", "Codigo": "10" }

                ,

            { "Id": 9007, "Fk_Variable": 70, "Nombre": "Extremadura", "Codigo": "11" }

                ,

            { "Id": 9008, "Fk_Variable": 70, "Nombre": "Galicia", "Codigo": "12" }

                ,

            { "Id": 9009, "Fk_Variable": 70, "Nombre": "Madrid, Comunidad de", "Codigo": "13" }

                ,

            { "Id": 9010, "Fk_Variable": 70, "Nombre": "Murcia, Región de", "Codigo": "14" }

                ,

            { "Id": 9011, "Fk_Variable": 70, "Nombre": "Navarra, Comunidad Foral de", "Codigo": "15" }

                ,

            { "Id": 9012, "Fk_Variable": 70, "Nombre": "País Vasco", "Codigo": "16" }

                ,

            { "Id": 9013, "Fk_Variable": 70, "Nombre": "Rioja, La", "Codigo": "17" }

                ,

            { "Id": 9015, "Fk_Variable": 70, "Nombre": "Ceuta", "Codigo": "18" }]*/

        };

        // Obtener valores variable Sexos
        var sexos = function() {
                servidor = 'http://servicios.ine.es/wstempus/js/ES';
                path = '/VALORES_VARIABLEOPERACION/18/CP';
                return $http.get(servidor + path);
            /*return
            [{ "Id": 451, "Fk_Variable": 18, "Nombre": "Total", "Codigo": "" }

                ,

            { "Id": 452, "Fk_Variable": 18, "Nombre": "Hombres", "Codigo": "1" }

                ,

            { "Id": 453, "Fk_Variable": 18, "Nombre": "Mujeres", "Codigo": "6" }

            ]*/
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

