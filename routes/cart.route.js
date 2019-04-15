const express = require('express');

const router = express.Router();

const controller = require('../controllers/cart.controller');

router.post('/add/:productId', controller.addToCart);

router.get('/', controller.shoppingcart);

router.get('/checkout', controller.checkout);

router.post('/checkout', controller.postCharge);

router.get('/reduce/:productId', controller.reduce);

router.get('/remove/:productId', controller.remove);
module.exports = router;