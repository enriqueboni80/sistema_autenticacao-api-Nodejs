const User = require('../../Store/Auth/Register');

module.exports = {
    showRegistrationForm(req, res, next) {
        res.send('exibir formulario de cadastro');
    },
    register(req, res, next) {
        user = {
            nome: req.body.nome,
            email: req.body.email,
            password: req.body.password
        }
        User.register(user).then((result) => {
            res.json({ success: true, message: 'ok' });
        })
    },
}