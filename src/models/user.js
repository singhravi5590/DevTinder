const mongoose = require("mongoose");

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
        trim : true
    },
    password : {
        type : String
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
        default : "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg"
    },
    about : {
        type : String,
        default : "This is Defult about"
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

