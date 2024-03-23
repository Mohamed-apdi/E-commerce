import mongoose from "mongoose"; 

const orderSchema = new mongoose.Schema({
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            count:Number,
            color:String,
        }
    ],
    paymentIntent:{},
    orderStatus:{
        type:String,
        default:"Not processed",
        enum:[
            "Not processed",
            "Cash on Delivery",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Delivered"]
    },
    orderby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timeseries:true,
});

//Export the model
const Order = mongoose.model('Order', orderSchema);

export default Order;