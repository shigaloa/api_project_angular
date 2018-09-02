var createError = require('http-errors');
var express = require('express');
//var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./app_api/models/db');

var uglifyJs = require('uglify-js');
var fs = require('fs');

var indexRouter = require('./app_server/routes/index');
//var usersRouter = require('./app_server/routes/users');
var routesApi = require('./app_api/routes/index');

var app = express();

// Se definirá al cargar la página raiz '/'
var listaApis;

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

var appClientFiles = [
  'app_client/app.js',
  'app_client/lista/lista.controller.js',
  'app_client/about/about.controller.js',
  'app_client/cv/cv.controller.js',
  'app_client/contacto/contacto.controller.js',
  'app_client/apis/controllers/api.controller.js',
  'app_client/apis/controllers/ine.controller.js',
  'app_client/apis/controllers/aragon.controller.js',
  'app_client/apis/controllers/nasa.controller.js',
  'app_client/recomendacionModal/recomendacionModal.controller.js',
  'app_client/common/services/apiData.service.js',
  'app_client/apis/services/ine.service.js',
  'app_client/apis/services/aragon.service.js',
  'app_client/apis/services/nasa.service.js',
  'app_client/contacto/contacto.service.js',
  'app_client/common/factories/apiList.factory.js',
  'app_client/common/filters/limitaCadena.filter.js',
  'app_client/common/directives/estrellas/estrellas.directive.js',
  'app_client/common/directives/footerGenerico/footerGenerico.directive.js',
  'app_client/common/directives/navigation/navigation.directive.js',
  'app_client/common/directives/gotop/gotop.directive.js'
];
var uglified = uglifyJs.minify(appClientFiles, { compress: false });
fs.writeFile('public/angular/api.min.js', uglified.code, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Script generado y guardado: api.min.js');
  }
});

/*app.use(cors());
app.options('*', cors());*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/api', routesApi);

//Para poder utilzar el correo hecho en Express, ya que en Angularjs da error
app.use('/adenda', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(function(req, res) {
  res.sendfile(path.join(__dirname, 'app_client', 'index.html'));
});

module.exports = app;
