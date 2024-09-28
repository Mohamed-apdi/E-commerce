import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
},{
    timestamps:true
});

//Export the model
const Category = mongoose.model('BCategory', categorySchema);

export default Category;