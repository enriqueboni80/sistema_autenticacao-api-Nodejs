
require('dotenv').config()
var jwtDisableList = require("./../../jwt-disablelist")


module.exports = {
    desAutenticar(req, res) {
        jwtDisableList.add(req.usuario.jwtToken)
        res.status(201).send('lOGOUT: TOKEN DESABILITADO')
    }
}
