var express = require('express');
var router = express.Router();
var passport = require('passport')

module.exports = {
    index(req, res, next) {
        res.send("montar formulario de login");
    },
    autenticar(req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                console.log('Erro ao autenticar')
                return res.redirect('/login');
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                console.log('autenticou')
                return res.redirect('/home');
            });
        })(req, res, next);
    }
}