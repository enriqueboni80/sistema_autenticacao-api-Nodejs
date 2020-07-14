var express = require('express');
var router = express.Router();
var ForgotPasswordController = require('../../controllers/Auth/ForgotPasswordController');

/* FORGOT PASSWORD ROUTES */
router.post('/', ForgotPasswordController.sendResetLinkEmail);
router.post('/reset/', ForgotPasswordController.resetPassword)


module.exports = router;