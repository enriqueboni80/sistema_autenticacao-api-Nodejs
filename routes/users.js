var express = require('express');
var router = express.Router();
var UserController = require('./../controllers/UserController');
var auth = require('./../middlewares/ensureAuthenticated')

/* USERS ROUTES */
router.get('/', UserController.index);
router.post('/', UserController.store);
router.put('/', auth.ensureAuthenticated(), UserController.update);

module.exports = router;
