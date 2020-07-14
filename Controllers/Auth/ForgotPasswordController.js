const User = require('../../service/Users');
var util = require('../../helpers/Util')
var forgotPasswordEvent = require('../../events/forgotPasswordEvent')


module.exports = {
    sendResetLinkEmail(req, res, next) {
        email = req.body.email
        User.getByEmail(email).then((user) => {
            /* user.activation_token = util.gerarActivationToken() */
            /* User.setNewToken(user.id, user.token).then(() => {}) */
            forgotPasswordEvent(user)
            res.status(200).json({ success: true, userId: user.id, message: 'ok' });
        })
    },
    resetPassword(req, res) {
        let id = req.body.id
        let activationToken = req.body.activationtoken
        User.getByToken(id, activationToken).then((user) => {
            if (user) {
                let newPassword = util.gerarHash(req.body.password)
                User.updatePassword(user.id, newPassword).then(() => {
                    res.status(200).json({ success: true, message: 'ok' });
                })
            } else {
                res.status(401).json({ success: false, message: 'Algum erro aconteceu' });
            }
        })
    }
}