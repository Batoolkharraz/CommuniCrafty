import joi from "joi";
import { generalFeilds } from "../../MiddleWare/validation.js";

export const createGroup=joi.object({
    name:joi.string().min(2).max(100),
    description:joi.string().min(2).max(100),
    price:joi.number().positive().integer(),
}).required();

export const taskStatus=joi.object({
    id:generalFeilds.id,
    taskstatus:joi.string().min(2).max(100),
}).required();

export const addToGroup=joi.object({
    id:generalFeilds.id,
    email:joi.string().min(2).max(10),
    task:joi.string().min(2).max(10),
}).required();

export const deleteFromGroup=joi.object({
    id:generalFeilds.id,
    email:joi.string().min(2).max(10),
}).required();

export const deleteGroup=joi.object({
    id:generalFeilds.id,
}).required();

export const updateGroup=joi.object({
    id:generalFeilds.id,
}).required();
