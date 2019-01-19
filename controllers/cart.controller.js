const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

module.exports.addToCart = async (req, res, next) => {

  // let productId = await req.params.productId;
  // let sessionId = await req.signedCookies.sessionId;
  // let cart = await new Cart(req.session.cart ? req.session.cart : {
  //   items: {}
  // });


  // if (!sessionId) {
  //   res.redirect("/products");
  //   return;
  // }
  // let product = await Product.findById(productId, function (err) {
  //   if (err) {
  //     console.log(err);
  //   }
   
  // });
  // cart.add(product, product.id);
  // req.sessionId.cart = cart;
  // console.log(req.sessionId.cart);

  //.get() trả về undefi  ned nếu không tìm thấy, nên phải thêm 1 tham số 0 mắc định
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