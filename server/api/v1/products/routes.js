const router = require('express').Router();

const { checkAuthStatus } = require('../users/controllers');
const { getProducts, addProduct, deleteProduct } = require('./controllers');

router.get('/', checkAuthStatus, getProducts);

router.post('/', checkAuthStatus, addProduct);
router.delete('/:productId', checkAuthStatus, deleteProduct);

module.exports = router;
