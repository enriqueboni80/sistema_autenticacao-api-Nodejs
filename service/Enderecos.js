require('dotenv').config()
const knex = require('knex')
const knexConfigs = require('../knexfile')
const db = knex(knexConfigs[process.env.NODE_ENV])


const TABLE_NAME = 'enderecos'

module.exports = {
    create(req) {
        let endereco = {
            user_id: req.user_id,
            evento_id: req.evento_id,
            rua: req.endereco.rua,
            numero: req.endereco.numero,
            complemento: req.endereco.complemento,
            bairro: req.endereco.bairro,
            cidade: req.endereco.cidade,
            estado: req.endereco.estado,
            cep: req.endereco.cep,
            pais: req.endereco.pais
        }
        return db(TABLE_NAME).insert(endereco)
    },
    update(req) {

        if(req.user_id === undefined){
            req.user_id = null
        }

        if (req.evento_id === undefined) {
            req.evento_id = null
        }

        return db(TABLE_NAME)
            .where('user_id', req.user_id)
            .where('evento_id', req.evento_id)
            .update({
                rua: req.endereco.rua,
                numero: req.endereco.numero,
                complemento: req.endereco.complemento,
                bairro: req.endereco.bairro,
                cidade: req.endereco.cidade,
                estado: req.endereco.estado,
                cep: req.endereco.cep,
                pais: req.endereco.pais
            });
    },
    getByUserId(idUsuario) {
        return db(TABLE_NAME).where('user_id', idUsuario)
    },

    getByEventoId(idEvento) {
        return db(TABLE_NAME).where('evento_id', idEvento)
    },
}