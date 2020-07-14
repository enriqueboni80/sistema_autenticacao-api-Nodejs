var passport = require('passport')
var User = require("../../service/Users")
var gruposUsuarios = require("../../service/GruposUsuarios")
var jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    autenticar(req, res, next) {
        var email = req.body.email
        var password = req.body.password
        User.getByEmail(email).then((user) => {
            if (!user) {
                return res.status(401).send('FALHA NA AUTENTICACAO')
            } else {
                var passwordsSaoIguais = User.compararPasswordsBycrypt(password, user.password)
                if (passwordsSaoIguais) {
                    if (!user.active) {
                        return res.status(401).send('USUARIO NÃO ATIVADO')
                    } else {
                        //ele checar aqui em quais grupos o usuario pertence - Necessário refatorar
                        var _gruposQuePertence = []
                        gruposUsuarios.getGroupsById(user.id).then((result) => {
                            result.map((group) => {
                                _gruposQuePertence.push(group.grupo_id)
                            })
                            user.grupos = _gruposQuePertence
                            let _jwtToken = jwt.sign({
                                id: user.id,
                                email: user.email,
                                grupos: user.grupos
                            }, process.env.JWT_KEY, {
                                expiresIn: "9h"
                            })
                            return res.status(200).send({
                                success: true,
                                mensagem: "AUTENTICADO COM SUCESSO",
                                jwtToken: _jwtToken
                            })
                        })
                    }
                }
                else {
                    return res.status(401).send('FALHA NA AUTENTICACAO')
                }
            }
        })
    }
}