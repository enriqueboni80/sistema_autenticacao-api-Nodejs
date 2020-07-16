var express = require('express');
var router = express.Router();
var RegisterController = require('../../Controllers/Auth/RegisterController');

/* REGISTER ROUTES */
router.post('/', RegisterController.register);
router.post('/validate', RegisterController.validate)

module.exports = router;
