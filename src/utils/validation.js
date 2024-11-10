const validator = require("validator");

function validateSignUpData(req){
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }

    else if(!validator.isEmail(emailId)){
        throw new Error("Please Enter a Valid Email");
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter a Strong Password");
    }
}


module.exports = {
    validateSignUpData
}