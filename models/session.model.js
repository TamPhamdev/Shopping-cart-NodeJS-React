const mongoose = require('mongoose');

let sessionSchema = new mongoose.Schema({
  sessionId: String
});

let Session = mongoose.model('session', sessionSchema, 'sessions');

module.exports = Session;