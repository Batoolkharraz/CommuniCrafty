import userModel from "../../../../DB/model/user.model.js";
import { asyncHandler } from "../../../Services/errorHandling.js";
import { compare, hash } from "../../../Services/hashAndCompare.js";

export const updatePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById(req.id);
    const match = compare(oldPassword, user.password);

    if (!match) {
        return next(new Error("invalid password"));
    }

    const hashPassword = hash(newPassword);
    await userModel.findByIdAndUpdate(req.id, { password: hashPassword });
    return res.json({ message: "success" });
}

export const getProfile = async (req, res, next) => {
    const user = await userModel.findById(req.params.id).select('userName email phone');

    if (!user) {
        return next(new Error("invalid profile id"));
    }
    else {
        return res.json({ message: 'success', user });
    }

}

export const updateStatus = asyncHandler(async (req, res, next) => {
    const { status } = req.body;
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
        return next(new Error("user not found"));
    }

    await userModel.findByIdAndUpdate(id, { status });
    return res.json({ message: "success" });
});

export const addUser = asyncHandler(async (req, res, next) => {
    const { userName, email, password, role } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        return next(new Error("email already exists", { cause: 409 }));
    }
    const Hpassword = hash(password);
    const createUser = await userModel.create({ userName, password: Hpassword, email, confirmEmail: true, role });
    return res.status(201).json({ message: "success", user: createUser._id });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
        return next(new Error("user not found"));
    }


    if (req.user.role == 'admin') {
        if (user.role != 'user') {
            return next(new Error("please note that the Id dose not belong to an user"));
        }
    }

    await userModel.findByIdAndDelete(id);
    return res.status(201).json({ message: "success" });
});

export const updateUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
        return next(new Error("user not found"));
    }

    if (req.user.role == 'admin') {
        if (user.role != 'user') {
            return next(new Error("please note that the Id dose not belong to an user"));
        }
    }


    if (req.body.userName) {
        if (user.userName == req.body.userName) {
            return next(new Error(`old name match the new name `, { cause: 400 }));
        }
        user.userName = req.body.userName;
    }
    if (req.body.address) {
        user.address = req.body.address;
    }
    if (req.body.phone) {
        user.phone = req.body.phone;
    }

    await user.save();
    return res.json({ message: "success", user })
});
