import joi from "joi";

export const addProject=joi.object({
    name:joi.string().min(2).max(100),
    description:joi.string().min(2).max(100),
    price:joi.number().positive().integer(),
}).required();

export const updateProject=joi.object({
    name:joi.string().min(2).max(10),
    description:joi.string().min(2).max(100),
    price:joi.number().positive().integer(),
}).required();
