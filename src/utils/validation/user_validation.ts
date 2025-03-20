import Joi, { ObjectSchema } from "joi";
import { LoginTypes, SignupTypes } from "../types/user_types";

const signupSchema: ObjectSchema<SignupTypes> = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().trim().required().email(),
    password: Joi.string().min(6).trim().required(),
});

const loginSchema: ObjectSchema<LoginTypes> = Joi.object({
    email: Joi.string().trim().required().email(),
    password: Joi.string().min(6).trim().required(),
});

export { signupSchema, loginSchema }