const express = require("express")

const app = express();

app.use("/o",(req,res) => {
    res.send("This is default")
})

app.use("/home", (req, res) => {
    res.send("This is Home")
})

app.use("/test", (req, res) => {
    res.send("This is test")
})


app.listen(3000, () => console.log("Server is running on 3000"))