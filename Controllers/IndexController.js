module.exports = {
    index(req, res, next) {
        res.render('index', { title: 'Express' });
    },
    home(req, res, next) {
        res.render('home');
    },
}