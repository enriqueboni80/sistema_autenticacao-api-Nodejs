require('dotenv').config()
const knex = require('knex')
const knexConfigs = require('../knexfile')
const db = knex(knexConfigs[process.env.NODE_ENV])
const constants = require('../helpers/Constants')


const TABLE_NAME = 'eventos_inscricoes'

module.exports = {

    getTodasIncricoes() {
        return db(TABLE_NAME).select('*')
    },

    inscrever(idEvento, idUsuario) {
        return db(TABLE_NAME).insert({ 'evento_id': idEvento, 'user_id': idUsuario })
    },

    desinscrever(idEvento, idUsuario) {
        return db(TABLE_NAME)
            .where('evento_id', idEvento)
            .where('user_id', idUsuario)
            .del()
    },

    getInscritosByEventoId(idEvento) {
        return db(TABLE_NAME)
            .select(['*', `${TABLE_NAME}.created_at as data_inscricao`])
            .leftJoin('users', `${TABLE_NAME}.user_id`, 'users.id')
            .where('evento_id', idEvento)
    },

    getInscricoesByUserId(idUser) {
        return db(TABLE_NAME)
            .select('*')
            .leftJoin('users', `${TABLE_NAME}.user_id`, 'users.id')
            .leftJoin('eventos', `${TABLE_NAME}.evento_id`, 'eventos.id')
            .where('user_id', idUser)
    },

    getInscricaoByUserId(idUser, idEvento) {
        return db(TABLE_NAME)
            .select('*')
            .leftJoin('users', `${TABLE_NAME}.user_id`, 'users.id')
            .leftJoin('eventos', `${TABLE_NAME}.evento_id`, 'eventos.id')
            .where('user_id', idUser)
            .where('evento_id', idEvento)
    },

    async estevePresente(idEvento, idUsuario) {
        let inscricao = await this.getInscricaoByUserId(idUsuario, idEvento)
        let chaveador = false
        if (inscricao[0].esteve_presente === true) {
            chaveador = false
        } else {
            chaveador = true
        }
        return db(TABLE_NAME).update({ esteve_presente: chaveador })
            .where('evento_id', idEvento)
            .where('user_id', idUsuario)
    },
}

/* return db(TABLE_NAME).select('*').leftJoin('enderecos', `${TABLE_NAME}.id`, 'enderecos.evento_id') */