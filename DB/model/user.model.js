import mongoose, { Schema,Types,model } from "mongoose";

const userSchema = new Schema({
    userName:{
        type:String,
        required:[true,'user name is required'],
        min:[2],
        max:[20],
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:Object,
    },
    phone:{
        type:String,
    },
    role:{
        type:String,
        default:'user',
        enum:['user','admin','shop Admin']
    },
    address:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    forgetCode:{
        type:String,
        defult:null
    },
    changePasswordTime:{
        type:Date
    },

},{
    timestamps:true
})

const userModel = mongoose.models.User || model('User',userSchema);
export default userModel;
