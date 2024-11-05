const express = require("express");
const {connectDB} = require("./config/database");
const {User} = require("./models/user");
const app = express();

app.use(express.json())

// app.post("/signup", async (req, res) => {
//     const userObj = {
//         firstName : "Prathavi",
//         lastName : "Singh",
//         emailId : "singhravi5590@gmail.com",
//         password : "@123ravi",
//         age : 23,
//         gender : "male"
//     }
//     // Creating a new instance of the user model
//     const user = new User(userObj)

//     try{
//         await user.save();
//         res.send("User added successfully")
//     }
//     catch(error){
//         res.status(404).send(error)
//     }
    
// }) 



// User added with the help of postman
app.post("/signup", async (req, res) => {
    console.log(req.body)

    const user = new User(req.body);
    try{
        await user.save();
        res.send("User added successfully")
    }
    catch(err){
        res.send(err);
    }
})

// fetch user by emailid with the help of postman
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId
    try{
        const user = await User.find({emailId : userEmail})

        if(user.length === 0){
            res.status(404).send("User not found")
        }
        else{
            res.send(user);
        }
    }
    catch(err){
        res.status(404).send("something went wrong")
    }
})

// fetch a single user when same email in database
app.get("/singleuser", async (req, res) => {
    const userEmail = req.body.emailId
    try{
        const user = await User.findOne({emailId : userEmail})

        if(user.length === 0){
            res.status(404).send("User not found")
        }
        else{
            res.send(user);
        }
    }
    catch(err){
        res.status(404).send("something went wrong")
    }
})

// all user
app.get("/userFeed",async (req, res) => {
    const users = await User.find({});
    res.send(users);
})

connectDB()
.then(() => {
    console.log("Database Connected Successfully");
    app.listen(7777, () => console.log("Port connected successfully on 7777"))
})
.catch(() => {
    console.log("Not connected")
})

