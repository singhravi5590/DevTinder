const jwt = require("jsonwebtoken");
const {User} = require("../src/models/user")

const userAuth = async (req, res, next) => {
    try{
        const {token} = req.cookies
        if(!token){
            throw new Error("Invalid Credentials");
        }
        const {_id} = await jwt.verify(token, "@123Ravi");
        const user = await User.findById(_id)
        if(!user){
            throw new Error("User not found");
        }
        req.user = user;
        next();
    }
    catch(err){
        res.status(400).send(err.message);
    }
}

module.exports = {
    userAuth
}
























// const adminAuth = (req, res, next) => {
//     const token = "xyz";
//     const isAuth = (token === "xyz")
//     if(isAuth){
//         console.log("We are getting a user");
//         next();
//     }
//     else{
//         res.status(404).send("unauthorize user")
//     }
// }

// const userAuth = (req, res, next) => {
//     const token = "xyz";
//     const isAuth = (token === "xyz")
//     if(isAuth){
//         console.log("We are getting a user");
//         next();
//     }
//     else{
//         res.status(404).send("unauthorize user")
//     }
// }

// module.exports = {
//     adminAuth,
//     userAuth
// }