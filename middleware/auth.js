const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isAuth = (token === "xyz")
    if(isAuth){
        console.log("We are getting a user");
        next();
    }
    else{
        res.status(404).send("unauthorize user")
    }
}

const userAuth = (req, res, next) => {
    const token = "xyz";
    const isAuth = (token === "xyz")
    if(isAuth){
        console.log("We are getting a user");
        next();
    }
    else{
        res.status(404).send("unauthorize user")
    }
}

module.exports = {
    adminAuth,
    userAuth
}