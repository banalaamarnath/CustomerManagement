var express = require("express");
var bodyparser = require("body-parser");
var validation = require("./validation");
var handelers = require("./handelrs");
var mongoose = require("mongoose");
var app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ type: 'application/json' }));

var db = mongoose.connect('mongodb://localhost:27017/customerManagement', { useNewUrlParser: true, useUnifiedTopology: true });

//sign up
app.post("/signup",validation.validatedetails,validation.emailvalidate,validation.mobilevalidate, handelers.insertUserData);

//login
app.post("/login",validation.loginvalidate,handelers.checklogincreditenails);

//create customer
app.post("/customer",handelers.tokencheck,validation.validatedetails,validation.addressvalidation,handelers.checkuser,handelers.createcustomer);

//get customers
app.get("/customer",handelers.tokencheck,handelers.checkuser,handelers.getcustomers);

//update customer
app.put("/customer",handelers.tokencheck,validation.updatecustomerValidate,handelers.checkuser,handelers.updatecustomer);

//delete customers
app.delete("/customer",handelers.tokencheck,handelers.checkuser,handelers.deletecustomer)

app.get("/",function(req,res){
    res.status(200).send({message:"This is empty API"});
})

app.listen(1000,function (){
    console.log("1000 is listining");
    
});