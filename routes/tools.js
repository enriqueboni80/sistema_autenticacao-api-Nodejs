var express = require('express');
var router = express.Router();

/* TOOLS ROUTES */

/*
* @ Verifica se back e front estão se conectando
*/
router.get('/teste-integracao', function (req, res, next) {
    res.status(200).send(['teste1', 'teste2'])
});

module.exports = router;