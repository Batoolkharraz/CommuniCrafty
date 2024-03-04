
import toolModel from "../../../../DB/model/tool.model.js";
import categoryModel from "../../../../DB/model/category.model.js";
import cloudinary from "../../../Services/cloudinary.js";
import { asyncHandler } from "../../../Services/errorHandling.js";

export const addTool = asyncHandler(async (req, res, next) => {

    const name = req.body.name;

    if (await toolModel.findOne({ name })) {
        return next(new Error(`duplicateed tool name ${name}`, { cause: 409 }));
    }
    if (!await categoryModel.findById(req.params.categoryId)) {
        return next(new Error(`invalid category Id`, { cause: 409 }));
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/tool` });
    const tool = await toolModel.create({
        name,
        description: req.body.description,
        image: { secure_url, public_id },
        categoryId:req.params.categoryId
    });
    return res.status(201).json({message:"success",tool });

})

export const updateTool = asyncHandler(async (req, res, next) => {

    const id = req.params.toolId;

    const tool = await toolModel.findById(id);

    if (!tool) {
        return next(new Error("invalid tool Id"));
    }

    if (req.body.name) {
        tool.name = req.body.name;
    }

    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/tool` });
        await cloudinary.uploader.destroy(tool.image.public_id);
        tool.image = { secure_url, public_id }
    }

    if (req.body.description) {
        tool.description = req.body.description;
    }

    if (req.body.categoryId) {
        tool.categoryId = req.body.categoryId;
    }
    await tool.save();
    return res.status(200).json({message:"success",tool })
})

export const getAllTools = asyncHandler(async (req, res, next) => {

    const tools = await toolModel.find();
    return res.status(200).json({message:"success",tools})

})

export const getTool = asyncHandler(async (req, res, next) => {

    const tool = await toolModel.findById(req.params.toolId);
    return res.status(200).json({message:"success",tool })

})

export const deleteTool = asyncHandler(async (req, res, next) => {
    const tool = await toolModel.findById(req.params.toolId);

    if (!tool) {
        return next(new Error("tool not found"));
    }

    await toolModel.findByIdAndDelete(tool._id)
    return res.status(200).json({ message: "success" })

})
