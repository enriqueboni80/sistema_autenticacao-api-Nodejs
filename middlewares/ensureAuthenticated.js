exports.ensureAuthenticated = (roles = null) => {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            // req.user is available for use here
            var podeContinuar = false
            if (!roles) {
                podeContinuar = true
            } else {
                roles.map((role) => {
                    switch (role) {
                        case 'admins':
                            podeContinuar = true
                            break;
                        case 'usuarios':
                            podeContinuar = true
                            break;
                        default:
                            podeContinuar = false
                            break;
                    }
                })
            }
            
            podeContinuar ? next() : res.send('não tem permissao para acessar essa rota')

        } else {
            console.log('não autenticado')
            res.redirect('/login')
        }
    }
}