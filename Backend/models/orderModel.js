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
    paymentIntent:{
        id: String,
        amount: Number,
        currency: String,
        status: String,
    },
    orderStatus:{
        type:String,
        default:"Not processed",
        enum:[
            "Not processed",
            "Cash on Delivery",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Delivered",
            "Payment Pending",
            "Paid",
            "Payment Failed",
        ]
    },
    orderby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
});

//Export the model
const Order = mongoose.model('Order', orderSchema);
export const orderStatusEnum = orderSchema.path('orderStatus').enumValues;
export default Order;