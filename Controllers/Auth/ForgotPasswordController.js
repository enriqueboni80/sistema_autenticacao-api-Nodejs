const User = require('../../store/Users');
var bcrypt = require('bcryptjs');
var util = require('../../helpers/Util')
var forgotPasswordEvent = require('../../events/forgotPasswordEvent')


module.exports = {
    showLinkRequestForm(req, res, next) {
        res.send('exibir formulario de COLOCAR O EMAIL PARA RECUPERACAO');
    },
    sendResetLinkEmail(req, res, next) {
        email = req.body.email
        User.getByEmail(email).then((user) => {
            forgotPasswordEvent(user)
        })
    },
    sendResetLinkResponse(req, res, next){
        let id = req.params.id
        let token = req.params.token
        res.send(`Abrir formulario para trocar a senha com ${id} e ${token}`)
    },
    resetPassword(req, res) {
        let id = req.body.id
        let token = req.body.token
        User.getByToken(id, token).then((user) => {
            if (user) {
                console.log('usuario e token encontrados')
                let newPassword = util.gerarHash(req.body.newPassword)
                User.updatePassword(user.id, newPassword)
                console.log('senha atualizada')
            } else {
                console.log('usuario ou token não localizados')
            }
        })
    }
}