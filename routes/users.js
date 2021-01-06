var express = require('express');
var router = express.Router();
var UserController = require('./../controllers/UserController');
var auth = require('./../middlewares/ensureAuthenticated')
const constants = require('./../helpers/Constants')

/* USERS ROUTES */
router.get('/', auth.ensureAuthenticated([constants.ADMINISTRATORS]), UserController.index);
router.post('/store', auth.ensureAuthenticated([constants.ADMINISTRATORS]), UserController.store);
router.get('/:id', auth.ensureAuthenticated(), UserController.show);
router.put('/update', auth.ensureAuthenticated(), UserController.update);
router.delete('/:id/delete', auth.ensureAuthenticated(), UserController.destroy);

module.exports = router;