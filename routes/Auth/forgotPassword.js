var express = require('express');
var router = express.Router();
var ForgotPasswordController = require('../../controllers/Auth/ForgotPasswordController');

/* GET home page. */
router.get('/', ForgotPasswordController.showLinkRequestForm);
router.post('/', ForgotPasswordController.sendResetLinkEmail);
router.get('/:id/forgot/:token/', ForgotPasswordController.sendResetLinkResponse)
router.post('/reset/', ForgotPasswordController.resetPassword)


module.exports = router;