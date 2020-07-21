const User = require('../../service/Users');
var util = require('../../helpers/Util')
var forgotPasswordEvent = require('../../events/forgotPasswordEvent')


module.exports = {
    async sendResetLinkEmail(req, res, next) {
        try {
            let user = await User.getByEmail(req.body.email)
            if(!user){
                return res.status(400).json({ error: "email nao localizado" })
            }
            /* user.activation_token = util.gerarActivationToken() */
            /* User.setNewToken(user.id, user.token).then(() => {}) */
            forgotPasswordEvent(user)
            res.status(200).json({ success: true, userId: user.id, message: 'ok' });
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    },
    async resetPassword(req, res) {
        try {
            let user = await User.getByToken(req.body)
            let newPassword = util.gerarHash(req.body.password)
            await User.updatePassword(user.id, newPassword)
            await User.validate(user.id)
            res.status(200).json({ success: true, message: 'ok' });
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}
