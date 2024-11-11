const express = require("express")
const {adminAuth, userAuth} = require("../middleware/auth")
const app = express();


// app.use("/user", (req, res) => {
//     res.send("Ha Ha ha")
// })


// // This will only handle Get call to /user
// app.get("/user", (req,res) => {
//     res.send({firstName : "Ravi", lastName : "Singh"})
// })

// // This will only handle Post call to /user
// app.post("/user", (req,res) => {
//     console.log("Save Data to the Database");
//     res.send("Data Successfully saved to the database");
    
// })

// // This will Delete the user
// app.delete("/user", (req,res) => {
//     res.send("Success")
//     console.log("user Deleted Succesfully")
// } )


// // This will match all the HTTP method API calls to /test
// app.use("/test", (req, res) => {
//     res.send("This is test")
// })


// app.use('/user', (req,res, next) => {
//     console.log("response 1");
//     next();
// },
//     (req, res, next) => {
//         next();
//         console.log("response 2")
//         // res.send("Hello World");
//     },
//     (req, res, next) => {
//         console.log("response 3");
//         next();
//         // res.send("Blue")
//     },
//     (req, res, next) => {
//         console.log("response 4");
//         res.send("Response no. 5")
//         // next();
//     }

// )


// app.use((req, res, next) => {
//     // res.send("HI")
//     next();
// })

// app.get("/user", (req, res) => {
//     res.send("Response number 1");
// })

// app.get("/user", (req, res, next) => {
//     res.send("Response number 2");
//     next()
// })

// app.use("/admin", adminAuth);


// app.get("/admin/getUser", (req, res) => {
    // const token = "xyz";
    // const isAuthorized = (token === "xy");
    // if(isAuthorized){
    //     res.send("We are getting a user");
    // }
    // else{
    //     res.status(404).send("User not found")
    // }

    // res.send("User Getting successfully")
// })

// app.post("/admin/postUser", (req, res) => {
//     res.send("User added successfully");
// })

// app.delete("/admin/deleteUser", (req, res) => {
//     res.send("User Deleted succesfully");
// })

// app.get("/user/getUser", userAuth, (req, res) => {
//     res.send("user getting successfully")
// })

// app.use("/", (err, req, res, next) => {
//     if(err){
//         res.status(404).send("Something went wrong");
//     }
// })

// app.get("/admin", (req, res) => {
//     try{
//         throw new Error("djgsduhdsfhdfsf");
//     }
//     catch(err){
//         console.log(err);
//         res.send("Something went wrong");
//     }
// })

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

bcrypt.genSalt(saltRounds, function(err, salt) {
    // bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
    //     console.log(salt);
    // });

    console.log(salt)
});


// this is methods of previous episodes

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

// Update Data of user
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const allowedUpdates = ["firstName", "lastName", "age", "gender", "skills"];
        const isAllowed = Object.keys(data).every((k) => allowedUpdates.includes(k));
        if(!isAllowed){
            throw new Error("Update cannot allowed")
         }

        if(data.skills.length > 2){
            throw new Error("Skills cannot be more than 2")
        }
        await User.findByIdAndUpdate({_id : userId}, data, {returnDocument : "after", runValidators : true})
        res.send("user Updated successfully")
    }
    catch(err){
        res.status(404).send("something went wrong " + err.message);
    }
})

// delete user by id
app.delete("/deleteUser",async (req, res) =>{
    const userId = req.body.userId;
    try{
        // const user = await User.findOneAndDelete
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully")
    }
    catch(err){
        res.status(404).send("something went wrong");
    }
})

app.listen(3000, () => console.log("Server is running on 3000"))