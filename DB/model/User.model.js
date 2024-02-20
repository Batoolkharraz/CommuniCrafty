import mongoose , {Schema,model} from "mongoose";
const UserSchema= new Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    profilePic:{
        type:String,
    },
    profolePublicUrl:String,
    coverPic:[String],
},
{
    timestamps:true //for created at 
})
const userModel = mongoose.models.User ||  model('User', UserSchema);
export default userModel;
