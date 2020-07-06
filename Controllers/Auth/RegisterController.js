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
            activation_token: util.gerarActivationToken(),
            created_at: util.getNow()
        }
        User.register(user).then((result) => {
            user.id = result
            registerEvent(user)
            res.json({ success: true, userId: user.id, message: 'ok' });
        })
    },
    active(req, res) {
        console.log('chegou aqui')
        let id = req.body.id
        let activationToken = req.body.activationtoken
        console.log(id, activationToken)
        let urlRedirect = "http://www.terra.com.br"
        User.getByToken(id, activationToken).then((user) => {
            if (user) {
                console.log('usuario e token encontrados')
                User.active(user.id).then(() => {
                    res.status(200).send('Token Ativo com sucesso')
                })
            } else {
                res.status(401).send('Token não validado')
            }
        })
    }
}