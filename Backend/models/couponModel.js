import mongoose from "mongoose"; 

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
    limit: {
        type: Number,
        required: true,
    },
    used: {
        type: Number,
        required: true,
        default: 0,
    },usedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});


const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;