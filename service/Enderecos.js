const knex = require('knex')
const knexConfigs = require('../knexfile')
const db = knex(knexConfigs.development)
const constants = require('../helpers/Constants')


const TABLE_NAME = 'enderecos'

module.exports = {
    create(req) {
        let endereco = {
            user_id: req.id,
            rua: req.endereco.rua
        }
        return db(TABLE_NAME).insert(endereco)
    },
    update(req) {
        return db(TABLE_NAME)
            .where('user_id', req.id)
            .update({
                rua: req.endereco.rua
            });
    },
    getByUserId(idUsuario) {
        return db(TABLE_NAME).where('user_id', idUsuario)
    },
}