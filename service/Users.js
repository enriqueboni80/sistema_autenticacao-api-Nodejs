require('dotenv').config()
const knex = require('knex')
const knexConfigs = require('../knexfile')
const util = require('../helpers/Util')
const bcrypt = require('bcryptjs');
const Util = require('../helpers/Util');
const db = knex(knexConfigs[process.env.NODE_ENV])

const TABLE_NAME = 'users'

module.exports = {
    getAll() {
        return db(TABLE_NAME).select('*')
    },

    getByID(id) {
        return db(TABLE_NAME).where('id', id).first()
    },

    getByEmail(email) {
        if (email === undefined || email === '') throw new Error("Email é um atributo obrigatório")
        return db(TABLE_NAME).where('email', email).first()
    },

    async getByToken(user) {
        if (user.activationtoken === undefined || user.activationtoken === '') throw new Error("Falta o activation token")
        if (user.id === undefined || user.id === '') throw new Error("Falta o ID do usuario")
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

        if (user.username === undefined || user.username === '') throw new Error("username é um atributo obrigatório")
        if (user.email === undefined || user.email === '') throw new Error("Email é um atributo obrigatório")
        if (user.password === undefined || user.password === '') throw new Error("Password é um atributo obrigatório")

        if (user.username.length < 4 || user.username.length > 50) throw new Error("username não pode ser menor que 4 e nem maior que 50")

        const regexEmail = new RegExp(/^([\w\+\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/)
        if (!regexEmail.test(user.email)) throw new Error("Email não corresponde ao regex")

        const regxPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Zçã@!.\d]{7,}$/);
        if (!regxPassword.test(user.password)) throw new Error("Password não corresponde ao regex")


        let existEmail = await this.getByEmail(user.email)
        if (existEmail) {
            throw new Error("Já existe um usuário com esse email")
        }

        let _user = {
            username: user.username,
            email: user.email,
            password: util.gerarHash(user.password),
            activation_token: util.gerarActivationToken(),
            created_at: util.getNow()
        }

        return (await db(TABLE_NAME).insert(_user).returning('id')).toString();
    },

    validate(id) {
        return db(TABLE_NAME)
            .where('id', id)
            .update({
                validated: true,
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

    update(user) {
        return db(TABLE_NAME)
            .where('id', user.user_id)
            .update({
                username: user.username,
                email: user.email,
                password: util.gerarHash(user.password),
            });
    },

    compararPasswordsBycrypt(passwordDigitado, passwordDoBanco) {
        return bcrypt.compareSync(passwordDigitado, passwordDoBanco)
    }
}
