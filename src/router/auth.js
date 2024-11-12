const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User added with the help of postman
authRouter.post("/signup", async (req, res) => {
    try{
        // validate signup data
        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;
        // Encrypt the password
        let passwordHash = await bcrypt.hash(password, 10);

        // Creating a new instance of the user model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password : passwordHash,
        });
        await user.save();
        res.send("User added successfully")
    }
    catch(err){
        res.send(err.message);
    }
})

// login by user
authRouter.post("/login", async (req, res) => {
    try{
       const {emailId, password} = req.body;
       const user = await User.findOne({emailId : emailId});
       if(!user){
           throw new Error("User not found in data base")
       }
       const isTrue = await bcrypt.compare(password, user.password);
    //    this method is same as above it is with schema
        // const isTrue = await user.Validate(password);
       if(isTrue){

           // creating a jwt token
        //    const token = await jwt.sign({_id : user._id}, "@123Ravi", {expiresIn : "7d"}); //token expire in 7d
           const token = await user.getJWT();
            
           // sending a cookie
           res.cookie("token", token, {expires : new Date(Date.now() + 8 * 3600000)}); //cookie expire in 8 hours

           res.send("login successful");
       }
       else{
           res.send("Password does not match")
       }
    }
    catch(err){
       res.status(400).send(err.message)
    }
})


// logout by user

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {
        expires : new Date(Date.now())
    })
    res.send("Logout Successfull");
})


module.exports = authRouter;