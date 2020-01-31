const knex = require('knex')
const knexConfigs = require('../knexfile')
const db = knex(knexConfigs.development)

const TABLE_NAME = 'users'

module.exports = {
    getAll() {
        return db(TABLE_NAME).select('*')
    },
    getByID(id) {
        return db(TABLE_NAME).where('id', id)
    },
    getByEmail(email) {
        return db(TABLE_NAME).where('email', email)
    },
    auth(email, password) {
        return db(TABLE_NAME).where({
            email: email,
            password: password
        })
    }
}