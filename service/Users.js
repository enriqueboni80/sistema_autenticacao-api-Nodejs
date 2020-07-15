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
        if (email === undefined || email === '') throw new Error("Falta receber o email")
        return db(TABLE_NAME).where('email', email).first()
    },

    async getByToken(user) {
        if (user.id === undefined || user.nome === '') throw new Error("Falta o ID do usuario")
        if (user.activationtoken === undefined || user.email === '') throw new Error("Falta o activation token")
        return db(TABLE_NAME)
            .where('id', user.id)
            .where({ activation_token: user.activationtoken })
            .first()
    },

    setNewToken(id, newToken) {
        return db(TABLE_NAME)
            .where('id', id)
            .update('activation_token', newToken)
    },

    async register(user) {

        if (user.nome === undefined || user.nome === '') throw new Error("Nome é um atributo obrigatório")
        if (user.email === undefined || user.email === '') throw new Error("Email é um atributo obrigatório")
        if (user.password === undefined || user.password === '') throw new Error("Password é um atributo obrigatório")

        let existEmail = await this.getByEmail(user.email)
        if (existEmail) {
            throw new Error("Já existe um usuário com esse email")
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
