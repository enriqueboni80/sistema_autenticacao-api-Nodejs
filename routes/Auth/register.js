var express = require('express');
var router = express.Router();
var RegisterController = require('../../Controllers/Auth/RegisterController');

/* REGISTER ROUTES */
router.get('/', RegisterController.showRegistrationForm);
router.post('/', RegisterController.register);
router.get('/:id/active/:activactiontoken/', RegisterController.active)

module.exports = router;
