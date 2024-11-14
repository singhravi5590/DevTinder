const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    status : {
        type : String,
        enum : {
            values : ["ignored", "interested", "accepted", "rejected"],
            message : `{Value} is incorrect status type`,
        },
        required : true,
    }
},
{
    timestamps : true,
});

// it is a middleware for database
connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself");
    }
    next();
})

// creating a index - it makes a query faster
connectionRequestSchema.index({fromUserId : 1, toUserId : 1});

const ConnectionRequestModel = new mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequestModel;