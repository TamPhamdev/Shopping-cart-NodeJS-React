//TODO: tính tổng sản phẩm > chưa gom đc giỏ hàng
const express = require('express');

const router = express.Router();

const controller = require('../controllers/cart.controller');

const Product = require('../models/product.model');

const Cart = require('../models/cart.model');

router.get("/add/:productId", async function (req, res, next) {
  try {
    let productId = await req.params.productId;
    //let sessionId = req.signedCookies.sessionId;
    let cart = await new Cart(req.session.cart ? req.session.cart : {});


    // if (!sessionId) {
    //   res.redirect("/products");
    //   return;
    // }
    let product = await Product.findById(productId, function (err) {
      if (err) {
        console.log(err);
      }

    });
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/products');
  } catch (error) {
    res.status(500);
  }
})
module.exports = router;