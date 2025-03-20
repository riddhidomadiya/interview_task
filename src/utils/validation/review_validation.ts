import Joi, { ObjectSchema } from "joi";
import { CreateReviewTypes } from "../types/review_types";

const createReviewSchema: ObjectSchema<CreateReviewTypes> = Joi.object({
    movie_id: Joi.number().required(),
    review: Joi.string().required(),
});

export { createReviewSchema }