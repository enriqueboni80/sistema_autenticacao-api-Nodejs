var express = require('express');
var createError = require('http-errors');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/Auth/register');
var forgotRouter = require('./routes/Auth/forgotPassword');
var loginRouter = require('./routes/Auth/login');
var logoutRouter = require('./routes/Auth/logout');
var toolsRouter = require('./routes/tools');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  app.use(cors());
  next();
});

//Body-parser
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//Ativando Rotas
const $apiUrl = ""
app.use(`${$apiUrl}/`, indexRouter);
app.use(`${$apiUrl}/users`, usersRouter);
app.use(`${$apiUrl}/register`, registerRouter);
app.use(`${$apiUrl}/forgot-password`, forgotRouter);
app.use(`${$apiUrl}/login`, loginRouter);
app.use(`${$apiUrl}/logout`, logoutRouter);
app.use(`${$apiUrl}/tools`, toolsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
