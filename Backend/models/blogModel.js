import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    numView:{
        type:Number,
        default:0,
    },
    isLiked:{
        type:Boolean,
        default:false,
    },
    disLiked:{
        type:Boolean,
        default:false,
    },
    likes:[{
        type: mongoose.Schema.ObjectId,
        ref:'User',
    }],
    disLikes:[{
        type: mongoose.Schema.ObjectId,
        ref:'User',
    }],
    images:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRSBzDHDFdKeLwG1wPBo0SWncl4XNLhrvpVg&usqp=CAU",
    },
    author:{
        type:String,
        default:"admin",
    }

},
{
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
});

//Export the model
export const Blog = mongoose.model('Blog', blogSchema);