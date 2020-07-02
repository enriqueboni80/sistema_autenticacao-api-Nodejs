const User = require('../../service/Users');
var util = require('../../helpers/Util')
var registerEvent = require('../../events/RegisterEvent')

module.exports = {
    showRegistrationForm(req, res, next) {
        res.send('exibir formulario de cadastro');
    },
    register(req, res, next) {
        user = {
            nome: req.body.nome,
            email: req.body.email,
            password: util.gerarHash(req.body.password),
            token: util.gerarToken(),
            created_at: util.getNow()
        }
        User.register(user).then((result) => {
            user.id = result
            registerEvent(user)
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
                res.send('Email Validado! Agora é meter bronca!')
            } else {
                console.log('usuario ou token não localizados')
            }
        })
    },
    enviarEmail(req, res) {
        user = {
            'id': '25',
            'nome': 'Enrique Santos',
            'email': 'enriqueboni80@hotmail.com',
            'token': 'dfasdfadfadfadf'
        }
        registerEvent(user)
    }
}