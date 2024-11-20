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

function validateEdit(req){
    const allowedUpdates = ["firstName", "lastName", "gender", "age", "about", "skills"];
    const isAllowed = Object.keys(req.body).every((field) => allowedUpdates.includes(field));
    return isAllowed;
}

module.exports = {
    validateSignUpData,
    validateEdit
}