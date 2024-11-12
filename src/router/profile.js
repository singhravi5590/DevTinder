const express = require("express");
const {userAuth} = require('../../middleware/auth');
const {validateEdit} = require('../utils/validation');


const profileRouter = express.Router();


// getting a profile with cookies
profileRouter.get("/profile/view", userAuth ,async (req, res) => {
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

profileRouter.patch("/profile/edit", userAuth, async(req, res) => {
    try{
        if(!validateEdit(req)){
            throw new Error("You cannot Edit this field");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((keys) => (loggedInUser[keys] = req.body[keys]));
        await loggedInUser.save();
        res.send("Update Successful");
    }
    catch(err){
        res.status(400).send(err.message)
    }
})


module.exports = profileRouter;