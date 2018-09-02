google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    $.get('/datos_grafico', function(response) {
        console.log(response);
        var linea = [];
        var chartData = [];
        var numero_series = response.length;
        var numero_anyos = response[0].Data.length;
        var comunidad = response[0].Nombre.split(".")[0]
        
        var data = new google.visualization.DataTable();
        
        data.addColumn('number', 'Año');
        
        for (var i = 0; i < numero_series; i++){
          console.log('Nombre: ', response[i].Nombre);
          if (response[i].Nombre.indexOf("Hombres") < 0 && response[i].Nombre.indexOf("Mujeres") < 0){
            data.addColumn('number', 'Todos');
          } else if (response[i].Nombre.indexOf("Mujeres") < 0){
            data.addColumn('number', 'Hombres');
          } else {
            data.addColumn('number', 'Mujeres');
          }
        }
        
        for (i = numero_anyos -1; i >= 0; i--) {
          linea = [];
          linea.push (response[0].Data[i].Anyo);
          for (var j = 0; j < numero_series; j++){
            linea.push (response[j].Data[i].Valor); 
          };
          chartData[i] = linea;
          console.log('chartData: ', chartData);
          console.log('linea: ',linea);
          };

        data.addRows(chartData);

        /*data.addRows([
        [1, 37.8, 80.8, 41.8],
        [2, 30.9, 69.5, 32.4],
        [3, 25.4, 57, 25.7],
        [4, 11.7, 18.8, 10.5],
        [5, 11.9, 17.6, 10.4],
        [6, 8.8, 13.6, 7.7],
        [7, 7.6, 12.3, 9.6],
        [8, 12.3, 29.2, 10.6],
        [9, 16.9, 42.9, 14.8],
        [10, 12.8, 30.9, 11.6],
        [11, 5.3, 7.9, 4.7],
        [12, 6.6, 8.4, 5.2],
        [13, 4.8, 6.3, 3.6],
        [14, 4.2, 6.2, 3.4]
        ]);*/

        var options = {
          chart: {
            title: 'Cifras oficiales de Población ' + comunidad,
            subtitle: 'Fuente: Instituto Nacional de Estadística'
          },
          width: 900,
          height: 400, //500,
          hAxis: {
            format: '#,###',
            //viewWindowMode:  'maximized',
          },
          vAxis: {
            format: '##,###,###'
          }
        };

      var chart = new google.charts.Line(document.getElementById('grafico_lineal'));

      chart.draw(data, google.charts.Line.convertOptions(options));
    }, 'json');
}