var mongoose = require("mongoose");
var schema = mongoose.Schema({
    name:{type:String},
    mobile:{type:String},
    email:{type:String},
    gender:{type:String},
    password:{type:String}
});
var userDetails = mongoose.model('userdetails',schema);
module.exports={userDetails};