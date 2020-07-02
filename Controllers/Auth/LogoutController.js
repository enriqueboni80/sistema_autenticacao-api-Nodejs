module.exports = {
    desAutenticar(req, res) {
        req.session.destroy();
        req.logout();
        console.log('Logout Realizado')
        res.redirect('/');
    }
}
