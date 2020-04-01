const knex = require('knex')
const knexConfigs = require('../knexfile')
var bcrypt = require('bcryptjs');
var util = require('../helpers/Util')
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
        return db(TABLE_NAME).where({
            email: 'enriqueboni80@gmail.com',
            password: '$2a$08$tUE7kUJShLZ55ih9b2tg0edicBwLjn57lQwt1.jeJFIrQj0gKz9pk'
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
    }
}