const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    email: String,
    name: String,
    phone: String,
    avatar: String,
    password: String
});
// 3 tham số : tên Model, Schema, tên Collection(trong DB)
let User = mongoose.model('user', userSchema, 'users');

module.exports = User;