module.exports = {
    index(req, res, next) {
        res.render('index', { title: 'Express' });
    },
    admin(req, res, next) {
        res.render('admin');
    },
    home(req, res, next) {
        res.render('home');
    },
}