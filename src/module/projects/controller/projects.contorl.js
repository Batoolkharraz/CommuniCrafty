import projectModel from "../../../../DB/model/project.model .js";
import { asyncHandler } from "../../../Services/errorHandling.js";
import cloudinary from "../../../Services/cloudinary.js";
import userModel from "../../../../DB/model/user.model.js";
import categoryModel from './../../../../DB/model/category.model.js';
import mongoose from 'mongoose';
import { sendEmail } from "../../../Services/sendEmail.js";
export const createproject=asyncHandler(async(req,res,next)=>{
const id = req.params.id;
const user = await userModel.findById(req.user._id);

if (!user) {
    return next(new Error(`please sign up first `, { cause: 400 }));
}
  if (await projectModel.findOne({'artwork.name': req.body.name })) {
    return next(new Error(`duplicateed project  ${req.body.name}`, { cause: 409 }));
}
console.log(req.body.name)
const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/projects` });
const projects = await projectModel.findOne({ userId: req.user._id });
if(projects)
{
    projects.artwork.push(
        {
           name: req.body.name,
           description:req.body.description,
           image: {secure_url, public_id },
           categoryId:id,
           price:req.body.price
        }
    )
    await projects.save();
        return res.status(201).json({ message: "added", projects });
}
    const newproject=await projectModel.create(
        
        { userId: req.user._id,
            artwork: [
            {
            name:req.body.name,
            description:req.body.description,
            image: {secure_url, public_id },
            categoryId:id,
            price:req.body.price
        }
            ]
        }
    );
    return res.status(201).json({ message:"your project is added",newproject });
})
export const deleteProjects = asyncHandler(async (req, res, next) => {
    const user = await userModel.findById(req.user._id);
    if (!user) {
        return next(new Error(`Please sign up first`));
    }

    const projects = await projectModel.findOne({ userId: req.user._id });
    if (!projects) {
        return next(new Error(`No projects added`));
    }

    const projToRemove = projects.artwork.find(artwork => artwork.name === req.body.name);
    if (!projToRemove) {
        return res.status(404).json({ message: "This project does not exist" });
    }

    projects.artwork = projects.artwork.filter(artwork => artwork._id.toString() !== projToRemove._id.toString());

    await projects.save();
    
    return res.status(200).json({ message: "Project deleted successfully", projects });
});

export const updateProject = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const user = await userModel.findById(req.user._id);
    if (!user) {
        return next(new Error(`Please sign up first`));
    }

    const projects = await projectModel.findOne({ userId: req.user._id });
    if (!projects) {
        return next(new Error(`No projects added`));
    }
    const projToupdate = projects.artwork.find(artwork => artwork._id.toString() === id);
    if (!projToupdate) {
        return res.status(404).json({ message: "This project does not exist" });
    }
    if(req.body.name!== undefined)
    {
        projToupdate.name=req.body.name

    }
    if(req.body.description!== undefined)
    {
        projToupdate.description=req.body.description
    }
   
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/projects` });
         await cloudinary.uploader.destroy(projects.image.public_id);
        projToupdate.image = { secure_url, public_id }
    }

    await projToupdate.save();
    return res.status(200).json({message:"success",projToupdate })

})
export const getproject=asyncHandler(async(req,res,next)=>{
    const user = await userModel.findById(req.user._id);
    if (!user) {
        return next(new Error(`please sign up first `, { cause: 400 }));
    }
   const project=await projectModel.findOne({userId:user._id})
   if(!project)
   {
    return next(new Error(`No projects added`));
   }
   const artwork = project.artwork;
   return res.status(200).json({ message: "Your Projects is", artwork });

})

export const projectcategory=asyncHandler(async(req,res,next)=>{
    const user = await userModel.findById(req.user._id);
    if (!user) {
        return next(new Error(`please sign up first `, { cause: 400 }));
    }
    const cat = await categoryModel.findOne({ name: req.body.category });
    if (!cat) {
        return res.status(404).json({ message: "Category not found" });
    }

    const project = await projectModel.findOne({ 'artwork.categoryId': cat._id });
    let projincat=[];
   
     if (project) {
    project.artwork.forEach(artwork => {
        if (artwork.categoryId.toString() === cat._id.toString()) {
            projincat.push(artwork);
        }
    })
}
     else {
        return next(new Error(`No projects added`));
    }
    return res.status(200).json({ message: "Projects in this category",projincat})
}

)

