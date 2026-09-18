const mongoose=require('mongoose');
const {Schema}=mongoose;

const transactionSchema=new Schema({
    description:{
        type:String,
        required:true,
    },
    item:{
        type:Schema.Types.ObjectId,
        ref:'item'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    store:{
        type:Schema.Types.ObjectId,
        ref:'store',
    },
    quantity:{
        type:Number,
        default:0,
    },
    status:{
        type:String,
        enum:['success','failed'],
    },
    action:{
        type:String,
        enum:['add to cart','buy now'],
    }
},{
    timestamps:true
})


const Transaction=mongoose.model("transaction",transactionSchema);
module.exports=Transaction;