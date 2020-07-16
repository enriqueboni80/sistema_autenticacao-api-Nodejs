var express = require('express');
var router = express.Router();
var IndexController = require('../controllers/IndexController');
var auth = require('../middlewares/ensureAuthenticated')
const constants = require('../helpers/Constants')

/* HOME PAGE ROUTES. */
router.get('/', IndexController.index);
router.get('/admin', auth.ensureAuthenticated([constants.SYS_ADMIN]), IndexController.admin);
router.get('/home', auth.ensureAuthenticated([constants.PRODUCERS, constants.CLIENTS]), IndexController.home);

module.exports = router;
