import { generateToken } from '../../services/generatetoken.js';
import userModel from './../../../DB/model/User.model.js';
export const signup= async (req,res)=>{
    const user = await userModel.findOne({email});
    if(user){
        return next(new Error("email already exists"));
    }
    const hashPassword = hash(password);
    const token=generateToken({email},process.env.EMAIL_TOKEN)
    const link =`http://localhost:3000/auth/confirmEmail/${token}`;
    //email function
    const createUser = await userModel.create({userName,email,password:hashPassword});

    return res.status(201).json({message:"Done",user:createUser._id});
        
}