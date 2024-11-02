const mongoose = require("mongoose");

// mongoose.connect(
//     "mongodb+srv://singhravi5590:XmrkR20n8vAeBYzo@nodenamaste.8lffc.mongodb.net/"
// )

async function connectDB(){
    await mongoose.connect("mongodb+srv://singhravi5590:XmrkR20n8vAeBYzo@nodenamaste.8lffc.mongodb.net/")
}

connectDB().then(() => console.log("Connected Successfull"))