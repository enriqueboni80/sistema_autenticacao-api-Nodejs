module.exports = {
    index(req, res, next) {
        res.status(200).send([{'nome': 'index'}])
    },
    admin(req, res, next) {
        res.render('admin');
    },
    home(req, res, next) {
        res.status(200).send([{'home': 'Home'}])
        /* res.render('home'); */
    },
}