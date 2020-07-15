const User = require('../../service/Users');
var util = require('../../helpers/Util')
var registerEvent = require('../../events/RegisterEvent');
const { restart } = require('nodemon');

module.exports = {
    async register(req, res) {
        try {
            let result = await User.register(req.body)
            let user_id = result
            let user = await User.getByID(user_id)
            registerEvent(user)
            return res.status(201).json({ success: true, userId: user.id, message: 'ok' });
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async active(req, res) {
        try {
            let user = await User.getByToken(req.body)
            await User.active(user.id)
            res.status(200).json({ success: true, message: 'Token Validado' })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}