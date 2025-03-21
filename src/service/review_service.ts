import supabase from "../supabase/create_client";
import errorResponse from "../utils/errors/errorResponse";
import { DeleteReviewInSupabaseTypes, FetchReviewFromSupabaseTypes, InsertReviewInSupabaseTypes, LikeUnlikeOnReviewTypes, UpdateReviewInSupabaseTypes } from "../utils/types/review_types";

export const insertReviewInSupabase = async ({ validatedData, userid }: InsertReviewInSupabaseTypes) => {
    try {
        const { movie_id, review } = validatedData

        // add review in supabase
        const { data, error } = await supabase
            .from("reviews")
            .insert([{ userid, movie_id, review }])
            .select()
            .single();

        if (error) {
            throw error;
        }

        return data
    } catch (error) {
        throw error
    }
};

export const updateReviewInSupabase = async ({ validatedData, userid }: UpdateReviewInSupabaseTypes) => {
    try {
        const { review_id, review } = validatedData

        // Update review in supabase
        const { data } = await supabase
            .from("reviews")
            .update({ review })
            .eq("id", review_id)
            .eq("userid", userid)
            .select("*")
            .single();

        if (!data) {
            throw errorResponse.Api404Error({
                errorDescription: "Review not found",
            });
        }

        return data
    } catch (error) {
        throw error
    }
};

export const deleteReviewInSupabase = async ({ review_id, userid }: DeleteReviewInSupabaseTypes) => {
    try {
        // delete review in supabase
        const { data } = await supabase
            .from("reviews")
            .delete()
            .eq("id", review_id)
            .eq("userid", userid)
            .select("*")
            .single()

        if (!data) {
            throw errorResponse.Api404Error({
                errorDescription: "Review not found",
            });
        }
    } catch (error) {
        throw error
    }
};

export const fetchUserReviewFromSupabase = async ({ validatedData, userid }: FetchReviewFromSupabaseTypes) => {
    try {
        const { page, limit, sort } = validatedData
        const skip = (page - 1) * limit;

        // Fetch user reviews
        const { data, error } = await supabase
            .from("reviews")
            .select("*")
            .eq("userid", userid)
            .order("created_at", { ascending: sort === 1 })
            .range(skip, skip + limit - 1);

        if (error) {
            throw error;
        }
        return data
    } catch (error) {
        throw error
    }
};

export const checkReviewIsExist = async ( review_id: number ) => {
    try {
        // fetch review data
        const { data: review } = await supabase
            .from("reviews")
            .select("likes")
            .eq("id", review_id)
            .single();

        if (!review) {
            throw errorResponse.Api404Error({
                errorDescription: "Review not found",
            });
        }
        return review
    } catch (error) {
        throw error
    }
};

export const updateLikeOnReview = async ({ review_id, userid }: LikeUnlikeOnReviewTypes) => {
    try {
        const review = await checkReviewIsExist(review_id)
        let likesArray = review.likes;

        // check user already liked the review
        if (likesArray.includes(userid)) {
            likesArray = likesArray.filter(id => id !== userid);
        } else {
            likesArray.push(userid);
        }

        // update the likes array in Supabase
        const { error } = await supabase
            .from("reviews")
            .update({ likes: likesArray })
            .eq("id", review_id);

        if (error) throw error;

    } catch (error) {
        throw error
    }
};