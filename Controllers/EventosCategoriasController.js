const EventosCategorias = require('../service/EventosCategorias');


module.exports = {
    async index(req, res, next) {
        let categorias = await EventosCategorias.getAll()
        res.status(200).send(categorias)
    }
}