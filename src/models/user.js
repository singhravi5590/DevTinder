const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        lowercase : true,
        unique : true,
        minLength : 4,
    },
    lastName : {
        type : String,
        required : true
    },
    emailId : {
        type : String,
        lowercase : true,
        required : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address " + value)
            }
        }
    },
    password : {
        type : String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password")
            }
        }
    },
    age : {
        type : Number,
        min : 18,
    },
    gender : {
        type : String,
        validate(value){
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Try again, Not a Valid gender");
                
            }
        }
    },
    photoURL : {
        type : String,
        default : "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL " + value);
            }
        }
    },
    about : {
        type : String,
        default : "This is Default about"
    },
    skills : {
        type : [String, String]
    }
},
{
    timestamps : true,
}
);

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}

