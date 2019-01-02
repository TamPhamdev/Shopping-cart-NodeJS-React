//TODO: tính tổng sản phẩm > chưa gom đc giỏ hàng
const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.controller');
const Product = require('../models/product.model');
var Cart = require('../controllers/cart.controller');
//router.get("/add/:productId", controller.addToCart);
router.get("/add/:productId", function (req, res, next) {
  let cart = new Cart(req.signedCookies.sessionId ? req.signedCookies.sessionId : {});
  let productId = req.params.productId;
  let sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect("/products");
    return;
  }
  //.get() trả về undefined nếu không tìm thấy, nên phải thêm 1 tham số 0 mắc định
  Product.findById(productId,
    function (err, product) {
      if (err) {
        console.log(err);
      }
      cart.add(product, product.id);
      req.signedCookies.sessionId = cart;
      console.log(req.signedCookies.sessionId);
    });
  // let count = db.get('sessions')
  //               .find({id:sessionId})
  //               .get('cart.' + productId, 0)
  //               .value();

  // db.get('sessions')
  //   .find({ id: sessionId })
  //   .set('cart.' + productId, count + 1)
  //   .write();

  res.redirect("/products");


});
module.exports = router;