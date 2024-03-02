import joi from "joi";
import { generalFeilds } from "../../MiddleWare/validation.js";

export const createCategory=joi.object({
    name:joi.string().min(2).max(50),
    file:generalFeilds.file,
    description:joi.string().min(2).max(100),
}).required();

export const updateCategory=joi.object({
    categoryId:generalFeilds.id,
    name:joi.string().min(2).max(24),
    file:generalFeilds.file,
    description:joi.string().min(2).max(100),
}).required();

export const getCategory=joi.object({
    categoryId:generalFeilds.id,
}).required();