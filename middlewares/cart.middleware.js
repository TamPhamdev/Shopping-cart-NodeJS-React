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

  let total = Object.values(displayProduct.cart);
  let totol1 =  total.reduce((a, b) => {
    return a + b;  
  });


  res.locals.product = totol1;
  next();
};