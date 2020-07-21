var passport = require('passport')
var User = require("../../service/Users")
var gruposUsuarios = require("../../service/GruposUsuarios")
var jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    async autenticar(req, res) {
        try {
            let user = await User.getByEmail(req.body.email)
            if (!user) {
                return res.status(400).json({ error: 'FALHA NA AUTENTICACAO' })
            }
            var passwordsSaoIguais = User.compararPasswordsBycrypt(req.body.password, user.password)
            if (passwordsSaoIguais) {
                if (!user.validated) {
                    return res.status(400).json({validated: false, error: 'USUARIO NAO ATIVADO' })
                } else {
                    let gruposUsuario = await gruposUsuarios.getGroupsById(user.id)
                    let gruposQuePertence = []
                    gruposUsuario.map((result) => {
                        gruposQuePertence.push(result.grupo_id)
                    })
                    user.grupos = gruposQuePertence
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
                }
            }
            else {
                return res.status(401).json({ error: 'FALHA NA AUTENTICACAO' })
            }
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}