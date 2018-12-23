const db = require('../db');

module.exports.requireCookie = (req, res, next) => {
  // userCookie tên của object mà set cookie (bên ath.controller.js)
  if (!req.signedCookies.userCookie) {
    res.redirect('/auth/login');
    return;
  }
  //tìm user id coi có trùng với cookie hay không để check 
  let user = db.get('users').find({
    id: req.signedCookies.userCookie
  }).value();

  if (!user) {
    res.redirect('/auth/login');
  }

  res.locals.user = user;
  next();
};