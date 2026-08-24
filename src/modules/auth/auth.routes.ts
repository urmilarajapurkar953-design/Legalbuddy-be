import {Router} from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";


const router = Router();

router.post("/register", AuthController.ragister);
router.post("/login", AuthController.login )
router.get("/me", authMiddleware, AuthController.me);

export default router;