var express = require('express');
var router = express.Router();
var ForgotPasswordController = require('../../controllers/Auth/ForgotPasswordController');

/* FORGOT PASSWORD ROUTES */
router.get('/', ForgotPasswordController.showLinkRequestForm);
router.post('/', ForgotPasswordController.sendResetLinkEmail);
/* router.get('/:id/forgot/:activationtoken/', ForgotPasswordController.sendResetLinkResponse) */
router.post('/reset/', ForgotPasswordController.resetPassword)


module.exports = router;