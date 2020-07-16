const knex = require('knex')
const knexConfigs = require('../knexfile')
const db = knex(knexConfigs.development)
const constants = require('../helpers/Constants')


const TABLE_NAME = 'grupos_usuarios'

module.exports = {
    getGroupsById(idUsuario) {
        return db(TABLE_NAME).where('user_id', idUsuario)
    },
    setClientGroup(idUsuario) {
        return db(TABLE_NAME).insert({'user_id': idUsuario, 'grupo_id' : constants.CLIENTS})
    }
}