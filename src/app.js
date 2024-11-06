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
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User added successfully")
    }
    catch(err){
        res.send(err.message);
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


// delete user by id
app.delete("/deleteUser",async (req, res) =>{
    const userId = req.body.userId;
    try{
        const user = await User.findOneAndDelete
        // const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully")
    }
    catch(err){
        res.status(404).send("something went wrong");
    }
})


// Update Data of user
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    console.log(data)
    console.log(userId)
    try{
        await User.findByIdAndUpdate({_id : userId}, data, {returnDocument : "after", runValidators : true})
        res.send("user Updated successfully")
    }
    catch(err){
        res.status(404).send("something went wrong" + err.message);
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

