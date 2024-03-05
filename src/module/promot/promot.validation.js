import joi from "joi";
import { generalFeilds } from "../../MiddleWare/validation.js";

export const addPromot=joi.object({
    description:joi.string().min(2).max(100),
    toolId:generalFeilds.id,
    qty:joi.number().positive().integer(),
}).required();

export const updatePromot=joi.object({
    promotId:generalFeilds.id,
    toolId:generalFeilds.id,
    description:joi.string().min(2).max(100),
    qty:joi.number().positive().integer(),
}).required();
