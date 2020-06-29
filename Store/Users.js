const knex = require('knex')
const knexConfigs = require('../knexfile')
const util = require('../helpers/Util')
const bcrypt = require('bcryptjs');
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
    auth(email, password) {
        //função desabilitada - erro com bycript (Ver em configs/local.strategy) 
        return db(TABLE_NAME).where({
            email: email,
            password: password
        }).first()
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
    updatePassword(userID, newPassword){
        return db(TABLE_NAME)
            .where('id', userID)
            .update({
                password: newPassword,
            })
    },
    compararPasswordsBycrypt(passwordDigitado, passwordDoBanco) {
        return bcrypt.compareSync(passwordDigitado, passwordDoBanco)
    }
}
