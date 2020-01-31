var express = require('express');
var router = express.Router();
var RegisterController = require('../Controllers/Auth/RegisterController');

/* GET home page. */
router.get('/', RegisterController.showRegistrationForm);
router.post('/', RegisterController.register);

module.exports = router;
