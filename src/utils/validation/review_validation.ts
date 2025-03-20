import Joi, { ObjectSchema } from "joi";
import { CreateReviewTypes, UpdateReviewTypes } from "../types/review_types";

const createReviewSchema: ObjectSchema<CreateReviewTypes> = Joi.object({
    movie_id: Joi.number().required(),
    review: Joi.string().required(),
});

const updateReviewSchema: ObjectSchema<UpdateReviewTypes> = Joi.object({
    review_id: Joi.number().required(),
    review: Joi.string().required(),
});

export { createReviewSchema, updateReviewSchema }