const router = require('express').Router();

router.use('/users', require('./users/routes'));
router.use('/products', require('./products/routes'));
router.use('/cart', require('./cart/routes'));
router.use('/orders', require('./orders/routes'));
router.use('/superadmin', require('./superadmin/routes'));
router.use('/inventory', require('./inventory/routes'));

module.exports = router;
