const mongoose=require('mongoose');
const {Schema}=mongoose;


const itemSchema = new Schema({
    item_name: { 
            type: String,
            required: true
    },
    store_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'store'
     },
    photo_url: { 
        type: String 
    },
    item_description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number 
    }, 
    stock: { 
        type: Number 
    }, 
    tags: { 
        type: [String] 
    },
    rating: { 
        type: Number, 
        default: 0 
    }, 
    isActive: { 
        type: Boolean, 
        default: true 
    } 
}, { timestamps: true });


const Item=mongoose.model("item",itemSchema);
module.exports=Item;