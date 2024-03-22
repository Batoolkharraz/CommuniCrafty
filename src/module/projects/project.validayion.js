import joi from "joi";
import { generalFeilds } from "../../MiddleWare/validation.js";

export const addProject=joi.object({
    name:joi.string().min(2).max(100),
    file:generalFeilds.file,
    description:joi.string().min(2).max(100),
    price:joi.number().positive().integer(),
    id:generalFeilds.id,
}).required();

export const updateProject=joi.object({
    id:generalFeilds.id,
    name:joi.string().min(2).max(10),
    description:joi.string().min(2).max(100),
    price:joi.number().positive().integer(),
    file:generalFeilds.file,
}).required();

export const deleteProject=joi.object({
    name:joi.string().min(2).max(10),
}).required();
