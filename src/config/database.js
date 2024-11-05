const mongoose = require("mongoose");

async function connectDB(){
    await mongoose.connect("mongodb+srv://singhravi5590:XmrkR20n8vAeBYzo@nodenamaste.8lffc.mongodb.net/devTinder")
}

module.exports = {
    connectDB
}