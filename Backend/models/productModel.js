import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
    },
    category:{
        type:String,
        required: true,
    }, 
    brand:{
        type:String,
        required:true,
    },
    quantity: {
        type: Number,
      },
      stock:{
        type: String,
        default:"in stock"
      },
    sold:{
        type:Number,
        default:0,
    },
    images:[{
        public_id:String,
        url:String,
    }],
    color:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Color',
    }],
    tags:[{
        type: String,
      }],
    ratings:[
        {
            star: Number,
            comment: String,
         postedby:{ type:mongoose.Schema.ObjectId,ref:"User"},
        }
    ],
    totalrating:{
        type:String,
        default:0
    }
},{
    timestamps:true
});

//Export the model
const Product = mongoose.model('Product', productSchema);
export default Product;