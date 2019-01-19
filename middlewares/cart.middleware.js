const db = require('../db');

module.exports = (req, res, next) => {
  let sessionId = req.signedCookies.sessionId;
  if (!req.signedCookies.sessionId) {
    res.redirect('/product');
    return;
  }
  let displayProduct = db.get('sessions')
    .find({
      id: sessionId
    })
    .value();
// TODO:thêm tính tổng giỏ hàng

  next();
};