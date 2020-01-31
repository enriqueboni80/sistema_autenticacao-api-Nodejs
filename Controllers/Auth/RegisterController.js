const User = require('../../Store/Auth/Register');
var bcrypt = require('bcryptjs');
var util = require('../../Helpers/Util')


function gerarHash(password) {
    var hash = bcrypt.hashSync(password, 8);
    return hash
}

function gerarToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}


module.exports = {
    showRegistrationForm(req, res, next) {
        res.send('exibir formulario de cadastro');
    },
    register(req, res, next) {
        user = {
            nome: req.body.nome,
            email: req.body.email,
            password: gerarHash(req.body.password),
            token: gerarToken(),
            created_at: util.getNow()
        }
        User.register(user).then((result) => {
            res.json({ success: true, message: 'ok' });
        })
    },
    active(req, res) {
        let id = req.params.id
        let token = req.params.token
        User.getByToken(id, token).then((result) => {
            if (result) {
                console.log('usuario e token encontrados')
                User.active(result.id).then(() => { })
                User.resetToken(result.id).then(() => { })
            } else {
                console.log('usuario ou token não localizados')
            }
        })
    }
}