import craftModel from "../../../../DB/model/craft.model.js";
import userModel from "../../../../DB/model/user.model.js";
import { asyncHandler } from "../../../Services/errorHandling.js";

export const addCraft = asyncHandler(async (req, res, next) => {
    const categoryId = req.params.categoryId;
    const user = await userModel.findById(req.user._id);
    if (!user) {
        return next(new Error(`please sign up first `, { cause: 400 }));
    }
    const existingCraft = await craftModel.findOne({ userId: req.user._id });
    if (existingCraft) {
        for (const craft of existingCraft.craft) {
            console.log(craft);
            const catId = craft.categoryId.toString();
            if (catId == categoryId) {
                return next(new Error(`this craft is already addded `, { cause: 400 }));
            }
        }
        existingCraft.craft.push({
            categoryId,
            skill: req.body.skill
        });
        await existingCraft.save();
        return res.status(201).json({ message: "success", existingCraft });
    }
    else {
        const craft = await craftModel.create({
            userId: req.user._id,
            craft: [{
                categoryId,
                skill: req.body.skill
            }],
        });
        return res.status(201).json({ message: "success", craft });

    }

})

export const deleteCraft = asyncHandler(async (req, res, next) => {
    const { categoryId } = req.params;
    const user = await userModel.findById(req.user._id);
    if (!user) {
        return res.status(400).json({ message: "Please sign up first" });
    }

    const existingCraft = await craftModel.findOne({
        id: req.user._id,
        'craft.categoryId': categoryId
    });

    if (!existingCraft) {
        return res.status(404).json({ message: "Craft not found" });
    }
    existingCraft.craft = existingCraft.craft.filter(craft => craft.categoryId != categoryId);
    await existingCraft.save();

    return res.status(200).json({ message: "Craft deleted successfully", existingCraft });

})

export const getCraft = asyncHandler(async (req, res, next) => {
    const user = await userModel.findById(req.user._id);
    if (!user) {
        return next(new Error(`please sign up first `, { cause: 400 }));
    }
    const craft = await craftModel.findOne({ userId: req.user._id });
    return res.status(201).json({ message: "success", craft });
})

export const findBySkill = asyncHandler(async (req, res, next) => {
    const user = await userModel.findById(req.user._id);
    if (!user) {
        return next(new Error(`please sign up first `, { cause: 400 }));
    }
    const crafts = await craftModel.find({ 'craft.skill': req.body.skill });
    let usersId = [];
    let usersProfiles = [];
    for (const craft of crafts) {
        const u = craft.userId.toString();
        usersId.push(u);
    }
    for (const id of usersId) {
        const user = await userModel.findById(id).select('userName email phone');
        usersProfiles.push(user);
    }
    return res.status(201).json({ message: "success", usersId, usersProfiles });
})

export const findByCraft = asyncHandler(async (req, res, next) => {
    const user = await userModel.findById(req.user._id);
    if (!user) {
        return next(new Error(`please sign up first `, { cause: 400 }));
    }
    const crafts = await craftModel.find({ 'craft.categoryId': req.params.categoryId });
    let usersId = [];
    let usersProfiles = [];
    for (const craft of crafts) {
        const u = craft.userId.toString();
        usersId.push(u);
    }
    for (const id of usersId) {
        const user = await userModel.findById(id).select('userName email phone');
        usersProfiles.push(user);
    }
    return res.status(201).json({ message: "success", usersId, usersProfiles });
})

