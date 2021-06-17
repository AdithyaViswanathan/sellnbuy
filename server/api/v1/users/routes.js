const router = require('express').Router();
const { getUsers, register, login, isAuthenticated } = require('./controllers');

router.route('/').get(getUsers).post(register);

router.post('/login', login);

router.get('/isAuthenticated', isAuthenticated);

module.exports = router;
