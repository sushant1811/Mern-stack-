const express=require('express');
const cookieparser=require('cookie-parser');
require('dotenv').config();



const main=require("./config/db");
const redisClient=require('./config/redis');
const authRouter = require('./routes/userAuth');
const adminRouter = require('./routes/adminAuth');


const app=express();

app.use(express.json());
app.use(cookieparser());
app.use('/user',authRouter);
app.use('/admin',adminRouter);


const InitializeConnection=async ()=>{
    try{
        await Promise.all([main(),redisClient.connect()]);
        console.log("DB Connected");

        app.listen(process.env.PORT,()=>{
            console.log("Server listening at port numberr : "+process.env.PORT);
        })

    }
    catch(err){
        console.log("Error: Connecting to DB : "+err.message);
    }
}

InitializeConnection();


// main()
// .then(async()=>{
//     app.listen(process.env.PORT,()=>{
//         console.log("Server Listening at : ",process.env.PORT);
//     })
// })
// .catch(err=>console.log("Error Occured : "+err));