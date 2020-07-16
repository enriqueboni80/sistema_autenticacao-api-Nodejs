const User = require('../../service/Users');
const GruposUsuarios = require('../../service/GruposUsuarios');
var util = require('../../helpers/Util')
var registerEvent = require('../../events/RegisterEvent');
const { restart } = require('nodemon');

module.exports = {
    async register(req, res) {

        try {
            let existEmail = await User.getByEmail(req.body.email)
            if (existEmail) {
                return res.status(400).json({ error: 'Já existe um usuário com esse email' })
            }
            let result = await User.register(req.body)
            let user_id = result
            let user = await User.getByID(user_id)
            await GruposUsuarios.setClientGroup(user_id)
            registerEvent(user)
            return res.status(201).json({ success: true, userId: user.id, email: user.email, message: 'ok' });
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async validate(req, res) {
        try {
            let user = await User.getByToken(req.body)
            await User.validate(user.id)
            res.status(200).json({ success: true, message: 'Token Validado' })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}