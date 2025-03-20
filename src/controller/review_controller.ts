import supabase from "../supabase/create_client";
import { createReviewSchema, updateReviewSchema } from "../utils/validation/review_validation";

async function addReview(req, res, next) {
    try {
        const reqData = req.body;
        const validatedData = await createReviewSchema.validateAsync(reqData);
        const { movie_id, review } = validatedData
        const userid = req.userId

        const { data, error } = await supabase
            .from("reviews")
            .insert([{ userid, movie_id, review }])
            .select()
            .single();

        if (error) {
            throw error;
        }

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
        const { review_id, review } = validatedData
        const userid = req.userId

        // Update review
        const { data, error } = await supabase
            .from("reviews")
            .update({ review })
            .eq("id", review_id)
            .select("*")
            .single();

        if (error) {
            throw error;
        }

        res.dataUpdateSuccess({
            message: "Review update successfully",
            data
        });
    } catch (error) {
        next(error);
    }
}

export { addReview, updateReview }