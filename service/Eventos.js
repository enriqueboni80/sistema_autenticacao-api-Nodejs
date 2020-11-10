require('dotenv').config()
const knex = require('knex')
const knexConfigs = require('../knexfile')
const Util = require('../helpers/Util');
const db = knex(knexConfigs[process.env.NODE_ENV])

const TABLE_NAME = 'eventos'

module.exports = {

    getAll() {
        return db(TABLE_NAME).select('*').leftJoin('enderecos', `${TABLE_NAME}.id`, 'enderecos.evento_id')
    },

    async store(body) {
        this.validate(body);
        let evento = this.setEvento(body)
        return db(TABLE_NAME).insert(evento);
    },

    getByID(id) {
        return db(TABLE_NAME).where('id', id).first()
    },

    update(body) {
        this.validate(body)
        let evento = this.setEvento(body)
        return db(TABLE_NAME)
            .where('id', body.id)
            .update(evento);
    },

    destroy(id) {
        return db(TABLE_NAME)
            .where('id', id)
            .del();
    },

    setEvento(body) {
        return {
            name: body.name,
            qtd_vagas: body.qtd_vagas,
            palestrante: body.palestrante,
            url_imagem: body.url_imagem,
            detalhes: body.detalhes,
            descricao: body.descricao,
            categoria: body.categoria,
            preco: body.preco,
            ativo: body.ativo,
            gratuito: body.gratuito,
            privado: body.privado,
            cancelado: body.cancelado,
            data_inicio: body.data_inicio,
            data_fim: body.data_fim,
            prazo_inscricao: body.prazo_inscricao
        }
    },


    validate(evento) {
        
        let errors = []
        
        if (evento.name === undefined || evento.name === '')
            errors = [...errors, {property: 'name', "message": "Campo name é obrigatório"}]    
        if (evento.qtd_vagas === undefined || evento.qtd_vagas === '')
            errors = [...errors, {property: 'qtd_vagas', "message": "Campo qtd_vagas é obrigatório"}] 
        if (evento.palestrante === undefined || evento.palestrante === '')
            errors = [...errors, {property: 'palestrante', "message": "Campo palestrante é obrigatório"}]
        if (evento.gratuito === undefined || evento.gratuito === '')
            errors = [...errors, {property: 'gratuito', "message": "Campo gratuito é obrigatório"}]
        if (evento.ativo === undefined || evento.ativo === '')
            errors = [...errors, {property: 'ativo', "message": "Campo ativo é obrigatório"}]
        if (evento.descricao === undefined || evento.descricao === '')
            errors = [...errors, {property: 'descricao', "message": "Campo descricao é obrigatório"}]
        if (evento.data_inicio === undefined || evento.data_inicio === '')
            errors = [...errors, {property: 'data_inicio', "message": "Campo data_inicio é obrigatório"}]
        if (evento.data_fim === undefined || evento.data_fim === '')
            errors = [...errors, {property: 'data_fim', "message": "Campo data_fim é obrigatório"}]

        if (errors.length > 0) {
            throw new Error(errors)
        }

    }

}
