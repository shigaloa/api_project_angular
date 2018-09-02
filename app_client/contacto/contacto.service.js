(function () {

    angular
        .module('apiApp')
        .service('contacto', contacto);

    contacto.$inject = ['$http'];

    function contacto($http) {

        var send = function (postdata) {

            /*var mailgunUrl = "YOUR_DOMAIN_HERE";
            var mailgunApiKey = window.btoa("api:key-YOUR_API_KEY_HERE")*/
            var mailgunUrl = "sandbox5e354e754739478fbde79f69cb2b5b83.mailgun.org";
            var mailgunApiKey = window.btoa("api:9bbcd1471632ff6a33f1ce73e80905e2-c1fe131e-68ae4c6c");
            console.log('elbtoa', mailgunApiKey);
            //$scope.send = function () {
                $http({
                    method: "POST",
                    
                    url: "https://api.mailgun.net/v3/" + mailgunUrl + "/messages",
                    headers: {
                        'Content-Type': "multipart/form-data",
                        'Authorization': "Basic " + mailgunApiKey
                    },
                    data: "from=" + "test@example.com" + "&to=" + "shigaloa@gmail.com" + "&subject=" + "MailgunTest" + "&text=" + "EmailBody"
                
                })/*.then(function (success) {
                    console.log("SUCCESS " + JSON.stringify(success));
                }, function (error) {
                    console.log("ERROR " + JSON.stringify(error));
                });*/
                
                
            //}
            
            //$http.post('/api/rest_apis/' + rest_apiid + '/recomendaciones', data);

            return false;
        };

        // Se utiliza la siguiente llamada para enviar correo mediante express
        var enviar = function (datos){
            return $http.post('/adenda/contacto', datos);
        };

        return {
            send: send,
            enviar: enviar
        };
    };
  
})();
