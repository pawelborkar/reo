import { Router } from "express";
import { generatePresignedPostUrl } from "../controllers";

const router = Router();

router.route("/").post(generatePresignedPostUrl);

export default router;
