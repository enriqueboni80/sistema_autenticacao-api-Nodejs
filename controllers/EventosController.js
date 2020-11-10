const Eventos = require('../service/Eventos');
const Endereco = require('../service/Enderecos');

module.exports = {
    async index(req, res, next) {
        let eventos = await Eventos.getAll()
        res.status(200).send(eventos)
    },
    async store(req, res, next) {
        try {
            let evento_id = await Eventos.store(req.body)
            if (req.body.endereco) {
                req.body.evento_id = evento_id
                await Endereco.create(req.body)
            }
            return res.status(201).json({ success: true, eventoId: evento_id, message: 'ok' });
        } catch (errors) {
            return res.status(400).json({ errors: errors.message })
        }
    },
    async show(req, res, next) {
        let eventoId = req.params.id;
        let evento = await Eventos.getByID(eventoId)
        return res.send(evento);
    },
    async update(req, res, next) {
        try {
            await Eventos.update(req.body)
            req.body.evento_id = req.body.id
            if (req.body.endereco) {
                let endereco = await Endereco.getByEventoId(req.body.id)
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
        let eventoId = req.params.id;
        try {
            await Eventos.destroy(eventoId)
            return res.status(200).json({ success: true, message: 'ok' });
        } catch (error) {
            return res.status(400).json({ success: false, message: "deu problema" });
        }
    },
}