import joi from "joi";
import { generalFeilds } from "../../MiddleWare/validation.js";

export const createGroup = joi.object({
    projectname: joi.string().min(2).max(100).required(),
    description: joi.string().min(2).max(100).required(),
    members: joi.array().items(joi.object({
        email: generalFeilds.email,
        task: joi.string().min(2).max(100).required(),
    })).required()
});
export const taskStatus=joi.object({
    id:generalFeilds.id,
    taskstatus:joi.boolean(),
}).required();

export const addToGroup=joi.object({
    id:generalFeilds.id,
    email:generalFeilds.email,
    task:joi.string().min(2).max(100),
}).required();

export const deleteFromGroup=joi.object({
    id:generalFeilds.id,
    email:generalFeilds.email,
}).required();

export const deleteGroup=joi.object({
    id:generalFeilds.id,
}).required();

export const updateGroup=joi.object({
    id:generalFeilds.id,
    email:generalFeilds.email,
    task:joi.string().min(2).max(100),
}).required();

export const token=joi.object({
    token:joi.string().required(),
        }).required()
