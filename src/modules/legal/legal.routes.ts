import { Router } from "express";
import { LegalController } from "./legal.controller";
import { upload } from "../../config/multer";

const router = Router();

router.post(
  "/upload",
  upload.single("file"),
  LegalController.uploadDocument,
);

export default router;