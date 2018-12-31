const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  avatar: String,
  name: String,
  phone: String,
  email: String,
  password: String,
});
// 3 tham số : tên Model, Schema, tên Collection(trong DB)
let User = mongoose.model('user', userSchema, 'users');

module.exports = User;