import { deleteReviewInSupabase, fetchUserReviewFromSupabase, insertReviewInSupabase, updateLikeOnReview, updateReviewInSupabase } from "../service/review_service";
import { createReviewSchema, getUserReviewSchema, likeUnlikeReviewSchema, updateReviewSchema } from "../utils/validation/review_validation";

async function addReview(req, res, next) {
    try {
        const reqData = req.body;
        const validatedData = await createReviewSchema.validateAsync(reqData);
        const userid: number = req.userId

        const data = await insertReviewInSupabase({ validatedData, userid })

        res.dataUpdateSuccess({
            message: "Review added successfully",
            data
        });
    } catch (error) {
        next(error);
    }
}

async function updateReview(req, res, next) {
    try {
        const reqData = req.body;
        const validatedData = await updateReviewSchema.validateAsync(reqData);
        const userid: number = req.userId;

        const data = await updateReviewInSupabase({ validatedData, userid })

        res.dataUpdateSuccess({
            message: "Review update successfully",
            data
        });
    } catch (error) {
        next(error);
    }
}

async function deleteReview(req, res, next) {
    try {
        const review_id = req.query.review_id;
        const userid: number = req.userId;

        await deleteReviewInSupabase({ review_id, userid })

        res.dataDeleteSuccess({
            message: "Review deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}


async function getUserReviews(req, res, next) {
    try {

        const reqData = req.query;
        const validatedData = await getUserReviewSchema.validateAsync(reqData);
        const { page, limit } = validatedData
        const userid: number = req.userId;

        const data = await fetchUserReviewFromSupabase({ validatedData, userid })

        res.dataFetchSuccess({
            message: "Review get successfully",
            data: { page, limit, data }
        });
    } catch (error) {
        next(error);
    }
}

async function likeUnlikeOnReview(req, res, next) {
    try {
        const reqData = req.body;
        const validatedData = await likeUnlikeReviewSchema.validateAsync(reqData);
        const userid: number = req.userId
        const { review_id } = validatedData

        await updateLikeOnReview({review_id, userid})

        res.dataUpdateSuccess();
    } catch (error) {
        next(error);
    }
}

export { addReview, updateReview, deleteReview, getUserReviews, likeUnlikeOnReview }