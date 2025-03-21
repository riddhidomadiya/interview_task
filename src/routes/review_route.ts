import { Router } from "express";
import * as reviewController from "../controller/review_controller";
import { auth } from "../middleware/verify_token";
const router: Router = Router();

router.post("/", auth, reviewController.addReview );
router.patch("/", auth, reviewController.updateReview );
router.delete("/", auth, reviewController.deleteReview );
router.get("/", auth, reviewController.getUserReviews );
router.post("/like_unlike", auth, reviewController.likeUnlikeOnReview );
export default router;