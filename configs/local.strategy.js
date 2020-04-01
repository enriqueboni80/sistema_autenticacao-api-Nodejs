var User = require("../store/Users")
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, done) {
        User.auth(email, password).then(function (user, err) {
            if (user) {
                return done(null, user);
            }
            return done(null, false, { message: 'Username or Password are incorrect' });
        })
    }
));

passport.serializeUser(function (user, done) {
    done(undefined, user);
});

passport.deserializeUser(function (user, done) {
    done(undefined, user);
});