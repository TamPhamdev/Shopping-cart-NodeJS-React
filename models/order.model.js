const mongoose = require("mongoose");

let orderSchema = new mongoose.Schema({
  //user:{type:Schema.Types.ObjectId,ref:'user'},
  cart:{type:Object,required:true},
  address:{type:String,required:true},
  name:{type:String,required:true},
  paymentId:{type:String,required:true}
});
// 3 tham số : tên Model, Schema, tên Collection(trong DB)
let Order = mongoose.model('order', orderSchema, 'orders');

module.exports = Order;