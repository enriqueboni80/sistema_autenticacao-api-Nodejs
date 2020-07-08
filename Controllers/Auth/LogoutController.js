
var jwt = require('jsonwebtoken')
var jwtDisableList = require("../../jwt-disablelist")
require('dotenv').config()

module.exports = {
    desAutenticar(req, res) {
        jwtDisableList.add(req.usuario.jwtToken)
        res.status(201).send('lOGOUT: TOKEN DESABILITADO')
    }
}
