const jwt = require('jsonwebtoken')
require('dotenv').config()
var jwtDisableList = require("../jwt-disablelist")

exports.ensureAuthenticated = (roles = null) => {
    return function (req, res, next) {
        const jwtToken = req.headers.authorization.split(' ')[1]
        
        if (jwtDisableList.list.length > 0) {
            console.log(jwtDisableList.list.forEach((jwtTokenDeny) => {
                if(jwtToken === jwtTokenDeny){
                    return res.status(401).send('TOKEN DESABILITADO')
                }
            }))
        }

        try {
            const decode = jwt.verify(jwtToken, process.env.JWT_KEY)
            req.usuario = decode;
            req.usuario.jwtToken = jwtToken
            var grupos = decode.grupos
            var podeContinuar = false
            if (!roles) {
                podeContinuar = true
            } else {
                grupos.forEach(grupo => {
                    roles.map((role) => {
                        if (grupo === role) {
                            podeContinuar = true
                        }
                    })
                });
            }
            podeContinuar ? next() : res.status(401).send('SEM PERMISSÃO PARA ESSA ROTA')
        } catch (error) {
            return res.status(401).send('FALHA NA VERIFICACAO')
        }
    }
}