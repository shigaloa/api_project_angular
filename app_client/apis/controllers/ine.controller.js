(function () {
    angular
        .module('apiApp')
        .controller('ineCtrl', ineCtrl);

    ineCtrl.$inject = ['ine', 'apiFactory', '$scope'];
    function ineCtrl(ine, apiFactory, $scope) {
        var vm = this;
        var detalle = ine.getDetalle ();
        vm.cabecera= { 
            titulo: 'Instituto Nacional de Estadística',
            subtitulo: ''
        };

        // Para la lista de navigation
        vm.listaApis = apiFactory.getLista();

        vm.formError = "";
        vm.datosgrafico = detalle.resultado;
        vm._id = detalle._id;
        vm.api = detalle.api
        
        var response = vm.datosgrafico.data;
        var numero_series = response.length;
        var numero_anyos = response[0].Data.length;
        var comunidad = response[0].Nombre.split(".")[0];

        
        $scope.options = {
            chart: {
                type: 'lineChart',
                height: 300,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: false, //true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Año',
                    tickFormat: function(d){
                        return d3.format(',')(d);
                    },
                    axisLabelDistance: 0
                },
                yAxis: {
                    axisLabel: 'Población',
                    tickFormat: function(d) {
                        return d3.format(',')(d);
                    },
                    axisLabelDistance: -5
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
            title: {
                enable: true,
                text: 'Cifras oficiales de población ' + comunidad
            },
            subtitle: {
                enable: true,
                text: 'Fuente: Instituto Nacional de Estadística',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            },
            caption: {
                enable: false, //true,
                html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
                css: {
                    'text-align': 'justify',
                    'margin': '10px 13px 0px 7px'
                }
            }
        };

        $scope.data = rellena_datos();

        function rellena_datos() {
            var indice_anyos, indice_series;

            var rellena_linea = function (indice) {

                var linea = new Array();
                
                for (indice_anyos = numero_anyos - 1; indice_anyos >= 0; indice_anyos--) {
                    linea[numero_anyos - indice_anyos -1]=({ 'x': response[indice].Data[indice_anyos].Anyo, 'y': response[indice].Data[indice_anyos].Valor });
                };
                return linea;
            };

            var losdatos = [];
            for (indice_series = 0; indice_series < numero_series; indice_series++) {

                if (response[indice_series].Nombre.indexOf("Hombres") < 0 && response[indice_series].Nombre.indexOf("Mujeres") < 0) {
                    losdatos[indice_series]=({ 'values': rellena_linea(indice_series), 'key': 'Todos', 'strokeWidth': 2, 'classed': 'dashed' });    //color: '#ff7f0e', 
                } else if (response[indice_series].Nombre.indexOf("Mujeres") < 0) {
                    losdatos[indice_series]=({ 'values': rellena_linea(indice_series), 'key': 'Hombres' });          //, color: '#2ca02c'
                } else {
                    losdatos[indice_series]=({ 'values': rellena_linea(indice_series), 'key': 'Mujeres' });           //, color: '#7777ff'
                }
            };
            return losdatos;
        }
        
    }
})();

