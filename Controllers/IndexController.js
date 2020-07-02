module.exports = {
    index(req, res, next) {
        res.render('index', { title: 'Express' });
    },
    admin(req, res, next) {
        res.render('admin');
    },
    home(req, res, next) {
        res.status(200).send([{'nome': 'eventos 1'}, {'nome': 'eventos 2'}])
        /* res.render('home'); */
    },
}