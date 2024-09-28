import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
const brandSchema = new mongoose.Schema({
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
const Brand = mongoose.model('Brand', brandSchema);

export default Brand;