const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require('../../middleware/auth')
const ConnectionRequestModel = require('../models/connectionRequest');
const {User} = require("../models/user");



// send connection
requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedStatus = ["ignored", "interested"];

        if(!allowedStatus.includes(status)){
            return res.status(400).json({"message" : "Invalid status type" + status});
        }

        // if(fromUserId == toUserId){
        //     return res.status(400).json({"message" : "cannot send request to yourself"});
        // }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            res.status(400).json({message : "User not Found"});
        }

        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId : toUserId, toUserId : fromUserId},
            ]
        })

        if(existingConnectionRequest){
            return res.status(400).json({"message" : "connection request already exist"});
        }

        const request = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status,
        });

        const data = await request.save();
        res.json({
            message : req.user.firstName + " " + status + " " + toUser.firstName,
            data
        })
    }
    catch(err){
        res.status(400).send(err.message)
    }
})


module.exports = requestRouter;