const Eventos = require('../service/Eventos');

module.exports = {
    async index(req, res, next) {
        let eventos = await Eventos.getAll()
        res.status(200).send(eventos)
    },
    async store(req, res, next) {
        try {
            let evento_id = await Eventos.store(req.body)
            return res.status(201).json({ success: true, eventoId: evento_id, message: 'ok' });
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    },
    async show(req, res, next) {
        console.log(req.params.id);
        let eventoId = req.params.id;
        let evento = await Eventos.getByID(eventoId)
        return res.send(evento);
    },
    async update(req, res, next) {
        try {
            await Eventos.update(req.body)
            return res.status(200).json({ success: true, message: 'ok' });
        } catch (error) {
            return res.status(400).json({ success: false, message: "deu problema" });
        }
    },
    async destroy(req, res, next) {
        let eventoId = req.params.id;
        let evento = await Evento.getByID(eventoId)
        res.send(`Deletar o evento (ainda não deleta no banco) - id: ${evento.id}, name:${evento.username} `);
    },
}