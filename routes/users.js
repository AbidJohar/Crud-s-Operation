 const mongoose = require('mongoose');
 mongoose.connect("mongodb://127.0.0.1:27017/crud")

 const userSchema =  mongoose.Schema({
  username: String,
  email:String,
  contact: Number
 });
  
 module.exports =  mongoose.model("user", userSchema);
 