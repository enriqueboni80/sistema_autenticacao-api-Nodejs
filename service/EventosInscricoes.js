require('dotenv').config()
const knex = require('knex')
const knexConfigs = require('../knexfile')
const db = knex(knexConfigs[process.env.NODE_ENV])
const constants = require('../helpers/Constants')


const TABLE_NAME = 'eventos_inscricoes'

module.exports = {
    inscrever(idEvento, idUsuario) {
        return db(TABLE_NAME).insert({'evento_id': idEvento, 'user_id' : idUsuario})
    },
}