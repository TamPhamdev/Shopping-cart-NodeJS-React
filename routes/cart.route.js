const express = require('express');

const router = express.Router();

const controller = require('../controllers/cart.controller');

router.get('/add/:productId', controller.addToCart);

router.get('/shoppingCart', controller.shoppingcart);

router.get('/checkout', controller.checkout);

router.post('/checkout', controller.postCharge);
module.exports = router;