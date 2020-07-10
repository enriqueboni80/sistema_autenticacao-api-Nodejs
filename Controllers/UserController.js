module.exports = {
    index(req, res, next) {
        /* res.send('respond with a resource'); */
        res.status(200).send('funcionando')
    },
    store(req, res, next) {
        res.send('Alguma ação de post');
    },
}