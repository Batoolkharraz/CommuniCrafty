import joi from "joi";
import { generalFeilds } from "../../MiddleWare/validation.js";

export const addCraft = joi.object({
    skill: joi.string().min(2).max(50),
    categoryId: generalFeilds.id,
}).required();

export const deleteCraft = joi.object({
    categoryId: generalFeilds.id,
}).required();