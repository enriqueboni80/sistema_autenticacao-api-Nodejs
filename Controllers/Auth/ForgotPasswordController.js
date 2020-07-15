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
    async resetPassword(req, res) {
        try {
            let user = await User.getByToken(req.body)
            let newPassword = util.gerarHash(req.body.password)
            await User.updatePassword(user.id, newPassword)
            await User.active(user.id)
            res.status(200).json({ success: true, message: 'ok' });
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}
