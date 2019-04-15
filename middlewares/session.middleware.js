const shortid = require("shortid");
const Session = require('../models/session.model');
module.exports = async (req, res, next) => {
  let sessionId = shortid.generate();
  
  // create cookie 
  if (!req.signedCookies.sessionId) {
    res.cookie('sessionId', sessionId, {
      signed: true
    });
   // session from database
    let session = new Session({
      sessionId: sessionId
    });
    // save session in database
    await session.save((error, results) => {
      if (error) {
        console.log(error);
      }
    });
   
  }
  next();
};