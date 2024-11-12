const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require('../../middleware/auth')



// send connection
requestRouter.post('/sendConnectionRequest', userAuth, (req, res) => {
    try{
        const user = req.user;
        res.send('connecton sent by '+ user.firstName)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})


module.exports = requestRouter;