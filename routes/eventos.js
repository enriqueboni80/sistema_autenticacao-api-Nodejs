var express = require('express');
var router = express.Router();
var EventosController = require('../controllers/EventosController');
var auth = require('../middlewares/ensureAuthenticated')
const constants = require('./../helpers/Constants')

/* USERS ROUTES */
router.get('/', EventosController.index);
router.post('/store', auth.ensureAuthenticated([constants.ADMINISTRATORS]), EventosController.store);
router.get('/:id', EventosController.show);
router.put('/update', auth.ensureAuthenticated([constants.ADMINISTRATORS]), EventosController.update);
router.delete('/:id/delete', auth.ensureAuthenticated([constants.ADMINISTRATORS]), EventosController.destroy);

module.exports = router;