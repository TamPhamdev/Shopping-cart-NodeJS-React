const shortid = require("shortid");
const db = require("../db");
const User = require('../models/user.model');

module.exports = (req, res, next) => {
  let sessionId = shortid.generate();
 //TODO: làm lại session không dùng lowdb
  if (!req.signedCookies.sessionId) {
    res.cookie('sessionId', sessionId, {
      signed: true
    });
    db.get('sessions').push({
      id: sessionId
    }).write();
  }
  next();
};