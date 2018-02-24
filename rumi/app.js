var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// User Auth
//Adding stuff here. Hope it works
var mongoose = require('mongoose');
//End of stuff added

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


//1234
var uri = 'mongodb://RUMI:RUMI@rumi-shard-00-00-tyo4r.mongodb.net:27017,rumi-shard-00-01-tyo4r.mongodb.net:27017,rumi-shard-00-02-tyo4r.mongodb.net:27017/admin?replicaSet=RUMI-shard-0&ssl=true';

var mongo = require('mongodb');
var monk = require('monk');
var db = monk(uri);
//1234

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// Database
mongoose.connect(uri);
// Database

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
	
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html');

});

module.exports = app;
