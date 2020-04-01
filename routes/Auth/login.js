var express = require('express');
var router = express.Router();
var passport = require('passport')
var LoginController = require('../../controllers/Auth/LoginController');

/* LOGIN ROUTES */
router.get('/', LoginController.index)
router.post('/', LoginController.autenticar);

module.exports = router;