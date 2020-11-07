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

    destroy() {
        return '';
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
        if (evento.name === undefined || evento.name === '') throw new Error("name é um atributo obrigatório")
        if (evento.qtd_vagas === undefined || evento.qtd_vagas === '') throw new Error("quantidade de Vagas é um atributo obrigatório")
        if (evento.palestrante === undefined || evento.palestrante === '') throw new Error("palestrante é um atributo obrigatório")
        if (evento.gratuito === undefined || evento.gratuito === '') throw new Error("gratuito é um atributo obrigatório")
        if (evento.ativo === undefined || evento.ativo === '') throw new Error("ativo é um atributo obrigatório")
        if (evento.descricao === undefined || evento.descricao === '') throw new Error("descricao é um atributo obrigatório")
        if (evento.data_inicio === undefined || evento.data_inicio === '') throw new Error("data_inicio é um atributo obrigatório")
        if (evento.data_fim === undefined || evento.data_fim === '') throw new Error("data_fim é um atributo obrigatório")
    }

}
