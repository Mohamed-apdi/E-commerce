import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from 'crypto';
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        default:"user",
        enum:[
            "admin",
            "user"
        ]
    },
    isBlocked:{
        type:Boolean,
        default: false,
    },
    cart:{
        type:Array,
        default:[],
    },
    address:{
        type:String,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
        type:String,
    },
    passwordChange:Date,
    passwordResetToken:String,
    passwordExpires:Date,
},{
    timestamps:true
});


userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        return next();
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}


userSchema.methods.createResetPasswordToken = async function () { 
    const resettoken = crypto.randomBytes(5).toString("hex");
    this.passwordResetToken = crypto.createHash('sha256').update(resettoken).digest('hex');
    this.passwordExpires = Date.now() + 2 * 60 * 1000; // 10 minutes 
    return resettoken;
}
//Export the model
const User = mongoose.model('User', userSchema);

export default User;