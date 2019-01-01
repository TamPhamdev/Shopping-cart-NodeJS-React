const db = require("../db");
const Product = require("../models/product.model");
module.exports.addToCart = async (req, res, next) => {
  let productId = req.params.productId;
  let sessionId = req.signedCookies.sessionId;
  
  if (!sessionId) {
    res.redirect("/products");
    return;
  }
  //.get() trả về undefined nếu không tìm thấy, nên phải thêm 1 tham số 0 mắc định
  let count = await Product.find({})
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