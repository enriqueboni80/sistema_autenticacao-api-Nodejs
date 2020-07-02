const knex = require('knex')
const knexConfigs = require('../knexfile')
var util = require('../helpers/Util')
const db = knex(knexConfigs.development)

const TABLE_NAME = 'grupos_usuarios'

module.exports = {
    getGroupsById(idUsuario) {
        return db(TABLE_NAME).where('user_id', idUsuario)
    }
}