var express = require('express');
var router = express.Router();
var EventosInscricoesController = require('../controllers/EventosInscricoesController');
var auth = require('../middlewares/ensureAuthenticated')

/* USERS ROUTES */
router.post('/', EventosInscricoesController.index);

module.exports = router;