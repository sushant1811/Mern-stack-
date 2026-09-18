const mongoose=require('mongoose');

const {Schema}=mongoose;

const userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20,
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:20
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        immutable:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:10,
        max:80
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    address:{
        type:String,
        required:true,

    },
    cart:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'transaction'
        }]
    },
    forecast:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'item'
        }]
    }
   
},{
    timestamps:true
})


const User=mongoose.model("user",userSchema);
module.exports=User;