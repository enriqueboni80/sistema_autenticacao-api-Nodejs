var express = require('express');
var router = express.Router();
var IndexController = require('../controllers/IndexController');
var auth = require('../middlewares/ensureAuthenticated')

/* HOME PAGE ROUTES. */
router.get('/', IndexController.index);
router.get('/home', auth.ensureAuthenticated, IndexController.home);

module.exports = router;
