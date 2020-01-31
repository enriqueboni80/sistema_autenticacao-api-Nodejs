module.exports = {
    index(req, res, next) {
        res.send('respond with a resource');
    },
    store(req, res, next) {
        res.send('Alguma ação de post');
    },
}