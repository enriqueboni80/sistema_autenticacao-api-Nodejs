var express = require('express');
var router = express.Router();
var UserController = require('./../controllers/UserController');
var auth = require('./../middlewares/ensureAuthenticated')

/* USERS ROUTES */
router.get('/', UserController.index);
router.post('/store', UserController.store);
router.get('/:id', UserController.show);
router.put('/update', auth.ensureAuthenticated(), UserController.update);
router.delete('/:id/delete', UserController.destroy);

module.exports = router;