
import toolModel from "../../../../DB/model/tool.model.js";
import userModel from "../../../../DB/model/user.model.js";
import promotModel from "../../../../DB/model/promot.model.js";
import { asyncHandler } from "../../../Services/errorHandling.js";

export const addPromot = asyncHandler(async (req, res, next) => {

    if (!await toolModel.findById(req.params.toolId)) {
        return next(new Error(`invalid tool Id`, { cause: 409 }));
    }
    const existingPromot = await promotModel.findOne({ userId: req.user._id });
    if (existingPromot) {
        for (const tool of existingPromot.artTool) {
            const id = tool.toolId.toString();
            if (id == req.params.toolId) {
                return next(new Error(`this tool is already addded `, { cause: 400 }));
            }
        }
        existingPromot.artTool.push({
            toolId: req.params.toolId,
            qty: req.body.qty,
            description: req.body.description,
        });
        await existingPromot.save();
        return res.status(201).json({ message: "success", existingPromot });
    }
    else {
        const promot = await promotModel.create({
            userId: req.user._id,
            artTool: [{
                toolId: req.params.toolId,
                qty: req.body.qty,
                description: req.body.description,
            }],
        });
        return res.status(201).json({ message: "success", promot });

    }
})

export const updatePromot = asyncHandler(async (req, res, next) => {

    const id = req.params.promotId;

    const promot = await promotModel.findById(id);

    if (!promot) {
        return next(new Error("invalid promot Id"));
    }
    if (req.user._id.toString() != promot.userId.toString()) {
        return next(new Error("you can not update on this promot"));
    }

    const { qty, description } = req.body;
    const toolId = req.params.toolId;
    const { artTool } = promot;
    // Find the index of the art tool to update
    const toolIndex = artTool.findIndex(tool => tool.toolId.toString() === toolId);

    if (toolIndex === -1) {
        return res.status(404).json({ message: "Art tool not found" });
    }

    // Update the properties of the specific art tool
    if (qty !== undefined) {
        artTool[toolIndex].qty = qty;
    }

    if (description !== undefined) {
        artTool[toolIndex].description = description;
    }
    await promot.save();
    return res.status(200).json({ message: "success", promot })
})

export const getUserPromot = asyncHandler(async (req, res, next) => {

    const artTools = await promotModel.find({ userId: req.params.userId }).select("artTool");
    return res.status(200).json({ message: "success", artTools })

})

export const getPromot = asyncHandler(async (req, res, next) => {

    const promot = await promotModel.findById(req.params.promotId);
    return res.status(200).json({ message: "success", promot })

})

export const getToolPromot = asyncHandler(async (req, res, next) => {
    
    const { toolId } = req.params;

    const promotData = await promotModel.find({
        "artTool.toolId": toolId
    }).select({
        userId: 1,
        artTool: {
            $elemMatch: { toolId: toolId }
        }
    });

    // Fetch user information for each user
    const artTools = [];
    for (const promot of promotData) {
        const user = await userModel.findById(promot.userId).select('userName email phone');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        artTools.push({
            user: {
                userName: user.userName,
                email: user.email,
                phone: user.phone
            },
            artTool: promot.artTool[0] // Since $elemMatch returns an array with one element, we take the first element
        });
    }

    return res.status(200).json({ message: "Success", artTools });
})

export const deletePromot = asyncHandler(async (req, res, next) => {
    const { promotId, toolId } = req.params;

    const promot = await promotModel.findById(promotId);

    if (!promot) {
        return res.status(404).json({ message: "Promot not found" });
    }

    if (req.user._id.toString() !== promot.userId.toString()) {
        return res.status(403).json({ message: "You cannot delete this promot" });
    }

    const toolIndex = promot.artTool.findIndex(tool => tool.toolId == toolId);

    if (toolIndex === -1) {
        return res.status(404).json({ message: "Art tool not found in the promot" });
    }
    promot.artTool.splice(toolIndex, 1);
    await promot.save();
    return res.status(200).json({ message: "Art tool deleted successfully" });
})

