var express = require('express');
var router = express.Router();
var IndexController = require('../controllers/IndexController');
var auth = require('../middlewares/ensureAuthenticated')

/* HOME PAGE ROUTES. */
const admin = 1;
const user = 2;
router.get('/', IndexController.index);
router.get('/admin', auth.ensureAuthenticated([admin]), IndexController.admin);
router.get('/home', auth.ensureAuthenticated([admin, user]), IndexController.home);

module.exports = router;
