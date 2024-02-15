import mongoose from "mongoose";
import bcrypt from "bcrypt";
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    fastname:{
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
});


userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        return next();
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.comparePassword = async function (givenPassword) {
    return await bcrypt.compare(givenPassword, this.password);
}
//Export the model
const User = mongoose.model('User', userSchema);

export default User;