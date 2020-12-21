var express = require('express');
var router = express.Router();
var EventosInscricoesController = require('../controllers/EventosInscricoesController');
var auth = require('../middlewares/ensureAuthenticated')

/* USERS ROUTES */
router.get('/', EventosInscricoesController.index);
router.post('/', EventosInscricoesController.inscrever);
router.post('/desinscrever', EventosInscricoesController.desinscrever);
router.get('/:eventoId', EventosInscricoesController.getInscritosByEventoId);
router.get('/:userId/user', EventosInscricoesController.getInscricoesByUserId);
router.post('/esteve-presente', EventosInscricoesController.estevePresente);

module.exports = router;