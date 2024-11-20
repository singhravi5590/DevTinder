const express = require("express");
const cookieParser = require("cookie-parser")
const {connectDB} = require("./config/database");
const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("../src/router/auth");
const profileRouter = require("../src/router/profile");
const requestRouter = require("../src/router/request");
const userRouter = require("../src/router/user")



app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use('/', userRouter)






connectDB()
.then(() => {
    console.log("Database Connected Successfully");
    app.listen(7777, () => console.log("Port connected successfully on 7777"))
})
.catch(() => {
    console.log("Not connected")
})

