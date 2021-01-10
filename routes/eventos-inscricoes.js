var express = require('express');
var router = express.Router();
var EventosInscricoesController = require('../controllers/EventosInscricoesController');
var auth = require('../middlewares/ensureAuthenticated')
const constants = require('./../helpers/Constants')

/* USERS ROUTES */
router.get('/', auth.ensureAuthenticated([constants.ADMINISTRATORS]), EventosInscricoesController.index);
router.post('/inscrever', auth.ensureAuthenticated(), EventosInscricoesController.inscrever);
router.post('/desinscrever', auth.ensureAuthenticated(), EventosInscricoesController.desinscrever);
router.get('/:eventoId', auth.ensureAuthenticated(), EventosInscricoesController.getInscritosByEventoId);
router.get('/:userId/user', auth.ensureAuthenticated(), EventosInscricoesController.getInscricoesByUserId);
router.post('/esteve-presente', auth.ensureAuthenticated(), EventosInscricoesController.estevePresente);

module.exports = router;