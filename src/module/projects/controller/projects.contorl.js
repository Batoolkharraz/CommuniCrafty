import projectModel from "../../../../DB/model/project.model .js";
import { asyncHandler } from "../../../Services/errorHandling.js";
import cloudinary from "../../../Services/cloudinary.js";
import userModel from "../../../../DB/model/user.model.js";
export const createproject=asyncHandler(async(req,res,next)=>{
const id = req.params.id;
const user = await userModel.findById(req.user._id);
console.log(req.body.name)
// if (!user) {
//     return next(new Error(`please sign up first `, { cause: 400 }));
// }
//   if (await projectModel.findOne({'artwork.name': req.body.name })) {
//     return next(new Error(`duplicateed project  ${req.body.name}`, { cause: 409 }));
// }
// console.log(req.body.name)
// const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/projects` });
    
//     const newproject=await projectModel.create(
        
//         { userId: req.user._id,
//             artwork: [
//             {name:req.body.name,
//             description:req.body.description,
//             image: {secure_url, public_id },
//             categoryId:id,
//             price:req.body.price
//         }
//             ]
//         }
//     );
//     return res.status(201).json({ newproject });
})