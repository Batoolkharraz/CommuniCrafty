
import categoryModel from "../../../../DB/model/category.model.js";
import projectGroupModel from "../../../../DB/model/group.model.js";
import projectModel from "../../../../DB/model/project.model .js";
import cloudinary from "../../../Services/cloudinary.js";
import { asyncHandler } from "../../../Services/errorHandling.js";

export const createCategory = asyncHandler(async (req, res, next) => {

    const name = req.body.name;
    

    if (await categoryModel.findOne({ name })) {
        return next(new Error(`duplicateed category name ${name}`, { cause: 409 }));
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/category` });
    const category = await categoryModel.create({
        name,
        description: req.body.description,
        image: { secure_url, public_id }
    });
    return res.status(201).json({ category });

})

export const updateCategory = asyncHandler(async (req, res, next) => {

    const id = req.params.categoryId;

    const category = await categoryModel.findById(id);

    if (!category) {
        return next(new Error("invalid category Id"));
    }

    if (req.body.name) {
        category.name = req.body.name;
    }

    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/category` });
        await cloudinary.uploader.destroy(category.image.public_id);
        category.image = { secure_url, public_id }
    }

    if (req.body.description) {
        category.description = req.body.description;
    }
    await category.save();
    return res.status(200).json({message:"success",category })
})

export const getAllCategory = asyncHandler(async (req, res, next) => {

    const categories = await categoryModel.find();
    return res.status(200).json({message:"success",categories})

})

export const getCategory = asyncHandler(async (req, res, next) => {

    const category = await categoryModel.findById(req.params.categoryId);
    return res.status(200).json({message:"success",category })

})

export const deleteCategory = asyncHandler(async (req, res, next) => {
  
    const categoryId = req.params.id;

    const category = await categoryModel.findById(categoryId);
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }
    const projects = await projectModel.find({ 'artwork.categoryId': categoryId });
    for (const project of projects) {
        project.artwork = project.artwork.filter(artwork => artwork.categoryId.toString() !== categoryId);
        await project.save();
    }
    await categoryModel.findByIdAndDelete(category._id)

    return res.status(200).json({ message: "Category and associated projects deleted successfully" });


})


