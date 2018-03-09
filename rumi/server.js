// modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
// var index = require('./routes/index');
// var users = require('./routes/users');
// var mongo = require('mongodb');
var authAPI = require('./app/auth');

// set the port
var port = process.env.PORT || 8080;

// config data
var config = require('./app/config');

var User = require('./app/models/user'),
jsonwebtoken = require("jsonwebtoken");

// connet to mongoDB
mongoose.connect(config.dbUrl);

// // view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));
// app.use("/public", express.static(path.join(__dirname, 'public')));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(logger('dev'));
// app.use(cookieParser());
// app.use('/', index);
// app.use('/users', users);

// API routes
app.use('/api/auth', authAPI);
// app.use('/', routes);

app.disable('etag');

// Angular requests
require('./app/routes')(app);

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

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);
console.log('Magic happens on port ' + port + '!');

exports = module.exports = app;
