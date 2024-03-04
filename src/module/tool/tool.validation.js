import joi from "joi";
import { generalFeilds } from "../../MiddleWare/validation.js";

export const addTool=joi.object({
    name:joi.string().min(2).max(50),
    file:generalFeilds.file,
    description:joi.string().min(2).max(100),
    categoryId:generalFeilds.id,
}).required();

export const updateTool=joi.object({
    toolId:generalFeilds.id,
    name:joi.string().min(2).max(24),
    file:generalFeilds.file,
    description:joi.string().min(2).max(100),
}).required();
