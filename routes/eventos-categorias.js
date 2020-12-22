var express = require('express');
var router = express.Router();
var EventosCategoriasController = require('../controllers/EventosCategoriasController');
var auth = require('../middlewares/ensureAuthenticated')

/* CATEGORIAS ROUTES */
router.get('/', EventosCategoriasController.index);

module.exports = router;