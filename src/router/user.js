const express = require("express");
const { userAuth } = require("../../middleware/auth");
const userRouter = express.Router();
const ConnectionRequestModel = require("../models/connectionRequest");
const { User } = require("../models/user");


// Get all the pending request for the logged in user;
userRouter.get("/user/request/received", userAuth, async(req, res) => {
    try {
        const loggedInUser = req.user;
        const data = await ConnectionRequestModel.find({
            toUserId : loggedInUser._id,
            status : "interested"
        }).populate("fromUserId", "firstName lastName photoUrl age gender about skills")
        // you can also write like this .populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "gender", "about"])
        res.send({data})
    } 
    catch (error) {
        res.status(400).send(error)
    }

})


// get all the accepted request for the logged in user
userRouter.get("/user/connection", userAuth, async(req, res) =>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequestModel.find({
            $or:[
                {toUserId:loggedInUser._id, status:"accepted"},
                {fromUserId:loggedInUser._id, status:"accepted"}
            ]
        }).populate("fromUserId", ["firstName", "lastName"])
        .populate("toUserId", ["firstName", "lastName"])

        const data = connectionRequest.map((row) => {
            if(row.fromUserId._id.toString() == loggedInUser._id.toString()){
                return(row.toUserId);
            }
            return (row.fromUserId);
        })
        res.json({data})
    }
    catch(error){
        res.status(400).json({"message" : error.message});
    }
})


userRouter.get("/feed", userAuth,async (req, res) => {
    try {
        const loggedInUser = req.user;
        let page = req.query.page || 1;
        let limit = req.query.limit || 10;
        limit = limit > 20 ? 20 : limit
        let skip = (page - 1) * limit

        const connectionRequest = await ConnectionRequestModel.find({
            $or:[
                {fromUserId : loggedInUser._id},
                {toUserId : loggedInUser._id}
            ]
        }).select("fromUserId toUserId")

        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString())
            hideUsersFromFeed.add(req.toUserId.toString())
        });

        const user = await User.find({
            $and : [
                {_id : {$nin : Array.from(hideUsersFromFeed)}},
                {_id : {$ne : loggedInUser._id}}
            ]
        }).select("firstName lastName age gender").skip(skip).limit(limit)
        res.send(user);
    } 
    catch (error) {
        res.status(400).json({"message" : error.message});
    }
} )

module.exports = userRouter;