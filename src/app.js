const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
const {connectDB} = require("./config/database");
const {User} = require("./models/user");
const {validateSignUpData} = require('./utils/validation');
const {userAuth} = require('../middleware/auth')
const app = express();

app.use(express.json())
app.use(cookieParser())

// User added with the help of postman
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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
           res.cookie("token", token, {expires : new Date(Date.now() + 8 * 36000)}); //cookie expire in 8 hours

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

// getting a profile with cookies
app.get("/profile", userAuth ,async (req, res) => {
    try{
        const user = req.user;
        
        if(!user){
            throw new Error("User Not found");
        }
        res.send(user)
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

// send connection
app.post('/sendConnectionRequest', userAuth, (req, res) => {
    try{
        const user = req.user;
        res.send('connecton sent by '+ user.firstName)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

connectDB()
.then(() => {
    console.log("Database Connected Successfully");
    app.listen(7777, () => console.log("Port connected successfully on 7777"))
})
.catch(() => {
    console.log("Not connected")
})

