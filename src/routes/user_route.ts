import { Router } from "express";
import * as userController from "../controller/user_controller";
const router: Router = Router();

router.post("/signup", userController.user_signup );
router.post("/login", userController.user_login );

export default router;