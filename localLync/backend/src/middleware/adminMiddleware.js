const jwt=require("jsonwebtoken");
const User = require("../models/user");


const adminMiddleware=async (req,res,next)=>{
    try{
        const {token}=req.cookies;

        if(!token) 
            throw new Error("Token is not present")

        const payload=await jwt.verify(token,process.env.JWT_KEY);

        const {id,emailId}=payload;

        if(!id)
            throw new Error("Id is missing");;

        const result=await User.findById(id);

        if(!result)
            throw new Error("User Dont Exist")

        if(payload.role!='admin')
            throw new Error("You are not a admin")

        //redis ka code
        req.result=result;
        console.log("Admin Verifed Successfully");
        next();
    }
    catch(err){
        res.status(401).send("Error : "+err.message);
    }
}

module.exports=adminMiddleware;