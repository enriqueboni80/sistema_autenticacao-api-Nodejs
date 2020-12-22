var express = require('express');
var router = express.Router();
var EventosController = require('../controllers/EventosController');
var auth = require('../middlewares/ensureAuthenticated')

/* USERS ROUTES */
router.get('/', EventosController.index);
router.post('/store', EventosController.store);
router.get('/:id', EventosController.show);
router.put('/update', EventosController.update);
router.delete('/:id/delete', EventosController.destroy);

module.exports = router;