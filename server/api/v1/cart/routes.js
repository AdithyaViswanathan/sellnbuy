const router = require('express').Router();

const { checkAuthStatus, isUser } = require('../users/controllers');
const { addCart } = require('./controllers');

router.post('/', checkAuthStatus, isUser, addCart);

module.exports = router;
