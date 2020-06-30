exports.ensureAuthenticated = (roles = null) => {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            var grupos = req.user.grupos
            var podeContinuar = false
            if (!roles) {
                podeContinuar = true
            } else {
                grupos.forEach(grupo => {
                    roles.map((role) => {
                        if(grupo === role){
                            podeContinuar = true
                        }
                    })
                });
            }
            podeContinuar ? next() : res.send('não tem permissao para acessar essa rota')
        } else {
            console.log('não autenticado')
            res.redirect('/login')
        }
    }
}