const mongoose=require('mongoose');
const {Schema}=mongoose;

const storeSchema=new Schema({
    store_name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    owner_id:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    items:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'item',
        }]
    },
     category: {
        type: String,
        required: true,
        enum: ['shoe_store', 'jewelry_store', 'clothing_store', 'appliance_store','general_store','grocery_store'], 
    },
    rating:{
        type:Number,
        default:3
    }

},{
    timestamps:true,
})

const Store=mongoose.model("store",storeSchema);
module.exports=Store;