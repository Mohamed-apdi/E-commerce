import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
const couponSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        uppercase: true
    },
    expiry:{
        type:Date,
        required:true,
    },
    discount:{
        type:Number,
        required:true,
    },
});

//Export the model
const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;