const User = require('../../service/Users');
var util = require('../../helpers/Util')
var registerEvent = require('../../events/RegisterEvent')

module.exports = {
    async register(req, res) {
        let user_id = await User.register(req.body)
        let user = await User.getByID(user_id)
        if (user) {
            registerEvent(user)
            res.status(201).json({ success: true, userId: user.id, message: 'ok' });
        } else {
            res.status(401).json({ success: false, message: 'Erro na criação do usuario' })
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