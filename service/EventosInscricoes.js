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
            .select('*')
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
}

return db(TABLE_NAME).select('*').leftJoin('enderecos', `${TABLE_NAME}.id`, 'enderecos.evento_id')