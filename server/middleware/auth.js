const userSignupSchema = require("../models/userSignup")
const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req,res,next) => {
    const bearerHeader = req.headers.authorization;
     
     if (typeof bearerHeader !== "undefined") {
         try{
             const bearer = bearerHeader.split(" ");
             const token = bearer[1];
             const decode = jwt.verify(token, process.env.secretKey)
            req.user = decode;
            next()
        }
        catch(error){
            res.status(400).send(error)
        }
    }
    else{
        res.send({ err: "Authentication token missing" });
    }
}

exports.isAdmin = async (req,res,next) => {
    try{
        const user = await userSignupSchema.findById(req.user.id);
        console.log(user,'user');
        if (user.Role !== 'Admin') {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        } 
        else {
            next();
        }
    }
    catch(error){
        res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
        });
    }
}