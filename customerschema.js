var mongoose = require("mongoose");
var schema = mongoose.Schema({
    name:{type:String},
    mobile:{type:String},
    email:{type:String},
    gender:{type:String},
    password:{type:String},
    address:{type:String},
    createdby:{type:String}
});
var customerschema = mongoose.model("customerdetails",schema);
module.exports={customerschema}