const User = require('../service/Users');
const Endereco = require('../service/Enderecos');
const GruposUsuarios = require('../service/GruposUsuarios');

module.exports = {
    async index(req, res, next) {
        /* res.send('respond with a resource'); */
        let users = await User.getAll()
        res.status(200).send(users)
    },
    async store(req, res, next) {
        try {
            let user_id = await User.register(req.body)
            let user = await User.getByID(user_id)
            await GruposUsuarios.setGroup(user_id, req.body.grupo)
            return res.status(201).json({ success: true, userId: user.id, email: user.email, message: 'ok' });
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    },
    async show(req, res, next) {
        let userId = req.params.id;
        let user = await User.getByID(userId)
        res.send(user);
    },
    async update(req, res, next) {
        //Insiro o id do usuario logado no body
        req.body.user_id = req.usuario.id
        try {
            await User.update(req.body)
            if (req.body.endereco) {
                let endereco = await Endereco.getByUserId(req.body.user_id)
                if (endereco.length === 0) {
                    await Endereco.create(req.body)
                } else {
                    await Endereco.update(req.body)
                }
            }
            return res.status(200).json({ success: true, message: 'ok' });
        } catch (error) {
            return res.status(400).json({ success: false, message: "deu problema" });
        }
    },

    async destroy(req, res, next) {
        let userId = req.params.id;
        let user = await User.getByID(userId)
        res.send(`Deletar o usuario (ainda não deleta no banco) - id: ${user.id}, name:${user.username} `);
    },
}