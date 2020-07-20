var mongoose = require("mongoose");
var sche = require("./customerschema");
var sch = require("./userDetailsSchema");
var customerschema = sche.customerschema;
var schema = sch.userDetails;
var collection = sch.collection;

var id;

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
    console.log(email);
    console.log(password);
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
            id = result._id;
            console.log("id:", id);
            res.status(200).send({ message: "login sucessfull" });
        }
    })
}

function createcustomer(req, res) {
    console.log(id);
    if (!id) {
        res.status(400).send({ message: "login required to create customers" });
        return;
    }
    var insert = new customerschema({ name: req.body.name, mobile: req.body.mobile, email: req.body.email, gender: req.body.gender, password: req.body.password, address: req.body.address, createdby: id })
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
    console.log("idd:", id);
    if (!id) {
        res.status(400).send({ message: "login required" });
        return;
    }
    customerschema.find({ "createdby": id }, { "createdby": 0 }, function (err, result) {
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
    insertUserData,
    checklogincreditenails,
    createcustomer,
    getcustomers,
    updatecustomer,
    deletecustomer
}