var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/Auth/register');
var forgotRouter = require('./routes/Auth/forgotPassword');
var loginRouter = require('./routes/Auth/login');
var logoutRouter = require('./routes/Auth/logout');
var toolsRouter = require('./routes/tools');
var eventosRouter = require('./routes/eventos');
var eventosCategoriasRouter = require('./routes/eventos-categorias');

module.exports = (app) => {

    //Cors
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        app.use(cors());
        next();
    });

    const $apiUrl = ""
    app.use(`${$apiUrl}/`, indexRouter);
    app.use(`${$apiUrl}/users`, usersRouter);
    app.use(`${$apiUrl}/tools`, toolsRouter);
    app.use(`${$apiUrl}/auth/register`, registerRouter);
    app.use(`${$apiUrl}/auth/forgot-password`, forgotRouter);
    app.use(`${$apiUrl}/auth/login`, loginRouter);
    app.use(`${$apiUrl}/auth/logout`, logoutRouter);
    app.use(`${$apiUrl}/eventos`, eventosRouter);
    app.use(`${$apiUrl}/eventos-categorias`, eventosCategoriasRouter);
}