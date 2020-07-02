var express = require('express');
var createError = require('http-errors');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/Auth/register');
var forgotRouter = require('./routes/Auth/forgotPassword');
var loginRouter = require('./routes/Auth/login');
var logoutRouter = require('./routes/Auth/logout');
var toolsRouter = require('./routes/tools');

var app = express();
require('./configs/local.strategy');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Set passport configs
app.use(require('express-session')({ secret: 'shhhh...', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  app.use(cors());
  next();
});

//Ativando Rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/forgot-password', forgotRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/tools', toolsRouter);

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
