import { Router } from "express";
import * as reviewController from "../controller/review_controller";
import { auth } from "../middleware/verify_token";
const router: Router = Router();

router.post("/", auth, reviewController.addReview );
router.patch("/", auth, reviewController.updateReview );
export default router;