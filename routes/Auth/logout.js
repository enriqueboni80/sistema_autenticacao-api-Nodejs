const express = require('express');
const router = express.Router();
var logout = require('../../controllers/Auth/LogoutController')

/* LOGIN ROUTES */
router.get('/', logout.desAutenticar);

module.exports = router;