require('dotenv').config()
const knex = require('knex')
const knexConfigs = require('../knexfile')
const Util = require('../helpers/Util');
const db = knex(knexConfigs[process.env.NODE_ENV])

const TABLE_NAME = 'eventos'

module.exports = {

    getAll() {
        return db(TABLE_NAME).select('*')
    },


    async store(evento) {

        if (evento.name === undefined || evento.name === '') throw new Error("name é um atributo obrigatório")
        if (evento.qtd_vagas === undefined || evento.qtd_vagas === '') throw new Error("quantidade de Vagas é um atributo obrigatório")
        if (evento.palestrante === undefined || evento.palestrante === '') throw new Error("palestrante é um atributo obrigatório")
        if (evento.gratuito === undefined || evento.gratuito === '') throw new Error("gratuito é um atributo obrigatório")
        if (evento.ativo === undefined || evento.ativo === '') throw new Error("ativo é um atributo obrigatório")
        if (evento.descricao === undefined || evento.descricao === '') throw new Error("descricao é um atributo obrigatório")
        if (evento.data_inicio === undefined || evento.data_inicio === '') throw new Error("data_inicio é um atributo obrigatório")
        if (evento.data_fim === undefined || evento.data_fim === '') throw new Error("data_fim é um atributo obrigatório")

        let _evento = {
            name: evento.name,
            qtd_vagas: evento.qtd_vagas,
            palestrante: evento.palestrante,
            url_imagem: evento.url_imagem,
            detalhes: evento.detalhes,
            descricao: evento.descricao,
            preco: evento.preco,
            ativo: evento.ativo,
            gratuito: evento.gratuito,
            privado: evento.privado,
            cancelado: evento.cancelado,
            data_inicio: evento.data_inicio,
            data_fim: evento.data_fim
        }

        return db(TABLE_NAME).insert(_evento);
    },

    getByID(id) {
        return db(TABLE_NAME).where('id', id).first()
    },

    update(evento) {
        return db(TABLE_NAME)
            .where('id', evento.id)
            .update({
                name: evento.name,
                qtd_vagas: evento.qtd_vagas,
                palestrante: evento.palestrante,
                url_imagem: evento.url_imagem,
                detalhes: evento.detalhes,
                descricao: evento.descricao,
                preco: evento.preco,
                ativo: evento.ativo,
                gratuito: evento.gratuito,
                privado: evento.privado,
                cancelado: evento.cancelado,
                data_inicio: evento.data_inicio,
                data_fim: evento.data_fim
            });
    },

    destroy() {
        return '';
    }
}
