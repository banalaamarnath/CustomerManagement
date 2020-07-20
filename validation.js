function validatedetails(req, res, next) {
    if (!req.body.name || !req.body.mobile || !req.body.email || !req.body.gender || !req.body.password) {
        res.status(400).send({ message: "All are manidtory fileds" });
        return;
    }  
    
    if (req.body.gender != 'male' && req.body.gender && 'female' && req.body.gender != 'other') {
        res.status(400).send({ message: "Gender is invalid" });
        return;
    }
    return next();
}

function emailvalidate(req,res,next){
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!req.body.email.match(emailRegex)) {
        res.status(400).send({ message: "Email is invalid" });
        
        return;
    }
    return  next();
}

function mobilevalidate(req,res,next){
    var numberregex = /^[0-9]+$/;
    if (!req.body.mobile.match(numberregex)) {
        res.status(400).send({ message: "Mobile is Invalid" });
       
        return;
    }
    return next();
}

function updatecustomerValidate(req,res,next){
    if(req.body.email){
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!req.body.email.match(emailRegex)) {
        res.status(400).send({ message: "Email is invalid" });
        return;
    }    
}   
    if(req.body.mobile){
        var numberregex = /^[0-9]+$/;
        if (!req.body.mobile.match(numberregex)) {
            res.status(400).send({ message: "Mobile is Invalid" });
           
            return;
        }
    }
    return next();
}
 


function loginvalidate(req, res, next) {
    console.log("body", req.body);
    if (!req.body.email || !req.body.password) {
        res.status(400).send({ message: "Username and password is Manditory" });
        return;
    }
    return next();
}

function addressvalidation(req, res, next) {
    if (!req.body.address) {
        res.status(400).send({ message: "all fields are manitory" });
        return;
    }
    return next();

}



module.exports = {
    validatedetails,
    loginvalidate, 
    addressvalidation,
    emailvalidate,
    mobilevalidate,
    updatecustomerValidate
}