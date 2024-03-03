import joi from 'joi';
import { generalFeilds } from '../../MiddleWare/validation.js';

export const signupSchema=joi.object({

        userName:joi.string().alphanum().min(3).max(20).required().messages({
            'any.required':'userName is required',
            'string.empty':'userName is required'
        }),
        email:generalFeilds.email,
        password:generalFeilds.password,
        cPassword:joi.string().valid(joi.ref('password')).required(),
        age:joi.number().integer().min(17).max(80),
        gender:joi.string().alphanum().valid('male','female'),
        phone:joi.string().max(10),
        address:joi.string().max(20),
    }).required()

export const token=joi.object({
    token:joi.string().required(),
        }).required()

export const signinSchema=joi.object({
        email:generalFeilds.email,
        password:generalFeilds.password,
    }).required()

export const forgetPassword=joi.object({
    code:joi.string().required(),
    email:generalFeilds.email,
    password:generalFeilds.password,
    cPassword:joi.string().valid(joi.ref('password')).required(),
}).required();