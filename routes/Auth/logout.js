const express = require('express');
const router = express.Router();
var logout = require('./../../controllers/Auth/LogoutController')
var auth = require('./../../middlewares/ensureAuthenticated')

/* LOGIN ROUTES */
router.get('/', auth.ensureAuthenticated(), logout.desAutenticar);

module.exports = router;