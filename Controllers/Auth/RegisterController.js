const User = require('../../service/Users');
var util = require('../../helpers/Util')
var registerEvent = require('../../events/RegisterEvent');
const { restart } = require('nodemon');

module.exports = {
    async register(req, res) {

        let result = await User.register(req.body)

        if (!result.error) {
            let user_id = result
            let user = await User.getByID(user_id)
            if (user) {
                registerEvent(user)
                return res.status(201).json({ success: true, userId: user.id, message: 'ok' });
            } else {
                return res.status(401).json({ success: false, message: 'Erro na criação do usuario' })
            }
        } else {
            return res.status(400).json(result)
        }
    },
    
    active(req, res) {
        let id = req.body.id
        let activationToken = req.body.activationtoken
        User.getByToken(id, activationToken).then((user) => {
            if (user) {
                User.active(user.id).then(() => {
                    res.status(200).json({ success: true, message: 'Token Validado' })
                })
            } else {
                res.status(401).json({ success: false, message: 'Token nao validado' })
            }
        })
    }
}