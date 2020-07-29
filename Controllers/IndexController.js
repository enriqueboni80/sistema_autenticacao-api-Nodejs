module.exports = {
    index(req, res, next) {
        res.status(200).send([{'nome': 'evento de divulgação 1'}, {'nome': 'evento de divulgação 2'}])
    },
    admin(req, res, next) {
        res.render('admin');
    },
    home(req, res, next) {
        res.status(200).send([{'nome': 'EVENTO QUE VAI PARTICIPAR 1'}, {'nome': 'EVENTO QUE VAI PARTICIPAR 2'}])
        /* res.render('home'); */
    },
}