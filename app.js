var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var getRawBody = require('raw-body');
var typer      = require('media-typer');
var init_db    = require('./init_database');

var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var authentications = require("./routes/authentications")

var app = express();

init_db.loadORM(app)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(function (req, res, next) {
  
  type = req.headers['content-type']
  len = req.headers['content-length']
  if(type && len){
    getRawBody(req, {
      length: len,
      limit: '20mb',
      encoding: typer.parse(type).parameters.charset
    }, function (err, string) {
      if (err)
        return next(err)

      req.text = string
      next()
    })
  }else{
    next()
  }
})
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(cookieParser());
// app.use(
//   connection(mysql, database_config[app.get('env')], 'request')
// )

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/authentications', authentications)
app.use('/api', api)

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

console.log("server is "+ app.get('env'))
