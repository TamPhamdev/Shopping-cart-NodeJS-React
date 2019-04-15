const Session = require('../models/session.model');

module.exports = (req, res, next) => {
  let sessionId = req.signedCookies.sessionId;
  if (!req.signedCookies.sessionId) {
    res.redirect('/product');
    return;
  }
  
// TODO:thêm tính tổng giỏ hàng

  next();
};