var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');

/* USERS ROUTES */
router.get('/', UserController.index);
router.get('/post', UserController.store);

module.exports = router;
