const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.ensureAuthenticated = (roles = null) => {
    return function (req, res, next) {
        try {
            const jwtToken = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(jwtToken, process.env.JWT_KEY)
            req.usuario = decode;
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