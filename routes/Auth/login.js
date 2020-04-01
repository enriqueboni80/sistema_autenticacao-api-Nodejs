var express = require('express');
var router = express.Router();
var passport = require('passport')


router.get('/', (req,res)=>{
    res.send('montar formulario de login')
})

router.post('/', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log('erro')
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
});

module.exports = router;