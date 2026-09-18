const User = require("../models/user");
const validate = require("../utils/validator");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const register=async (req,res)=>{
    try{
        validate(req.body);
        console.log(req.body);

        const {firstName,emailId,password,address}=req.body;

        const hashPassword=await bcrypt.hash(password,10);
        req.body.password=hashPassword;
        req.body.role='user';

        const user=await User.create(req.body);
        const token=jwt.sign({id:user._id,role:user.role,emailId:emailId},process.env.JWT_KEY,{expiresIn:60*60});

        const reply={
            firstName:user.firstName,
            emailId:user.emailId,
            _id:user._id
        }

        res.cookie('token',token,{maxAge:60*60*1000});

        res.status(200).json({
            user:reply,
            message:"Registered Successfully"
        })
    }
    catch(err){
        res.status(400).send("Error : "+err);
    }
}

const login=async (req,res)=>{
   try{
        console.log(req.body);
        const {emailId,password}=req.body;

        if(!emailId)
            throw new Error("Email is Empty");
        if(!password)
            throw new Error("Password is empty");

        const user=await User.findOne({emailId});
        console.log("user  : ",user);
        const match=await bcrypt.compare(password,user.password);

        if(!match)
        {
            throw new Error("Invalid Credentials");
        }
        console.log("match  : ",match);
        const token=jwt.sign({id:user._id,role:user.role,emailId:emailId},process.env.JWT_KEY,{expiresIn:60*60});

        //const token=jwt.sign({id:user._id,role:user.role,emailId:emailId},process.env.JWT_KEY,{expiresIn:60*60});
        console.log("token : "+token);
        const reply={
            firstName:user.firstName,
            emailId:emailId,
            _id:user._id,
            role:user.role
        }
        res.cookie('token',token,{maxAge:60*60*1000});
        res.status(200).json({
            user:reply,
            message:"Logged In Successfully"
        })
   }
   catch(err){
    res.status(400).send("Error : "+err.message);
   }


}

module.exports={register,login};