var User = require("../store/Users")
const passport = require("passport");
var Util = require("../helpers/Util")
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, done) {
        User.getByEmail(email).then((user) => {
            if (!user) {
                console.log("usuario nao encontrado")
                return done(null, false, { message: 'email is incorrect' });
            } else {
                var passwordsSaoIguais = Util.compararPasswordsBycrypt(password, user.password)
                if (passwordsSaoIguais) {
                    if (!user.active) {
                        console.log("usuario ainda não ativado")
                        return done(null, false, { message: 'usuario nao ativado' });
                    } else {
                        return done(null, user);
                    }
                }
                else {
                    return done(null, false, { message: 'Password is incorrect' });
                }
            }
        })
    }
));

passport.serializeUser(function (user, done) {
    done(undefined, user);
});

passport.deserializeUser(function (user, done) {
    done(undefined, user);
});