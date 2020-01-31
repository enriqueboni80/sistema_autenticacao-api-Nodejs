const knex = require('knex')
const knexConfigs = require('../../knexfile')
var util = require('../../Helpers/Util')
const db = knex(knexConfigs.development)

const TABLE_NAME = 'users'

module.exports = {
    register(user) {
        return db(TABLE_NAME).insert(user);
    },
    getByToken(id, token) {
        return db(TABLE_NAME)
            .where('id', id)
            .where('token', token)
            .first()
    },
    active(id) {
        return db(TABLE_NAME)
            .where('id', id)
            .update({
                active: true,
                updated_at: util.getNow()
            })
    },
    resetToken(id) {
        return db(TABLE_NAME)
            .where('id', id)
            .update({
                token: null,
            })
    }
}