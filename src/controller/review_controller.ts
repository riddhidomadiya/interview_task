import supabase from "../supabase/create_client";
import { createReviewSchema } from "../utils/validation/review_validation";
import { loginSchema, signupSchema } from "../utils/validation/user_validation";

async function addReview(req, res, next) {
    try {
        const reqData = req.body;
        const validatedData = await createReviewSchema.validateAsync(reqData);
        const {movie_id , review} = validatedData
        const userid = req.userId

        const { data, error }  = await supabase
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

export {addReview}