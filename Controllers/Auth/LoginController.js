var passport = require('passport')

module.exports = {
    index(req, res, next) {
        res.send("montar formulario de login");
    },
    autenticar(req, res, next) {
        //Passport é gerenciado dentro do ./configs/local.strategy
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                console.log(info.message)
                return res.redirect('/login');
            }
            req.logIn(user, function (err) {
                if (err) {
                    console(info.message)
                    return next(err);
                }
                console.log(info.message)
                return res.redirect('/home');
            });
        })(req, res, next);
    }
}