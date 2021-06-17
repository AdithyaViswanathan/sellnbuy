const router = require('express').Router();
const { checkAuthStatus } = require('../users/controllers');
const { getUserProducts } = require('./controllers');

router.get('/', checkAuthStatus, getUserProducts);

module.exports = router;
