var express = require('express');
var router = express.Router();
var RegisterController = require('./../../controllers/Auth/RegisterController');

/* REGISTER ROUTES */
router.post('/', RegisterController.register);
router.post('/validate', RegisterController.validate)
router.post('/checkemailfree', RegisterController.checkEmailFree)

module.exports = router;
