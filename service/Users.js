const knex = require('knex')
const knexConfigs = require('../knexfile')
const util = require('../helpers/Util')
const bcrypt = require('bcryptjs');
const Util = require('../helpers/Util');
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
        return db(TABLE_NAME).where('email', email).first()
    },
    getByToken(id, token) {
        return db(TABLE_NAME)
            .where('id', id)
            .where('token', token)
            .first()
    },
    async setNewToken(id, newToken) {
        return await db(TABLE_NAME)
        .where('id', id)
        .update('token', newToken)
    },
    register(user) {
        return db(TABLE_NAME).insert(user);
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
    },
    updatePassword(userID, newPassword) {
        console.log(userID, newPassword)
        return db(TABLE_NAME)
            .where('id', userID)
            .update({
                password: newPassword,
                updated_at: util.getNow()
            })
    },
    compararPasswordsBycrypt(passwordDigitado, passwordDoBanco) {
        return bcrypt.compareSync(passwordDigitado, passwordDoBanco)
    }
}
