const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String,
    price: Number
});
// 3 tham số : tên Model, Schema, tên Collection(trong DB)
let Product = mongoose.model('product', productSchema, 'products');

module.exports = Product;