const jwt=require("jsonwebtoken");
const User = require("../models/user");
const redisClient = require("../config/redis");


const userMiddleware=async(req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token)
            throw new Error("Token is not present");

        const payload=await jwt.verify(token,process.env.JWT_KEY);

        const {id,emaild}=payload;

        if(!id)
            throw new Error("Id is missing in token");

        const result=await User.findById(id);

        if(!result) throw new Error("User Dont Exist");

        // const IsBlocked=await redisClient.exists(`token:${token}`);

        // if(IsBlocked)
        //     throw new Error("Invalid Token");

        req.result=result;

        next();
    }
    catch(err){
        res.status(401).send("Error : "+err.message);
    }
}

module.exports=userMiddleware;