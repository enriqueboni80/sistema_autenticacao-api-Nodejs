var express = require('express');
var router = express.Router();
var RegisterController = require('../../Controllers/Auth/RegisterController');

/* REGISTER ROUTES */
router.post('/', RegisterController.register);
router.post('/active', RegisterController.active)

module.exports = router;
