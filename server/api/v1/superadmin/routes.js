const router = require('express').Router();
const { isSuperAdmin, checkAuthStatus } = require('../users/controllers');
const { getAdminRequests, approveRequest, rejectRequest } = require('./controllers');

router.get('/', checkAuthStatus, isSuperAdmin, getAdminRequests);
router.post('/approve', checkAuthStatus, isSuperAdmin, approveRequest);
router.post('/reject', checkAuthStatus, isSuperAdmin, rejectRequest);

module.exports = router;
