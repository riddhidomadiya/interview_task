import Joi, { ObjectSchema } from "joi";
import { CreateReviewTypes, GetUserReviewTypes, LikeUnlikeOnReviewTypes, UpdateReviewTypes } from "../types/review_types";

const createReviewSchema: ObjectSchema<CreateReviewTypes> = Joi.object({
    movie_id: Joi.number().required(),
    review: Joi.string().required(),
});

const updateReviewSchema: ObjectSchema<UpdateReviewTypes> = Joi.object({
    review_id: Joi.number().required(),
    review: Joi.string().required(),
});

const getUserReviewSchema: ObjectSchema<GetUserReviewTypes> = Joi.object({
    page: Joi.number().default(1),
    limit: Joi.number().default(10),
    sort: Joi.number().valid(1, -1).default(1), // 1 = ASC, -1 = DESC
});

const likeUnlikeReviewSchema: ObjectSchema<LikeUnlikeOnReviewTypes> = Joi.object({
    review_id: Joi.number().required()
});

export { createReviewSchema, updateReviewSchema, getUserReviewSchema, likeUnlikeReviewSchema }