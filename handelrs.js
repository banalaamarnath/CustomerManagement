var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var sche = require("./customerschema");
var sch = require("./userDetailsSchema");
var customerschema = sche.customerschema;
var schema = sch.userDetails;
var collection = sch.collection;
var tokenkey = "secertkey";


function tokencheck(req,res,next){ 
    var token = req.headers.token;
    console.log("token",token);
    jwt.verify(token,tokenkey,function(err,sucess){
        if(err){
            console.log("err",err);
            res.status(400).send({message:"token is invalid or missing"});
            return;
        }
        if(sucess){
            console.log(sucess.tokenIdAndExpiry.id);
            console.log("sucess",sucess);
            req.id = sucess.tokenIdAndExpiry.id;
            return next();

        }

    });
}

function insertUserData(req, res) {
    var insert = new schema({ name: req.body.name, mobile: req.body.mobile, email: req.body.email, gender: req.body.gender, password: req.body.password });
    insert.save(function (err, data) {
        if (err) {
            res.status(500).send({ message: "Internal Server Error" });
            return;
        }
        if (data) {
            console.log("data:", data);
            res.status(200).send({ message: "Inserted Sucessfully" });
        }
    });

}



function checklogincreditenails(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    //console.log(email);
    //console.log(password);
    schema.findOne({ email: email, password: password }, function (err, result) {

        if (err) {
            res.status(404).send({ message: "something went wrong" });
            return;
        }
        if (!result) {
            res.status(404).send({ message: "email or password is wrong" });
            return;
        }
        else {
            //console.log("result:",result);
            var  id = result._id;
            //console.log("id:", id);
            tokenIdAndExpiry = {
                id:id            
            }
            var tokenendocing = jwt.sign({tokenIdAndExpiry},tokenkey,{expiresIn:'180'});
            //console.log(tokenendocing);
            //var verify = jwt.verify(token,tokenkey,function(){});
            //console.log(verify);
            res.status(200).send({ message: "login sucessfull",token:tokenendocing });
        }
    })
}

function createcustomer(req, res) {
   
    if (!req.id) {
        console.log("createcustomer",req.id);
        res.status(400).send({ message: "id missing or login required to create customers" });
        return;
    }
    var insert = new customerschema({ name: req.body.name, mobile: req.body.mobile, email: req.body.email, gender: req.body.gender, password: req.body.password, address: req.body.address, createdby: req.id})
    insert.save(function (err, result) {
        if (err) {
            res.status(400).send({ message: "something went wrong" });
        }
        if (result) {
            console.log("data:", result);
            res.status(200).send({ message: "Customer Created Sucessfully" });
        }
    })
}

function getcustomers(req, res) {
    //console.log("idd:", id);
    if (!req.id) {
        res.status(400).send({ message: "id missing or login required" });
        return;
    }
    customerschema.find({ "createdby": req.id }, { "createdby": 0 }, function (err, result) {
        if (err) {
            console.log("err:", err);
            res.status(400).send({ message: "something went wrong" });
            return;
        }
        if (result) {
            res.status(200).send(result);
        }
    });
}

function updatecustomer(req, res) {
    if(req.id){
        console.log("update",req.id);
        res.status(400).send({message:"id is missing"});
    }
    if(!req.body.id){
        res.status(400).send({message:"id not passed or login required"});
        return;
    }
var updatecustomerdata ={};
if(req.body.mobile && req.body.email && req.body.address){
    updatecustomerdata.mobile = req.body.mobile;
    updatecustomerdata.email = req.body.email;
    updatecustomerdata.address = req.body.address;
}
if(req.body.mobile && req.body.email){
    updatecustomerdata.mobile = req.body.mobile;
    updatecustomerdata.email = req.body.email;
}
if(req.body.email && req.body.address){
    updatecustomerdata.email = req.body.email;
    updatecustomerdata.address = req.body.address;
}
if(req.body.mobile && req.body.address){
    updatecustomerdata.mobile = req.body.mobile;
    updatecustomerdata.address = req.body.address;
}
if(req.body.email && !req.body.address && !req.body.mobile){
    updatecustomerdata.email = req.body.email;
}
if(req.body.address && !req.body.email && !req.body.mobile){
    updatecustomerdata.address = req.body.address;
}
if(req.body.mobile && !req.body.address && !req.body.email){
    updatecustomerdata.mobile = req.body.mobile;
}
console.log(updatecustomerdata);
customerschema.findByIdAndUpdate({"_id":req.body.id},updatecustomerdata,function(err,result){
    if(err){
        res.status(400).send({message:"something went wrong"});
        return;
    }
    if(result){
        res.status(400).send({message:"updated sucessfully"});
    }
})
}


function deletecustomer(req,res){
    if(!req.id){
        res.status(400).send({message:"id is missing"});
    }
    customerschema.deleteOne({"_id":req.query.id},function(err,result){
        if(err){
            res.status(400).send({message:"something went wrong"});
            return;
        }
        if(result){
            res.status(200).send({message:"deletd sucessfully"});
            return;
        }
    })
}
module.exports = {
    tokencheck,
    insertUserData,
    checklogincreditenails,
    createcustomer,
    getcustomers,
    updatecustomer,
    deletecustomer
}