const EventosInscricoes = require('../service/EventosInscricoes');


module.exports = {
    async index(req, res, next) {
        try {
            await EventosInscricoes.inscrever(req.body.evento_id, req.body.user_id)
            return res.status(201).json({ success: true, message: 'ok' });
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    },

    async getInscritosByEventoId(req, res, next) {
        try {
            await EventosInscricoes.getInscritosByEventoId(req.params.eventoId).then((response) => {
                return res.status(201).json(response)
            })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }

    }
}