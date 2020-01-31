const knex = require('knex')
const knexConfigs = require('../../knexfile')
const db = knex(knexConfigs.development)

const TABLE_NAME = 'users'

module.exports = {
    register(user) {
        return db(TABLE_NAME).insert(user);
    }
}