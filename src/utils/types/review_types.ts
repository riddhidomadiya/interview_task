export type CreateReviewTypes = {
    movie_id: number;
    review: string;
}

export type UpdateReviewTypes = {
    review_id: number;
    review: string;
}

export type GetUserReviewTypes = {
    page: number;
    limit: number;
    sort: number;
}

export type InsertReviewInSupabaseTypes = {
    validatedData: CreateReviewTypes;
    userid: number;
}

export type UpdateReviewInSupabaseTypes = {
    validatedData: UpdateReviewTypes;
    userid: number;
}

export type DeleteReviewInSupabaseTypes = {
    review_id: number;
    userid: number;
}

export type FetchReviewFromSupabaseTypes = {
    validatedData: GetUserReviewTypes;
    userid: number;
}

export type LikeUnlikeOnReviewTypes = {
    review_id: number;
    userid?: number;
}
