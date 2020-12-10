var express = require('express');
var router = express.Router();
var EventosInscricoesController = require('../controllers/EventosInscricoesController');
var auth = require('../middlewares/ensureAuthenticated')

/* USERS ROUTES */
router.post('/', EventosInscricoesController.index);
router.get('/:eventoId', EventosInscricoesController.getInscritosByEventoId);
router.get('/:userId/user', EventosInscricoesController.getInscricoesByUserId);

module.exports = router;