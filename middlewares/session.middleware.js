const shortid = require("shortid");
const Session = require('../models/session.model');
module.exports = async (req, res, next) => {

    let sessionId = shortid.generate();


  if (!req.signedCookies.sessionId) {
    res.cookie('sessionId', sessionId, {
      signed: true
    });
   
    let session = new Session({
      sessionId: sessionId
    });
    await session.save((error, results) => {
      if (error) {
        console.log(error);
      }
    });
  }
  next();
};