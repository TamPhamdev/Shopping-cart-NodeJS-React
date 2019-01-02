const db = require("../db");
const Product = require("../models/product.model");
module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function (item, id) {
    let storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = {
        item: item,
        qty: 0,
        price: 0
      };
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
  };

  this.generateArray = function () {
    let arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
module.exports.addToCart = async (req, res, next) => {
  let cart = new Cart(sessionId ? sessionId : {});
  let productId = req.params.productId;
  let sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect("/products");
    return;
  }
  //.get() trả về undefined nếu không tìm thấy, nên phải thêm 1 tham số 0 mắc định
  let count = await Product.findById({
    productId,
    function (err) {
      if (err) {
        return res.redirect('/');
      }
      cart.add(product, product.id);
      req.sessionId.cart = cart;
      console.log(req.sessionId.cart);
    }
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
};