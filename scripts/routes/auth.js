var express = require('express');
var router = express.Router();

var user = require('../controllers/user.js');

router.post('/login', user.login);

module.exports = router;
