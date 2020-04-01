var express = require('express');
var router = express.Router();
var RegisterController = require('../../Controllers/Auth/RegisterController');

/* GET home page. */
router.get('/', RegisterController.showRegistrationForm);
router.post('/', RegisterController.register);
router.get('/enviar-email', RegisterController.enviarEmail);
router.get('/:id/active/:token/', RegisterController.active)

module.exports = router;
