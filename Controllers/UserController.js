const User = require('./../service/Users');
const Endereco = require('./../service/Enderecos');

module.exports = {
    index(req, res, next) {
        /* res.send('respond with a resource'); */
        res.status(200).send('funcionando')
    },
    store(req, res, next) {
        res.send('Alguma ação de post');
    },
    async update(req, res, next) {
        if (req.usuario.id !== req.body.id) {
            return res.status(400).json({ success: false, message: 'não autorizado' });
        }
        try {
            await User.update(req.body)
            if (req.body.endereco) {
                let endereco = await Endereco.getByUserId(req.body.id)
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
}