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
        return db(TABLE_NAME).where('id', id).first()
    },
    getByEmail(email) {
        return db(TABLE_NAME).where('email', email).first()
    },
    getByToken(id, token) {
        return db(TABLE_NAME)
            .where('id', id)
            .where({ activation_token: token })
            .first()
    },
    async setNewToken(id, newToken) {
        return await db(TABLE_NAME)
            .where('id', id)
            .update('activation_token', newToken)
    },
    async register(user) {
        
        if (user.nome === undefined || user.nome === '') return { error: "Nome é um atributo obrigatório" }
        if (user.email === undefined || user.email === '') return { error: "Email é um atributo obrigatório" }
        if (user.password === undefined || user.password === '') return { error: "Password é um atributo obrigatório" }

        let existEmail = await this.getByEmail(user.email)
        if (existEmail) {
            return { error: "Já existe um usuário com esse email" }
        }

        let _user = {
            nome: user.nome,
            email: user.email,
            password: util.gerarHash(user.password),
            activation_token: util.gerarActivationToken(),
            created_at: util.getNow()
        }
        
        return db(TABLE_NAME).insert(_user);
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
                activation_token: null,
            })
    },
    updatePassword(userID, newPassword) {
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
